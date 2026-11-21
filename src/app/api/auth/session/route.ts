import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  const user = cookieStore.get('admin_user');

  if (session && session.value) {
    return NextResponse.json({ 
      authenticated: true, 
      role: 'superuser',
      user: {
        id: user?.value || 'admin',
        email: user?.value || 'admin@anil404.dev'
      }
    });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
