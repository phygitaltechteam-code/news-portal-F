// D:\NewsPortal\news-portal-F\src\pages\NewsById.tsx

import React from 'react';
import { Link } from '@tanstack/react-router';
import { Share2, MessageCircle, Facebook, Send, Mail, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { useGetNewsById } from '@/lib/Auth/news/newsall';
import { Route } from '@/routes/news.$id';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

interface NewsArticle {
  id: string;
  title: string;
  author: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  categories: Array<{ id: string; name: string }>;
  content: Array<{ id: string; title: string; text: string }>;
  images: Array<{ id: string; url: string }>;
  links: Array<{ id: string; url: string; text: string }>;
}

// Social Buttons Component with working share functionality
const SocialButtons = ({ title, url }: { title?: string; url?: string }) => {
  const shareUrl = url || window.location.href;
  const shareTitle = title || document.title;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        // For mobile devices with native share
        await navigator.share({
          title: shareTitle,
          text: 'Check out this news article',
          url: shareUrl,
        });
        toast.success('Shared successfully!');
      } else {
        // Fallback for desktop - copy to clipboard
        await navigator.clipboard.writeText(shareUrl);
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Share failed:', error);
      toast.error('Failed to share');
    }
  };

  const shareToWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`, '_blank');
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400');
  };

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400');
  };

  const shareToTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, '_blank');
  };

  const shareToEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`;
  };

  return (
    <div className="flex flex-wrap items-center gap-2 py-6 border-t border-b border-gray-200 my-8">
      <button 
        onClick={handleShare}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
      >
        <Share2 size={18} className="text-gray-600" />
        <span>Share</span>
      </button>
      <button 
        onClick={shareToWhatsApp}
        className="p-2 bg-[#25d366] text-white rounded-md hover:opacity-90 transition-opacity"
        title="Share on WhatsApp"
      >
        <MessageCircle size={20} />
      </button>
      <button 
        onClick={shareToFacebook}
        className="p-2 bg-[#3b5998] text-white rounded-md hover:opacity-90 transition-opacity"
        title="Share on Facebook"
      >
        <Facebook size={20} />
      </button>
      <button 
        onClick={shareToTwitter}
        className="p-2 bg-black text-white rounded-md hover:opacity-90 transition-opacity flex items-center justify-center w-[36px] h-[36px]"
        title="Share on X (Twitter)"
      >
        <span className="font-bold text-lg">X</span>
      </button>
      <button 
        onClick={shareToTelegram}
        className="p-2 bg-[#0088cc] text-white rounded-md hover:opacity-90 transition-opacity"
        title="Share on Telegram"
      >
        <Send size={20} />
      </button>
      <button 
        onClick={shareToEmail}
        className="p-2 bg-gray-600 text-white rounded-md hover:opacity-90 transition-opacity"
        title="Share via Email"
      >
        <Mail size={20} />
      </button>
    </div>
  );
};

// Tag Component
const Tag = ({ text }: { text: string; key?: string }) => (
  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md hover:bg-gray-200 transition-colors cursor-pointer border border-gray-200">
    {text}
  </span>
);

const NewsById = () => {
  const { id } = Route.useParams();
  const { data, isLoading, isError, error } = useGetNewsById(id);

  console.log('News ID:', id);
  console.log('API Response:', data);

  // Extract news data from API response
  const news = data?.data?.news || data?.news || data?.data || null;

  // Format date in Indian format
  const formatIndianDate = (dateString: string) => {
    if (!dateString) return 'Date not available';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Generate tags from content and categories
  const generateTags = () => {
    const tags: string[] = [];
    
    // Add category names as tags
    if (news?.categories) {
      news.categories.forEach((cat: { name: string }) => {
        if (cat.name && !cat.name.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
          tags.push(cat.name);
        }
      });
    }
    
    // Extract keywords from content for tags
    if (news?.content && news.content.length > 0) {
      const firstContent = news.content[0]?.text || '';
      const words = firstContent.split(' ').slice(0, 30);
      const potentialTags = words.filter(word => word.length > 6 && !tags.includes(word));
      tags.push(...potentialTags.slice(0, 3));
    }
    
    // Add some default tags if no categories
    if (tags.length === 0) {
      tags.push('Latest News', 'Breaking', 'Trending');
    }
    
    return tags.slice(0, 8); // Limit to 8 tags
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (isError || !news) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-gray-400 text-6xl mb-4">📰</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Article Not Found</h1>
          <p className="text-gray-600 mb-6">The requested article does not exist or has been removed.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            <ChevronLeft size={18} />
            Back to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const tags = generateTags();
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = news.title;

  return (
    <div className="min-h-screen bg-white font-sans text-[#333]">
      {/* Top Header Icons/Badges */}
      <div className="max-w-4xl mx-auto px-4 pt-8 flex gap-2">
        {news.categories && news.categories.length > 0 && (
          <>
            <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded">
              {news.categories[0]?.name?.substring(0, 20) || 'News'}
            </span>
            {news.categories[1] && (
              <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded">
                {news.categories[1]?.name?.substring(0, 20) || 'Feature'}
              </span>
            )}
          </>
        )}
        {(!news.categories || news.categories.length === 0) && (
          <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded">News</span>
        )}
      </div>

      <motion.article 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4 pb-20"
      >
        {/* Header */}
        <header className="mt-4 mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 tracking-tight">
            {news.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 font-medium">
            <span>{formatIndianDate(news.publishedAt)}</span>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <span>By {news.author || 'Editor'}</span>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{new Date(news.publishedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {news.images && news.images.length > 0 && (
          <figure className="my-8">
            <img 
              src={news.images[0]?.url} 
              alt={news.title} 
              className="w-full h-auto object-cover shadow-sm rounded-lg border border-gray-200"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&auto=format';
              }}
            />
          </figure>
        )}

        <SocialButtons title={shareTitle} url={currentUrl} />

        {/* Content Sections */}
        <div className="space-y-6 leading-relaxed text-lg">
          {news.content?.map((section, index) => (
            <motion.section 
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-4"
            >
              {section.title && index > 0 && (
                <h2 className="text-2xl md:text-3xl font-bold mt-10 border-l-4 border-black pl-4">
                  {section.title}
                </h2>
              )}
              <p className="text-gray-800 leading-relaxed">
                {section.text?.replace(/&nbsp;/g, ' ')}
              </p>
            </motion.section>
          ))}
        </div>

        {/* Additional Images Gallery */}
        {news.images && news.images.length > 1 && (
          <div className="my-12">
            <div className="grid grid-cols-2 gap-4">
              {news.images.slice(1, 3).map((image, idx) => (
                <img
                  key={image.id}
                  src={image.url}
                  alt={`Image ${idx + 2}`}
                  className="w-full h-auto object-cover rounded-lg shadow-sm border border-gray-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format';
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Tags Section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
            <span className="bg-black text-white text-[11px] font-bold px-2 py-1 uppercase tracking-wider rounded">TAGS</span>
            {tags.map((tag, idx) => (
              <Tag key={idx} text={tag} />
            ))}
          </div>
        </div>

        <SocialButtons title={shareTitle} url={currentUrl} />

        {/* External Links */}
        {news.links && news.links.length > 0 && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-lg font-bold mb-3">Related Links</h3>
            <div className="space-y-2">
              {news.links.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline block text-sm"
                >
                  🔗 {link.text || link.url}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Previous/Next Article Navigation */}
        <div className="grid grid-cols-2 gap-4 mt-12 pt-8 border-t border-gray-200 text-sm">
          <div className="group cursor-pointer">
            <p className="text-gray-400 font-medium mb-1 uppercase tracking-tight text-[10px]">Previous article</p>
            <h4 className="font-bold flex items-start gap-1 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug lg:max-w-[80%]">
              <ChevronLeft size={16} className="flex-shrink-0 mt-0.5" />
              Previous News Article
            </h4>
          </div>
          <div className="text-right group cursor-pointer lg:flex lg:flex-col lg:items-end">
            <p className="text-gray-400 font-medium mb-1 uppercase tracking-tight text-[10px]">Next article</p>
            <h4 className="font-bold flex flex-row-reverse items-start gap-1 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug lg:max-w-[80%]">
              Next News Article
              <ChevronRight size={16} className="flex-shrink-0 mt-0.5" />
            </h4>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors border border-gray-800"
          >
            <ChevronLeft size={18} />
            Back to Homepage
          </Link>
        </div>
      </motion.article>
    </div>
  );
};

export default NewsById;