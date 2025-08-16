'use client';

import { useSession } from 'next-auth/react';
import Header from './components/Header/Header';
import Banner from './components/Banner/Banner';
import Videos from './components/Videos/Videos';
import { useState } from 'react';
import Spinner from './components/Spinner/Spinner';
import { useVideos } from './hooks/useVideos';

export default function Home() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { videos, loading, error } = useVideos(searchQuery, isLoggedIn);

  return (
    <div>
      <Header onSearch={setSearchQuery} />
      <div className="home px-8">
        {!isLoggedIn && <Banner />}
        {isLoggedIn && (
          <>
            <h1 className="mb-8">Videos</h1>
            {loading && <Spinner />}
            {error && <p>{error}</p>}
            {!loading && !error && <Videos videos={videos} />}
          </>
        )}
      </div>
    </div>
  );
}
