// app/favourites/page.tsx

"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase-client";
import { useSession } from "next-auth/react";

interface Favourite {
  id: string;
  video_id: string;
}

export default function FavouritesPage() {
  const { data: session, status } = useSession();
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavourites = async () => {
      if (!session) return;

      const { data, error } = await supabase
        .from("favourites")
        .select("id, video_id")
        .eq("user_id", session.user?.email); // Or user id depending on your setup

      if (error) {
        console.error(error);
      } else {
        setFavourites(data || []);
      }
      setLoading(false);
    };

    fetchFavourites();
  }, [session]);

  if (status === "loading" || loading) {
    return <div className="text-center mt-10">Loading your favourites...</div>;
  }

  if (!session) {
    return <div className="text-center mt-10">You must be signed in to view your favourites.</div>;
  }

  if (favourites.length === 0) {
    return <div className="text-center mt-10">No favourites yet. Go love some videos! ❤️</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {favourites.map((fav) => (
        <div key={fav.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
          {/* Replace below with your real video thumbnail/title fetch if you have it */}
          <p className="text-white font-semibold text-center">{fav.video_id}</p>
        </div>
      ))}
    </div>
  );
}
