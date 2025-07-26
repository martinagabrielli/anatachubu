'use client';

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase-client";
import { useSession } from "next-auth/react";
import FavouriteButton from "../components/FavouriteButton/FavouriteButton";
import '@mux/mux-player';
import Header from "../components/Header/Header";
interface Video {
  id: string;
  title: string;
  video_id: string;
}

export default function FavouritesPage() {
  const { data: session, status } = useSession();
  const [favouriteVideos, setFavouriteVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchFavourites = async () => {
      console.log("🔍 Session object:", session);
  
      if (!session?.user?.email) {
        console.warn("⚠️ No session or email, aborting fetch");
        setLoading(false);
        return;
      }
  
      // 1️⃣ Fetch favourite IDs
      const { data: favs, error: favError } = await supabase
        .from("favourites")
        .select("video_id")
        .eq("user_id", session.user.email);
      console.log("📥 Favourites raw:", favs, favError);
      console.log("The fucking data: ", favs);
  
      if (favError) {
        console.error("❌ Error fetching favourites:", favError);
        setLoading(false);
        return;
      }
  
      const videoIds = favs?.map((f) => f.video_id) || [];
      console.log("🎬 Extracted video IDs:", videoIds);
  
      if (videoIds.length === 0) {
        console.info("ℹ️ No favourite IDs found");
        setFavouriteVideos([]);
        setLoading(false);
        return;
      }
        
      // 2️⃣ Fetch metadata from videos table by playback_id
      const { data: videoRecords, error: videoError } = await supabase
        .from("videos")
        .select("id, title, playback_id")
        .in("playback_id", videoIds);

      console.log("📀 Video records raw:", videoRecords, videoError);

      if (videoError) {
        console.error("❌ Error fetching video metadata:", videoError);
        setLoading(false);
        return;
      }

      const mapped = videoRecords.map((v) => ({
        id: v.id,
        title: v.title,
        video_id: v.playback_id,
      }));

      console.log("✅ Mapped videos array:", mapped);
      setFavouriteVideos(mapped);

      setLoading(false);
    };
  
    fetchFavourites();
  }, [session]);

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
      <div className="text-3xl text-center mt-10">Loading your favourites...</div>
    );
  } else if (favouriteVideos.length === 0) {
    content = (
      <p className="text-3xl text-center mt-10">
        No favourites yet. Go love some videos! ❤️
      </p>
    );
  } else {
    content = (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
