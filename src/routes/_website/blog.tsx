import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, BookOpen } from 'lucide-react';
import Newsletter from '../../components/sections/Newsletter';

export const Route = createFileRoute('/_website/blog')({
  component: BlogPage,
});

function BlogPage() {
  const posts = [
    {
      id: 1,
      title: '10 Hidden Gems in Bali You Must Visit',
      excerpt: 'Beyond the crowded beaches of Kuta, Bali holds secrets that only the locals know. Discover hidden waterfalls and quiet temples.',
      author: 'Sarah Jenkins',
      date: 'May 12, 2024',
      readTime: '8 min read',
      category: 'Travel Tips'
    },
    {
      id: 2,
      title: 'How to Pack Like a Pro for a 2-Week Europe Trip',
      excerpt: 'The ultimate guide to carry-on only travel across the European continent. Learn the secrets of minimalist packing.',
      author: 'Michael Chen',
      date: 'May 10, 2024',
      readTime: '12 min read',
      category: 'Packing'
    },
    {
      id: 3,
      title: 'Sustainable Travel: How to Reduce Your Carbon Footprint',
      excerpt: 'Traveling the world doesn\'t have to cost the Earth. Learn simple steps to make your next journey more eco-friendly.',
      author: 'Emma Wilson',
      date: 'May 8, 2024',
      readTime: '6 min read',
      category: 'Eco-Travel'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pt-20">

      <section className="pt-32 pb-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">The Explorer <span className="text-blue-600">Blog</span></h1>
              <p className="text-lg text-slate-500 font-medium">Stories, tips, and guides from our global community of travel experts and adventurers.</p>
            </div>
            <div className="flex gap-4 mb-2 overflow-x-auto w-full md:w-auto pb-4 md:pb-0">
              {['All', 'Adventure', 'Tips', 'Food', 'Culture'].map((cat) => (
                <button key={cat} className="px-5 py-2 rounded-full border border-slate-200 text-sm font-bold text-slate-600 hover:bg-blue-600 hover:text-white transition-all whitespace-nowrap">
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Post */}
            <div className="lg:col-span-8">
              <div className="space-y-16">
                {posts.map((post, i) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row gap-8 group cursor-pointer"
                  >
                    <div className="md:w-1/3 aspect-[4/3] bg-slate-200 rounded-3xl overflow-hidden relative">
                       {/* Placeholder */}
                      <div className="absolute inset-0 flex items-center justify-center text-slate-400 opacity-20">
                        <BookOpen className="w-12 h-12" />
                      </div>
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                        {post.category}
                      </div>
                    </div>
                    <div className="md:w-2/3 flex flex-col justify-center">
                      <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">{post.title}</h2>
                      <p className="text-slate-500 mb-6 line-clamp-2 text-lg">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-200" />
                          <span className="text-sm font-bold text-slate-700">{post.author}</span>
                        </div>
                        <button className="flex items-center gap-2 text-blue-600 font-bold group-hover:gap-3 transition-all">
                          Read Full Article <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-12">
              <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Popular Categories</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Destinations', count: 12 },
                    { name: 'Travel Hacks', count: 8 },
                    { name: 'Food & Drink', count: 15 },
                    { name: 'Photography', count: 6 },
                  ].map((cat, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer">
                      <span className="font-medium text-slate-600 group-hover:text-blue-600 transition-colors">{cat.name}</span>
                      <span className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-xs font-bold text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">{cat.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-600 p-8 rounded-[32px] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <h3 className="text-xl font-bold mb-4 relative z-10">Get the Explorer Guide</h3>
                <p className="text-blue-100 mb-6 text-sm relative z-10">Download our free 50-page guide to world travel for 2024.</p>
                <button className="w-full bg-white text-blue-600 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors relative z-10">
                  Download Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
