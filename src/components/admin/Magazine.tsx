import React, {useState} from 'react';
import {useForm, useFieldArray} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {
  MdAdd,
  MdDelete,
  MdEdit,
  MdImage,
  MdTitle,
  MdPreview,
  MdSave,
  MdClose,
  MdDownload,
  MdVisibility,
  MdSearch,
  MdChevronLeft,
  MdChevronRight,
  MdContentCopy,
  MdCloudUpload,
} from 'react-icons/md';
import {useSubmitMagzine} from '@/lib/magzine/magzine';
import {useQueryClient} from '@tanstack/react-query';
import toast from 'react-hot-toast';

// Content section schema
const contentSectionSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  content: z.string().min(1, 'Content is required'),
  imageUrl: z.string().url('Must be a valid image URL').optional(),
});
// Magazine schema with sections
const magazineSchema = z.object({
  name: z.string().min(1, 'Magazine name is required'),
  coverImage: z
    .string()
    .url('Must be a valid image URL')
    .min(1, 'Cover image is required'),
  publishDate: z.string().min(1, 'Publish date is required'),
  sections: z
    .array(contentSectionSchema)
    .min(1, 'At least one content section is required'),
});

type MagazineFormData = z.infer<typeof magazineSchema>;
type ContentSection = z.infer<typeof contentSectionSchema>;

// Mock magazines data
const mockMagazines = [
  {
    id: '1',
    name: 'Vogue India - January 2024',
    coverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400',
    publishDate: '2024-01-15',
    sections: [
      {
        title: 'Spring Fashion Trends',
        description: 'The latest trends for spring season',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        imageUrl:
          'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400',
      },
      {
        title: 'Summer Collection Preview',
        description: 'What to expect in the upcoming summer season',
        content:
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        imageUrl:
          'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400',
      },
    ],
    views: 2840,
    downloads: 1234,
  },
  {
    id: '2',
    name: 'Tech Today - February 2024',
    coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400',
    publishDate: '2024-02-01',
    sections: [
      {
        title: 'AI Revolution',
        description: 'How AI is changing the world',
        content:
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        imageUrl:
          'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400',
      },
    ],
    views: 5120,
    downloads: 3421,
  },
  {
    id: '3',
    name: 'Healthy Living - Spring 2024',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
    publishDate: '2024-03-10',
    sections: [
      {
        title: 'Wellness Tips',
        description: 'Essential tips for a healthy lifestyle',
        content:
          'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        imageUrl:
          'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
      },
    ],
    views: 1890,
    downloads: 876,
  },
];

const Magazine = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingMagazine, setEditingMagazine] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [magazines, setMagazines] = useState(mockMagazines);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSectionTab, setActiveSectionTab] = useState<number>(0);
  const [uploadingImage, setUploadingImage] = useState<{
    [key: number]: boolean;
  }>({});
  const [uploadingCoverImage, setUploadingCoverImage] = useState(false);

  const queryClient = useQueryClient();
  const {mutateAsync: submitMagazine, isPending} = useSubmitMagzine();

  const itemsPerPage = 6;

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: {errors, isSubmitting},
  } = useForm<MagazineFormData>({
    resolver: zodResolver(magazineSchema),
    defaultValues: {
      name: '',
      coverImage: '',
      publishDate: new Date().toISOString().split('T')[0],
      sections: [
        {
          title: '',
          description: '',
          content: '',
          imageUrl: '',
        },
      ],
    },
  });

  const {fields, append, remove} = useFieldArray({
    control,
    name: 'sections',
  });

  const watchAll = watch();
  const previewData = watchAll;
  const sections = watch('sections');

  // Handle cover image upload
  const handleCoverImageUpload = async (file: File) => {
    setUploadingCoverImage(true);
    
    // Simulate upload delay
    setTimeout(() => {
      // Create a temporary URL for preview
      const imageUrl = URL.createObjectURL(file);
      setValue('coverImage', imageUrl);
      setUploadingCoverImage(false);
      toast.success('Cover image uploaded successfully!');
    }, 1000);
  };

  // Simulate image upload for sections
  const handleImageUpload = async (index: number, file: File) => {
    setUploadingImage((prev) => ({...prev, [index]: true}));

    // Simulate upload delay
    setTimeout(() => {
      // Create a temporary URL for preview
      const imageUrl = URL.createObjectURL(file);
      setValue(`sections.${index}.imageUrl`, imageUrl);
      setUploadingImage((prev) => ({...prev, [index]: false}));
      toast.success('Image uploaded successfully!');
    }, 1000);
  };

  const addSection = () => {
    const newSection: ContentSection = {
      title: '',
      description: '',
      content: '',
      imageUrl: '',
    };
    append(newSection);
    setActiveSectionTab(fields.length);
    toast.success('New section added');
  };

  const duplicateSection = (index: number) => {
    const sectionToDuplicate = sections[index];
    const duplicatedSection = {
      ...sectionToDuplicate,
      id: undefined,
    };
    append(duplicatedSection);
    toast.success('Section duplicated');
  };

  const onSubmit = async (data: MagazineFormData) => {
    try {
      setIsLoading(true);

      const payload = {
        id: editingMagazine?.id,
        ...data,
      };

      console.log('Submitting Magazine Data:', payload);

      const response = await submitMagazine(payload);

      if (
        response?.data?.success ||
        response?.status === 200 ||
        response?.status === 201
      ) {
        toast.success(
          editingMagazine
            ? 'Magazine updated successfully!'
            : 'Magazine created successfully!',
        );
        queryClient.invalidateQueries({queryKey: ['magazines']});

        const newMagazine = {
          id: editingMagazine?.id || Date.now().toString(),
          ...data,
          views: editingMagazine?.views || 0,
          downloads: editingMagazine?.downloads || 0,
        };

        if (editingMagazine) {
          setMagazines(
            magazines.map((m) =>
              m.id === editingMagazine.id ? newMagazine : m,
            ),
          );
        } else {
          setMagazines([newMagazine, ...magazines]);
        }

        reset();
        setEditingMagazine(null);
        setShowForm(false);
        setShowPreview(false);
      } else {
        toast.error(response?.data?.message || 'Failed to save magazine');
      }
    } catch (error: any) {
      console.error('Error saving magazine:', error);
      toast.error(
        error?.response?.data?.message ||
          'An error occurred while saving the magazine',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (magazine: any) => {
    setEditingMagazine(magazine);
    setValue('name', magazine.name);
    setValue('coverImage', magazine.coverImage);
    setValue('publishDate', magazine.publishDate);
    setValue('sections', magazine.sections || []);
    setShowForm(true);
    setActiveSectionTab(0);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this magazine?')) {
      try {
        setMagazines(magazines.filter((m) => m.id !== id));
        toast.success('Magazine deleted successfully!');
        queryClient.invalidateQueries({queryKey: ['magazines']});
      } catch (error) {
        console.error('Error deleting magazine:', error);
        toast.error('Failed to delete magazine');
      }
    }
  };

  const handleCancel = () => {
    reset();
    setEditingMagazine(null);
    setShowForm(false);
    setShowPreview(false);
    setActiveSectionTab(0);
  };

  // Filter magazines
  const filteredMagazines = magazines.filter((mag) => {
    return mag.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Pagination
  const totalPages = Math.ceil(filteredMagazines.length / itemsPerPage);
  const paginatedMagazines = filteredMagazines.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
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
                <span className="text-sm font-medium text-primary">
                  Digital Library
                </span>
              </div>
              <h1 className="text-title-xl2 font-bold text-black">
                Magazine Manager
              </h1>
              <p className="mt-1 text-body">
                Create and manage your magazine content
              </p>
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
          <div className="mb-8 overflow-hidden rounded-2xl bg-white shadow-card">
            <div className="flex items-center justify-between border-b border-stroke bg-gray px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  {editingMagazine ? (
                    <MdEdit className="text-primary" />
                  ) : (
                    <MdAdd className="text-primary" />
                  )}
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
                <button
                  onClick={handleCancel}
                  className="text-body hover:text-meta-1"
                >
                  <MdClose size={24} />
                </button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={`flex-1 p-6 ${showPreview ? 'lg:w-1/2' : 'w-full'}`}
              >
                <div className="space-y-5">
                  {/* Basic Information */}
                  <div className="border-b border-stroke pb-4">
                    <h3 className="text-md mb-4 font-semibold text-black">
                      Magazine Information
                    </h3>

                    {/* Magazine Name and Publish Date - Side by Side */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {/* Magazine Name */}
                      <div>
                        <label className="mb-2 block text-sm font-medium text-black">
                          Magazine Name <span className="text-meta-1">*</span>
                        </label>
                        <div className="relative">
                          <MdTitle
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-body/50"
                            size={18}
                          />
                          <input
                            {...register('name')}
                            className="w-full rounded-lg border border-stroke bg-white py-2.5 pl-10 pr-4 text-black focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            placeholder="e.g., Vogue India - January 2024"
                          />
                        </div>
                        {errors.name && (
                          <p className="mt-1 text-sm text-meta-1">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      {/* Publish Date */}
                      <div>
                        <label className="mb-2 block text-sm font-medium text-black">
                          Publish Date <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="date"
                          {...register('publishDate')}
                          className="w-full rounded-lg border border-stroke bg-white px-4 py-2.5 text-black focus:border-primary focus:outline-none"
                        />
                        {errors.publishDate && (
                          <p className="mt-1 text-sm text-meta-1">
                            {errors.publishDate.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Cover Image - Full Width with Upload */}
                    <div className="mt-4">
                      <label className="mb-2 block text-sm font-medium text-black">
                        Cover Image <span className="text-meta-1">*</span>
                      </label>
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <div className="relative">
                            <MdImage
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-body/50"
                              size={18}
                            />
                            <input
                              {...register('coverImage')}
                              className="w-full rounded-lg border border-stroke bg-white py-2.5 pl-10 pr-4 text-black focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                              placeholder="https://example.com/cover-image.jpg"
                            />
                          </div>
                        </div>
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleCoverImageUpload(file);
                              }
                            }}
                            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                          />
                          <button
                            type="button"
                            className="flex items-center gap-1 rounded-lg border border-stroke bg-white px-3 py-2 text-sm text-body transition-all hover:bg-gray"
                            disabled={uploadingCoverImage}
                          >
                            {uploadingCoverImage ? (
                              <>Uploading...</>
                            ) : (
                              <>
                                <MdCloudUpload size={16} />
                                Upload
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                      {errors.coverImage && (
                        <p className="mt-1 text-sm text-meta-1">
                          {errors.coverImage.message}
                        </p>
                      )}

                      {/* Cover Image Preview */}
                      {watch('coverImage') && (
                        <div className="mt-3">
                          <img
                            src={watch('coverImage')}
                            alt="Cover Preview"
                            className="h-48 w-full rounded-lg object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                'https://placehold.co/800x400?text=Invalid+Image+URL';
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Content Sections */}
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-md font-semibold text-black">
                        Content Sections
                      </h3>
                      <button
                        type="button"
                        onClick={addSection}
                        className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white transition-all hover:bg-primary/90"
                      >
                        <MdAdd size={16} />
                        Add Info
                      </button>
                    </div>

                    {/* Section Tabs */}
                    {fields.length > 0 && (
                      <div className="mb-4 overflow-x-auto border-b border-stroke">
                        <div className="flex gap-2">
                          {fields.map((field, index) => (
                            <button
                              key={field.id}
                              type="button"
                              onClick={() => setActiveSectionTab(index)}
                              className={`whitespace-nowrap px-4 py-2 text-sm font-medium transition-all ${
                                activeSectionTab === index
                                  ? 'border-b-2 border-primary text-primary'
                                  : 'text-body hover:text-black'
                              }`}
                            >
                              Section {index + 1}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Section Editor */}
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className={
                          activeSectionTab === index ? 'block' : 'hidden'
                        }
                      >
                        <div className="mb-4 rounded-lg bg-gray/30 p-4">
                          <div className="mb-4 flex items-center justify-between">
                            <h4 className="font-medium text-black">
                              Section {index + 1}
                            </h4>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => duplicateSection(index)}
                                className="p-1.5 text-body transition-colors hover:text-primary"
                                title="Duplicate section"
                              >
                                <MdContentCopy size={16} />
                              </button>
                              {fields.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    remove(index);
                                    if (activeSectionTab >= fields.length - 1) {
                                      setActiveSectionTab(
                                        Math.max(0, fields.length - 2),
                                      );
                                    }
                                  }}
                                  className="p-1.5 text-body transition-colors hover:text-meta-1"
                                >
                                  <MdDelete size={16} />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Title */}
                          <div className="mb-3">
                            <label className="mb-1 block text-xs font-medium text-black">
                              Title <span className="text-meta-1">*</span>
                            </label>
                            <input
                              {...register(`sections.${index}.title`)}
                              className="w-full rounded-lg border border-stroke bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
                              placeholder="Enter section title"
                            />
                            {errors.sections?.[index]?.title && (
                              <p className="mt-1 text-xs text-meta-1">
                                {errors.sections[index]?.title?.message}
                              </p>
                            )}
                          </div>

                          {/* Description */}
                          <div className="mb-3">
                            <label className="mb-1 block text-xs font-medium text-black">
                              Description <span className="text-meta-1">*</span>
                            </label>
                            <textarea
                              {...register(`sections.${index}.description`)}
                              rows={2}
                              className="w-full rounded-lg border border-stroke bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
                              placeholder="Enter section description"
                            />
                            {errors.sections?.[index]?.description && (
                              <p className="mt-1 text-xs text-meta-1">
                                {errors.sections[index]?.description?.message}
                              </p>
                            )}
                          </div>

                          {/* Content */}
                          <div className="mb-3">
                            <label className="mb-1 block text-xs font-medium text-black">
                              Content <span className="text-meta-1">*</span>
                            </label>
                            <textarea
                              {...register(`sections.${index}.content`)}
                              rows={4}
                              className="w-full rounded-lg border border-stroke bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
                              placeholder="Enter section content"
                            />
                            {errors.sections?.[index]?.content && (
                              <p className="mt-1 text-xs text-meta-1">
                                {errors.sections[index]?.content?.message}
                              </p>
                            )}
                          </div>

                          {/* Image Upload */}
                          <div className="mb-3">
                            <label className="mb-1 block text-xs font-medium text-black">
                              Image
                            </label>
                            <div className="flex items-start gap-3">
                              <div className="flex-1">
                                <input
                                  {...register(`sections.${index}.imageUrl`)}
                                  className="w-full rounded-lg border border-stroke bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
                                  placeholder="https://example.com/image.jpg or upload an image"
                                />
                              </div>
                              <div className="relative">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      handleImageUpload(index, file);
                                    }
                                  }}
                                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                />
                                <button
                                  type="button"
                                  className="flex items-center gap-1 rounded-lg border border-stroke bg-white px-3 py-2 text-sm text-body transition-all hover:bg-gray"
                                  disabled={uploadingImage[index]}
                                >
                                  {uploadingImage[index] ? (
                                    <>Uploading...</>
                                  ) : (
                                    <>
                                      <MdCloudUpload size={16} />
                                      Upload
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>

                            {/* Image Preview */}
                            {watch(`sections.${index}.imageUrl`) && (
                              <div className="mt-2">
                                <img
                                  src={watch(`sections.${index}.imageUrl`)}
                                  alt="Preview"
                                  className="h-32 w-full rounded-lg object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                      'https://placehold.co/400x300?text=Invalid+Image+URL';
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {fields.length === 0 && (
                      <div className="rounded-lg bg-gray/30 py-8 text-center">
                        <p className="text-body">
                          No content sections yet. Click "Add Info" to add
                          sections.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting || isPending || isLoading}
                      className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 font-medium text-white hover:bg-primary/90 disabled:opacity-50"
                    >
                      <MdSave size={18} />
                      {isSubmitting || isPending || isLoading
                        ? 'Saving...'
                        : editingMagazine
                          ? 'Update Magazine'
                          : 'Publish Magazine'}
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
                <div className="max-h-[80vh] overflow-y-auto border-l border-stroke bg-gray p-6 lg:w-1/2">
                  <h3 className="sticky top-0 mb-4 bg-gray py-2 text-lg font-semibold text-black">
                    Live Preview
                  </h3>
                  <div className="overflow-hidden rounded-xl bg-white shadow-card">
                    {/* Cover Image Preview */}
                    {previewData.coverImage && (
                      <div className="relative h-64 w-full">
                        <img
                          src={previewData.coverImage}
                          alt="Cover"
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://placehold.co/800x400?text=Invalid+Image+URL';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-4 left-4">
                          <h1 className="text-2xl font-bold text-white">
                            {previewData.name || 'Magazine Name'}
                          </h1>
                          <p className="text-sm text-white/80">
                            Published:{' '}
                            {previewData.publishDate
                              ? new Date(
                                  previewData.publishDate,
                                ).toLocaleDateString()
                              : 'Date not set'}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className="p-6">
                      {/* Content Sections */}
                      {previewData.sections &&
                        previewData.sections.map((section, idx) => (
                          <div
                            key={idx}
                            className="mb-8 border-b border-stroke pb-8 last:border-0"
                          >
                            <h2 className="mb-2 text-xl font-bold text-black">
                              {section.title || 'Untitled Section'}
                            </h2>
                            <p className="mb-3 text-sm text-body/70">
                              {section.description}
                            </p>
                            {section.imageUrl && (
                              <img
                                src={section.imageUrl}
                                alt={section.title}
                                className="mb-4 max-h-96 w-full rounded-lg object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    'https://placehold.co/800x400?text=Image+Not+Found';
                                }}
                              />
                            )}
                            <p className="whitespace-pre-wrap leading-relaxed text-body">
                              {section.content}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Search Bar and Magazine Grid */}
        {!showForm && (
          <>
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <MdSearch
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-body/50"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search magazines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-stroke bg-white py-2.5 pl-10 pr-4 text-black focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Magazine Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedMagazines.map((magazine) => (
                <div
                  key={magazine.id}
                  className="group rounded-2xl bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-4"
                >
                  {/* Magazine Cover Image */}
                  <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
                    <img
                      src={magazine.coverImage}
                      alt={magazine.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://placehold.co/400x300?text=No+Image';
                      }}
                    />
                  </div>
                  <div className="p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-body/60">
                        <span className="flex items-center gap-1">
                          <MdVisibility size={12} /> {magazine.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <MdDownload size={12} /> {magazine.downloads}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(magazine)}
                          className="rounded-lg bg-primary/10 p-1.5 text-primary transition-colors hover:bg-primary hover:text-white"
                        >
                          <MdEdit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(magazine.id)}
                          className="rounded-lg bg-meta-1/10 p-1.5 text-meta-1 transition-colors hover:bg-meta-1 hover:text-white"
                        >
                          <MdDelete size={14} />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-md mb-2 line-clamp-2 font-bold text-black">
                      {magazine.name}
                    </h3>
                    <p className="mb-3 text-xs text-body/60">
                      {new Date(magazine.publishDate).toLocaleDateString()}
                    </p>
                    <p className="mb-4 line-clamp-2 text-sm text-body">
                      {magazine.sections?.[0]?.description || 'No description'}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-body/60">
                        {magazine.sections?.length || 0} sections
                      </span>
                      <span className="text-xs text-primary">Read More →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredMagazines.length === 0 && (
              <div className="rounded-2xl bg-white p-12 text-center shadow-card">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray">
                  <MdImage className="h-8 w-8 text-body/40" />
                </div>
                <h3 className="text-lg font-semibold text-black">
                  No magazines found
                </h3>
                <p className="mt-1 text-body">
                  Try adjusting your search or create a new magazine
                </p>
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
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-lg border border-stroke p-2 disabled:opacity-50"
                >
                  <MdChevronLeft size={20} />
                </button>
                {Array.from({length: totalPages}, (_, i) => i + 1).map(
                  (page) => (
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
                  ),
                )}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
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