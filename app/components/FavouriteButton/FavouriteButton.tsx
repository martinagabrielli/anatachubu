'use client';

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase-client";
import { useSession } from "next-auth/react";

interface FavouriteButtonProps {
  videoId: string;
}

export default function FavouriteButton({ videoId }: FavouriteButtonProps) {
  const { data: session } = useSession();
  const [isFavourited, setIsFavourited] = useState(false);

  useEffect(() => {
    const checkFavourite = async () => {
      if (!session?.user?.email) return;

      const { data, error } = await supabase
        .from('favourites')
        .select('id')
        .eq('user_id', session.user.email)
        .eq('video_id', videoId)
        .single(); // Only one expected

      if (data) {
        setIsFavourited(true);
      }
    };

    checkFavourite();
  }, [session, videoId]);

  const handleFavourite = async () => {
    if (!session?.user?.email) return;
  
    if (isFavourited) {
      const { data, error } = await supabase
        .from('favourites')
        .delete()
        .match({ user_id: session.user.email, video_id: videoId });
  
      console.log('unfavourite result →', { data, error });
      if (error) alert(`Error removing favourite: ${error.message}`);
      else setIsFavourited(false);
  
    } else {
      const { data, error } = await supabase
        .from('favourites')
        .insert({ user_id: session.user.email, video_id: videoId });
  
      console.log('favourite result →', { data, error });
      if (error) alert(`Error adding favourite: ${error.message}`);
      else setIsFavourited(true);
    }
  };
  
  return (
    <button onClick={handleFavourite}>
      {isFavourited ? "❤️" : "🤍"}
    </button>
  );
}
