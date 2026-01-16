"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

type Props = {
  onSearch?: (query: string) => void; // Made optional since we're removing search
};

export default function Hero({ onSearch }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative flex items-center h-screen justify-center overflow-hidden py-5">
      {/* Background con múltiples capas */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
        }}
      />

      {/* Overlay con gradiente animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-red-900/60 to-orange-900/70" />

      {/* Elementos decorativos flotantes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-orange-400/15 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-red-400/25 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-pink-400/20 rounded-full blur-xl animate-bounce" style={{ animationDuration: '4s' }} />
      </div>

      {/* Contenido principal */}
      <div className={`relative z-10 max-w-6xl mx-auto px-6 py-16 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

        {/* Título principal con efectos */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
          <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent drop-shadow-2xl">
            Descubre
          </span>
          <br />
          <span className="text-white drop-shadow-2xl">
            experiencias
          </span>
          <br />
          <span className="bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl">
            culinarias
          </span>
        </h1>

        {/* Subtítulo */}
        <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
          Explora los mejores restaurantes de tu ciudad. Descubre sabores únicos y vive momentos inolvidables.
        </p>

        {/* Botón de acción principal */}
        <div className="mb-12">
          <Link
            href="#mapa"
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-xl rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-orange-500/50">
            <span className="ml-2">Ir al mapa</span>
          </Link>

        </div>





      </div>
    </section>
  );
}
