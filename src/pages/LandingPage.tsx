// D:\NewsPortal\news-portal-F\src\pages\LandingPage.tsx

import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { Calendar, Clock, Eye, Share2, Bookmark, ChevronRight } from 'lucide-react';
import { useGetNewsById, useGetNewsInfo } from '@/lib/Auth/news/newsall';

interface NewsArticle {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  category: string;
  readTime: string;
  views: number;
}

function LandingPage() {
  const getnews=useGetNewsInfo();
  const getnewsbyid=useGetNewsById('');
  // Static news data
  const featuredNews: NewsArticle[] = [
    {
      id: 1,
      title: "Breaking: Major Technological Breakthrough in AI Research",
      description: "Scientists have achieved a significant milestone in artificial intelligence, developing a new model that can understand context better than ever before. This breakthrough could revolutionize how we interact with technology.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format",
      date: "2024-03-15",
      time: "10:30 AM",
      category: "Technology",
      readTime: "5 min read",
      views: 12450
    },
    {
      id: 2,
      title: "Global Climate Summit Reaches Historic Agreement",
      description: "World leaders have come together to sign an unprecedented climate accord, committing to reduce carbon emissions by 50% by 2030. Environmental experts call it a turning point in the fight against climate change.",
      image: "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=800&auto=format",
      date: "2024-03-14",
      time: "02:15 PM",
      category: "Environment",
      readTime: "4 min read",
      views: 8920
    },
    {
      id: 3,
      title: "Stock Markets Hit All-Time High Amid Economic Recovery",
      description: "Global markets have surged to record levels as investor confidence grows following positive economic indicators. Analysts predict continued growth through the next quarter.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format",
      date: "2024-03-14",
      time: "04:45 PM",
      category: "Business",
      readTime: "3 min read",
      views: 15670
    },
    {
      id: 4,
      title: "Revolutionary Electric Vehicle Battery Announced",
      description: "A new battery technology promises 1000km range on a single charge, potentially eliminating range anxiety for EV owners. The breakthrough could accelerate the transition to electric vehicles.",
      image: "https://images.unsplash.com/photo-1593941707882-5a14953fb80c?w=800&auto=format",
      date: "2024-03-13",
      time: "11:20 AM",
      category: "Technology",
      readTime: "6 min read",
      views: 11230
    },
    {
      id: 5,
      title: "Healthcare Innovation: New Treatment Shows Promise",
      description: "A groundbreaking medical study reveals promising results for a new treatment approach that could change how we treat chronic diseases. Patient trials have shown remarkable outcomes.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format",
      date: "2024-03-13",
      time: "09:00 AM",
      category: "Health",
      readTime: "7 min read",
      views: 7430
    },
    {
      id: 6,
      title: "Space Exploration: New Exoplanet Discovered",
      description: "Astronomers have discovered a potentially habitable exoplanet just 100 light-years away. The planet shows signs of having liquid water and a stable atmosphere.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format",
      date: "2024-03-12",
      time: "08:30 PM",
      category: "Science",
      readTime: "4 min read",
      views: 6340
    },
    {
      id: 7,
      title: "Champions League: Historic Comeback Stuns Fans Worldwide",
      description: "In an unprecedented turn of events, underdogs secure victory against reigning champions in a thrilling match that will go down in football history.",
      image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&auto=format",
      date: "2024-03-12",
      time: "11:45 PM",
      category: "Sports",
      readTime: "6 min read",
      views: 28940
    },
    {
      id: 8,
      title: "New Breakthrough in Quantum Computing Announced",
      description: "Tech giant reveals quantum processor that could solve complex problems in seconds that would take traditional computers thousands of years.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format",
      date: "2024-03-11",
      time: "03:20 PM",
      category: "Technology",
      readTime: "8 min read",
      views: 15670
    },
    {
      id: 9,
      title: "Entertainment: Major Streaming Platform Announces Price Hike",
      description: "Popular streaming service increases subscription prices citing rising content production costs, sparking debate among users about value for money.",
      image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&auto=format",
      date: "2024-03-11",
      time: "01:15 PM",
      category: "Entertainment",
      readTime: "3 min read",
      views: 9820
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredNews.map((news, index) => (
            <motion.article
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group cursor-pointer"
            >
              {/* Image Section */}
              <div className="relative h-56 overflow-hidden bg-gray-200">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format';
                  }}
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-lg shadow-md">
                    {news.category}
                  </span>
                </div>
                {/* Bookmark Button */}
                <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-white">
                  <Bookmark className="h-4 w-4" />
                </button>
              </div>

              {/* Content Section */}
              <div className="p-6">
                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-primary transition-colors">
                  {news.title}
                </h2>

                {/* Description */}
                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {news.description}
                </p>

                {/* Date, Time & Metadata */}
                <div className="flex flex-wrap items-center justify-between pt-4 border-t border-gray-100 gap-3">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      <span>{news.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      <span>{news.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {/* Read Time */}
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                      {news.readTime}
                    </span>
                    
                    {/* Views */}
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Eye className="h-3.5 w-3.5" />
                      <span>{news.views.toLocaleString()}</span>
                    </div>

                    {/* Share Button */}
                    <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                      <Share2 className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                </div>

                {/* Read More Link */}
                <Link
                  to="/news/$id"
                  params={{ id: news.id.toString() }}
                  className="mt-4 text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all duration-300 inline-flex"
                >
                  Read More 
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-12">
          <button className="px-8 py-3.5 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-all duration-300 hover:scale-105 transform shadow-md hover:shadow-xl">
            Load More News
          </button>
        </div>
      </div>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-primary to-primary-dark rounded-3xl px-8 py-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-primary-100 text-lg mb-8">Get the latest news and updates delivered directly to your inbox</p>
            
            <form className="flex flex-col sm:flex-row gap-3 p-2 bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-full">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 bg-transparent px-6 py-4 outline-none text-white placeholder:text-primary-200 font-medium"
                required
              />
              <button type="submit" className="bg-white text-primary px-8 py-4 rounded-xl sm:rounded-full font-bold hover:bg-gray-100 transition-all duration-300 active:scale-95">
                Subscribe Now
              </button>
            </form>
            <p className="text-primary-200 text-sm mt-4">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;