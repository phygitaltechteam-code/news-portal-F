// D:\NewsPortal\news-portal-F\src\pages\Magazine.tsx

import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Download, Eye, Calendar, FileText } from 'lucide-react';
import { useState } from 'react';
import Newsletter from '@/components/sections/Newsletter';

export const Route = createFileRoute('/_website/about')({
  component: MagazinePage,
});

function MagazinePage() {
  const [selectedMagazine, setSelectedMagazine] = useState<any>(null);
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  const magazines = [
    {
      id: 1,
      title: "Digital India Revolution",
      issue: "March 2024",
      volume: "Vol. 12, Issue 3",
      coverImage: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?w=600&auto=format",
      pdfUrl: "/magazines/march-2024.pdf",
      description: "Exploring India's digital transformation journey, from UPI to AI innovations.",
      pages: 84,
      category: "Technology"
    },
    {
      id: 2,
      title: "Climate Action Now",
      issue: "February 2024",
      volume: "Vol. 12, Issue 2",
      coverImage: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=600&auto=format",
      pdfUrl: "/magazines/february-2024.pdf",
      description: "Global initiatives, green technologies, and the fight against climate change.",
      pages: 92,
      category: "Environment"
    },
    {
      id: 3,
      title: "Global Economy Outlook",
      issue: "January 2024",
      volume: "Vol. 12, Issue 1",
      coverImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format",
      pdfUrl: "/magazines/january-2024.pdf",
      description: "Economic forecasts, market trends, and investment opportunities for 2024.",
      pages: 78,
      category: "Business"
    },
    {
      id: 4,
      title: "Tech Innovations 2024",
      issue: "December 2023",
      volume: "Vol. 11, Issue 12",
      coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format",
      pdfUrl: "/magazines/december-2023.pdf",
      description: "The latest breakthroughs in AI, quantum computing, and space technology.",
      pages: 96,
      category: "Technology"
    },
    {
      id: 5,
      title: "Healthcare Revolution",
      issue: "November 2023",
      volume: "Vol. 11, Issue 11",
      coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format",
      pdfUrl: "/magazines/november-2023.pdf",
      description: "Medical breakthroughs, telemedicine, and the future of healthcare.",
      pages: 88,
      category: "Health"
    },
    {
      id: 6,
      title: "Space Exploration",
      issue: "October 2023",
      volume: "Vol. 11, Issue 10",
      coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format",
      pdfUrl: "/magazines/october-2023.pdf",
      description: "Journey to Mars, lunar missions, and the new space race.",
      pages: 82,
      category: "Science"
    }
  ];

  const handleOpenPdf = (magazine: any) => {
    setSelectedMagazine(magazine);
    setIsPdfOpen(true);
    window.open(magazine.pdfUrl, '_blank');
  };

  const handleDownloadPdf = (magazine: any) => {
    const link = document.createElement('a');
    link.href = magazine.pdfUrl;
    link.download = `${magazine.title.toLowerCase().replace(/\s+/g, '-')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary to-primary-dark text-white py-20 lg:py-24">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6">
              NewsPortal Magazine
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Digital Magazine
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              In-depth stories, exclusive interviews, and premium content delivered to your screen
            </p>
          </motion.div>
        </div>
      </section>

      {/* Magazine Grid - Rectangular Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {magazines.map((magazine, index) => (
              <motion.div
                key={magazine.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Magazine Cover - Left side */}
                  <div className="relative md:w-64 h-48 md:h-auto overflow-hidden bg-gray-200">
                    <img
                      src={magazine.coverImage}
                      alt={magazine.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&auto=format';
                      }}
                    />
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-primary text-white text-xs font-semibold rounded-md">
                        {magazine.category}
                      </span>
                    </div>
                  </div>

                  {/* Content - Right side */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{magazine.issue}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5" />
                        <span>{magazine.pages} pages</span>
                      </div>
                      <span className="text-gray-400">{magazine.volume}</span>
                    </div>
                    
                    {/* Bold Black Heading */}
                    <h2 className="text-2xl font-bold text-black mb-3 group-hover:text-primary transition-colors">
                      {magazine.title}
                    </h2>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {magazine.description}
                    </p>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleOpenPdf(magazine)}
                        className="px-4 py-2 bg-primary text-white rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-primary-dark transition-all"
                      >
                        <Eye className="w-4 h-4" />
                        Read Now
                      </button>
                      <button
                        onClick={() => handleDownloadPdf(magazine)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold text-sm flex items-center gap-2 hover:border-primary hover:text-primary transition-all"
                      >
                        <Download className="w-4 h-4" />
                        Download PDF
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}