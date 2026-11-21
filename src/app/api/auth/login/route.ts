import { NextResponse } from 'next/server';
import { verifyOwnerCredentials, OWNER_EMAIL, OWNER_MONIKER } from '@/lib/auth/adminStore';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Both identity and security password are required.' },
        { status: 400 }
      );
    }

    const isLocalhost = request.url.includes('localhost') || request.url.includes('127.0.0.1');
    const isSecure = process.env.NODE_ENV === 'production' && !isLocalhost;

    // Strict single-owner verification
    const verification = await verifyOwnerCredentials(email, password);

    if (!verification.allowed) {
      const isIdentityError = verification.error?.includes('Access Denied');
      return NextResponse.json(
        { success: false, error: verification.error || 'Authentication rejected.' },
        { status: isIdentityError ? 403 : 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      user: {
        email: OWNER_EMAIL,
        moniker: OWNER_MONIKER,
        role: 'owner'
      },
      message: 'Welcome back, Anil. Control Center access granted.'
    });

    // Set secure HTTP-only session cookie
    response.cookies.set('admin_session', 'authenticated_owner', {
      httpOnly: true,
      secure: isSecure,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });

    response.cookies.set('admin_user', `${OWNER_MONIKER} (${OWNER_EMAIL})`, {
      httpOnly: false,
      secure: isSecure,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    });

    return response;
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
