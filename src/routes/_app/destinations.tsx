import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, Filter } from 'lucide-react';
import Newsletter from '../../components/sections/Newsletter';

export const Route = createFileRoute('/_app/destinations')({
  component: DestinationsPage,
});

function DestinationsPage() {
  const categories = ['All', 'Tropical', 'Mountain', 'Coastal', 'Cultural', 'City'];
  
  const destinations = [
    { id: 1, name: 'Bali, Indonesia', price: '$850', rating: 4.9, category: 'Tropical' },
    { id: 2, name: 'Santorini, Greece', price: '$1,200', rating: 4.8, category: 'Coastal' },
    { id: 3, name: 'Swiss Alps, Switzerland', price: '$1,500', rating: 5.0, category: 'Mountain' },
    { id: 4, name: 'Kyoto, Japan', price: '$950', rating: 4.7, category: 'Cultural' },
    { id: 5, name: 'Paris, France', price: '$1,100', rating: 4.6, category: 'City' },
    { id: 6, name: 'Maldives', price: '$2,500', rating: 4.9, category: 'Tropical' },
    { id: 7, name: 'Rome, Italy', price: '$980', rating: 4.8, category: 'Cultural' },
    { id: 8, name: 'Phuket, Thailand', price: '$720', rating: 4.5, category: 'Coastal' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pt-20">

      {/* Header */}
      <section className="pt-32 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">Explore Destinations</h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">Find your next perfect getaway from our handpicked selection of global destinations.</p>
          </div>

          {/* Search & Filter */}
          <div className="max-w-4xl mx-auto bg-slate-50 p-4 rounded-3xl border border-slate-100 flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search destinations..." 
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {categories.map((cat) => (
                <button 
                  key={cat}
                  className={`px-6 py-3 rounded-2xl font-bold whitespace-nowrap transition-all ${
                    cat === 'All' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors">
              <Filter className="w-6 h-6 text-slate-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {destinations.map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group bg-white rounded-[32px] overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-300"
              >
                <div className="relative aspect-[4/3] bg-slate-200 overflow-hidden">
                   {/* Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400 opacity-20">
                    <MapPin className="w-16 h-16" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-blue-600 uppercase tracking-wider">
                    {dest.category}
                  </div>
                  
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-bold text-slate-900">{dest.rating}</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{dest.name}</h3>
                  <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>Global Destinations</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Starts from</p>
                      <p className="text-xl font-bold text-slate-900">{dest.price}</p>
                    </div>
                    <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-600 transition-all active:scale-95 text-sm">
                      Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="bg-white border-2 border-slate-200 px-8 py-4 rounded-2xl font-bold text-slate-600 hover:border-blue-600 hover:text-blue-600 transition-all active:scale-95">
              Load More Destinations
            </button>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
