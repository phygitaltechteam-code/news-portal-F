// AllNews.tsx - Updated with TanStack Router's useNavigate

import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router'; // TanStack Router import
import { GenericTable, Column } from '../Forms/Table/GenericTable';
import { MdDelete, MdEdit, MdVisibility, MdCheckCircle, MdCancel } from 'react-icons/md';
import toast from 'react-hot-toast';
import {useGetNewsAdmin} from './newsApi';
import { useDeleteNews } from './newsApi';



interface NewsItem {
  id: string;
  _id?: string;
  title: string;
  categories?: string[] | { _id: string; name: string }[];
  images?: string[] | { url: string }[];
  metaDescription?: string;
  featured?: boolean;
  status?: 'published' | 'draft' | 'archived';
  createdAt: string;
  publishedAt?: string;
  content?: { title: string; text: string }[];
  links?: { url: string; text: string }[];
  author?: string;
}

const AllNews = () => {
  const navigate = useNavigate(); // Initialize TanStack Router navigate
  const { data: apiResponse, isLoading, error, refetch } = useGetNewsAdmin();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [news, setNews] = useState<NewsItem[]>([]);

  // Process API data when it arrives
  useEffect(() => {
    if (apiResponse) {
      console.log("API Response:", apiResponse);
      
      let newsData: NewsItem[] = [];
      
      // Extract news array from different possible response structures
      if (Array.isArray(apiResponse)) {
        newsData = apiResponse;
      } else if (apiResponse.data && Array.isArray(apiResponse.data)) {
        newsData = apiResponse.data;
      } else if (apiResponse.news && Array.isArray(apiResponse.news)) {
        newsData = apiResponse.news;
      } else if (apiResponse.results && Array.isArray(apiResponse.results)) {
        newsData = apiResponse.results;
      } else {
        newsData = [];
      }
      
      // Transform API data to match your component structure
      const transformedNews: NewsItem[] = newsData.map((item: any) => ({
        id: item._id || item.id,
        _id: item._id || item.id,
        title: item.title || 'Untitled',
        categories: item.categories || [],
        images: item.images || [],
        metaDescription: item.metaDescription || item.description,
        featured: item.featured || false,
        status: item.status || 'draft',
        createdAt: item.publishedAt || item.createdAt || new Date().toISOString(),
        publishedAt: item.publishedAt,
        content: item.content || [],
        links: item.links || [],
        author: item.author,
      }));
      
      setNews(transformedNews);
    }
  }, [apiResponse]);

  const getCategoryBadges = (categories: string[] | any[]) => {
    if (!categories || categories.length === 0) {
      return <span className="text-xs text-gray-400">No categories</span>;
    }
    
    return categories.map((cat, idx) => {
      const categoryName = typeof cat === 'string' ? cat : cat.name;
      const colors = [
        'bg-blue-100 text-blue-700',
        'bg-green-100 text-green-700',
        'bg-purple-100 text-purple-700',
        'bg-orange-100 text-orange-700',
        'bg-pink-100 text-pink-700',
        'bg-indigo-100 text-indigo-700',
      ];
      const color = colors[idx % colors.length];
      
      return (
        <span
          key={idx}
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${color}`}
        >
          {categoryName}
        </span>
      );
    });
  };

  const getCategoryNamesString = (categories: string[] | any[]) => {
    if (!categories || categories.length === 0) return '';
    return categories.map(cat => typeof cat === 'string' ? cat : cat.name).join(', ');
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'published':
        return <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700"><MdCheckCircle size={12} /> Published</span>;
      case 'draft':
        return <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">📝 Draft</span>;
      case 'archived':
        return <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700"><MdCancel size={12} /> Archived</span>;
      default:
        return <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">Draft</span>;
    }
  };

  const getFirstImage = (images?: string[] | { url: string }[]) => {
    if (!images || images.length === 0) return null;
    if (typeof images[0] === 'string') return images[0];
    return (images[0] as { url: string }).url;
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this news?')) {
      setNews(news.filter(item => item.id !== id));
      toast.success('News deleted successfully');
      // You can also call an API delete endpoint here
    }
  };

  const handleEdit = (item: NewsItem) => {
    // Navigate to edit page with TanStack Router
    navigate({
      to: '/admin/news/edit/$id',
      params: { id: item.id }
    });
  };

  const handleView = (item: NewsItem) => {
    setSelectedNews(item);
    setShowViewModal(true);
  };

  const handleStatusChange = (id: string, newStatus: 'published' | 'draft' | 'archived') => {
    setNews(news.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
    toast.success(`News ${newStatus} successfully`);
  };

  const handleToggleFeatured = (id: string) => {
    setNews(news.map(item => 
      item.id === id ? { ...item, featured: !item.featured } : item
    ));
    toast.success(`Featured status updated`);
  };

  const handleCreateNew = () => {
    // Navigate to create page with TanStack Router
    navigate({
      to: '/admin/news/create'
    });
  };

  const filteredNews = selectedStatus === 'all' 
    ? news 
    : news.filter(item => item.status === selectedStatus);

  const columns: Column<NewsItem>[] = [
    {
      header: 'Created',
      accessor: (item: NewsItem) => new Date(item.createdAt).toLocaleDateString(),
      className: 'w-32',
      sortable: true,
    },
    {
      header: 'Title',
      accessor: 'title',
      className: 'font-medium min-w-[200px]',
      sortable: true,
    },
    // {
    //   header: 'Categories',
    //   accessor: (item: NewsItem) => getCategoryNamesString(item.categories),
    //   render: (item: NewsItem) => (
    //     <div className="flex flex-wrap gap-1">
    //       {getCategoryBadges(item.categories || [])}
    //     </div>
    //   ),
    //   className: 'min-w-[150px]',
    // },
    {
      header: 'Author',
      accessor: (item: NewsItem) => item.author || 'Unknown',
      className: 'w-32',
    },
    // {
    //   header: 'Featured',
    //   accessor: (item: NewsItem) => item.featured ? 'Featured' : '',
    //   render: (item: NewsItem) => (
    //     item.featured ? (
    //       <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
    //         ⭐ Featured
    //       </span>
    //     ) : (
    //       <span className="text-xs text-gray-400">—</span>
    //     )
    //   ),
    //   className: 'w-24',
    // },
    // {
    //   header: 'Status',
    //   accessor: (item: NewsItem) => item.status || 'draft',
    //   render: (item: NewsItem) => getStatusBadge(item.status),
    //   className: 'w-24',
    //   sortable: true,
    // },
    {
      header: 'Image',
      accessor: (item: NewsItem) => getFirstImage(item.images) || '',
      render: (item: NewsItem) => (
        <img 
          src={getFirstImage(item.images) || 'https://via.placeholder.com/50x50?text=No+Image'} 
          alt={item.title}
          className="h-12 w-12 rounded-lg object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/50x50?text=No+Image';
          }}
        />
      ),
      className: 'w-20',
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto"></div>
              <p className="text-gray-600">Loading news...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-lg bg-red-50 p-4 text-red-600">
            <p>Error loading news: {error.message}</p>
            <button 
              onClick={() => refetch()} 
              className="mt-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-black">All News</h1>
              <p className="mt-1 text-gray-600">Manage and organize your news articles</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCreateNew}
                className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white shadow-md transition-all hover:bg-blue-700"
              >
                + Create New News
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {/* <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl bg-white p-5 shadow-md">
            <p className="text-sm text-gray-600">Total Articles</p>
            <p className="text-2xl font-bold text-black">{news.length}</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-md">
            <p className="text-sm text-gray-600">Published</p>
            <p className="text-2xl font-bold text-green-600">{news.filter(n => n.status === 'published').length}</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-md">
            <p className="text-sm text-gray-600">Drafts</p>
            <p className="text-2xl font-bold text-yellow-600">{news.filter(n => n.status === 'draft').length}</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-md">
            <p className="text-sm text-gray-600">Featured</p>
            <p className="text-2xl font-bold text-orange-600">{news.filter(n => n.featured).length}</p>
          </div>
        </div> */}

        {/* Filter Tabs */}
        {/* <div className="mb-6 flex flex-wrap gap-2">
          {['all', 'published', 'draft', 'archived'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                selectedStatus === status
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div> */}

        {/* News Table */}
        {filteredNews.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-md">
            <p className="text-gray-500">No news articles found.</p>
            <button
              onClick={handleCreateNew}
              className="mt-4 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white shadow-md transition-all hover:bg-blue-700"
            >
              Create Your First News Article
            </button>
          </div>
        ) : (
          <GenericTable
            data={filteredNews}
            columns={columns}
            itemsPerPage={10}
            searchAble={true}
            title="News Articles"
            action={true}
            onEdit={handleEdit}
            onDelete={(item: NewsItem) => handleDelete(item.id)}
            onView={handleView}
            paginationOff={false}
          />
        )}
      </div>

      {/* View News Modal */}
      {showViewModal && selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white p-6">
              <h2 className="text-xl font-bold text-black">News Preview</h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-black"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              {/* Featured Image */}
              {getFirstImage(selectedNews.images) && (
                <img
                  src={getFirstImage(selectedNews.images)}
                  alt={selectedNews.title}
                  className="mb-6 h-96 w-full rounded-xl object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Image+Not+Found';
                  }}
                />
              )}
              
              {/* Categories */}
              <div className="mb-4 flex flex-wrap gap-2">
                {getCategoryBadges(selectedNews.categories || [])}
                {selectedNews.featured && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
                    ⭐ Featured
                  </span>
                )}
                {getStatusBadge(selectedNews.status)}
              </div>
              
              {/* Title */}
              <h1 className="mb-4 text-3xl font-bold text-black">{selectedNews.title}</h1>
              
              {/* Author and Date */}
              <div className="mb-6 flex flex-wrap gap-4 text-sm text-gray-600 border-b border-gray-200 pb-4">
                {selectedNews.author && <span>By {selectedNews.author}</span>}
                {selectedNews.publishedAt && (
                  <span>Published: {new Date(selectedNews.publishedAt).toLocaleDateString()}</span>
                )}
                <span>Created: {new Date(selectedNews.createdAt).toLocaleDateString()}</span>
              </div>
              
              {/* Meta Description */}
              {selectedNews.metaDescription && (
                <p className="mb-6 text-gray-600 italic">{selectedNews.metaDescription}</p>
              )}
              
              {/* Content Sections */}
              {selectedNews.content && selectedNews.content.map((section, idx) => (
                <div key={idx} className="mb-6">
                  {section.title && (
                    <h2 className="mb-3 text-xl font-semibold text-black border-l-4 border-blue-600 pl-3">
                      {section.title}
                    </h2>
                  )}
                  {section.text && (
                    <div 
                      className="text-gray-600 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: section.text }}
                    />
                  )}
                </div>
              ))}
              
              {/* Links */}
              {selectedNews.links && selectedNews.links.filter(l => l.url).length > 0 && (
                <div className="mt-6 rounded-xl bg-gray-50 p-6">
                  <h3 className="mb-3 font-semibold text-black">Related Links</h3>
                  <ul className="space-y-2">
                    {selectedNews.links.map((link, idx) => (
                      link.url && (
                        <li key={idx}>
                          <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            🔗 {link.text || link.url}
                          </a>
                        </li>
                      )
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      handleStatusChange(selectedNews.id, 'published');
                      setShowViewModal(false);
                    }}
                    className="rounded-lg bg-green-100 px-3 py-1 text-xs font-medium text-green-700 hover:bg-green-200"
                  >
                    Publish
                  </button>
                  <button
                    onClick={() => {
                      handleStatusChange(selectedNews.id, 'draft');
                      setShowViewModal(false);
                    }}
                    className="rounded-lg bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700 hover:bg-yellow-200"
                  >
                    Draft
                  </button>
                  <button
                    onClick={() => {
                      handleToggleFeatured(selectedNews.id);
                      setShowViewModal(false);
                    }}
                    className="rounded-lg bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700 hover:bg-orange-200"
                  >
                    {selectedNews.featured ? 'Remove Featured' : 'Make Featured'}
                  </button>
                </div>
                <button
                  onClick={() => handleEdit(selectedNews)}
                  className="rounded-lg bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200"
                >
                  Edit Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllNews;