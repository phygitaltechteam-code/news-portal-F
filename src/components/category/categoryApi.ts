import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { api } from '@/utils/axios'; // Import your axios instance
import { AxiosError } from 'axios';

// Types
export interface Category {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryCreate {
  name: string;
}

// 

// REAL API function - Get all categories
export const getCategoriesAPI = async () => {
  try {
    // Replace '/your-actual-api-endpoint' with your real endpoint
    const response = await api.get('/admin/news/categories');
    console.log('API Response:', response.data);
    return response.data; // Adjust based on your API response structure
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Failed to fetch categories');
    }
    throw error;
  }
};

// REAL API function - Add new category
export const addCategoryAPI = async (data: CategoryCreate) => {
  try {
    // Replace '/your-actual-api-endpoint' with your real endpoint
    const response = await api.post('/admin/news/categories', data);
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Failed to add category');
    }
    throw error;
  }
};

// REAL API function - Update category
export const updateCategoryAPI = async (id: string, data: CategoryCreate) => {
  try {
    const response = await api.patch(
      `/admin/news/categories/${id}`,
      data
    );
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Failed to update category'
      );
    }
    throw error;
  }
};

// REAL API function - Delete category
export const deleteCategoryAPI = async (id: string) => {
  try {
    // Replace '/your-actual-api-endpoint' with your real endpoint
    const response = await api.delete(`/admin/news/categories/${id}`);
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Failed to delete category');
    }
    throw error;
  }
};

// ============ END OF API FUNCTIONS ============

// Hook to get all categories
export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategoriesAPI,
  });
};

// Hook to add a new category
export const useAddCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: addCategoryAPI,
    onSuccess: () => {
      toast.success('Category added successfully');
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add category');
    },
  });
};

// Hook to update a category
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      updateCategoryAPI(id, { name }),
    onSuccess: () => {
      toast.success('Category updated successfully');
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update category');
    },
  });
};

// Hook to delete a category
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteCategoryAPI,
    onSuccess: () => {
      toast.success('Category deleted successfully');
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete category');
    },
  });
};