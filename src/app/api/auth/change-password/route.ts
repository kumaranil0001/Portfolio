import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { updateAdminPassword } from '@/lib/auth/adminStore';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');

    // Only authenticated owner can change password
    if (!session || !session.value) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. You must be logged in as the owner to change the password.' },
        { status: 401 }
      );
    }

    const { oldPassword, newPassword } = await request.json();

    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        { success: false, error: 'Both current password and new password are required.' },
        { status: 400 }
      );
    }

    const result = await updateAdminPassword(oldPassword, newPassword);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to update password.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message || 'Password updated successfully!'
    });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
