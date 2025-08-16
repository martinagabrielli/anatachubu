import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase-client';
import { useSession } from 'next-auth/react';

interface Video {
  id: string;
  title: string;
  video_id: string;
}

export const useFavorites = () => {
  const { data: session, status } = useSession();
  const [favouriteVideos, setFavouriteVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavourites = async () => {
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }

      const { data: favs, error: favError } = await supabase
        .from("favourites")
        .select("video_id")
        .eq("user_id", session.user.email);

      if (favError) {
        console.error("Error fetching favourites:", favError);
        setLoading(false);
        return;
      }

      const videoIds = favs?.map((f) => f.video_id) || [];

      if (videoIds.length === 0) {
        setFavouriteVideos([]);
        setLoading(false);
        return;
      }

      const { data: videoRecords, error: videoError } = await supabase
        .from("videos")
        .select("id, title, playback_id")
        .in("playback_id", videoIds);

      if (videoError) {
        console.error("Error fetching video metadata:", videoError);
        setLoading(false);
        return;
      }

      const mapped = videoRecords.map((v) => ({
        id: v.id,
        title: v.title,
        video_id: v.playback_id,
      }));

      setFavouriteVideos(mapped);
      setLoading(false);
    };

    if (status === 'authenticated') {
        fetchFavourites();
    } else {
        setLoading(false);
    }
  }, [session, status]);

  return { favouriteVideos, loading, status };
};
