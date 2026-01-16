"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-500'
          : 'bg-transparent backdrop-blur-sm'
      }`}
      role="navigation"
      aria-label="Menú principal"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo simplificado pero llamativo */}
        <Link
          href="/"
          className="flex items-center gap-2 group transition-transform duration-300 hover:scale-105"
          aria-label="Ir a inicio"
        >
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg text-white text-xl shadow-lg group-hover:shadow-xl transition-shadow">
            🍽️
          </div>
          <span className={`text-xl font-bold transition-colors duration-300 ${
            isScrolled ? 'text-gray-900' : 'text-orange-500'
          }`}>
            Melp
          </span>
        </Link>

        {/* Links desktop simplificados */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`font-medium transition-colors duration-300 ${
              isScrolled
                ? 'text-gray-700 hover:text-orange-600'
                : 'text-white hover:text-orange-300'
            }`}
          >
            Inicio
          </Link>
          <Link
            href="#mapa"
            className={`font-medium transition-colors duration-300 ${
              isScrolled
                ? 'text-gray-700 hover:text-orange-600'
                : 'text-white hover:text-orange-300'
            }`}
          >
            Mapa
          </Link>
          <Link
            href="#restaurantes"
            className={`font-medium transition-colors duration-300 ${
              isScrolled
                ? 'text-gray-700 hover:text-orange-600'
                : 'text-white hover:text-orange-300'
            }`}
          >
            Restaurantes
          </Link>
        </div>

       

        {/* Mobile button simplificado */}
        <button
          className={`md:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
            isScrolled
              ? 'bg-gray-100 text-gray-700 hover:bg-orange-50'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir menú"
        >
          <span className="text-lg">
            {isOpen ? '✕' : '☰'}
          </span>
        </button>
      </div>

      {/* Mobile menu simplificado */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${
        isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className={`${
          isScrolled ? 'bg-white border-t border-gray-200' : 'bg-black/20 backdrop-blur-lg'
        } px-6 py-4 space-y-3`}>
          <Link
            href="/"
            className={`block py-2 font-medium transition-colors ${
              isScrolled
                ? 'text-gray-700 hover:text-orange-600'
                : 'text-white hover:text-orange-300'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Inicio
          </Link>
          <Link
            href="#mapa"
            className={`block py-2 font-medium transition-colors ${
              isScrolled
                ? 'text-gray-700 hover:text-orange-600'
                : 'text-white hover:text-orange-300'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Mapa
          </Link>
          <Link
            href="#restaurantes"
            className={`block py-2 font-medium transition-colors ${
              isScrolled
                ? 'text-gray-700 hover:text-orange-600'
                : 'text-white hover:text-orange-300'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Restaurantes
          </Link>

        </div>
      </div>
    </nav>
  );
}
          