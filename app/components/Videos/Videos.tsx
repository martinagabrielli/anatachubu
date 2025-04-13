'use client';

import React from 'react';
import '@mux/mux-player';
import styles from './videos.module.scss';

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
    return;
  }

  return (
    <div className={`${styles.videos} mx-auto`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {videos.map((video) => (
          <>
          <div key={video.id} className="video-card bg-background border-foreground border-2 rounded-2xl shadow overflow-hidden p-8">
            <mux-player
              stream-type="on-demand"
              playback-id={video.playbackId}
              poster={`https://image.mux.com/${video.playbackId}/thumbnail.jpg`}
              controls
              primary-color="#fff"
              title={video.title}
              style={{ width: '100%', height: 'auto' }}
            ></mux-player>
              <h3 className="text-lg font-semibold mb-2 pt-5">{video.title}</h3>
          </div>
          </>
        ))}
      </div>
    </div>
  );
}
