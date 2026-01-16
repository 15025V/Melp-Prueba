

export default function Cta() {
  return (
    <section className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 py-20 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-5xl font-bold mb-6">
              ¿Listo para Descubrir?
            </h2>
            <p className="text-xl mb-8 text-orange-100">
              Únete a miles de personas que ya encontraron su restaurante favorito
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button   className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Explorar Restaurantes
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-orange-600 transition-all duration-300">
                Ver en el Mapa
              </button>
            </div>
          </div>
        </section>

  )
}
