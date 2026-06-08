import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  MdSave,
  MdAdd,
  MdCategory,
  MdClose,
} from 'react-icons/md';
import { GenericTable, Column } from '../Forms/Table/GenericTable';
import {
  useGetCategories,
  useAddCategory,
  useUpdateCategory,
  useDeleteCategory,
  Category,
} from './categoryApi';

// Category schema for validation
const categorySchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters'),
});

type CategoryFormData = z.infer<typeof categorySchema>;

const NewsCategory = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Use the mutation hooks
  const { data: categoriesData, isLoading } = useGetCategories();
  const addCategoryMutation = useAddCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

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
    },
  });

  const onSubmit = async (data: CategoryFormData) => {
    try {
      if (isEditing && editingId) {
        // Update existing category
        await updateCategoryMutation.mutateAsync({
          id: editingId,
          name: data.name,
        });
      } else {
        // Create new category
        await addCategoryMutation.mutateAsync({
          name: data.name,
        });
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
    setIsEditing(true);
    setEditingId(category.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteCategoryMutation.mutate(id);
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
    setEditingId(null);
    setShowForm(false);
  };

  const columns: Column<Category>[] = [
    {
      header: 'Name',
      accessor: 'name',
      className: 'font-medium',
      sortable: true,
    },
  ];

  const categories = categoriesData?.categories || [];

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-2xl text-gray-600">Loading categories...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-7xl">
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
                      ? 'Update the category name'
                      : 'Enter a name for the new category'}
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
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  {...register('name')}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., Technology, Sports, Politics"
                />
                {errors.name && (
                  <p className="mt-1.5 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || addCategoryMutation.isPending || updateCategoryMutation.isPending}
                  className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 font-medium text-white shadow-md shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-lg disabled:opacity-50"
                >
                  <MdSave size={18} />
                  {isSubmitting || addCategoryMutation.isPending || updateCategoryMutation.isPending
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

        {/* Only show the table when form is not visible */}
        {!showForm && (
          <GenericTable
            data={categories}
            columns={columns}
            itemsPerPage={5}
            searchAble={true}
            title="Categories"
            action={true}
            onEdit={handleEdit}
            onDelete={(item: Category) => handleDelete(item.id)}
            paginationOff={false}
          />
        )}
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