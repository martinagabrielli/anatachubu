import { useState, useEffect } from 'react';

interface Video {
  id: string;
  title: string;
  playbackId: string;
}

export const useVideos = (searchQuery: string, isLoggedIn: boolean) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/videos?search=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setVideos(data.videos);
      } catch (err) {
        console.error('Failed to fetch videos:', err);
        setError('Failed to load videos.');
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchVideos();
    } else {
      setVideos([]);
      setLoading(false);
    }
  }, [isLoggedIn, searchQuery]);

  return { videos, loading, error };
};
