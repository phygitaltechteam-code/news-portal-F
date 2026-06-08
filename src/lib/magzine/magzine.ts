import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/utils/axios";

export const useSubmitMagzine = () => {
    return useMutation({
        mutationFn: (data: any) => api.post('/magzine', data),
    });
};

export const useGetMagzine = () => {
    return useQuery({
        queryKey: ['magzine'],
        queryFn: () => api.get('/magzine'),
    });
};