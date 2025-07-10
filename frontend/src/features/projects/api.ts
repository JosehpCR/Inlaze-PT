import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { API_PREFIX } from '@/lib/constants';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data } = await api.get(`${API_PREFIX}/projects`);
      return data;
    },
  });
};
