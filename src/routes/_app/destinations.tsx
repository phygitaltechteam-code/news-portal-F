// D:\NewsPortal\news-portal-F\src\pages\AboutUs.tsx

import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Newspaper, Users, Globe, Award, Heart, Clock, Shield, Zap, ChevronRight } from 'lucide-react';
import Newsletter from '@/components/sections/Newsletter';

export const Route = createFileRoute('/_app/destinations')({
  component: AboutUsPage,
});

function AboutUsPage() {
  const stats = [
    { value: '500+', label: 'News Articles', icon: Newspaper },
    { value: '50+', label: 'Expert Writers', icon: Users },
    { value: '120+', label: 'Countries Covered', icon: Globe },
    { value: '25+', label: 'Awards Won', icon: Award },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Truth',
      description: 'We are committed to delivering accurate, unbiased news that matters to our readers.',
    },
    {
      icon: Clock,
      title: '24/7 Coverage',
      description: 'Round-the-clock news coverage to keep you informed anytime, anywhere.',
    },
    {
      icon: Shield,
      title: 'Fact-Checked',
      description: 'Every story goes through rigorous fact-checking before publication.',
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Instant breaking news alerts and live updates on developing stories.',
    },
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Editor-in-Chief',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format',
    },
    {
      name: 'Michael Chen',
      role: 'Senior Technology Reporter',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Political Correspondent',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format',
    },
    {
      name: 'David Kim',
      role: 'Sports Journalist',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-dark text-white py-24 lg:py-32">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6">
              About NewsPortal
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Your Trusted Source for
              <span className="block text-secondary-300">Breaking News & Stories</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Delivering accurate, unbiased, and timely news from around the world since 2020
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Mission</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
                Informing the World, One Story at a Time
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                At NewsPortal, we believe that everyone deserves access to reliable, 
                transparent, and comprehensive news coverage. Our mission is to empower 
                readers with accurate information that helps them understand the world better.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We're committed to journalistic excellence, ethical reporting, and delivering 
                stories that matter - from local communities to global affairs.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format" 
                  alt="Newsroom"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Core Values</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              What Drives Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our principles guide everything we do, from reporting to reader engagement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group text-center p-6 rounded-2xl bg-gray-50 hover:bg-primary-50 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-100 rounded-xl mb-4 group-hover:bg-primary transition-colors duration-300">
                  <value.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Meet Our Team</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Behind the News
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dedicated journalists and editors working tirelessly to bring you the truth
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary text-sm font-medium">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our News Community</h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for daily news updates and exclusive content
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-6 py-3 rounded-full text-gray-900 outline-none focus:ring-2 focus:ring-secondary"
              />
              <button className="px-8 py-3 bg-secondary text-white rounded-full font-bold hover:bg-secondary-dark transition-colors">
                Subscribe Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}