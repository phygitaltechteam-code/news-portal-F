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
});

type NewsFormData = z.infer<typeof newsSchema>;

// Mock categories
const categories = [
  { id: '1', name: 'Technology', color: 'bg-blue-100 text-blue-800' },
  { id: '2', name: 'Sports', color: 'bg-green-100 text-green-800' },
  { id: '3', name: 'Politics', color: 'bg-red-100 text-red-800' },
  { id: '4', name: 'Entertainment', color: 'bg-purple-100 text-purple-800' },
  { id: '5', name: 'Business', color: 'bg-yellow-100 text-yellow-800' },
  { id: '6', name: 'Health', color: 'bg-teal-100 text-teal-800' },
  { id: '7', name: 'Science', color: 'bg-indigo-100 text-indigo-800' },
];

const CreateNews = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
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

  const onSubmit = async (data: NewsFormData) => {
    console.log('News Data:', data);
    // API call will go here
    alert('News created successfully!');
  };

  // Rich text editor buttons (simplified)
  const applyFormat = (command: string) => {
    document.execCommand(command, false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Create News
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Create engaging news articles with rich content
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
            >
              <MdPreview size={20} />
              {showPreview ? 'Edit Mode' : 'Preview Mode'}
            </button>
          </div>
        </div>

        {showPreview ? (
          // Preview Section
          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-gray-800">
            <div className="mx-auto max-w-4xl">
              {/* Preview Header */}
              <div className="mb-8 border-b pb-4">
                <div className="mb-4 flex flex-wrap gap-2">
                  {previewData.categoryIds.map((catId) => {
                    const category = categories.find(c => c.id === catId);
                    return category ? (
                      <span key={catId} className={`rounded-full px-3 py-1 text-xs font-medium ${category.color}`}>
                        {category.name}
                      </span>
                    ) : null;
                  })}
                </div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  {previewData.title || 'Your News Title Here'}
                </h1>
              </div>

              {/* Preview Images */}
              {previewData.images.filter(img => img.url).length > 0 && (
                <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {previewData.images.map((img, idx) => (
                    img.url && (
                      <img
                        key={idx}
                        src={img.url}
                        alt={`Preview ${idx + 1}`}
                        className="h-64 w-full rounded-xl object-cover shadow-md"
                      />
                    )
                  ))}
                </div>
              )}

              {/* Preview Sections */}
              <div className="prose prose-lg max-w-none dark:prose-invert">
                {previewData.sections.map((section, idx) => (
                  section.subtitle || section.description ? (
                    <div key={idx} className="mb-6">
                      {section.subtitle && (
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                          {section.subtitle}
                        </h2>
                      )}
                      {section.description && (
                        <div 
                          className="mt-2 text-gray-600 dark:text-gray-400"
                          dangerouslySetInnerHTML={{ __html: section.description }}
                        />
                      )}
                    </div>
                  ) : null
                ))}
              </div>

              {/* Preview Links */}
              {previewData.links.filter(link => link.title && link.url).length > 0 && (
                <div className="mt-8 rounded-xl bg-gray-50 p-6 dark:bg-gray-700">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
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
                            className="text-blue-600 hover:underline dark:text-blue-400"
                          >
                            {link.title}
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
            {/* Title Section */}
            <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800">
              <div className="mb-4 flex items-center gap-2">
                <MdTitle size={24} className="text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Title
                </h2>
              </div>
              <div className="space-y-2">
                <div className="flex gap-2 border-b border-gray-200 pb-2">
                  <button type="button" onClick={() => applyFormat('bold')} className="rounded p-1 hover:bg-gray-100">
                    <MdFormatBold size={18} />
                  </button>
                  <button type="button" onClick={() => applyFormat('italic')} className="rounded p-1 hover:bg-gray-100">
                    <MdFormatItalic size={18} />
                  </button>
                  <button type="button" onClick={() => applyFormat('underline')} className="rounded p-1 hover:bg-gray-100">
                    <MdFormatUnderlined size={18} />
                  </button>
                  <div className="mx-1 w-px bg-gray-300" />
                  <button type="button" onClick={() => applyFormat('justifyLeft')} className="rounded p-1 hover:bg-gray-100">
                    <MdFormatAlignLeft size={18} />
                  </button>
                  <button type="button" onClick={() => applyFormat('justifyCenter')} className="rounded p-1 hover:bg-gray-100">
                    <MdFormatAlignCenter size={18} />
                  </button>
                  <button type="button" onClick={() => applyFormat('justifyRight')} className="rounded p-1 hover:bg-gray-100">
                    <MdFormatAlignRight size={18} />
                  </button>
                </div>
                <input
                  type="text"
                  {...register('title')}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg font-bold focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter news title..."
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>
            </div>

            {/* Images Section */}
            <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MdImage size={24} className="text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Images
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => appendImage({ url: '' })}
                  className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                >
                  <MdAdd size={16} /> Add Image
                </button>
              </div>
              <div className="space-y-3">
                {imageFields.map((field, index) => (
                  <div key={field.id} className="flex gap-3">
                    <input
                      {...register(`images.${index}.url`)}
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder="Image URL (e.g., https://example.com/image.jpg)"
                    />
                    {imageFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="rounded-lg bg-red-100 px-3 text-red-600 hover:bg-red-200"
                      >
                        <MdDelete size={20} />
                      </button>
                    )}
                  </div>
                ))}
                {errors.images && (
                  <p className="text-sm text-red-500">{errors.images.message}</p>
                )}
              </div>
            </div>

            {/* Categories Section - Multi-Select Dropdown */}
            <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800">
              <div className="mb-4 flex items-center gap-2">
                <MdCategory size={24} className="text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Categories
                </h2>
                <span className="text-sm text-red-500">*</span>
              </div>
              
              {/* Selected Categories Tags */}
              {selectedCategories.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {selectedCategories.map((catId) => (
                    <span
                      key={catId}
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${getCategoryColor(catId)}`}
                    >
                      {getCategoryName(catId)}
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

              {/* Dropdown Button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-left text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                >
                  <span>
                    {selectedCategories.length === 0
                      ? 'Select categories...'
                      : `${selectedCategories.length} category(ies) selected`}
                  </span>
                  <MdArrowDropDown size={20} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-60 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800">
                    {categories.map((category) => (
                      <label
                        key={category.id}
                        className="flex cursor-pointer items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => handleCategorySelect(category.id)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="flex-1 text-sm text-gray-700 dark:text-gray-300">
                          {category.name}
                        </span>
                        {selectedCategories.includes(category.id) && (
                          <MdCheck size={16} className="text-blue-600" />
                        )}
                      </label>
                    ))}
                  </div>
                )}
              </div>
              
              {errors.categoryIds && (
                <p className="mt-2 text-sm text-red-500">{errors.categoryIds.message}</p>
              )}
            </div>

            {/* Content Sections (Subtitle + Description) */}
            <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MdDescription size={24} className="text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Content Sections
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => appendSection({ subtitle: '', description: '' })}
                  className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                >
                  <MdAdd size={16} /> Add Section
                </button>
              </div>
              <div className="space-y-6">
                {sectionFields.map((field, index) => (
                  <div key={field.id} className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-medium text-gray-700 dark:text-gray-300">
                        Section {index + 1}
                      </h3>
                      {sectionFields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSection(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <MdDelete size={20} />
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <input
                        {...register(`sections.${index}.subtitle`)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        placeholder="Subtitle (optional)"
                      />
                      <textarea
                        {...register(`sections.${index}.description`)}
                        rows={5}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        placeholder="Write your content here... You can use HTML tags for formatting"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Links Section */}
            <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MdLink size={24} className="text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Related Links
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => appendLink({ title: '', url: '' })}
                  className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                >
                  <MdAdd size={16} /> Add Link
                </button>
              </div>
              <div className="space-y-3">
                {linkFields.map((field, index) => (
                  <div key={field.id} className="flex gap-3">
                    <input
                      {...register(`links.${index}.title`)}
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder="Link Title"
                    />
                    <input
                      {...register(`links.${index}.url`)}
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder="URL"
                    />
                    {linkFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeLink(index)}
                        className="rounded-lg bg-red-100 px-3 text-red-600 hover:bg-red-200"
                      >
                        <MdDelete size={20} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
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