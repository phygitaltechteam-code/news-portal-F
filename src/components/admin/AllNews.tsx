import React, { useState } from 'react';
import { GenericTable, Column } from '../Forms/Table/GenericTable';
import { MdDelete, MdEdit, MdVisibility, MdCheckCircle, MdCancel } from 'react-icons/md';
import toast from 'react-hot-toast';

interface NewsItem {
  id: string;
  title: string;
  categoryIds: string[];
  categories?: string[];
  images: { url: string }[];
  metaDescription?: string;
  featured: boolean;
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
  sections?: { subtitle: string; description: string }[];
  links?: { title: string; url: string }[];
}

// Mock categories for display
const categories = [
  { id: '1', name: 'Technology', color: 'bg-meta-5/10 text-meta-5', icon: '💻' },
  { id: '2', name: 'Sports', color: 'bg-meta-3/10 text-meta-3', icon: '⚽' },
  { id: '3', name: 'Politics', color: 'bg-meta-1/10 text-meta-1', icon: '🏛️' },
  { id: '4', name: 'Entertainment', color: 'bg-meta-6/10 text-meta-6', icon: '🎬' },
  { id: '5', name: 'Business', color: 'bg-meta-8/10 text-meta-8', icon: '📈' },
  { id: '6', name: 'Health', color: 'bg-meta-3/10 text-meta-3', icon: '🏥' },
  { id: '7', name: 'Science', color: 'bg-meta-5/10 text-meta-5', icon: '🔬' },
];

// Dummy news data (will be replaced with API data)
let dummyNews: NewsItem[] = [
  {
    id: '1',
    title: 'The Future of Artificial Intelligence in 2024',
    categoryIds: ['1', '7'],
    images: [{ url: 'https://via.placeholder.com/300x200?text=AI+News' }],
    metaDescription: 'Exploring the latest advancements in AI technology and its impact on society.',
    featured: true,
    status: 'published',
    createdAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: '2',
    title: 'Champions League Final: A Historic Match',
    categoryIds: ['2'],
    images: [{ url: 'https://via.placeholder.com/300x200?text=Sports+News' }],
    metaDescription: 'Recap of the thrilling Champions League final match.',
    featured: false,
    status: 'published',
    createdAt: new Date('2024-01-20').toISOString(),
  },
  {
    id: '3',
    title: 'Global Economic Summit 2024',
    categoryIds: ['5'],
    images: [{ url: 'https://via.placeholder.com/300x200?text=Business+News' }],
    metaDescription: 'World leaders gather to discuss global economic challenges.',
    featured: true,
    status: 'published',
    createdAt: new Date('2024-01-25').toISOString(),
  },
  {
    id: '4',
    title: 'New Breakthrough in Cancer Research',
    categoryIds: ['6'],
    images: [{ url: 'https://via.placeholder.com/300x200?text=Health+News' }],
    metaDescription: 'Scientists discover new treatment for cancer patients.',
    featured: false,
    status: 'draft',
    createdAt: new Date('2024-01-28').toISOString(),
  },
];

const AllNews = () => {
  const [news, setNews] = useState<NewsItem[]>(dummyNews);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const getCategoryNames = (categoryIds: string[]) => {
    return categoryIds
      .map(id => categories.find(c => c.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  const getCategoryBadges = (categoryIds: string[]) => {
    return categoryIds.map(id => {
      const category = categories.find(c => c.id === id);
      if (!category) return null;
      return (
        <span
          key={id}
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${category.color}`}
        >
          {category.icon} {category.name}
        </span>
      );
    }).filter(Boolean);
  };

  const getCategoryBadgesString = (categoryIds: string[]) => {
    return categoryIds
      .map(id => {
        const category = categories.find(c => c.id === id);
        return category ? `${category.icon} ${category.name}` : '';
      })
      .filter(Boolean)
      .join(', ');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700"><MdCheckCircle size={12} /> Published</span>;
      case 'draft':
        return <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">📝 Draft</span>;
      case 'archived':
        return <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700"><MdCancel size={12} /> Archived</span>;
      default:
        return null;
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this news?')) {
      setNews(news.filter(item => item.id !== id));
      toast.success('News deleted successfully');
    }
  };

  const handleEdit = (item: NewsItem) => {
    toast.success(`Editing: ${item.title}`);
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

  const filteredNews = selectedStatus === 'all' 
    ? news 
    : news.filter(item => item.status === selectedStatus);

  // FIXED: Use 'render' for JSX, 'accessor' for primitive values
  const columns: Column<NewsItem>[] = [
    {
      header: 'Image',
      accessor: (item: NewsItem) => item.images[0]?.url || '', // Return string URL
      render: (item: NewsItem) => ( // Use render for JSX
        <img 
          src={item.images[0]?.url || 'https://via.placeholder.com/50x50'} 
          alt={item.title}
          className="h-12 w-12 rounded-lg object-cover"
        />
      ),
      className: 'w-20',
    },
    {
      header: 'Title',
      accessor: 'title', // String accessor
      className: 'font-medium min-w-[200px]',
      sortable: true,
    },
    {
      header: 'Categories',
      accessor: (item: NewsItem) => getCategoryBadgesString(item.categoryIds), // Return string for accessor
      render: (item: NewsItem) => ( // Use render for JSX badges
        <div className="flex flex-wrap gap-1">
          {getCategoryBadges(item.categoryIds)}
        </div>
      ),
      className: 'min-w-[150px]',
    },
    {
      header: 'Featured',
      accessor: (item: NewsItem) => item.featured ? 'Featured' : '', // Return string for accessor
      render: (item: NewsItem) => ( // Use render for JSX
        item.featured ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            ⭐ Featured
          </span>
        ) : (
          <span className="text-xs text-gray-400">—</span>
        )
      ),
      className: 'w-24',
    },
    {
      header: 'Status',
      accessor: (item: NewsItem) => item.status, // Return string for accessor
      render: (item: NewsItem) => getStatusBadge(item.status), // Use render for JSX
      className: 'w-24',
      sortable: true,
    },
    {
      header: 'Created',
      accessor: (item: NewsItem) => new Date(item.createdAt).toLocaleDateString(), // Return string
      className: 'w-32',
      sortable: true,
    },
  ];

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
                onClick={() => window.location.href = '/admin/news/create'}
                className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white shadow-md transition-all hover:bg-blue-700"
              >
                + Create New News
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
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
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
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
        </div>

        {/* News Table */}
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
              {selectedNews.images[0]?.url && (
                <img
                  src={selectedNews.images[0].url}
                  alt={selectedNews.title}
                  className="mb-6 h-96 w-full rounded-xl object-cover"
                />
              )}
              
              {/* Categories */}
              <div className="mb-4 flex flex-wrap gap-2">
                {getCategoryBadges(selectedNews.categoryIds)}
                {selectedNews.featured && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
                    ⭐ Featured
                  </span>
                )}
                {getStatusBadge(selectedNews.status)}
              </div>
              
              {/* Title */}
              <h1 className="mb-4 text-3xl font-bold text-black">{selectedNews.title}</h1>
              
              {/* Meta Description */}
              {selectedNews.metaDescription && (
                <p className="mb-6 text-gray-600 italic">{selectedNews.metaDescription}</p>
              )}
              
              {/* Sections */}
              {selectedNews.sections && selectedNews.sections.map((section, idx) => (
                <div key={idx} className="mb-6">
                  {section.subtitle && (
                    <h2 className="mb-3 text-xl font-semibold text-black border-l-4 border-blue-600 pl-3">
                      {section.subtitle}
                    </h2>
                  )}
                  {section.description && (
                    <div 
                      className="text-gray-600 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: section.description }}
                    />
                  )}
                </div>
              ))}
              
              {/* Links */}
              {selectedNews.links && selectedNews.links.filter(l => l.title && l.url).length > 0 && (
                <div className="mt-6 rounded-xl bg-gray-50 p-6">
                  <h3 className="mb-3 font-semibold text-black">Related Links</h3>
                  <ul className="space-y-2">
                    {selectedNews.links.map((link, idx) => (
                      link.title && link.url && (
                        <li key={idx}>
                          <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            🔗 {link.title}
                          </a>
                        </li>
                      )
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Metadata */}
              <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4 text-sm text-gray-600">
                <span>Created: {new Date(selectedNews.createdAt).toLocaleString()}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusChange(selectedNews.id, 'published')}
                    className="rounded-lg bg-green-100 px-3 py-1 text-xs font-medium text-green-700 hover:bg-green-200"
                  >
                    Publish
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedNews.id, 'draft')}
                    className="rounded-lg bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700 hover:bg-yellow-200"
                  >
                    Draft
                  </button>
                  <button
                    onClick={() => handleToggleFeatured(selectedNews.id)}
                    className="rounded-lg bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700 hover:bg-orange-200"
                  >
                    {selectedNews.featured ? 'Remove Featured' : 'Make Featured'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllNews;