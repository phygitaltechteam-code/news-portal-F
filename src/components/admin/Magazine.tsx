import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  MdAdd,
  MdDelete,
  MdEdit,
  MdImage,
  MdTitle,
  MdDescription,
  MdCategory,
  MdStar,
  MdStarBorder,
  MdCloudUpload,
  MdPreview,
  MdSave,
  MdClose,
  MdDownload,
  MdVisibility,
  MdLock,
  MdLockOpen,
  MdSearch,
  MdFilterList,
  MdChevronLeft,
  MdChevronRight,
} from 'react-icons/md';

// Magazine schema
const magazineSchema = z.object({
  name: z.string().min(1, 'Magazine name is required'),
  coverImage: z.string().url('Must be a valid image URL').min(1, 'Cover image is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Category is required'),
  type: z.enum(['free', 'premium'], {
    required_error: 'Please select magazine type',
  }),
  content: z.string().min(20, 'Content must be at least 20 characters'),
  issueNumber: z.string().optional(),
  publishDate: z.string().optional(),
  pages: z.coerce.number().min(1, 'Pages must be at least 1').optional(),
});

type MagazineFormData = z.infer<typeof magazineSchema>;

// Categories for magazines
const categories = [
  { id: 'fashion', name: 'Fashion', color: 'bg-meta-6/10 text-meta-6', icon: '👗' },
  { id: 'lifestyle', name: 'Lifestyle', color: 'bg-meta-3/10 text-meta-3', icon: '🌟' },
  { id: 'business', name: 'Business', color: 'bg-meta-5/10 text-meta-5', icon: '💼' },
  { id: 'technology', name: 'Technology', color: 'bg-meta-5/10 text-meta-5', icon: '💻' },
  { id: 'health', name: 'Health & Wellness', color: 'bg-meta-3/10 text-meta-3', icon: '🏥' },
  { id: 'entertainment', name: 'Entertainment', color: 'bg-meta-6/10 text-meta-6', icon: '🎬' },
  { id: 'sports', name: 'Sports', color: 'bg-meta-1/10 text-meta-1', icon: '⚽' },
  { id: 'travel', name: 'Travel', color: 'bg-meta-8/10 text-meta-8', icon: '✈️' },
  { id: 'food', name: 'Food & Cooking', color: 'bg-meta-6/10 text-meta-6', icon: '🍳' },
  { id: 'art', name: 'Art & Design', color: 'bg-meta-5/10 text-meta-5', icon: '🎨' },
];

// Mock magazines data
const mockMagazines = [
  {
    id: '1',
    name: 'Vogue India - January 2024',
    coverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400',
    description: 'The latest in fashion, beauty, and culture from around the world.',
    category: 'fashion',
    type: 'premium',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    issueNumber: 'Vol. 12, Issue 1',
    publishDate: '2024-01-15',
    pages: 124,
    views: 2840,
    downloads: 1234,
  },
  {
    id: '2',
    name: 'Tech Today - February 2024',
    coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400',
    description: 'Exploring the future of AI, blockchain, and quantum computing.',
    category: 'technology',
    type: 'free',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    issueNumber: 'Issue 45',
    publishDate: '2024-02-01',
    pages: 88,
    views: 5120,
    downloads: 3421,
  },
  {
    id: '3',
    name: 'Healthy Living - Spring 2024',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
    description: 'Tips for a healthier lifestyle, nutrition guides, and wellness trends.',
    category: 'health',
    type: 'free',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    issueNumber: 'Edition 23',
    publishDate: '2024-03-10',
    pages: 96,
    views: 1890,
    downloads: 876,
  },
  {
    id: '4',
    name: 'Business Weekly - March 2024',
    coverImage: 'https://images.unsplash.com/photo-1556745753-b2904692b3cd?w=400',
    description: 'Market analysis, investment strategies, and leadership insights.',
    category: 'business',
    type: 'premium',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    issueNumber: 'Vol. 8, Issue 12',
    publishDate: '2024-03-05',
    pages: 112,
    views: 3210,
    downloads: 987,
  },
];

const Magazine = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingMagazine, setEditingMagazine] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [magazines, setMagazines] = useState(mockMagazines);
  
  const itemsPerPage = 6;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<MagazineFormData>({
    resolver: zodResolver(magazineSchema),
    defaultValues: {
      name: '',
      coverImage: '',
      description: '',
      category: '',
      type: 'free',
      content: '',
      issueNumber: '',
      publishDate: new Date().toISOString().split('T')[0],
      pages: 1,
    },
  });

  const watchAll = watch();
  const previewData = watchAll;
  const selectedTypeValue = watch('type');

  const onSubmit = async (data: MagazineFormData) => {
    console.log('Magazine Data:', data);
    
    const newMagazine = {
      id: editingMagazine?.id || Date.now().toString(),
      ...data,
      views: editingMagazine?.views || 0,
      downloads: editingMagazine?.downloads || 0,
      publishDate: data.publishDate || new Date().toISOString().split('T')[0],
    };
    
    if (editingMagazine) {
      setMagazines(magazines.map(m => m.id === editingMagazine.id ? newMagazine : m));
    } else {
      setMagazines([newMagazine, ...magazines]);
    }
    
    reset();
    setEditingMagazine(null);
    setShowForm(false);
    setShowPreview(false);
  };

  const handleEdit = (magazine: any) => {
    setEditingMagazine(magazine);
    setValue('name', magazine.name);
    setValue('coverImage', magazine.coverImage);
    setValue('description', magazine.description);
    setValue('category', magazine.category);
    setValue('type', magazine.type);
    setValue('content', magazine.content || '');
    setValue('issueNumber', magazine.issueNumber || '');
    setValue('publishDate', magazine.publishDate || '');
    setValue('pages', magazine.pages || 1);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this magazine?')) {
      setMagazines(magazines.filter(m => m.id !== id));
    }
  };

  const handleCancel = () => {
    reset();
    setEditingMagazine(null);
    setShowForm(false);
    setShowPreview(false);
  };

  const getCategoryDetails = (categoryId: string) => {
    return categories.find(c => c.id === categoryId) || categories[0];
  };

  // Filter magazines
  const filteredMagazines = magazines.filter(mag => {
    const matchesSearch = mag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          mag.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || mag.category === selectedCategory;
    const matchesType = selectedType === 'all' || mag.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredMagazines.length / itemsPerPage);
  const paginatedMagazines = filteredMagazines.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray p-6 font-satoshi">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="relative mb-8 overflow-hidden rounded-2xl bg-white p-8 shadow-card">
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-meta-5/5 blur-3xl"></div>
          
          <div className="relative flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <MdImage className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-primary">Digital Library</span>
              </div>
              <h1 className="text-title-xl2 font-bold text-black">Magazine Manager</h1>
              <p className="mt-1 text-body">Create, manage, and publish digital magazines for your readers</p>
            </div>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-medium text-white shadow-default transition-all hover:bg-primary/90"
              >
                <MdAdd size={20} />
                New Magazine
              </button>
            )}
          </div>
        </div>

        {/* Form Section */}
        {showForm && (
          <div className="mb-8 rounded-2xl bg-white shadow-card overflow-hidden">
            <div className="border-b border-stroke bg-gray px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  {editingMagazine ? <MdEdit className="text-primary" /> : <MdAdd className="text-primary" />}
                </div>
                <h2 className="text-title-md font-semibold text-black">
                  {editingMagazine ? 'Edit Magazine' : 'Create New Magazine'}
                </h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center gap-1 rounded-lg border border-stroke bg-white px-3 py-1.5 text-sm text-body hover:bg-gray"
                >
                  <MdPreview size={16} />
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </button>
                <button onClick={handleCancel} className="text-body hover:text-meta-1">
                  <MdClose size={24} />
                </button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className={`flex-1 p-6 ${showPreview ? 'lg:w-1/2' : 'w-full'}`}>
                <div className="space-y-5">
                  {/* Magazine Name */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-black">
                      Magazine Name <span className="text-meta-1">*</span>
                    </label>
                    <div className="relative">
                      <MdTitle className="absolute left-3 top-1/2 -translate-y-1/2 text-body/50" size={18} />
                      <input
                        {...register('name')}
                        className="w-full rounded-lg border border-stroke bg-white py-2.5 pl-10 pr-4 text-black focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="e.g., Vogue India - January 2024"
                      />
                    </div>
                    {errors.name && <p className="mt-1 text-sm text-meta-1">{errors.name.message}</p>}
                  </div>

                  {/* Cover Image URL */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-black">
                      Cover Image URL <span className="text-meta-1">*</span>
                    </label>
                    <div className="relative">
                      <MdImage className="absolute left-3 top-1/2 -translate-y-1/2 text-body/50" size={18} />
                      <input
                        {...register('coverImage')}
                        className="w-full rounded-lg border border-stroke bg-white py-2.5 pl-10 pr-4 text-black focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="https://example.com/cover.jpg"
                      />
                    </div>
                    {watch('coverImage') && (
                      <div className="mt-2 flex gap-2">
                        <img src={watch('coverImage')} alt="Preview" className="h-20 w-20 rounded-lg object-cover" />
                        <span className="text-xs text-body">Cover preview</span>
                      </div>
                    )}
                    {errors.coverImage && <p className="mt-1 text-sm text-meta-1">{errors.coverImage.message}</p>}
                  </div>

                  {/* Category and Type Row */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-black">
                        Category <span className="text-meta-1">*</span>
                      </label>
                      <select
                        {...register('category')}
                        className="w-full rounded-lg border border-stroke bg-white py-2.5 px-4 text-black focus:border-primary focus:outline-none"
                      >
                        <option value="">Select category</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>
                            {cat.icon} {cat.name}
                          </option>
                        ))}
                      </select>
                      {errors.category && <p className="mt-1 text-sm text-meta-1">{errors.category.message}</p>}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-black">
                        Access Type <span className="text-meta-1">*</span>
                      </label>
                      <div className="flex gap-3">
                        <label 
                          className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 p-3 transition-all ${
                            selectedTypeValue === 'free' 
                              ? 'border-primary bg-primary/5' 
                              : 'border-stroke bg-white hover:border-primary/50'
                          }`}
                        >
                          <input
                            type="radio"
                            value="free"
                            {...register('type')}
                            className="hidden"
                          />
                          <MdLockOpen className={`${selectedTypeValue === 'free' ? 'text-meta-3' : 'text-body/50'}`} size={20} />
                          <span className={`font-medium ${selectedTypeValue === 'free' ? 'text-primary' : 'text-body'}`}>Free</span>
                        </label>
                        <label 
                          className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 p-3 transition-all ${
                            selectedTypeValue === 'premium' 
                              ? 'border-primary bg-primary/5' 
                              : 'border-stroke bg-white hover:border-primary/50'
                          }`}
                        >
                          <input
                            type="radio"
                            value="premium"
                            {...register('type')}
                            className="hidden"
                          />
                          <MdLock className={`${selectedTypeValue === 'premium' ? 'text-meta-6' : 'text-body/50'}`} size={20} />
                          <span className={`font-medium ${selectedTypeValue === 'premium' ? 'text-primary' : 'text-body'}`}>Premium</span>
                        </label>
                      </div>
                      {errors.type && <p className="mt-1 text-sm text-meta-1">{errors.type.message}</p>}
                    </div>
                  </div>

                  {/* Issue Details Row */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-black">Issue Number</label>
                      <input
                        {...register('issueNumber')}
                        className="w-full rounded-lg border border-stroke bg-white py-2.5 px-4 text-black focus:border-primary focus:outline-none"
                        placeholder="e.g., Vol. 12, Issue 1"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-black">Publish Date</label>
                      <input
                        type="date"
                        {...register('publishDate')}
                        className="w-full rounded-lg border border-stroke bg-white py-2.5 px-4 text-black focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Pages */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-black">Number of Pages</label>
                    <input
                      type="number"
                      {...register('pages', { valueAsNumber: true })}
                      className="w-32 rounded-lg border border-stroke bg-white py-2.5 px-4 text-black focus:border-primary focus:outline-none"
                      placeholder="Pages"
                    />
                    {errors.pages && <p className="mt-1 text-sm text-meta-1">{errors.pages.message}</p>}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-black">
                      Description <span className="text-meta-1">*</span>
                    </label>
                    <textarea
                      {...register('description')}
                      rows={3}
                      className="w-full rounded-lg border border-stroke bg-white py-2.5 px-4 text-black focus:border-primary focus:outline-none"
                      placeholder="Brief description of the magazine..."
                    />
                    {errors.description && <p className="mt-1 text-sm text-meta-1">{errors.description.message}</p>}
                  </div>

                  {/* Content */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-black">
                      Magazine Content <span className="text-meta-1">*</span>
                    </label>
                    <textarea
                      {...register('content')}
                      rows={6}
                      className="w-full rounded-lg border border-stroke bg-white py-2.5 px-4 text-black focus:border-primary focus:outline-none font-mono text-sm"
                      placeholder="Write the magazine content here. You can include HTML formatting, article text, etc..."
                    />
                    {errors.content && <p className="mt-1 text-sm text-meta-1">{errors.content.message}</p>}
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 font-medium text-white hover:bg-primary/90"
                    >
                      <MdSave size={18} />
                      {isSubmitting ? 'Saving...' : editingMagazine ? 'Update Magazine' : 'Publish Magazine'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="rounded-lg border border-stroke px-6 py-2.5 font-medium text-body hover:bg-gray"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>

              {/* Preview Panel */}
              {showPreview && (
                <div className="border-l border-stroke bg-gray p-6 lg:w-1/2">
                  <h3 className="mb-4 text-lg font-semibold text-black">Live Preview</h3>
                  <div className="rounded-xl bg-white shadow-card overflow-hidden">
                    {previewData.coverImage && (
                      <div className="relative h-48 w-full">
                        <img
                          src={previewData.coverImage}
                          alt="Cover"
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/400x300?text=Invalid+Image+URL';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-3 left-3 right-3">
                          {previewData.type && (
                            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                              previewData.type === 'premium' ? 'bg-meta-6 text-white' : 'bg-meta-3 text-white'
                            }`}>
                              {previewData.type === 'premium' ? <MdLock size={12} /> : <MdLockOpen size={12} />}
                              {previewData.type.toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="p-5">
                      <h4 className="text-xl font-bold text-black">{previewData.name || 'Magazine Name'}</h4>
                      {previewData.category && (
                        <div className="mt-2 flex items-center gap-1 text-sm text-body">
                          {getCategoryDetails(previewData.category).icon} {getCategoryDetails(previewData.category).name}
                        </div>
                      )}
                      <p className="mt-3 text-body text-sm">{previewData.description || 'Description will appear here...'}</p>
                      <div className="mt-4 text-xs text-body/70">
                        {previewData.issueNumber && <div>Issue: {previewData.issueNumber}</div>}
                        {previewData.pages && <div>Pages: {previewData.pages}</div>}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Filters and Search Bar */}
        {!showForm && (
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-body/50" size={18} />
              <input
                type="text"
                placeholder="Search magazines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-stroke bg-white py-2.5 pl-10 pr-4 text-black focus:border-primary focus:outline-none"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-lg border border-stroke bg-white px-4 py-2.5 text-black focus:border-primary focus:outline-none"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                ))}
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="rounded-lg border border-stroke bg-white px-4 py-2.5 text-black focus:border-primary focus:outline-none"
              >
                <option value="all">All Types</option>
                <option value="free">Free</option>
                <option value="premium">Premium</option>
              </select>
            </div>
          </div>
        )}

        {/* Magazine Grid */}
        {!showForm && (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedMagazines.map((magazine) => {
                const category = getCategoryDetails(magazine.category);
                return (
                  <div
                    key={magazine.id}
                    className="group rounded-2xl bg-white shadow-card transition-all hover:shadow-4 hover:-translate-y-1"
                  >
                    <div className="relative h-56 w-full overflow-hidden rounded-t-2xl">
                      <img
                        src={magazine.coverImage}
                        alt={magazine.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                          magazine.type === 'premium' ? 'bg-meta-6 text-white' : 'bg-meta-3 text-white'
                        }`}>
                          {magazine.type === 'premium' ? <MdLock size={12} /> : <MdLockOpen size={12} />}
                          {magazine.type.toUpperCase()}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(magazine)}
                            className="rounded-full bg-white/90 p-1.5 text-body transition-colors hover:bg-primary hover:text-white"
                          >
                            <MdEdit size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(magazine.id)}
                            className="rounded-full bg-white/90 p-1.5 text-body transition-colors hover:bg-meta-1 hover:text-white"
                          >
                            <MdDelete size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="mb-2 flex items-center justify-between">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${category.color}`}>
                          {category.icon} {category.name}
                        </span>
                        <div className="flex items-center gap-3 text-xs text-body/60">
                          <span className="flex items-center gap-1">
                            <MdVisibility size={12} /> {magazine.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <MdDownload size={12} /> {magazine.downloads}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-md font-bold text-black line-clamp-2">{magazine.name}</h3>
                      <p className="mt-2 text-sm text-body line-clamp-2">{magazine.description}</p>
                      <div className="mt-4 flex items-center justify-between text-xs text-body/60">
                        <span>{magazine.issueNumber}</span>
                        <span>{magazine.pages} pages</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredMagazines.length === 0 && (
              <div className="rounded-2xl bg-white p-12 text-center shadow-card">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray">
                  <MdImage className="h-8 w-8 text-body/40" />
                </div>
                <h3 className="text-lg font-semibold text-black">No magazines found</h3>
                <p className="mt-1 text-body">Try adjusting your search or filters</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white"
                >
                  <MdAdd size={16} />
                  Create your first magazine
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-lg border border-stroke p-2 disabled:opacity-50"
                >
                  <MdChevronLeft size={20} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`h-10 w-10 rounded-lg font-medium transition-all ${
                      currentPage === page
                        ? 'bg-primary text-white'
                        : 'border border-stroke text-body hover:bg-gray'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-lg border border-stroke p-2 disabled:opacity-50"
                >
                  <MdChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Magazine;