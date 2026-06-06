import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {
  MdSave,
  MdDelete,
  MdEdit,
  MdCancel,
  MdAdd,
  MdCategory,
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
      'Slug can only contain lowercase letters, numbers, and hyphens',
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
    formState: {errors, isSubmitting},
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
            : cat,
        );
        setCategories(updatedCategories);
        alert('Category updated successfully!');
      } else {
        // Create new category
        const newCategory: Category = {
          id: Date.now().toString(),
          ...data,
          createdAt: new Date().toISOString(),
        };
        setCategories([...categories, newCategory]);
        alert('Category created successfully!');
      }

      // Reset form and close
      reset();
      setIsEditing(false);
      setEditingId(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Failed to save category');
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
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter((cat) => cat.id !== id));
      alert('Category deleted successfully!');
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-gray-900 text-3xl font-bold dark:text-white">
              Category Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage your news categories
            </p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              <MdAdd size={20} />
              Add New Category
            </button>
          )}
        </div>

        {/* Category Form */}
        {showForm && (
          <div className="dark:bg-gray-800 mb-8 rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MdCategory size={24} className="text-blue-600" />
                <h2 className="text-gray-900 text-xl font-semibold dark:text-white">
                  {isEditing ? 'Edit Category' : 'Create New Category'}
                </h2>
              </div>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400"
              >
                <MdCancel size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Category Name */}
              <div>
                <label className="text-gray-700 dark:text-gray-300 mb-2 block text-sm font-medium">
                  Category Name *
                </label>
                <input
                  type="text"
                  {...register('name')}
                  onChange={onNameChange}
                  className="border-gray-300 dark:border-gray-600 dark:bg-gray-700 w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-white"
                  placeholder="e.g., Technology, Sports, Politics"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Slug */}
              <div>
                <label className="text-gray-700 dark:text-gray-300 mb-2 block text-sm font-medium">
                  Slug *
                </label>
                <input
                  type="text"
                  {...register('slug')}
                  className="border-gray-300 bg-gray-50 font-mono dark:border-gray-600 dark:bg-gray-700 w-full rounded-lg border px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-white"
                  placeholder="e.g., technology, sports-news"
                />
                <p className="text-gray-500 mt-1 text-xs">
                  URL-friendly version of the category name (auto-generated)
                </p>
                {errors.slug && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.slug.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="text-gray-700 dark:text-gray-300 mb-2 block text-sm font-medium">
                  Description
                </label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className="border-gray-300 dark:border-gray-600 dark:bg-gray-700 w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-white"
                  placeholder="Brief description of the category (optional)"
                />
              </div>

              {/* Status */}
              <div>
                <label className="text-gray-700 dark:text-gray-300 mb-2 block text-sm font-medium">
                  Status
                </label>
                <select
                  {...register('status')}
                  className="border-gray-300 dark:border-gray-600 dark:bg-gray-700 w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-white"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Form Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
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
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 rounded-lg border px-6 py-2 font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Categories List */}
        <div className="dark:bg-gray-800 overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900 border-b">
                <tr>
                  <th className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Name
                  </th>
                  <th className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Description
                  </th>
                  <th className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Created
                  </th>
                  <th className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-gray-200 dark:divide-gray-700 divide-y">
                {categories.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-gray-500 px-6 py-12 text-center"
                    >
                      No categories found. Click "Add New Category" to create
                      one.
                    </td>
                  </tr>
                ) : (
                  categories.map((category) => (
                    <tr
                      key={category.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="text-gray-900 px-6 py-4 text-sm font-medium dark:text-white">
                        {category.name}
                      </td>
                      <td className="font-mono text-gray-600 dark:text-gray-400 px-6 py-4 text-sm">
                        {category.slug}
                      </td>
                      <td className="text-gray-600 dark:text-gray-400 px-6 py-4 text-sm">
                        {category.description || '-'}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                            category.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {category.status}
                        </span>
                      </td>
                      <td className="text-gray-600 dark:text-gray-400 px-6 py-4 text-sm">
                        {new Date(category.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(category)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <MdEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(category.id)}
                            className="text-red-600 hover:text-red-800"
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
          <div className="dark:bg-gray-800 rounded-lg bg-white p-4 shadow-sm">
            <p className="text-gray-500 text-sm">Total Categories</p>
            <p className="text-gray-900 text-2xl font-bold dark:text-white">
              {categories.length}
            </p>
          </div>
          <div className="dark:bg-gray-800 rounded-lg bg-white p-4 shadow-sm">
            <p className="text-gray-500 text-sm">Active Categories</p>
            <p className="text-2xl font-bold text-green-600">
              {categories.filter((c) => c.status === 'active').length}
            </p>
          </div>
          <div className="dark:bg-gray-800 rounded-lg bg-white p-4 shadow-sm">
            <p className="text-gray-500 text-sm">Inactive Categories</p>
            <p className="text-2xl font-bold text-red-600">
              {categories.filter((c) => c.status === 'inactive').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCategory;
