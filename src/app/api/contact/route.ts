import { NextResponse } from 'next/server';
import { serverSupabase } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { name, email, domain, brief } = await request.json();

    if (!name || !email || !brief) {
      return NextResponse.json({ success: false, error: 'Name, email, and brief are required' }, { status: 400 });
    }

    // If Supabase is connected, store in contact_messages
    if (serverSupabase) {
      try {
        await serverSupabase.from('contact_messages').insert({
          name,
          email,
          domain: domain || 'General Inquiry',
          brief
        });
      } catch (dbErr) {
        console.warn('Database write skipped:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Transmission successfully recorded.'
    });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
