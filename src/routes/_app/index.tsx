import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  ChevronRight, 
  Globe, 
  ShieldCheck, 
  HeadphonesIcon,
  ArrowRight
} from 'lucide-react';
import Newsletter from '../../components/sections/Newsletter';

export const Route = createFileRoute('/_app/')({
  component: IndexPage,
});

function IndexPage() {
  const destinations = [
    { id: 1, name: 'Bali, Indonesia', price: '$850', rating: 4.9, category: 'Tropical' },
    { id: 2, name: 'Santorini, Greece', price: '$1,200', rating: 4.8, category: 'Coastal' },
    { id: 3, name: 'Swiss Alps, Switzerland', price: '$1,500', rating: 5.0, category: 'Mountain' },
    { id: 4, name: 'Kyoto, Japan', price: '$950', rating: 4.7, category: 'Cultural' },
  ];

  const features = [
    {
      icon: <Globe className="w-6 h-6 text-blue-500" />,
      title: 'Global Reach',
      description: 'Explore over 500+ destinations across the globe with ease.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
      title: 'Secure Booking',
      description: 'Your safety and security are our top priorities with encrypted payments.'
    },
    {
      icon: <HeadphonesIcon className="w-6 h-6 text-purple-500" />,
      title: '24/7 Support',
      description: 'Our travel experts are always available to help you on your journey.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pt-20">

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-blue-100 rounded-full blur-3xl opacity-50 -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-indigo-100 rounded-full blur-3xl opacity-50 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
              Discover the World
            </span>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 mb-8 leading-[1.1]">
              Explore the World, One <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Adventure
              </span> at a Time
            </h1>
            <p className="max-w-2xl mx-auto text-lg lg:text-xl text-slate-600 mb-12 leading-relaxed">
              Discover hidden gems, luxury stays, and unforgettable experiences curated just for you. Your next journey starts here.
            </p>

            {/* Search Bar UI */}
            <div className="max-w-4xl mx-auto bg-white p-2 rounded-2xl shadow-2xl shadow-slate-200 border border-slate-100 flex flex-col md:flex-row items-center gap-2">
              <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-2 px-4 py-2">
                <div className="flex items-center gap-3 border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-400 uppercase">Location</p>
                    <input type="text" placeholder="Where to?" className="w-full bg-transparent outline-none font-semibold text-slate-700 placeholder:text-slate-300" />
                  </div>
                </div>
                <div className="flex items-center gap-3 border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-400 uppercase">Date</p>
                    <input type="text" placeholder="Add dates" className="w-full bg-transparent outline-none font-semibold text-slate-700 placeholder:text-slate-300" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-500" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-400 uppercase">Travelers</p>
                    <input type="text" placeholder="Add guests" className="w-full bg-transparent outline-none font-semibold text-slate-700 placeholder:text-slate-300" />
                  </div>
                </div>
              </div>
              <button className="w-full md:w-auto bg-blue-600 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Popular Destinations</h2>
              <p className="text-slate-500 max-w-xl">From tropical paradises to mountain escapes, find the perfect spot for your next holiday.</p>
            </div>
            <button className="flex items-center gap-2 text-blue-600 font-bold group">
              View All Destinations
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {destinations.map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-4 bg-slate-200">
                  {/* Image Placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                    <Globe className="w-12 h-12 opacity-20" />
                  </div>
                  
                  <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-bold text-slate-900">{dest.rating}</span>
                  </div>

                  <div className="absolute bottom-6 left-6 z-20 text-white">
                    <span className="text-xs font-semibold uppercase tracking-wider opacity-80">{dest.category}</span>
                    <h3 className="text-xl font-bold mt-1 group-hover:translate-x-1 transition-transform">{dest.name}</h3>
                  </div>
                </div>
                <div className="flex justify-between items-center px-1">
                  <div>
                    <p className="text-slate-400 text-sm font-medium">Starting from</p>
                    <p className="text-lg font-bold text-slate-900">{dest.price}<span className="text-sm font-normal text-slate-400">/person</span></p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Why Choose Travelex?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">We provide the best travel experiences with premium services and dedicated support.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
