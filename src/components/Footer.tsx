"use client";

export default function Footer() {
  return (
    <div>
        <footer className="bg-linear-to-r from-gray-800 to-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">🍽️ Melp</h3>
              <p className="text-gray-300">Tu guía definitiva para los mejores restaurantes en Puebla. Descubre, califica y disfruta.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2">
                <li><a href="#hero" className="text-gray-300 hover:text-white transition-colors">Inicio</a></li>
                <li><a href="#mapa" className="text-gray-300 hover:text-white transition-colors">Mapa</a></li>
                <li><a href="#restaurantes" className="text-gray-300 hover:text-white transition-colors">Restaurantes</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <p className="text-gray-300">📧 info@melp.com</p>
              <p className="text-gray-300">📞 +52 222 123 4567</p>
              <p className="text-gray-300">📍 Puebla, México</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2026 Melp.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
