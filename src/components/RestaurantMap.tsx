"use client";

import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { Restaurant } from "@/types/restaurant";
import { analyzeRestaurantsInRadius } from "@/lib/restaurantStats";
import { getRecommendedRestaurants } from "@/lib/recommendations";

/* Fix iconos Leaflet */
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Icono personalizado para el centro
const centerIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Iconos para restaurantes según rating
const getRestaurantIcon = (rating: number) => {
  let color = "blue";
  if (rating >= 4.5) color = "gold";
  else if (rating >= 4.0) color = "green";
  else if (rating >= 3.5) color = "orange";
  else color = "red";

  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

type Props = {
  restaurants: Restaurant[];
};

/* Detecta clicks en el mapa */
function MapClickHandler({
  onClick,
}: {
  onClick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function RestaurantMap({ restaurants }: Props) {
  const restaurantsWithCoords = restaurants.filter(
    (r) => r.address?.location?.lat && r.address?.location?.lng
  );

  if (restaurantsWithCoords.length === 0) {
    return <p>No hay restaurantes con ubicación disponible</p>;
  }

  /* Estado dinámico */
  const [center, setCenter] = useState({
    lat: restaurantsWithCoords[0].address!.location!.lat,
    lng: restaurantsWithCoords[0].address!.location!.lng,
  });

  const [radius, setRadius] = useState(1000);

  /* BONOS */
  const stats = analyzeRestaurantsInRadius(
    restaurants,
    center.lat,
    center.lng,
    radius
  );

  const recommendations = getRecommendedRestaurants(
    restaurants,
    center.lat,
    center.lng,
    radius,
    4,
    5
  );

  return (
    <section className="mt-12">
      {/* Header llamativo */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
          <span className="text-lg">🗺️</span>
          <span>Mapa Interactivo</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Explora Restaurantes Cercanos
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Haz click en cualquier punto del mapa para cambiar el centro de búsqueda.
          Los marcadores cambian de color según la calificación del restaurante.
        </p>
      </div>

      {/* Control de radio mejorado */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl shadow-sm border border-gray-200 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-blue-500 p-2 rounded-lg">
            <span className="text-white text-lg">📍</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Radio de Búsqueda</h3>
            <p className="text-sm text-gray-600">Ajusta el área de búsqueda alrededor del punto seleccionado</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Distancia:</span>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              {radius} m
            </span>
          </div>
          <input
            type="range"
            min={500}
            max={5000}
            step={500}
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>500m</span>
            <span>1km</span>
            <span>2km</span>
            <span>3km</span>
            <span>5km</span>
          </div>
        </div>
      </div>

      {/* MAPA mejorado */}
      <div className="relative">
        <div className="h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
          <MapContainer
            center={[center.lat, center.lng]}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
            className="z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Click handler */}
            <MapClickHandler
              onClick={(lat, lng) => setCenter({ lat, lng })}
            />

            {/* Centro con icono personalizado */}
            <Marker position={[center.lat, center.lng]} icon={centerIcon}>
              <Popup className="custom-popup">
                <div className="p-2">
                  <div className="font-bold text-red-600 mb-1">📍 Punto de Búsqueda</div>
                  <div className="text-sm text-gray-600">
                    Lat: {center.lat.toFixed(4)}<br />
                    Lng: {center.lng.toFixed(4)}
                  </div>
                </div>
              </Popup>
            </Marker>

            {/* Radio con mejor estilo */}
            <Circle
              center={[center.lat, center.lng]}
              radius={radius}
              pathOptions={{
                color: "#3b82f6",
                fillColor: "#3b82f6",
                fillOpacity: 0.1,
                weight: 2,
                dashArray: "10, 10"
              }}
            />

            {/* Restaurantes con iconos por rating */}
            {restaurantsWithCoords.map((r) => (
              <Marker
                key={r.id}
                position={[
                  r.address!.location!.lat,
                  r.address!.location!.lng,
                ]}
                icon={getRestaurantIcon(r.rating)}
              >
                <Popup className="custom-popup">
                  <div className="p-3 min-w-[200px]">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">🍽️</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">{r.name}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">⭐</span>
                            <span className="font-semibold">{r.rating}</span>
                          </div>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-600">
                            {r.address?.city}, {r.address?.state}
                          </span>
                        </div>
                        {r.contact?.phone && (
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                            <span>📞</span>
                            <span>{r.contact.phone}</span>
                          </div>
                        )}
                        {r.contact?.email && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>✉️</span>
                            <span className="truncate">{r.contact.email}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Leyenda de colores */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-200">
          <h4 className="font-semibold text-sm mb-2 text-gray-800">Calificación</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png" alt="gold" className="w-4 h-4" />
              <span>4.5+ ⭐ Excelente</span>
            </div>
            <div className="flex items-center gap-2">
              <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png" alt="green" className="w-4 h-4" />
              <span>4.0+ ⭐ Muy bueno</span>
            </div>
            <div className="flex items-center gap-2">
              <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png" alt="orange" className="w-4 h-4" />
              <span>3.5+ ⭐ Bueno</span>
            </div>
            <div className="flex items-center gap-2">
              <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png" alt="red" className="w-4 h-4" />
              <span>&lt; 3.5 ⭐ Regular</span>
            </div>
          </div>
        </div>
      </div>

      {/* RESULTADOS mejorados */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Estadísticas */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-sm border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-500 p-2 rounded-lg">
              <span className="text-white text-lg">📊</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900">Estadísticas del Área</h3>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white/70 rounded-lg">
              <span className="text-gray-700">🏪 Restaurantes encontrados</span>
              <span className="font-bold text-2xl text-blue-600">{stats.count}</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-white/70 rounded-lg">
              <span className="text-gray-700">⭐ Rating promedio</span>
              <span className="font-bold text-2xl text-yellow-600">{stats.averageRating}</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-white/70 rounded-lg">
              <span className="text-gray-700">📈 Desviación estándar</span>
              <span className="font-bold text-2xl text-green-600">{stats.stdDeviation}</span>
            </div>
          </div>
        </div>

        {/* Recomendaciones */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl shadow-sm border border-green-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-500 p-2 rounded-lg">
              <span className="text-white text-lg">🏆</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900">Top Recomendaciones</h3>
          </div>

          <div className="space-y-3">
            {recommendations.length > 0 ? (
              recommendations.slice(0, 5).map((r, index) => (
                <div key={r.id} className="flex items-center gap-3 p-3 bg-white/70 rounded-lg hover:bg-white/90 transition-colors">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 truncate">{r.name}</div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-yellow-500">⭐</span>
                      <span>{r.rating}</span>
                      <span className="text-gray-400">•</span>
                      <span className="truncate">{r.address?.city}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">🔍</div>
                <p>No hay recomendaciones disponibles</p>
                <p className="text-sm">Prueba ajustando el radio de búsqueda</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        .custom-popup .leaflet-popup-content {
          margin: 0;
          border-radius: 12px;
        }

        .custom-popup .leaflet-popup-tip {
          background-color: white;
        }

        .leaflet-control-container .leaflet-routing-container-hide {
          display: none;
        }
      `}</style>
    </section>
  );
}
