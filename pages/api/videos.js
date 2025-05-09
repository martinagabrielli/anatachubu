import { getSession } from 'next-auth/react';
import mux from '../../app/lib/mux';

export default async function handler(req, res) {
  // Check session for authentication
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const searchQuery = req.query.search?.toLowerCase() || '';
    console.log(searchQuery)

    // Fetch assets using Mux SDK
    const assetsResponse = await mux.video.assets.list({
      limit: 10,
    });

    const filteredAssets = assetsResponse.data.filter(asset =>
      asset?.meta?.title?.toLowerCase().includes(searchQuery)
    );
    
    const videos = filteredAssets.map((asset) => ({
      id: asset.id,
      title: asset.meta.title || 'Untitled',
      playbackId: asset.playback_ids?.[0]?.id,
    }));
    
    res.status(200).json({ videos });
  } catch (error) {
    console.error('Error fetching videos from Mux:', error);
    res.status(500).json({ error: 'Failed to fetch videos', details: error.message });
  }
}
