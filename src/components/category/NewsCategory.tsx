import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  MdSave,
  MdDelete,
  MdEdit,
  MdCancel,
  MdAdd,
  MdCategory,
  MdClose,
} from 'react-icons/md';

// Category schema for validation
const categorySchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters'),
  description: z.string().optional(),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .regex(
      /^[a-z0-9-]+$/,
      'Slug can only contain lowercase letters, numbers, and hyphens'
    ),
  status: z.enum(['active', 'inactive']),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

const NewsCategory = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Technology',
      description: 'Latest tech news and updates',
      slug: 'technology',
      status: 'active',
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      name: 'Sports',
      description: 'Sports news and events',
      slug: 'sports',
      status: 'active',
      createdAt: '2024-01-15',
    },
    {
      id: '3',
      name: 'Politics',
      description: 'Political news and analysis',
      slug: 'politics',
      status: 'inactive',
      createdAt: '2024-01-15',
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      description: '',
      slug: '',
      status: 'active',
    },
  });

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setValue('name', name);
    setValue('slug', generateSlug(name));
  };

  const onSubmit = async (data: CategoryFormData) => {
    try {
      if (isEditing && editingId) {
        // Update existing category
        const updatedCategories = categories.map((cat) =>
          cat.id === editingId
            ? {
                ...cat,
                ...data,
                updatedAt: new Date().toISOString(),
              }
            : cat
        );
        setCategories(updatedCategories);
      } else {
        // Create new category
        const newCategory: Category = {
          id: Date.now().toString(),
          ...data,
          createdAt: new Date().toISOString(),
        };
        setCategories([...categories, newCategory]);
      }

      // Reset form and close
      reset();
      setIsEditing(false);
      setEditingId(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleEdit = (category: Category) => {
    setValue('name', category.name);
    setValue('description', category.description || '');
    setValue('slug', category.slug);
    setValue('status', category.status);
    setIsEditing(true);
    setEditingId(category.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter((cat) => cat.id !== id));
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-3xl font-bold text-transparent dark:from-primary dark:to-secondary">
              Category Management
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Organize your news content with categories
            </p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="group flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-medium text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 active:scale-95"
            >
              <MdAdd size={20} className="transition-transform group-hover:rotate-90" />
              Add New Category
            </button>
          )}
        </div>

        {/* Category Form */}
        {showForm && (
          <div className="animate-fadeInUp mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-2.5">
                  <MdCategory size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {isEditing ? 'Edit Category' : 'Create New Category'}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {isEditing
                      ? 'Update the category details'
                      : 'Fill in the details to create a new category'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleCancel}
                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
              >
                <MdClose size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Category Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  {...register('name')}
                  onChange={onNameChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., Technology, Sports, Politics"
                />
                {errors.name && (
                  <p className="mt-1.5 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Slug */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Slug <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  {...register('slug')}
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 font-mono text-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white"
                  placeholder="e.g., technology, sports-news"
                />
                <p className="mt-1.5 text-xs text-gray-500">
                  URL-friendly version (auto-generated from name)
                </p>
                {errors.slug && (
                  <p className="mt-1.5 text-sm text-red-500">
                    {errors.slug.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Brief description of the category (optional)"
                />
              </div>

              {/* Status */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </label>
                <select
                  {...register('status')}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Form Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 font-medium text-white shadow-md shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-lg disabled:opacity-50"
                >
                  <MdSave size={18} />
                  {isSubmitting
                    ? 'Saving...'
                    : isEditing
                      ? 'Update Category'
                      : 'Save Category'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-xl border border-gray-300 px-6 py-2.5 font-medium text-gray-700 transition-all hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Categories List */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-100 bg-gray-50/50 dark:border-gray-700 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-black">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-black">
                    Slug
                  </th>
                  <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-black">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-black">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-black">
                    Created
                  </th>
                  <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-black">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {categories.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <MdCategory size={48} className="text-gray-300" />
                        <p>No categories found</p>
                        <p className="text-sm">
                          Click "Add New Category" to create one.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  categories.map((category) => (
                    <tr
                      key={category.id}
                      className="transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-700/50"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {category.name}
                      </td>
                      <td className="px-6 py-4 font-mono text-sm text-gray-600 dark:text-gray-400">
                        {category.slug}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {category.description || '-'}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                            category.status === 'active'
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          }`}
                        >
                          {category.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {new Date(category.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleEdit(category)}
                            className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/30"
                            title="Edit"
                          >
                            <MdEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(category.id)}
                            className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                            title="Delete"
                          >
                            <MdDelete size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-md transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Categories
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {categories.length}
            </p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-md transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Active Categories
            </p>
            <p className="text-3xl font-bold text-green-600">
              {categories.filter((c) => c.status === 'active').length}
            </p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-md transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Inactive Categories
            </p>
            <p className="text-3xl font-bold text-red-600">
              {categories.filter((c) => c.status === 'inactive').length}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default NewsCategory;