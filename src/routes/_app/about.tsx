import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Globe, Users, Award, ShieldCheck, Heart, Zap } from 'lucide-react';
import Newsletter from '../../components/sections/Newsletter';

export const Route = createFileRoute('/_app/about')({
  component: AboutPage,
});

function AboutPage() {
  const stats = [
    { label: 'Destinations', value: '500+' },
    { label: 'Happy Travelers', value: '50K+' },
    { label: 'Travel Experts', value: '100+' },
    { label: 'Countries', value: '80+' },
  ];

  const values = [
    {
      icon: <Heart className="w-6 h-6 text-red-500" />,
      title: 'Passion for Travel',
      description: 'We believe in the power of exploration and its ability to transform lives.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
      title: 'Trust & Safety',
      description: 'Your security is our priority, from booking to your safe return home.'
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: 'Local Expertise',
      description: 'We work with local guides to provide authentic and unique experiences.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pt-20">

      {/* Hero Section */}
      <section className="pt-40 pb-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
                  Our Story
                </span>
                <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight">
                  Redefining the Way You <span className="text-blue-600">See the World</span>
                </h1>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Founded in 2020, Travelex began with a simple mission: to make world-class travel experiences accessible, authentic, and unforgettable. 
                </p>
                <div className="grid grid-cols-2 gap-8">
                  {stats.map((stat, i) => (
                    <div key={i}>
                      <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                      <p className="text-slate-500 font-medium">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="aspect-square bg-slate-100 rounded-[40px] relative overflow-hidden">
                 {/* Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 opacity-20">
                  <Globe className="w-40 h-40" />
                </div>
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl border border-slate-50 hidden md:block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Top Rated Agency</p>
                    <p className="text-sm text-slate-500">2023 Choice Awards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">These principles guide everything we do, from choosing partners to supporting our travelers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-10 rounded-[32px] shadow-sm border border-slate-100"
              >
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-8">
                  {val.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{val.title}</h3>
                <p className="text-slate-600 leading-relaxed">{val.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
