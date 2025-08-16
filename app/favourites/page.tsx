'use client';

import { useState } from "react";
import FavouriteButton from "../components/FavouriteButton/FavouriteButton";
import '@mux/mux-player';
import Header from "../components/Header/Header";
import Spinner from "../components/Spinner/Spinner";
import { useFavorites } from "../hooks/useFavorites";

export default function FavouritesPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { favouriteVideos, loading, status } = useFavorites();

  const filteredVideos = favouriteVideos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  let content;

  if (status !== "authenticated") {
    content = (
      <div className="text-3xl text-center mt-10">
        You must be signed in to view your favourites.
      </div>
    );
  } else if (loading) {
    content = (
      <Spinner />
    );
  } else if (favouriteVideos.length === 0) {
    content = (
      <p className="text-3xl text-center mt-10">
        No favourites yet. Go love some videos! ❤️
      </p>
    );
  } else {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="bg-background border-foreground border-2 rounded-2xl shadow overflow-hidden p-8"
          >
            <mux-player
              stream-type="on-demand"
              playback-id={video.video_id}
              poster={`https://image.mux.com/${video.video_id}/thumbnail.jpg`}
              controls
              primary-color="#fff"
              title={video.title}
              style={{ width: '100%', height: 'auto' }}
            />
            <h3 className="text-lg font-semibold mb-2 pt-5">{video.title}</h3>
            <FavouriteButton videoId={video.video_id} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <Header onSearch={setSearchQuery} />
      <div className="favourites px-8">
        <h1 className="mb-8">Favourites</h1>
        {content}
      </div>
    </div>
  );
}
