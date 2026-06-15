import {api} from '@/utils/axios';
import {useQuery} from '@tanstack/react-query';

export const useGetNewsInfo = () => {
  return useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const response = await api.get('/news');
      return response.data;
    },
  });
};

export const useGetNewsById = (id: string) => {
  return useQuery({
    queryKey: ['news', id],
    queryFn: async () => {
      if (!id) return null;
      const response = await api.get(`/news/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useGetCategoryAll = () => {
  return useQuery({
    queryKey: ['category'],
    queryFn: async () => {
      const response = await api.get('/news/categories');
      return response.data;
    },
  });
};
