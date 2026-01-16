import { getRestaurants } from "@/lib/api";

// Components
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MapClient from "@/components/MapClient";
import Navbar from "@/components/Navbar";
import RestaurantSection from "@/components/RestaurantSection";

export default async function Home() {
  const restaurants = await getRestaurants();

  // Calculate statistics
  const stats = calculateStats(restaurants);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section id="hero">
          <Hero />
        </section>

        {/* Quick Statistics */}
        <section className="bg-gradient-to-r from-orange-50 via-red-50 to-pink-50 py-12 border-y border-orange-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatCard
                icon="🏪"
                value={stats.totalRestaurants}
                label="Restaurantes"
                gradient="from-orange-400 to-red-500"
              />
              <StatCard
                icon="⭐"
                value={stats.averageRating}
                label="Rating promedio"
                gradient="from-yellow-400 to-orange-500"
              />
              <StatCard
                icon="🏆"
                value={stats.topRated}
                label="Excelentes (4.5+)"
                gradient="from-green-400 to-green-600"
              />
              <StatCard
                icon="📍"
                value={stats.cities}
                label="Ciudades"
                gradient="from-blue-400 to-purple-500"
              />
            </div>
          </div>
        </section>

        {/* Interactive Map */}
        <section id="mapa" className="bg-gradient-to-b from-white to-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="overflow-hidden">
              <MapClient restaurants={restaurants} />
            </div>
          </div>
        </section>

        <Cta />

        {/* Featured Restaurants */}
        <section 
        id="restaurantes"
        className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <RestaurantSection restaurants={restaurants} />
          </div>
        </section>

      
      </main>
      <Footer />
    </>
  );
}

// Helper function to calculate statistics
function calculateStats(restaurants: any[]) {
  const totalRestaurants = restaurants.length;
  const averageRating = (
    restaurants.reduce((sum, r) => sum + r.rating, 0) / totalRestaurants
  ).toFixed(1);
  const topRated = restaurants.filter(r => r.rating >= 4.5).length;
  const cities = [...new Set(restaurants.map(r => r.address?.city).filter(Boolean))].length;

  return {
    totalRestaurants,
    averageRating,
    topRated,
    cities,
  };
}

// Reusable StatCard component
function StatCard({ icon, value, label, gradient }: {
  icon: string;
  value: string | number;
  label: string;
  gradient: string;
}) {
  return (
    <div className="text-center group">
      <div className={`bg-gradient-to-br ${gradient} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        <span className="text-2xl text-white">{icon}</span>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600 font-medium">{label}</div>
    </div>
  );
}





