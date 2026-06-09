import { api } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

// export const useGetNewsInfo = async () => {
//     return useQuery({
//         queryKey: ['news'],
//         queryFn: () => api.get('/news'),
//     });
// };

export const useGetNewsInfo = () => {
  return useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const response = await api.get("/news");
      return response.data;
    },
  });
};

export const useGetNewsById = async (id: number) => {
    return useQuery({
        queryKey: ['news', id],
        queryFn: () => api.get(`/news/${id}`),
    });
};