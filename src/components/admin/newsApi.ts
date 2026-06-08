// services/newsApi.ts
import {api} from '@/utils/axios';
import axios from 'axios';

export interface NewsImage {
  url: string;
  file?: File;
}

export interface NewsSection {
  subtitle: string;
  description: string;
}

export interface NewsLink {
  title: string;
  url: string;
}

export interface CreateNewsData {
  title: string;
  images: NewsImage[];
  categoryIds: string[];
  sections: NewsSection[];
  links: NewsLink[];
  metaDescription?: string;
  featured: boolean;
}

export interface NewsResponse {
  success: boolean;
  message: string;
  data?: any;
}

// Create mutation function
export const useCreateNews = () => {
  const createNews = async (formData: FormData): Promise<NewsResponse> => {
    try {
      // API endpoint - replace with your actual endpoint
      const response = await api.post('/api/news/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return {
        success: true,
        message: 'News created successfully!',
        data: response.data,
      };
    } catch (error: any) {
      console.error('Error creating news:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create news',
      };
    }
  };

  return {createNews};
};
