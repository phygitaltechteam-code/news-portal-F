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

// Schema for validation
const newsSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  images: z
    .array(
      z.object({
        url: z.string(),
        file: z.any().optional(),
      }),
    )
    .min(1, 'At least one image is required'),
  categoryIds: z.array(z.string()).min(1, 'At least one category is required'),
  sections: z.array(
    z.object({
      subtitle: z.string(),
      description: z.string(),
    }),
  ),
  links: z.array(
    z.object({
      title: z.string(),
      url: z.string().url('Must be a valid URL'),
    }),
  ),
  metaDescription: z.string().optional(),
  featured: z.boolean().default(false),
});

type NewsFormData = z.infer<typeof newsSchema>;

// Categories with your theme colors
const categories = [
  {id: '1', name: 'Technology', color: 'bg-meta-5/10 text-meta-5', icon: '💻'},
  {id: '2', name: 'Sports', color: 'bg-meta-3/10 text-meta-3', icon: '⚽'},
  {id: '3', name: 'Politics', color: 'bg-meta-1/10 text-meta-1', icon: '🏛️'},
  {
    id: '4',
    name: 'Entertainment',
    color: 'bg-meta-6/10 text-meta-6',
    icon: '🎬',
  },
  {id: '5', name: 'Business', color: 'bg-meta-8/10 text-meta-8', icon: '📈'},
  {id: '6', name: 'Health', color: 'bg-meta-3/10 text-meta-3', icon: '🏥'},
  {id: '7', name: 'Science', color: 'bg-meta-5/10 text-meta-5', icon: '🔬'},
];

// Rich Text Editor Component with alignment
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
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 border-b border-stroke bg-gray p-2">
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            execCommand('bold');
          }}
          className="rounded-md p-1.5 text-body transition-colors hover:bg-white hover:text-primary"
          title="Bold (Ctrl+B)"
        >
          <MdFormatBold size={18} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            execCommand('italic');
          }}
          className="rounded-md p-1.5 text-body transition-colors hover:bg-white hover:text-primary"
          title="Italic (Ctrl+I)"
        >
          <MdFormatItalic size={18} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            execCommand('underline');
          }}
          className="rounded-md p-1.5 text-body transition-colors hover:bg-white hover:text-primary"
          title="Underline (Ctrl+U)"
        >
          <MdFormatUnderlined size={18} />
        </button>
        <div className="mx-1 h-6 w-px bg-stroke"></div>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            execCommand('justifyLeft');
          }}
          className="rounded-md p-1.5 text-body transition-colors hover:bg-white hover:text-primary"
          title="Align Left"
        >
          <MdFormatAlignLeft size={18} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            execCommand('justifyCenter');
          }}
          className="rounded-md p-1.5 text-body transition-colors hover:bg-white hover:text-primary"
          title="Align Center"
        >
          <MdFormatAlignCenter size={18} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            execCommand('justifyRight');
          }}
          className="rounded-md p-1.5 text-body transition-colors hover:bg-white hover:text-primary"
          title="Align Right"
        >
          <MdFormatAlignRight size={18} />
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`prose prose-sm min-h-[200px] max-w-none p-4 text-left text-body outline-none focus:ring-1 focus:ring-primary ${isFocused ? 'ring-1 ring-primary' : ''}`}
        style={{
          cursor: 'text',
          direction: 'ltr',
          textAlign: 'left',
        }}
        data-placeholder={placeholder}
      />
      {(!value || value === '<br>') && !isFocused && (
        <div className="text-gray-400 pointer-events-none absolute ml-4 mt-[-180px]">
          {placeholder}
        </div>
      )}
    </div>
  );
};

// Simple Text Input for Title
const FormattedTitleInput = ({value, onChange, placeholder, error}: any) => {
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

        const newText =
          value.substring(0, start) + wrappedText + value.substring(end);
        onChange(newText);

        setTimeout(() => {
          inputRef.current?.focus();
          inputRef.current?.setSelectionRange(
            start + wrappedText.length,
            start + wrappedText.length,
          );
        }, 10);
      } else {
        alert('Please select text first');
      }
    }
  };

  // Convert markdown to HTML for display
  const displayValue = value
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.*?)_/g, '<u>$1</u>');

  return (
    <div className="space-y-2">
      {showToolbar && (
        <div className="flex flex-wrap items-center gap-1 rounded-lg border border-stroke bg-gray p-1.5">
          <span className="px-2 text-xs text-body">Format title:</span>
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
        className="w-full rounded-lg border border-stroke bg-white px-5 py-3 text-left text-lg font-semibold text-black placeholder-body/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
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
  const [uploadingImages, setUploadingImages] = useState<{
    [key: number]: boolean;
  }>({});

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
      images: [{url: '', file: undefined}],
      categoryIds: [],
      sections: [{subtitle: '', description: ''}],
      links: [{title: '', url: ''}],
      metaDescription: '',
      featured: false,
    },
  });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({control, name: 'images'});

  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({control, name: 'sections'});

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
    setValue('categoryIds', updated);
  };

  const removeCategory = (categoryId: string) => {
    const updated = selectedCategories.filter((id) => id !== categoryId);
    setSelectedCategories(updated);
    setValue('categoryIds', updated);
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

  const handleImageFileUpload = (index: number, file: File) => {
    setUploadingImages((prev) => ({...prev, [index]: true}));
    const previewUrl = URL.createObjectURL(file);
    setValue(`images.${index}.url`, previewUrl);
    setValue(`images.${index}.file`, file);
    setUploadingImages((prev) => ({...prev, [index]: false}));
  };

  // Convert markdown to HTML for preview
  const formatTextForPreview = (text: string) => {
    if (!text) return '';
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/_(.*?)_/g, '<u class="underline">$1</u>');
  };

  const getFormattedTitle = (title: string) => {
    if (!title) return 'Your News Title Here';
    return title
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/_(.*?)_/g, '<u class="underline">$1</u>');
  };

  const onSubmit = async (data: NewsFormData) => {
    try {
      const formData = new FormData();
      const formattedTitle = data.title
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/_(.*?)_/g, '<u>$1</u>');

      formData.append('title', formattedTitle);
      formData.append('categoryIds', JSON.stringify(data.categoryIds));
      formData.append('metaDescription', data.metaDescription || '');
      formData.append('featured', String(data.featured));

      data.images.forEach((image) => {
        if (image.file) {
          formData.append(`images`, image.file);
        } else if (image.url) {
          formData.append(`imageUrls`, image.url);
        }
      });

      formData.append('sections', JSON.stringify(data.sections));
      formData.append('links', JSON.stringify(data.links));

      const response = await createNews(formData);

      if (response.success) {
        alert('News created successfully!');
        window.location.href = '/news';
      } else {
        alert(response.message || 'Failed to create news');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while creating the news');
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
                <span className="text-sm font-medium text-primary">
                  Create New Article
                </span>
              </div>
              <h1 className="text-title-xl2 font-bold text-black">
                Write News
              </h1>
              <p className="mt-1 text-body">
                Create engaging news articles with rich content and media
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() =>
                  setActiveTab(activeTab === 'write' ? 'preview' : 'write')
                }
                className={`flex items-center gap-2 rounded-lg px-5 py-2.5 font-medium transition-all duration-200 ${
                  activeTab === 'preview'
                    ? 'border-2 border-primary bg-white text-primary hover:bg-primary/5'
                    : 'bg-primary text-white shadow-default hover:bg-primary/90'
                }`}
              >
                {activeTab === 'write' ? (
                  <MdPreview size={20} />
                ) : (
                  <MdEdit size={20} />
                )}
                {activeTab === 'write' ? 'Preview Mode' : 'Edit Mode'}
              </button>
            </div>
          </div>

          {/* Title Input */}
          <div className="mt-4">
            <FormattedTitleInput
              value={watchTitle}
              onChange={(value: string) => setValue('title', value)}
              placeholder="Enter news title... (Select text to format with **bold**, *italic*, _underline_)"
              error={errors.title?.message}
            />
          </div>
        </div>

        {/* Main Content Area */}
        {activeTab === 'preview' ? (
          // Preview Section
          <div
            className="overflow-hidden rounded-2xl bg-white shadow-card"
            dir="ltr"
          >
            {previewData.images[0]?.url && (
              <div className="relative h-96 w-full">
                <img
                  src={previewData.images[0].url}
                  alt="Cover"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://via.placeholder.com/1200x600?text=Image+Not+Found';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {previewData.categoryIds.map((catId) => (
                      <span
                        key={catId}
                        className={`rounded-full px-3 py-1 text-xs font-medium ${getCategoryColor(catId)} backdrop-blur-sm`}
                      >
                        {getCategoryIcon(catId)} {getCategoryName(catId)}
                      </span>
                    ))}
                  </div>
                  <h1
                    className="text-left text-3xl font-bold text-white md:text-4xl lg:text-5xl"
                    dangerouslySetInnerHTML={{
                      __html: getFormattedTitle(previewData.title),
                    }}
                  />
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
                  {previewData.images
                    .slice(1)
                    .map(
                      (img, idx) =>
                        img.url && (
                          <img
                            key={idx}
                            src={img.url}
                            alt={`Gallery ${idx + 1}`}
                            className="h-48 w-full rounded-xl object-cover shadow-md transition-transform hover:scale-105"
                          />
                        ),
                    )}
                </div>
              )}

              {/* Content preview with formatted text */}
              <div className="prose prose-lg max-w-none text-left">
                {previewData.sections.map(
                  (section, idx) =>
                    (section.subtitle || section.description) && (
                      <div key={idx} className="mb-8">
                        {section.subtitle && (
                          <h2 className="mb-3 border-l-4 border-primary pl-4 text-left text-2xl font-bold text-black">
                            {section.subtitle}
                          </h2>
                        )}
                        {section.description && (
                          <div
                            className="text-left leading-relaxed text-body"
                            dangerouslySetInnerHTML={{
                              __html: section.description,
                            }}
                            style={{textAlign: 'left'}}
                          />
                        )}
                      </div>
                    ),
                )}
              </div>

              {/* Links section */}
              {previewData.links.filter((link) => link.title && link.url)
                .length > 0 && (
                <div className="mt-10 rounded-xl bg-gray p-6 text-left">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-black">
                    <MdLink className="text-primary" />
                    Related Links
                  </h3>
                  <ul className="space-y-2">
                    {previewData.links.map(
                      (link, idx) =>
                        link.title &&
                        link.url && (
                          <li key={idx}>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-primary hover:underline"
                            >
                              🔗 {link.title}
                            </a>
                          </li>
                        ),
                    )}
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
                {/* Images Card */}
                <div className="rounded-2xl bg-white p-6 shadow-card">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-meta-3/10">
                        <MdImage className="h-5 w-5 text-meta-3" />
                      </div>
                      <div>
                        <h2 className="font-semibold text-black">Images</h2>
                        <p className="text-sm text-body">
                          Add images via URL or upload
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => appendImage({url: '', file: undefined})}
                      className="flex items-center gap-1 rounded-lg border border-primary bg-white px-3 py-1.5 text-sm font-medium text-primary transition-all hover:bg-primary/5"
                    >
                      <MdAdd size={16} /> Add Image
                    </button>
                  </div>

                  <div className="max-h-96 space-y-3 overflow-y-auto">
                    {imageFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="group rounded-lg border border-stroke p-3 transition-all hover:border-primary/30"
                      >
                        <div className="flex items-start gap-3">
                          <MdDragHandle className="mt-2 h-5 w-5 cursor-move text-body/30" />
                          <div className="flex-1 space-y-2">
                            <input
                              {...register(`images.${index}.url`)}
                              className="w-full rounded-md border border-stroke bg-gray px-3 py-2 text-left text-sm text-body focus:border-primary focus:outline-none"
                              placeholder="https://example.com/image.jpg"
                            />
                            <div className="relative">
                              <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-stroke"></div>
                              </div>
                              <div className="relative flex justify-center text-xs">
                                <span className="bg-white px-2 text-body">
                                  OR
                                </span>
                              </div>
                            </div>
                            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-dashed border-stroke bg-gray p-2 transition-all hover:border-primary">
                              <MdCloudUpload
                                size={18}
                                className="text-primary"
                              />
                              <span className="text-xs text-body">
                                Upload Image
                              </span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleImageFileUpload(index, file);
                                }}
                              />
                            </label>
                            {watch(`images.${index}.url`) && (
                              <img
                                src={watch(`images.${index}.url`)}
                                alt="Preview"
                                className="h-20 w-20 rounded-lg object-cover"
                              />
                            )}
                          </div>
                          {imageFields.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="text-meta-1"
                            >
                              <MdDelete size={18} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.images && (
                    <p className="mt-2 text-sm text-meta-1">
                      {errors.images.message}
                    </p>
                  )}
                </div>

                {/* Categories Card */}
                <div className="rounded-2xl bg-white p-6 shadow-card">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-meta-6/10">
                      <MdCategory className="h-5 w-5 text-meta-6" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-black">Categories</h2>
                      <p className="text-sm text-body">
                        Select relevant categories
                      </p>
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
                      className="flex w-full items-center justify-between rounded-lg border border-stroke bg-white px-5 py-3 text-left text-body focus:border-primary focus:outline-none"
                    >
                      <span>
                        {selectedCategories.length === 0
                          ? 'Select categories...'
                          : `${selectedCategories.length} selected`}
                      </span>
                      <MdArrowDropDown
                        size={20}
                        className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute left-0 right-0 top-full z-10 mt-2 max-h-60 overflow-y-auto rounded-lg border border-stroke bg-white shadow-4">
                        {categories.map((category) => (
                          <label
                            key={category.id}
                            className="flex cursor-pointer items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray"
                          >
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(category.id)}
                              onChange={() => handleCategorySelect(category.id)}
                              className="h-4 w-4 rounded border-stroke text-primary"
                            />
                            <span className="flex items-center gap-2 text-sm text-black">
                              {category.icon} {category.name}
                            </span>
                            {selectedCategories.includes(category.id) && (
                              <MdCheck
                                size={16}
                                className="ml-auto text-primary"
                              />
                            )}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.categoryIds && (
                    <p className="mt-2 text-sm text-meta-1">
                      {errors.categoryIds.message}
                    </p>
                  )}
                </div>

                {/* Meta Description */}
                <div className="rounded-2xl bg-white p-6 shadow-card">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-meta-5/10">
                      <MdPublic className="h-5 w-5 text-meta-5" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-black">
                        Meta Description
                      </h2>
                      <p className="text-sm text-body">
                        Brief summary for SEO (150-160 characters)
                      </p>
                    </div>
                  </div>
                  <textarea
                    {...register('metaDescription')}
                    rows={3}
                    className="w-full rounded-lg border border-stroke bg-white px-4 py-2.5 text-left text-sm text-body focus:border-primary focus:outline-none"
                    placeholder="Write a concise summary of your article for search engines..."
                  />
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-meta-3">
                      Tip: Include key keywords
                    </span>
                    <span
                      className={`text-xs ${(watch('metaDescription')?.length || 0) > 160 ? 'text-meta-1' : 'text-body'}`}
                    >
                      {watch('metaDescription')?.length || 0}/160 characters
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Content Sections with Rich Text Editor */}
                <div className="rounded-2xl bg-white p-6 shadow-card">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-meta-5/10">
                        <MdDescription className="h-5 w-5 text-meta-5" />
                      </div>
                      <div>
                        <h2 className="font-semibold text-black">
                          Content Sections
                        </h2>
                        <p className="text-sm text-body">
                          Organize your article with rich formatting
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        appendSection({subtitle: '', description: ''})
                      }
                      className="flex items-center gap-1 rounded-lg border border-primary bg-white px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/5"
                    >
                      <MdAdd size={16} /> Add Section
                    </button>
                  </div>

                  <div className="max-h-[600px] space-y-4 overflow-y-auto">
                    {sectionFields.map((field, index) => (
                      <div
                        key={field.id}
                        className={`rounded-xl border-2 transition-all ${activeSection === index ? 'border-primary shadow-card' : 'border-stroke'}`}
                      >
                        <div className="flex items-center justify-between border-b border-stroke bg-gray p-3">
                          <div className="flex items-center gap-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                              {index + 1}
                            </span>
                            <span className="text-sm font-medium text-black">
                              Section
                            </span>
                          </div>
                          {sectionFields.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeSection(index)}
                              className="rounded p-1 text-meta-1 hover:bg-meta-1/10"
                            >
                              <MdDelete size={18} />
                            </button>
                          )}
                        </div>
                        <div className="space-y-3 p-4">
                          <input
                            {...register(`sections.${index}.subtitle`)}
                            className="w-full rounded-lg border border-stroke bg-white px-4 py-2.5 text-left text-sm font-medium text-black focus:border-primary focus:outline-none"
                            placeholder="Section subtitle (optional)"
                          />

                          {/* Rich Text Editor with Alignment */}
                          <RichTextEditor
                            value={watch(`sections.${index}.description`) || ''}
                            onChange={(value) =>
                              setValue(`sections.${index}.description`, value)
                            }
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
                        <h2 className="font-semibold text-black">
                          Related Links
                        </h2>
                        <p className="text-sm text-body">
                          Add references or sources
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => appendLink({title: '', url: ''})}
                      className="flex items-center gap-1 rounded-lg border border-primary bg-white px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/5"
                    >
                      <MdAdd size={16} /> Add Link
                    </button>
                  </div>

                  <div className="space-y-3">
                    {linkFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex flex-col gap-2 rounded-lg border border-stroke p-3 sm:flex-row"
                      >
                        <input
                          {...register(`links.${index}.title`)}
                          className="flex-1 rounded-md border border-stroke bg-gray px-4 py-2.5 text-left text-sm text-body focus:border-primary focus:outline-none"
                          placeholder="Link title"
                        />
                        <input
                          {...register(`links.${index}.url`)}
                          className="flex-[2] rounded-md border border-stroke bg-gray px-4 py-2.5 text-left text-sm text-body focus:border-primary focus:outline-none"
                          placeholder="https://example.com"
                        />
                        {linkFields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeLink(index)}
                            className="rounded-md bg-meta-1/10 p-2 text-meta-1 hover:bg-meta-1/20"
                          >
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
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateNews;
