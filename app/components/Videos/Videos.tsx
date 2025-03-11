'use client';

import React from 'react';
import '@mux/mux-player';

interface Video {
    id: string;
    title: string;
    playbackId: string;
}

interface VideosProps {
  videos: Video[];
}

export default function Videos({ videos }: VideosProps) {
  if (!videos || videos.length === 0) {
    return <p>No videos available.</p>;
  }

  return (
    <div className="videos-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {videos.map((video) => (
        <div key={video.id} className="video-card bg-white rounded shadow overflow-hidden p-4">
          <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
          <mux-player
            stream-type="on-demand"
            playback-id={video.playbackId}
            poster={`https://image.mux.com/${video.playbackId}/thumbnail.jpg`}
            controls
            primary-color="#FF0000"
            title={video.title}
            style={{ width: '100%', height: 'auto' }}
          ></mux-player>
        </div>
      ))}
    </div>
  );
}
