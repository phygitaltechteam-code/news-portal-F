import React, {useState, useRef, useEffect} from 'react';
import {useForm, useFieldArray} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
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
  MdCloudUpload,
  MdVisibility,
  MdEdit,
  MdOutlinePublishedWithChanges,
} from 'react-icons/md';
import {useCreateNews} from './newsApi';
import { api } from '@/utils/axios';

// Frontend Schema (for validation only)
const newsSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().optional(),
  publishedAt: z.string().optional(),
  categories: z.array(z.string()).min(1, 'At least one category is required'),
  content: z.array(
    z.object({
      title: z.string(),
      text: z.string(),
    }),
  ),
  images: z.array(z.string().url('Must be a valid URL')).optional(),
  links: z.array(
    z.object({
      url: z.string().url('Must be a valid URL'),
      text: z.string().optional(),
    }),
  ),
});

type NewsFormData = z.infer<typeof newsSchema>;

// Categories with your theme colors
const categories = [
  {id: 'Technology', name: 'Technology', color: 'bg-meta-5/10 text-meta-5', icon: '💻'},
  {id: 'Sports', name: 'Sports', color: 'bg-meta-3/10 text-meta-3', icon: '⚽'},
  {id: 'Politics', name: 'Politics', color: 'bg-meta-1/10 text-meta-1', icon: '🏛️'},
  {id: 'Entertainment', name: 'Entertainment', color: 'bg-meta-6/10 text-meta-6', icon: '🎬'},
  {id: 'Business', name: 'Business', color: 'bg-meta-8/10 text-meta-8', icon: '📈'},
  {id: 'Health', name: 'Health', color: 'bg-meta-3/10 text-meta-3', icon: '🏥'},
  {id: 'Science', name: 'Science', color: 'bg-meta-5/10 text-meta-5', icon: '🔬'},
];

// Rich Text Editor Component
const RichTextEditor = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value || '');
    handleInput();
    editorRef.current?.focus();
  };

  return (
    <div className="overflow-hidden rounded-lg border border-stroke bg-white">
      <div className="flex flex-wrap gap-1 border-b border-stroke bg-gray p-2">
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); execCommand('bold'); }}
          className="rounded-md p-1.5 text-body transition-colors hover:bg-white hover:text-primary"
          title="Bold"
        >
          <MdFormatBold size={18} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); execCommand('italic'); }}
          className="rounded-md p-1.5 text-body transition-colors hover:bg-white hover:text-primary"
          title="Italic"
        >
          <MdFormatItalic size={18} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); execCommand('underline'); }}
          className="rounded-md p-1.5 text-body transition-colors hover:bg-white hover:text-primary"
          title="Underline"
        >
          <MdFormatUnderlined size={18} />
        </button>
        <div className="mx-1 h-6 w-px bg-stroke"></div>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); execCommand('justifyLeft'); }}
          className="rounded-md p-1.5 text-body transition-colors hover:bg-white hover:text-primary"
          title="Align Left"
        >
          <MdFormatAlignLeft size={18} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); execCommand('justifyCenter'); }}
          className="rounded-md p-1.5 text-body transition-colors hover:bg-white hover:text-primary"
          title="Align Center"
        >
          <MdFormatAlignCenter size={18} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); execCommand('justifyRight'); }}
          className="rounded-md p-1.5 text-body transition-colors hover:bg-white hover:text-primary"
          title="Align Right"
        >
          <MdFormatAlignRight size={18} />
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`prose prose-sm min-h-[200px] max-w-none p-4 text-left text-body outline-none focus:ring-1 focus:ring-primary ${isFocused ? 'ring-1 ring-primary' : ''}`}
        style={{cursor: 'text', direction: 'ltr', textAlign: 'left'}}
      />
      {(!value || value === '<br>') && !isFocused && (
        <div className="pointer-events-none absolute ml-4 mt-[-180px] text-gray-400">
          {placeholder || 'Write your content here...'}
        </div>
      )}
    </div>
  );
};

// Formatted Text Input for Titles
const FormattedTextInput = ({value, onChange, placeholder, error}: any) => {
  const [showToolbar, setShowToolbar] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const applyFormat = (command: string) => {
    if (inputRef.current) {
      const start = inputRef.current.selectionStart || 0;
      const end = inputRef.current.selectionEnd || 0;
      const selectedText = value.substring(start, end);

      if (selectedText) {
        let wrappedText = '';
        switch (command) {
          case 'bold':
            wrappedText = `**${selectedText}**`;
            break;
          case 'italic':
            wrappedText = `*${selectedText}*`;
            break;
          case 'underline':
            wrappedText = `_${selectedText}_`;
            break;
          default:
            return;
        }

        const newText = value.substring(0, start) + wrappedText + value.substring(end);
        onChange(newText);

        setTimeout(() => {
          inputRef.current?.focus();
          inputRef.current?.setSelectionRange(start + wrappedText.length, start + wrappedText.length);
        }, 10);
      } else {
        alert('Please select text first');
      }
    }
  };

  return (
    <div className="space-y-2">
      {showToolbar && (
        <div className="flex flex-wrap items-center gap-1 rounded-lg border border-stroke bg-gray p-1.5">
          <span className="px-2 text-xs text-body">Format text:</span>
          <button
            type="button"
            onClick={() => applyFormat('bold')}
            className="rounded-md px-2.5 py-1 text-sm font-bold text-body transition-all hover:bg-white hover:text-primary"
          >
            <MdFormatBold size={16} className="mr-1 inline" /> Bold
          </button>
          <button
            type="button"
            onClick={() => applyFormat('italic')}
            className="rounded-md px-2.5 py-1 text-sm italic text-body transition-all hover:bg-white hover:text-primary"
          >
            <MdFormatItalic size={16} className="mr-1 inline" /> Italic
          </button>
          <button
            type="button"
            onClick={() => applyFormat('underline')}
            className="rounded-md px-2.5 py-1 text-sm text-body underline transition-all hover:bg-white hover:text-primary"
          >
            <MdFormatUnderlined size={16} className="mr-1 inline" /> Underline
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setShowToolbar(true)}
        onBlur={() => setTimeout(() => setShowToolbar(false), 200)}
        className="w-full rounded-lg border border-stroke bg-white px-4 py-2.5 text-left text-sm font-medium text-black placeholder-body/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        placeholder={placeholder}
        dir="ltr"
      />

      {error && (
        <p className="mt-1 flex items-center gap-1 text-sm text-meta-1">
          <span>⚠️</span> {error}
        </p>
      )}
    </div>
  );
};

const CreateNews = () => {
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imageUrlInputs, setImageUrlInputs] = useState<string[]>([]);

  const {createNews} = useCreateNews();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: {errors, isSubmitting},
  } = useForm<NewsFormData>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: '',
      author: '',
      publishedAt: new Date().toISOString().split('T')[0],
      categories: [],
      content: [{title: '', text: ''}],
      images: [],
      links: [{url: '', text: ''}],
    },
  });

  const {
    fields: contentFields,
    append: appendContent,
    remove: removeContent,
  } = useFieldArray({control, name: 'content'});

  const {
    fields: linkFields,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({control, name: 'links'});

  const watchAll = watch();
  const previewData = watchAll;
  const watchTitle = watch('title');

  const handleCategorySelect = (categoryId: string) => {
    const updated = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];
    setSelectedCategories(updated);
    setValue('categories', updated);
  };

  const removeCategory = (categoryId: string) => {
    const updated = selectedCategories.filter((id) => id !== categoryId);
    setSelectedCategories(updated);
    setValue('categories', updated);
  };

  const getCategoryName = (id: string) => {
    const category = categories.find((c) => c.id === id);
    return category ? category.name : '';
  };

  const getCategoryColor = (id: string) => {
    const category = categories.find((c) => c.id === id);
    return category ? category.color : 'bg-gray-100 text-gray-800';
  };

  const getCategoryIcon = (id: string) => {
    const category = categories.find((c) => c.id === id);
    return category ? category.icon : '📰';
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedImages(prev => [...prev, ...files]);
    
    // Create preview URLs for display
    files.forEach(file => {
      const previewUrl = URL.createObjectURL(file);
      setImageUrlInputs(prev => [...prev, previewUrl]);
    });
  };

  const removeUploadedImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    setImageUrlInputs(prev => prev.filter((_, i) => i !== index));
  };

  const addImageUrlInput = () => {
    setImageUrlInputs(prev => [...prev, '']);
  };

  const updateImageUrl = (index: number, value: string) => {
    const newUrls = [...imageUrlInputs];
    newUrls[index] = value;
    setImageUrlInputs(newUrls);
  };

  const removeImageUrlInput = (index: number) => {
    setImageUrlInputs(prev => prev.filter((_, i) => i !== index));
  };

  const getFormattedText = (text: string) => {
    if (!text) return '';
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/_(.*?)_/g, '<u class="underline">$1</u>');
  };

const onSubmit = async (data: NewsFormData) => {
  try {
    console.log('=== SUBMITTING NEWS DATA AS JSON ===');
    
    // Collect all image URLs (from both uploaded files and URL inputs)
    const allImages: string[] = [];
    
    // For uploaded files, convert to base64 or temporary URLs
    // Note: This is for preview only - you need to upload files separately
    for (const file of uploadedImages) {
      // Convert file to base64 string
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
      allImages.push(base64);
    }
    
    // Add image URLs
    const validImageUrls = imageUrlInputs.filter(url => url && url.trim() !== '');
    allImages.push(...validImageUrls);
    
    // Prepare the payload as JSON (matching backend schema)
    const payload = {
      title: data.title,
      author: data.author || '',
      publishedAt: data.publishedAt || new Date().toISOString(),
      categories: data.categories, // This is already an array
      content: data.content.map(item => ({
        title: item.title
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/_(.*?)_/g, '<u>$1</u>'),
        text: item.text,
      })),
      images: allImages, // Array of strings (URLs or base64)
      links: data.links
        .filter(link => link.url && link.url.trim() !== '')
        .map(link => ({
          url: link.url,
          text: link.text || '',
        })),
    };
    
    console.log('Sending payload:', JSON.stringify(payload, null, 2));
    
    const response = await api.post('/admin/news', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.data.success || response.status === 200 || response.status === 201) {
      alert('News created successfully!');
      window.location.href = '/news';
    } else {
      alert(response.data.message || 'Failed to create news');
    }
  } catch (error: any) {
    console.error('Error submitting form:', error);
    const errorMessage = error.response?.data?.message || 'An error occurred while creating the news';
    alert(errorMessage);
  }
};

  return (
    <div className="min-h-screen bg-gray p-6 font-satoshi" dir="ltr">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="relative mb-6 overflow-hidden rounded-2xl bg-white p-6 shadow-card">
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-meta-5/5 blur-3xl"></div>

          <div className="relative flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <MdOutlinePublishedWithChanges className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-primary">Create New Article</span>
              </div>
              <h1 className="text-title-xl2 font-bold text-black">Write News</h1>
              <p className="mt-1 text-body">Create engaging news articles with rich content and media</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setActiveTab(activeTab === 'write' ? 'preview' : 'write')}
                className={`flex items-center gap-2 rounded-lg px-5 py-2.5 font-medium transition-all duration-200 ${
                  activeTab === 'preview'
                    ? 'border-2 border-primary bg-white text-primary hover:bg-primary/5'
                    : 'bg-primary text-white shadow-default hover:bg-primary/90'
                }`}
              >
                {activeTab === 'write' ? <MdPreview size={20} /> : <MdEdit size={20} />}
                {activeTab === 'write' ? 'Preview Mode' : 'Edit Mode'}
              </button>
            </div>
          </div>

          {/* Title and Author Inputs */}
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-black">Title *</label>
              <FormattedTextInput
                value={watchTitle}
                onChange={(value: string) => setValue('title', value)}
                placeholder="Enter news title..."
                error={errors.title?.message}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-black">Author</label>
              <input
                type="text"
                {...register('author')}
                className="w-full rounded-lg border border-stroke bg-white px-4 py-2.5 text-left text-sm text-black focus:border-primary focus:outline-none"
                placeholder="Author name"
              />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        {activeTab === 'preview' ? (
          // Preview Section
          <div className="overflow-hidden rounded-2xl bg-white shadow-card">
            <div className="p-8 md:p-12">
              {/* Title */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-black md:text-4xl lg:text-5xl text-left mb-4">
                  {previewData.title || 'Your News Title'}
                </h1>
                
                {/* Author and Date */}
                {(previewData.author || previewData.publishedAt) && (
                  <div className="flex flex-wrap items-center gap-4 text-body text-sm border-b border-stroke pb-4 mb-4">
                    {previewData.author && <span>By {previewData.author}</span>}
                    {previewData.publishedAt && <span>{new Date(previewData.publishedAt).toLocaleDateString()}</span>}
                  </div>
                )}
                
                {/* Categories */}
                {previewData.categories && previewData.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {previewData.categories.map((catId) => (
                      <span key={catId} className={`rounded-full px-3 py-1 text-xs font-medium ${getCategoryColor(catId)}`}>
                        {getCategoryIcon(catId)} {getCategoryName(catId)}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Images Gallery - Show both uploaded and URL images */}
              {((uploadedImages.length > 0) || (imageUrlInputs.filter(u => u).length > 0)) && (
                <div className="mb-8">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {/* Uploaded images preview */}
                    {uploadedImages.map((file, idx) => (
                      <img
                        key={`upload-${idx}`}
                        src={URL.createObjectURL(file)}
                        alt={`Uploaded ${idx + 1}`}
                        className="w-full rounded-xl object-cover shadow-md"
                        style={{ height: '250px' }}
                      />
                    ))}
                    {/* URL images preview */}
                    {imageUrlInputs.filter(url => url).map((url, idx) => (
                      <img
                        key={`url-${idx}`}
                        src={url}
                        alt={`Image ${idx + 1}`}
                        className="w-full rounded-xl object-cover shadow-md"
                        style={{ height: '250px' }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Content Sections */}
              <div className="prose prose-lg max-w-none">
                {previewData.content && previewData.content.map((section, idx) => (
                  (section.title || section.text) && (
                    <div key={idx} className="mb-8">
                      {section.title && (
                        <h2 className="mb-3 border-l-4 border-primary pl-4 text-left text-2xl font-bold text-black">
                          {section.title}
                        </h2>
                      )}
                      {section.text && (
                        <div
                          className="text-left leading-relaxed text-body"
                          dangerouslySetInnerHTML={{ __html: section.text }}
                        />
                      )}
                    </div>
                  )
                ))}
              </div>

              {/* Related Links */}
              {previewData.links && previewData.links.filter(link => link.url).length > 0 && (
                <div className="mt-10 rounded-xl bg-gray p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-black">
                    <MdLink className="text-primary" />
                    Related Links
                  </h3>
                  <ul className="space-y-2">
                    {previewData.links.map((link, idx) => (
                      link.url && (
                        <li key={idx}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-primary hover:underline"
                          >
                            🔗 {link.text || link.url}
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
          // Form Section
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Categories Card */}
                <div className="rounded-2xl bg-white p-6 shadow-card">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-meta-6/10">
                      <MdCategory className="h-5 w-5 text-meta-6" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-black">Categories</h2>
                      <p className="text-sm text-body">Select relevant categories</p>
                    </div>
                  </div>

                  {selectedCategories.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {selectedCategories.map((catId) => (
                        <span key={catId} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${getCategoryColor(catId)}`}>
                          {getCategoryIcon(catId)} {getCategoryName(catId)}
                          <button type="button" onClick={() => removeCategory(catId)} className="ml-1 rounded-full p-0.5 hover:bg-black/10">
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
                      className="flex w-full items-center justify-between rounded-lg border border-stroke bg-white px-5 py-3 text-left text-body focus:border-primary focus:outline-none"
                    >
                      <span>{selectedCategories.length === 0 ? 'Select categories...' : `${selectedCategories.length} selected`}</span>
                      <MdArrowDropDown size={20} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute left-0 right-0 top-full z-10 mt-2 max-h-60 overflow-y-auto rounded-lg border border-stroke bg-white shadow-4">
                        {categories.map((category) => (
                          <label key={category.id} className="flex cursor-pointer items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray">
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(category.id)}
                              onChange={() => handleCategorySelect(category.id)}
                              className="h-4 w-4 rounded border-stroke text-primary"
                            />
                            <span className="flex items-center gap-2 text-sm text-black">{category.icon} {category.name}</span>
                            {selectedCategories.includes(category.id) && <MdCheck size={16} className="ml-auto text-primary" />}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.categories && <p className="mt-2 text-sm text-meta-1">{errors.categories.message}</p>}
                </div>

                {/* Images Card - Multi Image Upload */}
                <div className="rounded-2xl bg-white p-6 shadow-card">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-meta-3/10">
                        <MdImage className="h-5 w-5 text-meta-3" />
                      </div>
                      <div>
                        <h2 className="font-semibold text-black">Images</h2>
                        <p className="text-sm text-body">Upload multiple images or add image URLs</p>
                      </div>
                    </div>
                    <label className="cursor-pointer rounded-lg border border-primary bg-white px-3 py-1.5 text-sm font-medium text-primary transition-all hover:bg-primary/5">
                      <MdCloudUpload size={16} className="inline mr-1" /> Upload Images
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>

                  {/* Uploaded Images Previews */}
                  {uploadedImages.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-body mb-2">Uploaded Images:</p>
                      <div className="flex flex-wrap gap-2">
                        {uploadedImages.map((file, idx) => (
                          <div key={idx} className="relative">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${idx}`}
                              className="h-20 w-20 rounded-lg object-cover border border-stroke"
                            />
                            <button
                              type="button"
                              onClick={() => removeUploadedImage(idx)}
                              className="absolute -right-1 -top-1 rounded-full bg-red-500 p-0.5 text-white hover:bg-red-600"
                            >
                              <MdClose size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Image URL Inputs */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-body">Image URLs:</p>
                      <button
                        type="button"
                        onClick={addImageUrlInput}
                        className="text-xs text-primary hover:underline"
                      >
                        + Add URL
                      </button>
                    </div>
                    {imageUrlInputs.map((url, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          value={url}
                          onChange={(e) => updateImageUrl(idx, e.target.value)}
                          className="flex-1 rounded-md border border-stroke bg-gray px-3 py-2 text-left text-sm text-body focus:border-primary focus:outline-none"
                          placeholder="https://example.com/image.jpg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImageUrlInput(idx)}
                          className="rounded-md bg-meta-1/10 p-2 text-meta-1 hover:bg-meta-1/20"
                        >
                          <MdDelete size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Publication Date */}
                <div className="rounded-2xl bg-white p-6 shadow-card">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-meta-5/10">
                      <MdTimer className="h-5 w-5 text-meta-5" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-black">Publication Date</h2>
                      <p className="text-sm text-body">When to publish this article</p>
                    </div>
                  </div>
                  <input
                    type="date"
                    {...register('publishedAt')}
                    className="w-full rounded-lg border border-stroke bg-white px-4 py-2.5 text-left text-sm text-black focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Content Sections */}
                <div className="rounded-2xl bg-white p-6 shadow-card">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-meta-5/10">
                        <MdDescription className="h-5 w-5 text-meta-5" />
                      </div>
                      <div>
                        <h2 className="font-semibold text-black">Content Sections</h2>
                        <p className="text-sm text-body">Organize your article with rich formatting</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => appendContent({title: '', text: ''})}
                      className="flex items-center gap-1 rounded-lg border border-primary bg-white px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/5"
                    >
                      <MdAdd size={16} /> Add Section
                    </button>
                  </div>

                  <div className="max-h-[600px] space-y-4 overflow-y-auto">
                    {contentFields.map((field, index) => (
                      <div key={field.id} className={`rounded-xl border-2 transition-all ${activeSection === index ? 'border-primary shadow-card' : 'border-stroke'}`}>
                        <div className="flex items-center justify-between border-b border-stroke bg-gray p-3">
                          <div className="flex items-center gap-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                              {index + 1}
                            </span>
                            <span className="text-sm font-medium text-black">Section</span>
                          </div>
                          {contentFields.length > 1 && (
                            <button type="button" onClick={() => removeContent(index)} className="rounded p-1 text-meta-1 hover:bg-meta-1/10">
                              <MdDelete size={18} />
                            </button>
                          )}
                        </div>
                        <div className="space-y-3 p-4">
                          <FormattedTextInput
                            value={watch(`content.${index}.title`) || ''}
                            onChange={(value: string) => setValue(`content.${index}.title`, value)}
                            placeholder="Section title (optional)"
                          />
                          <RichTextEditor
                            value={watch(`content.${index}.text`) || ''}
                            onChange={(value) => setValue(`content.${index}.text`, value)}
                            placeholder="Write your content here..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Related Links */}
                <div className="rounded-2xl bg-white p-6 shadow-card">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-meta-8/10">
                        <MdLink className="h-5 w-5 text-meta-8" />
                      </div>
                      <div>
                        <h2 className="font-semibold text-black">Related Links</h2>
                        <p className="text-sm text-body">Add references or sources</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => appendLink({url: '', text: ''})}
                      className="flex items-center gap-1 rounded-lg border border-primary bg-white px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/5"
                    >
                      <MdAdd size={16} /> Add Link
                    </button>
                  </div>

                  <div className="space-y-3">
                    {linkFields.map((field, index) => (
                      <div key={field.id} className="flex flex-col gap-2 rounded-lg border border-stroke p-3 sm:flex-row">
                        <input
                          {...register(`links.${index}.text`)}
                          className="flex-1 rounded-md border border-stroke bg-gray px-4 py-2.5 text-left text-sm text-body focus:border-primary focus:outline-none"
                          placeholder="Link text (optional)"
                        />
                        <input
                          {...register(`links.${index}.url`)}
                          className="flex-[2] rounded-md border border-stroke bg-gray px-4 py-2.5 text-left text-sm text-body focus:border-primary focus:outline-none"
                          placeholder="https://example.com"
                        />
                        {linkFields.length > 1 && (
                          <button type="button" onClick={() => removeLink(index)} className="rounded-md bg-meta-1/10 p-2 text-meta-1 hover:bg-meta-1/20">
                            <MdDelete size={18} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="sticky bottom-0 z-10 mt-6 rounded-2xl bg-white p-4 shadow-card">
              <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
                <button type="button" onClick={() => window.history.back()} className="rounded-lg border border-stroke bg-white px-8 py-2.5 font-medium text-body transition-colors hover:bg-gray">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-2.5 font-medium text-white shadow-default transition-all hover:bg-primary/90 disabled:opacity-50">
                  <MdSave size={18} />
                  {isSubmitting ? 'Publishing...' : 'Publish News'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateNews;