import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Calendar, Clock, Star, Users, MapPin, ChevronRight } from 'lucide-react';
import Newsletter from '../../components/sections/Newsletter';

export const Route = createFileRoute('/_app/tours')({
  component: ToursPage,
});

function ToursPage() {
  const tours = [
    { 
      id: 1, 
      title: 'Bali Cultural Discovery', 
      duration: '7 Days', 
      groupSize: 'Max 12', 
      price: '$1,250', 
      rating: 4.9, 
      location: 'Bali, Indonesia' 
    },
    { 
      id: 2, 
      title: 'Santorini Sunset Experience', 
      duration: '4 Days', 
      groupSize: 'Max 8', 
      price: '$890', 
      rating: 4.8, 
      location: 'Santorini, Greece' 
    },
    { 
      id: 3, 
      title: 'Alpine Hiking Adventure', 
      duration: '10 Days', 
      groupSize: 'Max 15', 
      price: '$2,100', 
      rating: 5.0, 
      location: 'Swiss Alps' 
    },
    { 
      id: 4, 
      title: 'Kyoto Temple Trail', 
      duration: '6 Days', 
      groupSize: 'Max 10', 
      price: '$1,150', 
      rating: 4.7, 
      location: 'Kyoto, Japan' 
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pt-20">

      <section className="pt-32 pb-20 bg-blue-600 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">Unforgettable Tours</h1>
          <p className="text-blue-100 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Experience the world like never before with our expertly guided tours designed for immersive discovery.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {tours.map((tour, i) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[40px] overflow-hidden flex flex-col lg:flex-row shadow-xl shadow-slate-100 border border-slate-50 group"
              >
                <div className="lg:w-2/5 relative bg-slate-200 aspect-video lg:aspect-auto">
                   {/* Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400 opacity-20">
                    <MapPin className="w-20 h-20" />
                  </div>
                  <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold text-slate-900">{tour.rating}</span>
                  </div>
                </div>

                <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full text-sm font-bold">
                      <Clock className="w-4 h-4" />
                      {tour.duration}
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-500 bg-slate-100 px-4 py-1.5 rounded-full text-sm font-bold">
                      <Users className="w-4 h-4" />
                      {tour.groupSize}
                    </span>
                  </div>

                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">{tour.title}</h2>
                  <div className="flex items-center gap-2 text-slate-500 mb-8 font-medium">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    {tour.location}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-100">
                    <div>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Price per person</p>
                      <p className="text-3xl font-bold text-slate-900">{tour.price}</p>
                    </div>
                    <button className="w-full sm:w-auto bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 group/btn">
                      Book This Tour
                      <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
