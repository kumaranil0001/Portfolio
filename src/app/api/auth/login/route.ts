import { NextResponse } from 'next/server';
import { serverSupabase } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const masterPasskey = process.env.ADMIN_SECRET_KEY || 'admin123456';

    // 1. Check Master Key login
    if (password === masterPasskey) {
      const response = NextResponse.json({
        success: true,
        user: { email: email || 'admin@anil404.dev', role: 'admin' },
        message: 'Logged in successfully via Master Key.'
      });

      // Set cookie for 7 days
      response.cookies.set('admin_session', 'authenticated_superuser', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/'
      });

      return response;
    }

    // 2. If Supabase Auth is configured, check Supabase credentials
    if (serverSupabase) {
      const { data, error } = await serverSupabase.auth.signInWithPassword({
        email,
        password
      });

      if (!error && data.user) {
        const response = NextResponse.json({
          success: true,
          user: data.user,
          message: 'Logged in successfully via Supabase Auth.'
        });

        response.cookies.set('admin_session', data.session?.access_token || 'authenticated_supabase', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7,
          path: '/'
        });

        return response;
      }
    }

    return NextResponse.json(
      { success: false, error: 'Invalid credentials. Use your Supabase password or Master Key (default: admin123456).' },
      { status: 401 }
    );
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
