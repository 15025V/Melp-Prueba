"use client";

import { useState } from "react";
import Link from "next/link";
import { Restaurant } from "@/types/restaurant";

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "from-yellow-400 to-orange-500";
    if (rating >= 4.0) return "from-green-400 to-green-600";
    if (rating >= 3.5) return "from-blue-400 to-blue-600";
    return "from-gray-400 to-gray-600";
  };

  const getRatingText = (rating: number) => {
    if (rating >= 4.5) return "Excelente";
    if (rating >= 4.0) return "Muy bueno";
    if (rating >= 3.5) return "Bueno";
    return "Regular";
  };

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount(likeCount + 1);
    } else {
      setLiked(false);
      setLikeCount(likeCount - 1);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: restaurant.name,
          text: `Check out ${restaurant.name}!`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      alert("Sharing not supported in this browser.");
    }
  };

  return (
    <div className="group relative bg-white border rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
      {/* Header */}
      <div className="relative h-48 bg-gradient-to-br from-orange-100 to-pink-100 rounded-t-3xl overflow-hidden flex items-center justify-center">
        <div
          className={`absolute top-4 right-4 bg-gradient-to-r ${getRatingColor(
            restaurant.rating
          )} text-white px-3 py-2 rounded-xl`}
        >
          ⭐ {restaurant.rating}
        </div>

        {restaurant.distance && (
          <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs">
            📍 {(restaurant.distance / 1000).toFixed(1)} km
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl">🍽️</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">{restaurant.name}</h2>

        <p className="text-sm text-gray-600 mb-3">
          📍 {restaurant.address?.city ?? "Ubicación no disponible"}
        </p>

        <p className="text-sm text-gray-500 mb-4">
          🌟{getRatingText(restaurant.rating)}
        </p>
        <p className="text-sm text-gray-700 mb-6 line-clamp-3">
          🌐{restaurant.contact?.site || "Descripción no disponible."}
        </p>
        <p className="text-sm text-gray-700 mb-6 line-clamp-3">
          📲{restaurant.contact?.phone || "Teléfono no disponible."}
        </p>

        <Link
          href="#mapa"
          className="block text-center bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
        >
          Ver en el mapa
        </Link>

        {/* Action bar: Like & Share */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition ${
              liked ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            } hover:scale-105`}
          >
            👍 {liked ? "Liked" : "Like"} <span>{likeCount}</span>
          </button>

          <button
            onClick={handleShare}
            className="px-4 py-2 rounded-xl font-semibold bg-green-500 text-white hover:bg-green-600 transition"
          >
            🔗 Share
          </button>
        </div>
      </div>
    </div>
  );
}
