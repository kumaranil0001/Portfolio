import { NextResponse } from 'next/server';
import { serverSupabase } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    // 1. Try Supabase Storage if configured
    if (serverSupabase) {
      const { error: uploadError } = await serverSupabase.storage
        .from('portfolio-assets')
        .upload(fileName, buffer, {
          contentType: file.type,
          upsert: true
        });

      if (!uploadError) {
        const { data: publicData } = serverSupabase.storage
          .from('portfolio-assets')
          .getPublicUrl(fileName);

        return NextResponse.json({
          success: true,
          url: publicData.publicUrl,
          storage: 'supabase',
          fileName
        });
      }
    }

    // 2. Fallback: Data URL (guarantees instant upload and display without remote storage errors)
    const base64 = buffer.toString('base64');
    const dataUrl = `data:${file.type || 'image/jpeg'};base64,${base64}`;

    return NextResponse.json({
      success: true,
      url: dataUrl,
      storage: 'inline_data',
      fileName
    });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
