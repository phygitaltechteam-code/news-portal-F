// services/newsApi.ts
import {api} from '@/utils/axios';

export interface NewsResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const useCreateNews = () => {
  const createNews = async (formData: FormData): Promise<NewsResponse> => {
    try {
      console.log('=== SENDING TO API AS FORMDATA ===');
      
      // Log FormData contents for debugging
      for (let pair of formData.entries()) {
        if (pair[1] instanceof File) {
          console.log(`${pair[0]}: [FILE] ${(pair[1] as File).name}`);
        } else {
          console.log(`${pair[0]}:`, pair[1]);
        }
      }
      
      const response = await api.post('/admin/news', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('API Response:', response.data);

      return {
        success: true,
        message: 'News created successfully!',
        data: response.data,
      };
    } catch (error: any) {
      console.error('Error creating news:', error);
      console.error('Error response:', error.response?.data);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create news',
      };
    }
  };

  return {createNews};
};