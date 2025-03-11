import { getSession } from 'next-auth/react';
import mux from '../../app/lib/mux';

export default async function handler(req, res) {
  // Check session for authentication
  const session = await getSession({ req });
  console.log('Session:', session);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    console.log('Fetching assets from Mux...');

    // Check if mux is initialized correctly
    console.log('Mux instance:', mux);

    // Fetch assets using Mux SDK
    const assetsResponse = await mux.assets.list({
      limit: 10,
    });

    console.log('Mux Assets Response:', assetsResponse);

    const videos = assetsResponse.data.map((asset) => ({
      id: asset.id,
      title: asset.name || 'Untitled',
      playbackId: asset.playback_ids?.[0]?.id,
    }));

    res.status(200).json({ videos });
  } catch (error) {
    console.error('Error fetching videos from Mux:', error);
    res.status(500).json({ error: 'Failed to fetch videos', details: error.message });
  }
}
