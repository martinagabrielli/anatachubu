'use client';

import { useSession } from 'next-auth/react';
import Header from './components/Header/Header';
import SearchBanner from './components/SearchBanner/SearchBanner';
import Videos from './components/Videos/Videos';
import { useEffect, useState } from 'react';
interface Video {
  id: string;
  title: string;
  playbackId: string;
}

export default function Home() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/videos');
        if (!response.ok) {
          console.log(response)
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
    }
  }, [isLoggedIn]);

  return (
    <div className="home">
      <Header />
      <SearchBanner />
      {isLoggedIn && (
        <>
          {loading && <p>Loading videos...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && <Videos videos={videos} />}
        </>
      )}
    </div>
  );
}
