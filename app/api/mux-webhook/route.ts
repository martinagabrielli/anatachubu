import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase-client';

export async function POST(req: NextRequest) {
  const payload = await req.json();
  console.log('📩 Webhook received:', JSON.stringify(payload, null, 2));

  // Only handle successful asset creation
  if (payload.type === 'video.asset.ready') {
    const { id: muxAssetId, playback_ids, created_at } = payload.data;
    const playbackId = playback_ids?.[0]?.id;

    if (!playbackId || !muxAssetId) {
      console.error('⚠️ Missing playback ID or Mux asset ID');
      return NextResponse.json({ error: 'Invalid Mux data' }, { status: 400 });
    }

    // Insert into Supabase with returning the UUID
    const { data, error } = await supabase
      .from('videos')
      .insert([
        {
          mux_asset_id: muxAssetId,
          playback_id: playbackId,
          title: `Mux Video - ${new Date(created_at).toLocaleString()}`
        }
      ])
      .select(); // This ensures we return the inserted row(s), including the generated UUID

    if (error) {
      console.error('❌ Supabase insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('✅ Video saved to Supabase:', data?.[0]);

    return NextResponse.json({ success: true, video: data?.[0] });
  }

  // Return 200 for other Mux webhook events (e.g., "video.upload.created", etc.)
  return NextResponse.json({ received: true });
}
