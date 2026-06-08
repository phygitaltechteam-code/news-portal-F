import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "../react-query/queryKeys";
import { api } from "@/utils/axios";
import z from "zod";

export const signInSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const useAdminLogin = () => {
  return useMutation({
    mutationFn: loginadmin,
    onSuccess: (res) => {
      localStorage.setItem(QUERY_KEYS.TOKEN, JSON.stringify(res.data.token));
      localStorage.setItem(
        QUERY_KEYS.ADMIN,
        JSON.stringify(res.data.admin),
      );
    },
    onError: (error: Error) => {
      console.error('Error during login:', error.message);
    },
  });
};
 
export const loginadmin = async (credentials: {username: string, password: string}) => {
  const response = await api.post('/users/login', credentials);
  return response;
};
