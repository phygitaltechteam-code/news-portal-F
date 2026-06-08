import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  MdAdd,
  MdDelete,
  MdImage,
  MdLink,
  MdTitle,
  MdDescription,
  MdCategory,
  MdPreview,
  MdSave,
  MdClose,
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdArrowDropDown,
  MdCheck,
  MdDragHandle,
  MdPublic,
  MdTimer,
  MdVerified,
} from 'react-icons/md';

// Schema for validation
const newsSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  images: z.array(z.object({ url: z.string().url('Must be a valid URL') })).min(1, 'At least one image is required'),
  categoryIds: z.array(z.string()).min(1, 'At least one category is required'),
  sections: z.array(z.object({
    subtitle: z.string(),
    description: z.string(),
  })),
  links: z.array(z.object({
    title: z.string(),
    url: z.string().url('Must be a valid URL'),
  })),
  metaDescription: z.string().optional(),
  featured: z.boolean().default(false),
});

type NewsFormData = z.infer<typeof newsSchema>;

// Mock categories with icons and colors matching the theme
const categories = [
  { id: '1', name: 'Technology', color: 'bg-meta-5/10 text-meta-5', icon: '💻' },
  { id: '2', name: 'Sports', color: 'bg-meta-3/10 text-meta-3', icon: '⚽' },
  { id: '3', name: 'Politics', color: 'bg-meta-1/10 text-meta-1', icon: '🏛️' },
  { id: '4', name: 'Entertainment', color: 'bg-meta-6/10 text-meta-6', icon: '🎬' },
  { id: '5', name: 'Business', color: 'bg-meta-8/10 text-meta-8', icon: '📈' },
  { id: '6', name: 'Health', color: 'bg-meta-3/10 text-meta-3', icon: '🏥' },
  { id: '7', name: 'Science', color: 'bg-meta-5/10 text-meta-5', icon: '🔬' },
];

const CreateNews = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<number | null>(null);
  
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<NewsFormData>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: '',
      images: [{ url: '' }],
      categoryIds: [],
      sections: [{ subtitle: '', description: '' }],
      links: [{ title: '', url: '' }],
      metaDescription: '',
      featured: false,
    },
  });

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control,
    name: 'images',
  });

  const { fields: sectionFields, append: appendSection, remove: removeSection } = useFieldArray({
    control,
    name: 'sections',
  });

  const { fields: linkFields, append: appendLink, remove: removeLink } = useFieldArray({
    control,
    name: 'links',
  });

  const watchAll = watch();
  const previewData = watchAll;

  const handleCategorySelect = (categoryId: string) => {
    const updated = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    setSelectedCategories(updated);
    setValue('categoryIds', updated);
  };

  const removeCategory = (categoryId: string) => {
    const updated = selectedCategories.filter(id => id !== categoryId);
    setSelectedCategories(updated);
    setValue('categoryIds', updated);
  };

  const getCategoryName = (id: string) => {
    const category = categories.find(c => c.id === id);
    return category ? category.name : '';
  };

  const getCategoryColor = (id: string) => {
    const category = categories.find(c => c.id === id);
    return category ? category.color : 'bg-gray-100 text-gray-800';
  };

  const getCategoryIcon = (id: string) => {
    const category = categories.find(c => c.id === id);
    return category ? category.icon : '📰';
  };

  const onSubmit = async (data: NewsFormData) => {
    console.log('News Data:', data);
    // API call will go here
    alert('News created successfully!');
  };

  const applyFormat = (command: string) => {
    document.execCommand(command, false);
  };

  return (
    <div className="min-h-screen bg-gray p-6 font-satoshi">
      <div className="mx-auto max-w-7xl">
        {/* Header with gradient accent */}
        <div className="relative mb-8 overflow-hidden rounded-2xl bg-white p-8 shadow-card">
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-meta-5/5 blur-3xl"></div>
          
          <div className="relative flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <MdDescription className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-primary">Create New Article</span>
              </div>
              <h1 className="text-title-xl2 font-bold text-black">Write News</h1>
              <p className="mt-1 text-body">Create engaging news articles with rich content and media</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={`flex items-center gap-2 rounded-lg px-5 py-2.5 font-medium transition-all duration-200 ${
                  showPreview 
                    ? 'border-2 border-primary bg-white text-primary hover:bg-primary/5' 
                    : 'bg-primary text-white shadow-default hover:bg-primary/90'
                }`}
              >
                <MdPreview size={20} />
                {showPreview ? 'Edit Mode' : 'Preview Mode'}
              </button>
            </div>
          </div>
        </div>

        {showPreview ? (
          // Modern Preview Section
          <div className="rounded-2xl bg-white shadow-card overflow-hidden">
            {/* Preview Header with cover style */}
            {previewData.images[0]?.url && (
              <div className="relative h-96 w-full">
                <img
                  src={previewData.images[0].url}
                  alt="Cover"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {previewData.categoryIds.map((catId) => (
                      <span key={catId} className={`rounded-full px-3 py-1 text-xs font-medium ${getCategoryColor(catId)} backdrop-blur-sm`}>
                        {getCategoryIcon(catId)} {getCategoryName(catId)}
                      </span>
                    ))}
                  </div>
                  <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                    {previewData.title || 'Your News Title Here'}
                  </h1>
                  <div className="mt-4 flex items-center gap-4 text-white/80">
                    <div className="flex items-center gap-1">
                      <MdTimer size={16} />
                      <span className="text-sm">5 min read</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MdPublic size={16} />
                      <span className="text-sm">Public</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="p-8 md:p-12">
              {/* Gallery preview */}
              {previewData.images.length > 1 && (
                <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3">
                  {previewData.images.slice(1).map((img, idx) => (
                    img.url && (
                      <img
                        key={idx}
                        src={img.url}
                        alt={`Gallery ${idx + 1}`}
                        className="h-48 w-full rounded-xl object-cover shadow-md transition-transform hover:scale-105"
                      />
                    )
                  ))}
                </div>
              )}

              {/* Content preview */}
              <div className="prose prose-lg max-w-none">
                {previewData.sections.map((section, idx) => (
                  (section.subtitle || section.description) && (
                    <div key={idx} className="mb-8">
                      {section.subtitle && (
                        <h2 className="mb-3 text-2xl font-bold text-black border-l-4 border-primary pl-4">
                          {section.subtitle}
                        </h2>
                      )}
                      {section.description && (
                        <div 
                          className="text-body leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: section.description }}
                        />
                      )}
                    </div>
                  )
                ))}
              </div>

              {/* Links section */}
              {previewData.links.filter(link => link.title && link.url).length > 0 && (
                <div className="mt-10 rounded-xl bg-gray p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-black">
                    <MdLink className="text-primary" />
                    Related Links
                  </h3>
                  <ul className="space-y-2">
                    {previewData.links.map((link, idx) => (
                      link.title && link.url && (
                        <li key={idx}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center gap-2"
                          >
                            🔗 {link.title}
                          </a>
                        </li>
                      )
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Enhanced Form Section
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Featured Toggle Card */}
            <div className="rounded-2xl bg-white p-6 shadow-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-meta-6/10">
                    <MdVerified className="h-5 w-5 text-meta-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">Featured Article</h3>
                    <p className="text-sm text-body">Mark this as a featured story on homepage</p>
                  </div>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" {...register('featured')} className="peer sr-only" />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full"></div>
                </label>
              </div>
            </div>

            {/* Title Card */}
            <div className="rounded-2xl bg-white p-6 shadow-card transition-all hover:shadow-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <MdTitle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold text-black">Article Title</h2>
                  <p className="text-sm text-body">Write a compelling headline that grabs attention</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {/* Rich text toolbar */}
                <div className="flex flex-wrap gap-1 rounded-lg border border-stroke bg-gray p-2">
                  {[
                    { icon: MdFormatBold, command: 'bold', label: 'Bold' },
                    { icon: MdFormatItalic, command: 'italic', label: 'Italic' },
                    { icon: MdFormatUnderlined, command: 'underline', label: 'Underline' },
                    { divider: true },
                    { icon: MdFormatAlignLeft, command: 'justifyLeft', label: 'Align Left' },
                    { icon: MdFormatAlignCenter, command: 'justifyCenter', label: 'Align Center' },
                    { icon: MdFormatAlignRight, command: 'justifyRight', label: 'Align Right' },
                  ].map((item, idx) => 
                    item.divider ? (
                      <div key={idx} className="mx-1 h-6 w-px bg-stroke"></div>
                    ) : (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => applyFormat(item.command)}
                        className="rounded p-1.5 text-body hover:bg-white hover:text-primary transition-colors"
                        title={item.label}
                      >
                        <item.icon size={18} />
                      </button>
                    )
                  )}
                </div>
                
                <input
                  type="text"
                  {...register('title')}
                  className="w-full rounded-lg border border-stroke bg-white px-5 py-3 text-lg font-semibold text-black placeholder-body/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Enter news title..."
                />
                {errors.title && (
                  <p className="flex items-center gap-1 text-sm text-meta-1">
                    <span>⚠️</span> {errors.title.message}
                  </p>
                )}
              </div>
            </div>

            {/* SEO Meta Description */}
            <div className="rounded-2xl bg-white p-6 shadow-card">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-meta-5/10">
                  <MdPublic className="h-5 w-5 text-meta-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-black">Meta Description</h2>
                  <p className="text-sm text-body">Brief summary for search engines (150-160 characters)</p>
                </div>
              </div>
              <textarea
                {...register('metaDescription')}
                rows={2}
                className="w-full rounded-lg border border-stroke bg-white px-5 py-3 text-body focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Write a concise summary of your article..."
              />
              <p className="mt-2 text-right text-xs text-body">
                {watch('metaDescription')?.length || 0}/160 characters
              </p>
            </div>

            {/* Images Card with better layout */}
            <div className="rounded-2xl bg-white p-6 shadow-card">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-meta-3/10">
                    <MdImage className="h-5 w-5 text-meta-3" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-black">Images</h2>
                    <p className="text-sm text-body">Add images to make your article visually appealing</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => appendImage({ url: '' })}
                  className="flex items-center gap-1 rounded-lg border border-primary bg-white px-3 py-1.5 text-sm font-medium text-primary transition-all hover:bg-primary/5"
                >
                  <MdAdd size={16} /> Add Image
                </button>
              </div>
              
              <div className="space-y-3">
                {imageFields.map((field, index) => (
                  <div key={field.id} className="group flex items-center gap-3 rounded-lg border border-stroke p-3 transition-all hover:border-primary/30">
                    <MdDragHandle className="h-5 w-5 text-body/30 cursor-move" />
                    <input
                      {...register(`images.${index}.url`)}
                      className="flex-1 rounded-md border border-stroke bg-gray px-4 py-2.5 text-sm text-body focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="https://example.com/image.jpg"
                    />
                    {imageFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="rounded-md bg-meta-1/10 p-2 text-meta-1 transition-colors hover:bg-meta-1/20"
                      >
                        <MdDelete size={18} />
                      </button>
                    )}
                  </div>
                ))}
                {errors.images && (
                  <p className="text-sm text-meta-1">{errors.images.message}</p>
                )}
              </div>
            </div>

            {/* Categories Card with improved dropdown */}
            <div className="rounded-2xl bg-white p-6 shadow-card">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-meta-6/10">
                  <MdCategory className="h-5 w-5 text-meta-6" />
                </div>
                <div>
                  <h2 className="font-semibold text-black">Categories</h2>
                  <p className="text-sm text-body">Select relevant categories for better discoverability</p>
                </div>
              </div>
              
              {selectedCategories.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {selectedCategories.map((catId) => (
                    <span
                      key={catId}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${getCategoryColor(catId)}`}
                    >
                      {getCategoryIcon(catId)} {getCategoryName(catId)}
                      <button
                        type="button"
                        onClick={() => removeCategory(catId)}
                        className="ml-1 rounded-full p-0.5 hover:bg-black/10"
                      >
                        <MdClose size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex w-full items-center justify-between rounded-lg border border-stroke bg-white px-5 py-3 text-left text-body focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <span>
                    {selectedCategories.length === 0
                      ? 'Select categories...'
                      : `${selectedCategories.length} category(ies) selected`}
                  </span>
                  <MdArrowDropDown size={20} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute left-0 right-0 top-full z-10 mt-2 max-h-64 overflow-y-auto rounded-lg border border-stroke bg-white shadow-4">
                    {categories.map((category) => (
                      <label
                        key={category.id}
                        className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-gray transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => handleCategorySelect(category.id)}
                          className="h-4 w-4 rounded border-stroke text-primary focus:ring-primary"
                        />
                        <span className="flex items-center gap-2 text-sm text-black">
                          <span>{category.icon}</span>
                          {category.name}
                        </span>
                        {selectedCategories.includes(category.id) && (
                          <MdCheck size={16} className="ml-auto text-primary" />
                        )}
                      </label>
                    ))}
                  </div>
                )}
              </div>
              
              {errors.categoryIds && (
                <p className="mt-2 text-sm text-meta-1">{errors.categoryIds.message}</p>
              )}
            </div>

            {/* Content Sections with better styling */}
            <div className="rounded-2xl bg-white p-6 shadow-card">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-meta-5/10">
                    <MdDescription className="h-5 w-5 text-meta-5" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-black">Content Sections</h2>
                    <p className="text-sm text-body">Organize your article into readable sections</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => appendSection({ subtitle: '', description: '' })}
                  className="flex items-center gap-1 rounded-lg border border-primary bg-white px-3 py-1.5 text-sm font-medium text-primary transition-all hover:bg-primary/5"
                >
                  <MdAdd size={16} /> Add Section
                </button>
              </div>
              
              <div className="space-y-4">
                {sectionFields.map((field, index) => (
                  <div 
                    key={field.id} 
                    className={`rounded-xl border-2 transition-all ${
                      activeSection === index ? 'border-primary shadow-card' : 'border-stroke'
                    }`}
                    onClick={() => setActiveSection(index)}
                  >
                    <div className="flex items-center justify-between border-b border-stroke bg-gray p-3">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                          {index + 1}
                        </span>
                        <span className="text-sm font-medium text-black">Section</span>
                      </div>
                      {sectionFields.length > 1 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeSection(index);
                          }}
                          className="rounded p-1 text-meta-1 transition-colors hover:bg-meta-1/10"
                        >
                          <MdDelete size={18} />
                        </button>
                      )}
                    </div>
                    <div className="p-4 space-y-3">
                      <input
                        {...register(`sections.${index}.subtitle`)}
                        className="w-full rounded-lg border border-stroke bg-white px-4 py-2.5 text-sm font-medium text-black placeholder-body/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Section subtitle (optional)"
                      />
                      <textarea
                        {...register(`sections.${index}.description`)}
                        rows={6}
                        className="w-full rounded-lg border border-stroke bg-white px-4 py-2.5 text-sm text-body placeholder-body/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Write your content here... Use HTML for rich formatting"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Links Card */}
            <div className="rounded-2xl bg-white p-6 shadow-card">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-meta-8/10">
                    <MdLink className="h-5 w-5 text-meta-8" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-black">Related Links</h2>
                    <p className="text-sm text-body">Add references or sources for your article</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => appendLink({ title: '', url: '' })}
                  className="flex items-center gap-1 rounded-lg border border-primary bg-white px-3 py-1.5 text-sm font-medium text-primary transition-all hover:bg-primary/5"
                >
                  <MdAdd size={16} /> Add Link
                </button>
              </div>
              
              <div className="space-y-3">
                {linkFields.map((field, index) => (
                  <div key={field.id} className="flex flex-col gap-2 rounded-lg border border-stroke p-3 sm:flex-row">
                    <input
                      {...register(`links.${index}.title`)}
                      className="flex-1 rounded-md border border-stroke bg-gray px-4 py-2.5 text-sm text-body focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Link title"
                    />
                    <input
                      {...register(`links.${index}.url`)}
                      className="flex-[2] rounded-md border border-stroke bg-gray px-4 py-2.5 text-sm text-body focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="https://example.com"
                    />
                    {linkFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeLink(index)}
                        className="rounded-md bg-meta-1/10 p-2 text-meta-1 transition-colors hover:bg-meta-1/20"
                      >
                        <MdDelete size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="rounded-lg border border-stroke bg-white px-8 py-2.5 font-medium text-body transition-colors hover:bg-gray"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-2.5 font-medium text-white shadow-default transition-all hover:bg-primary/90 disabled:opacity-50"
              >
                <MdSave size={18} />
                {isSubmitting ? 'Publishing...' : 'Publish News'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateNews;