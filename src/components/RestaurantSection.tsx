"use client";

import { useState } from "react";
import RestaurantCard from "@/components/RestaurantCard";
import { Restaurant } from "@/types/restaurant";

export default function RestaurantSection({
    restaurants,
}: {
    restaurants: Restaurant[];
}) {
    const [minRating, setMinRating] = useState<number | null>(null);

    const filteredRestaurants = (() => {
        if (minRating === null) return restaurants;

        if (minRating === 5) {
            return restaurants.filter((r) => r.rating === 5);
        }

        return restaurants.filter(
            (r) => r.rating >= minRating && r.rating < minRating + 1
        );
    })();


    const filters = [
        { label: "🔄 Todos", value: null },
        { label: "⭐⭐⭐⭐⭐ 5", value: 5 },
        { label: "⭐⭐⭐⭐ 4", value: 4 },
        { label: "⭐⭐⭐ 3", value: 3 },
        { label: "⭐⭐ 2", value: 2 },
        { label: "⭐ 1", value: 1 },
        { label: "⭐ 0", value: 0 },
    ];

    return (
        <section className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-gray-900 mb-4">
                        Restaurantes Destacados
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Filtra por calificación
                    </p>
                </div>


                {/* Filtros */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {filters.map((filter) => {
                        const isActive = filter.value === minRating;

                        return (
                            <button
                                key={filter.label}
                                onClick={() => setMinRating(filter.value)}
                                className={`px-5 py-2.5 rounded-full text-sm font-medium border-2 transition
                  ${isActive
                                        ? "bg-orange-500 text-white border-orange-500 shadow"
                                        : "bg-white text-gray-700 border-gray-200 hover:border-orange-300 hover:text-orange-600"
                                    }`}
                            >
                                {filter.label}
                            </button>
                        );
                    })}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredRestaurants.length === 0 ? (
                        <p className="col-span-full text-center text-gray-500">
                            No se encontraron restaurantes con esta calificación
                        </p>
                    ) : (
                        filteredRestaurants.slice(0, 25).map((r) => (
                            <div
                                key={r.id}
                                className="transform hover:scale-105 transition-transform duration-300"
                            >
                                <RestaurantCard restaurant={r} />
                            </div>
                        ))
                    )}
                </div>

            </div>
        </section>
    );
}
