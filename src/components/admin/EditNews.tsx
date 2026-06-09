// EditNews.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import {
  MdAdd, MdDelete, MdImage, MdLink, MdDescription, MdCategory,
  MdPreview, MdSave, MdClose, MdFormatBold, MdFormatItalic,
  MdFormatUnderlined, MdFormatAlignLeft, MdFormatAlignCenter,
  MdFormatAlignRight, MdArrowDropDown, MdCheck, MdTimer,
  MdCloudUpload, MdEdit, MdOutlinePublishedWithChanges, MdWarning, MdCancel
} from 'react-icons/md';
import { useGetNewsById, useUpdateNews } from './newsApi';
import { useGetCategories } from '../category/categoryApi';

// Validation schema
const newsSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title cannot exceed 200 characters'),
  author: z.string()
    .max(100, 'Author name cannot exceed 100 characters')
    .optional(),
  publishedAt: z.string()
    .optional()
    .refine((date) => {
      if (!date) return true;
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime());
    }, 'Invalid date format'),
  categories: z.array(z.string())
    .min(1, 'At least one category is required'),
  content: z.array(
    z.object({
      title: z.string()
        .max(100, 'Section title cannot exceed 100 characters')
        .optional(),
      text: z.string()
        .min(1, 'Content text is required')
        .min(10, 'Content must be at least 10 characters'),
    })
  ).min(1, 'At least one content section is required'),
  images: z.array(z.string()).optional(),
  links: z.array(
    z.object({
      url: z.string()
        .url('Please enter a valid URL')
        .optional()
        .refine((url) => {
          if (!url) return true;
          return /^(https?:\/\/)/.test(url);
        }, 'URL must start with http:// or https://'),
      text: z.string()
        .max(200, 'Link text cannot exceed 200 characters')
        .optional(),
    })
  ).optional(),
});

type NewsFormData = z.infer<typeof newsSchema>;

// Helper Components
const ValidationError = ({ error }: { error?: { message?: string } }) => {
  if (!error?.message) return null;
  return (
    <div className="mt-1 flex items-center gap-1 text-sm text-red-600">
      <MdWarning size={14} />
      <span>{error.message}</span>
    </div>
  );
};

const RichTextEditor = ({ value, onChange, placeholder, error }: any) => {
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

  const execCommand = (command: string) => {
    document.execCommand(command, false);
    handleInput();
    editorRef.current?.focus();
  };

  return (
    <div className="space-y-1">
      <div className={`overflow-hidden rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'} bg-white`}>
        <div className="flex flex-wrap gap-1 border-b border-gray-300 bg-gray-50 p-2">
          <button type="button" onMouseDown={(e) => { e.preventDefault(); execCommand('bold'); }} className="rounded-md p-1.5 transition-colors hover:bg-white">
            <MdFormatBold size={18} />
          </button>
          <button type="button" onMouseDown={(e) => { e.preventDefault(); execCommand('italic'); }} className="rounded-md p-1.5 transition-colors hover:bg-white">
            <MdFormatItalic size={18} />
          </button>
          <button type="button" onMouseDown={(e) => { e.preventDefault(); execCommand('underline'); }} className="rounded-md p-1.5 transition-colors hover:bg-white">
            <MdFormatUnderlined size={18} />
          </button>
          <div className="mx-1 h-6 w-px bg-gray-300"></div>
          <button type="button" onMouseDown={(e) => { e.preventDefault(); execCommand('justifyLeft'); }} className="rounded-md p-1.5 transition-colors hover:bg-white">
            <MdFormatAlignLeft size={18} />
          </button>
          <button type="button" onMouseDown={(e) => { e.preventDefault(); execCommand('justifyCenter'); }} className="rounded-md p-1.5 transition-colors hover:bg-white">
            <MdFormatAlignCenter size={18} />
          </button>
          <button type="button" onMouseDown={(e) => { e.preventDefault(); execCommand('justifyRight'); }} className="rounded-md p-1.5 transition-colors hover:bg-white">
            <MdFormatAlignRight size={18} />
          </button>
        </div>
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="min-h-[200px] p-4 outline-none focus:ring-1 focus:ring-blue-500"
        />
        {(!value || value === '<br>') && !isFocused && (
          <div className="pointer-events-none absolute ml-4 mt-[-180px] text-gray-400">
            {placeholder || 'Write your content here...'}
          </div>
        )}
      </div>
      {error && <ValidationError error={{ message: error }} />}
    </div>
  );
};

const FormattedTextInput = ({ value, onChange, placeholder, error }: any) => {
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
          case 'bold': wrappedText = `**${selectedText}**`; break;
          case 'italic': wrappedText = `*${selectedText}*`; break;
          case 'underline': wrappedText = `_${selectedText}_`; break;
          default: return;
        }
        const newText = value.substring(0, start) + wrappedText + value.substring(end);
        onChange(newText);
        setTimeout(() => {
          inputRef.current?.focus();
          inputRef.current?.setSelectionRange(start + wrappedText.length, start + wrappedText.length);
        }, 10);
      }
    }
  };

  return (
    <div className="space-y-2">
      {showToolbar && (
        <div className="flex flex-wrap items-center gap-1 rounded-lg border border-gray-300 bg-gray-50 p-1.5">
          <span className="px-2 text-xs text-gray-600">Format text:</span>
          <button type="button" onClick={() => applyFormat('bold')} className="rounded-md px-2.5 py-1 text-sm font-bold transition-all hover:bg-white">
            <MdFormatBold size={16} className="mr-1 inline" /> Bold
          </button>
          <button type="button" onClick={() => applyFormat('italic')} className="rounded-md px-2.5 py-1 text-sm italic transition-all hover:bg-white">
            <MdFormatItalic size={16} className="mr-1 inline" /> Italic
          </button>
          <button type="button" onClick={() => applyFormat('underline')} className="rounded-md px-2.5 py-1 text-sm underline transition-all hover:bg-white">
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
        className={`w-full rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'} bg-white px-4 py-2.5 text-left text-sm font-medium text-black placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
        placeholder={placeholder}
      />
      {error && <ValidationError error={{ message: error }} />}
    </div>
  );
};

const getCategoryColor = (index: number) => {
  const colors = [
    'bg-blue-100 text-blue-700',
    'bg-green-100 text-green-700',
    'bg-purple-100 text-purple-700',
    'bg-orange-100 text-orange-700',
    'bg-pink-100 text-pink-700',
    'bg-indigo-100 text-indigo-700',
  ];
  return colors[index % colors.length];
};

const isValidImageUrl = (url: string): boolean => {
  if (!url || url.trim() === '') return false;
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch {
    return false;
  }
};

const EditNews = () => {
  const navigate = useNavigate();
  const { id } = useParams({ from: '/admin/news/edit/$id' });
  const { data: newsData, isLoading: isLoadingNews } = useGetNewsById(id as string);
  const { data: categoriesData, isLoading: isLoadingCategories } = useGetCategories();
  const updateNewsMutation = useUpdateNews();
  
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  const [newImageUrls, setNewImageUrls] = useState<string[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Extract categories
  let categories: any[] = [];
  if (categoriesData) {
    if (Array.isArray(categoriesData)) categories = categoriesData;
    else if (categoriesData.data && Array.isArray(categoriesData.data)) categories = categoriesData.data;
    else if (categoriesData.categories && Array.isArray(categoriesData.categories)) categories = categoriesData.categories;
  }

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<NewsFormData>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: '',
      author: '',
      publishedAt: new Date().toISOString().split('T')[0],
      categories: [],
      content: [{ title: '', text: '' }],
      images: [],
      links: [{ url: '', text: '' }],
    },
  });

  const {
    fields: contentFields,
    append: appendContent,
    remove: removeContent,
  } = useFieldArray({ control, name: 'content' });

  const {
    fields: linkFields,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({ control, name: 'links' });

  const previewData = watch();

  // Populate form when news data is loaded
  useEffect(() => {
    if (newsData && newsData.data) {
      const news = newsData.data;
      
      setValue('title', news.title || '');
      setValue('author', news.author || '');
      setValue('publishedAt', news.publishedAt?.split('T')[0] || new Date().toISOString().split('T')[0]);
      
      const categoryIds = news.categories?.map((cat: any) => 
        typeof cat === 'string' ? cat : cat._id || cat.id
      ).filter(Boolean) || [];
      setSelectedCategories(categoryIds);
      setValue('categories', categoryIds);
      
      if (news.content && news.content.length > 0) {
        setValue('content', news.content);
      }
      
      if (news.links && news.links.length > 0) {
        setValue('links', news.links);
      }
      
      const imageUrls = news.images?.filter((img: any) => typeof img === 'string') || [];
      setExistingImageUrls(imageUrls);
      
      trigger();
    }
  }, [newsData, setValue, trigger]);

  const handleCategorySelect = (categoryId: string) => {
    const updated = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];
    setSelectedCategories(updated);
    setValue('categories', updated);
    trigger('categories');
  };

  const removeCategory = (categoryId: string) => {
    const updated = selectedCategories.filter((id) => id !== categoryId);
    setSelectedCategories(updated);
    setValue('categories', updated);
    trigger('categories');
  };

  const getCategoryName = (id: string) => {
    const category = categories.find((c: any) => c.id === id || c._id === id);
    return category ? category.name : id;
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024;
      if (!isValidType) toast.error(`${file.name} is not an image file`);
      if (!isValidSize) toast.error(`${file.name} exceeds 5MB`);
      return isValidType && isValidSize;
    });
    setUploadedImages(prev => [...prev, ...validFiles]);
  };

  const removeExistingImage = (url: string) => {
    setExistingImageUrls(prev => prev.filter(u => u !== url));
    setImagesToDelete(prev => [...prev, url]);
  };

  const removeUploadedImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const addImageUrlInput = () => {
    setNewImageUrls(prev => [...prev, '']);
  };

  const updateNewImageUrl = (index: number, value: string) => {
    const newUrls = [...newImageUrls];
    newUrls[index] = value;
    setNewImageUrls(newUrls);
  };

  const removeNewImageUrl = (index: number) => {
    setNewImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: NewsFormData) => {
    setIsSubmitting(true);
    
    try {
      const hasNewFiles = uploadedImages.length > 0;
      const allImageUrls = [...existingImageUrls, ...newImageUrls.filter(url => url && isValidImageUrl(url))];
      
      if (hasNewFiles) {
        const formData = new FormData();
        
        formData.append('title', data.title);
        if (data.author) formData.append('author', data.author);
        if (data.publishedAt) formData.append('publishedAt', data.publishedAt);
        
        data.categories.forEach((category) => {
          formData.append('categories[]', category);
        });
        
        const formattedContent = data.content.map(item => ({
          title: item.title
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/_(.*?)_/g, '<u>$1</u>'),
          text: item.text,
        }));
        formData.append('content', JSON.stringify(formattedContent));
        
        const validLinks = data.links.filter(link => link.url && link.url.trim() !== '');
        formData.append('links', JSON.stringify(validLinks));
        
        uploadedImages.forEach((file) => {
          formData.append('newImages', file);
        });
        
        formData.append('existingImages', JSON.stringify(allImageUrls));
        
        if (imagesToDelete.length > 0) {
          formData.append('imagesToDelete', JSON.stringify(imagesToDelete));
        }
        
        await updateNewsMutation.mutateAsync({ id: id as string, data: formData, isFormData: true });
      } else {
        const payload = {
          title: data.title,
          author: data.author || '',
          publishedAt: data.publishedAt || new Date().toISOString(),
          categories: data.categories,
          content: data.content.map(item => ({
            title: item.title
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')
              .replace(/_(.*?)_/g, '<u>$1</u>'),
            text: item.text,
          })),
          images: allImageUrls,
          links: data.links.filter(link => link.url && link.url.trim() !== ''),
        };
        
        await updateNewsMutation.mutateAsync({ id: id as string, data: payload, isFormData: false });
      }
      
      navigate({ to: '/admin/news/allnews' });
    } catch (error: any) {
      console.error('Error updating news:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate({ to: '/admin/news/allnews' });
  };

  if (isLoadingNews || isLoadingCategories) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
              <p className="text-gray-600">Loading news data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="relative mb-6 overflow-hidden rounded-2xl bg-white p-6 shadow-md">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/10">
                  <MdEdit className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-blue-600">Edit Article</span>
              </div>
              <h1 className="text-3xl font-bold text-black">Edit News</h1>
              <p className="mt-1 text-gray-600">Update your news article</p>
            </div>
            <button
              onClick={() => setActiveTab(activeTab === 'write' ? 'preview' : 'write')}
              className={`flex items-center gap-2 rounded-lg px-5 py-2.5 font-medium transition-all ${
                activeTab === 'preview' ? 'border-2 border-blue-600 bg-white text-blue-600' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {activeTab === 'write' ? <MdPreview size={20} /> : <MdEdit size={20} />}
              {activeTab === 'write' ? 'Preview Mode' : 'Edit Mode'}
            </button>
          </div>

          {/* Title and Author */}
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-black">
                Title <span className="text-red-500">*</span>
              </label>
              <FormattedTextInput
                value={watch('title')}
                onChange={(value: string) => {
                  setValue('title', value);
                  trigger('title');
                }}
                placeholder="Enter news title..."
                error={errors.title?.message}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-black">Author</label>
              <input
                type="text"
                {...register('author')}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-black focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Author name"
              />
              <ValidationError error={errors.author} />
            </div>
          </div>
        </div>

        {activeTab === 'preview' ? (
          // Preview Section
          <div className="rounded-2xl bg-white p-8 shadow-md">
            <h1 className="mb-4 text-3xl font-bold text-black">{previewData.title || 'Your News Title'}</h1>
            {(previewData.author || previewData.publishedAt) && (
              <div className="mb-4 flex gap-4 border-b border-gray-200 pb-4 text-sm text-gray-600">
                {previewData.author && <span>By {previewData.author}</span>}
                {previewData.publishedAt && <span>{new Date(previewData.publishedAt).toLocaleDateString()}</span>}
              </div>
            )}
            {previewData.categories && previewData.categories.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {previewData.categories.map((catId, idx) => (
                  <span key={catId} className={`rounded-full px-3 py-1 text-xs font-medium ${getCategoryColor(idx)}`}>
                    {getCategoryName(catId)}
                  </span>
                ))}
              </div>
            )}
            {existingImageUrls.length > 0 && (
              <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3">
                {existingImageUrls.map((url, idx) => (
                  <img key={idx} src={url} alt={`Preview ${idx}`} className="h-48 w-full rounded-lg object-cover shadow-md" />
                ))}
              </div>
            )}
            {previewData.content?.map((section, idx) => (
              <div key={idx} className="mb-6">
                {section.title && (
                  <h2 className="mb-2 border-l-4 border-blue-600 pl-3 text-xl font-semibold text-black">
                    {section.title}
                  </h2>
                )}
                {section.text && (
                  <div
                    className="prose prose-sm max-w-none leading-relaxed text-gray-700"
                    dangerouslySetInnerHTML={{ __html: section.text }}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          // Form Section
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Categories */}
                <div className="rounded-2xl bg-white p-6 shadow-md">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600/10">
                      <MdCategory className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-black">
                        Categories <span className="text-red-500">*</span>
                      </h2>
                      <p className="text-sm text-gray-600">Select relevant categories</p>
                    </div>
                  </div>

                  {selectedCategories.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {selectedCategories.map((catId, idx) => (
                        <span key={catId} className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${getCategoryColor(idx)}`}>
                          {getCategoryName(catId)}
                          <button type="button" onClick={() => removeCategory(catId)} className="ml-1 rounded-full p-0.5 hover:bg-black/10">
                            ✕
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-5 py-3 text-left text-sm text-black focus:border-blue-500 focus:outline-none"
                    >
                      <span>{selectedCategories.length === 0 ? 'Select categories...' : `${selectedCategories.length} selected`}</span>
                      <MdArrowDropDown size={20} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute left-0 right-0 top-full z-10 mt-2 max-h-60 overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg">
                        {categories.length === 0 ? (
                          <div className="px-4 py-3 text-sm text-gray-500">No categories available</div>
                        ) : (
                          categories.map((category: any, idx: number) => {
                            const categoryId = category.id || category._id;
                            return (
                              <label key={categoryId} className="flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50">
                                <input
                                  type="checkbox"
                                  checked={selectedCategories.includes(categoryId)}
                                  onChange={() => handleCategorySelect(categoryId)}
                                  className="h-4 w-4 rounded border-gray-300 text-blue-600"
                                />
                                <span className="text-sm text-black">{category.name}</span>
                                {selectedCategories.includes(categoryId) && (
                                  <MdCheck size={16} className="ml-auto text-blue-600" />
                                )}
                              </label>
                            );
                          })
                        )}
                      </div>
                    )}
                  </div>
                  <ValidationError error={errors.categories} />
                </div>

                {/* Images */}
                <div className="rounded-2xl bg-white p-6 shadow-md">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600/10">
                        <MdImage className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h2 className="font-semibold text-black">Images</h2>
                        <p className="text-sm text-gray-600">Upload images or add image URLs</p>
                      </div>
                    </div>
                    <label className="cursor-pointer rounded-lg border border-blue-600 bg-white px-3 py-1.5 text-sm font-medium text-blue-600 transition-all hover:bg-blue-50">
                      <MdCloudUpload size={16} className="mr-1 inline" /> Upload Images
                      <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
                    </label>
                  </div>

                  {/* Existing Images */}
                  {existingImageUrls.length > 0 && (
                    <div className="mb-4">
                      <p className="mb-2 text-xs text-gray-500">Current Images:</p>
                      <div className="flex flex-wrap gap-2">
                        {existingImageUrls.map((url, idx) => (
                          <div key={idx} className="relative">
                            <img src={url} alt="Existing" className="h-20 w-20 rounded-lg border border-gray-300 object-cover" />
                            <button type="button" onClick={() => removeExistingImage(url)} className="absolute -right-1 -top-1 rounded-full bg-red-500 p-0.5 text-white hover:bg-red-600">
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* New Uploaded Images */}
                  {uploadedImages.length > 0 && (
                    <div className="mb-4">
                      <p className="mb-2 text-xs text-gray-500">New Images:</p>
                      <div className="flex flex-wrap gap-2">
                        {uploadedImages.map((file, idx) => (
                          <div key={idx} className="relative">
                            <img src={URL.createObjectURL(file)} alt="Preview" className="h-20 w-20 rounded-lg border border-gray-300 object-cover" />
                            <button type="button" onClick={() => removeUploadedImage(idx)} className="absolute -right-1 -top-1 rounded-full bg-red-500 p-0.5 text-white hover:bg-red-600">
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* New Image URLs */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">Image URLs:</p>
                      <button type="button" onClick={addImageUrlInput} className="text-xs text-blue-600 hover:underline">
                        + Add URL
                      </button>
                    </div>
                    {newImageUrls.map((url, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          value={url}
                          onChange={(e) => updateNewImageUrl(idx, e.target.value)}
                          className="flex-1 rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-black focus:border-blue-500 focus:outline-none"
                          placeholder="https://example.com/image.jpg"
                        />
                        <button type="button" onClick={() => removeNewImageUrl(idx)} className="rounded-md bg-red-100 p-2 text-red-600 hover:bg-red-200">
                          <MdDelete size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Publication Date */}
                <div className="rounded-2xl bg-white p-6 shadow-md">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600/10">
                      <MdTimer className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-black">Publication Date</h2>
                      <p className="text-sm text-gray-600">When to publish this article</p>
                    </div>
                  </div>
                  <input
                    type="date"
                    {...register('publishedAt')}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-black focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <ValidationError error={errors.publishedAt} />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Content Sections */}
                <div className="rounded-2xl bg-white p-6 shadow-md">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10">
                        <MdDescription className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="font-semibold text-black">
                          Content Sections <span className="text-red-500">*</span>
                        </h2>
                        <p className="text-sm text-gray-600">Organize your article with rich formatting</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => appendContent({ title: '', text: '' })}
                      className="flex items-center gap-1 rounded-lg border border-blue-600 bg-white px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50"
                    >
                      <MdAdd size={16} /> Add Section
                    </button>
                  </div>

                  <div className="max-h-[600px] space-y-4 overflow-y-auto">
                    {contentFields.map((field, index) => (
                      <div key={field.id} className="rounded-xl border border-gray-200 p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <span className="text-sm font-medium text-black">Section {index + 1}</span>
                          {contentFields.length > 1 && (
                            <button type="button" onClick={() => removeContent(index)} className="text-red-500 hover:text-red-700">
                              <MdDelete size={18} />
                            </button>
                          )}
                        </div>
                        <div className="space-y-3">
                          <FormattedTextInput
                            value={watch(`content.${index}.title`) || ''}
                            onChange={(value: string) => {
                              setValue(`content.${index}.title`, value);
                              trigger(`content.${index}.title`);
                            }}
                            placeholder="Section title (optional)"
                            error={errors.content?.[index]?.title?.message}
                          />
                          <RichTextEditor
                            value={watch(`content.${index}.text`) || ''}
                            onChange={(value) => {
                              setValue(`content.${index}.text`, value);
                              trigger(`content.${index}.text`);
                            }}
                            placeholder="Write your content here..."
                            error={errors.content?.[index]?.text?.message}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <ValidationError error={errors.content} />
                </div>

                {/* Related Links */}
                <div className="rounded-2xl bg-white p-6 shadow-md">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-600/10">
                        <MdLink className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h2 className="font-semibold text-black">Related Links</h2>
                        <p className="text-sm text-gray-600">Add references or sources</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => appendLink({ url: '', text: '' })}
                      className="flex items-center gap-1 rounded-lg border border-blue-600 bg-white px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50"
                    >
                      <MdAdd size={16} /> Add Link
                    </button>
                  </div>

                  <div className="space-y-3">
                    {linkFields.map((field, index) => (
                      <div key={field.id} className="flex flex-col gap-2 rounded-lg border border-gray-200 p-3 sm:flex-row">
                        <div className="flex-1">
                          <input
                            {...register(`links.${index}.text`)}
                            className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-black focus:border-blue-500 focus:outline-none"
                            placeholder="Link text (optional)"
                          />
                          <ValidationError error={errors.links?.[index]?.text} />
                        </div>
                        <div className="flex-[2]">
                          <input
                            {...register(`links.${index}.url`)}
                            className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-black focus:border-blue-500 focus:outline-none"
                            placeholder="https://example.com"
                          />
                          <ValidationError error={errors.links?.[index]?.url} />
                        </div>
                        {linkFields.length > 1 && (
                          <button type="button" onClick={() => removeLink(index)} className="rounded-md bg-red-100 p-2 text-red-600 hover:bg-red-200">
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
            <div className="sticky bottom-0 z-10 mt-6 rounded-2xl bg-white p-4 shadow-md">
              <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
                <button type="button" onClick={handleCancel} className="rounded-lg border border-gray-300 bg-white px-8 py-2.5 font-medium text-gray-700 transition-colors hover:bg-gray-50">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className={`flex items-center justify-center gap-2 rounded-lg px-8 py-2.5 font-medium text-white transition-all ${
                    isSubmitting || !isValid ? 'cursor-not-allowed bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  <MdSave size={18} />
                  {isSubmitting ? 'Updating...' : 'Update News'}
                </button>
              </div>
              {!isValid && Object.keys(errors).length > 0 && (
                <p className="mt-2 text-center text-sm text-red-500">Please fix all validation errors before updating</p>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditNews;