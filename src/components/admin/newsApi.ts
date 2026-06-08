// services/newsApi.ts
import {api} from '@/utils/axios';

export interface NewsResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const useCreateNews = () => {
  const createNews = async (data: any, isFormData: boolean = false): Promise<NewsResponse> => {
    try {
      let response;
      
      if (isFormData) {
        // Handle FormData (for file uploads)
        console.log('=== SENDING TO API AS FORMDATA ===');
        
        // Log FormData contents for debugging
        for (let pair of data.entries()) {
          if (pair[1] instanceof File) {
            console.log(`${pair[0]}: [FILE] ${(pair[1] as File).name} (${(pair[1] as File).size} bytes)`);
          } else {
            console.log(`${pair[0]}:`, pair[1]);
          }
        }
        
        response = await api.post('/admin/news', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        // Handle JSON data
        console.log('=== SENDING TO API AS JSON ===');
        console.log('Payload:', JSON.stringify(data, null, 2));
        
        response = await api.post('/admin/news', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      console.log('API Response:', response.data);

      return {
        success: true,
        message: 'News created successfully!',
        data: response.data,
      };
    } catch (error: any) {
      console.error('Error creating news:', error);
      console.error('Error response:', error.response?.data);
      
      // Extract detailed error message
      let errorMessage = 'Failed to create news';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        errorMessage = errors.map((err: any) => `${err.field}: ${err.message}`).join(', ');
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  return {createNews};
};