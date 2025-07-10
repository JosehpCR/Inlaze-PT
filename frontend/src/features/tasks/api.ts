import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { API_PREFIX } from '@/lib/constants';

export const useTasks = (projectId: string) => {
  return useQuery({
    queryKey: ['tasks', projectId],
    queryFn: async () => {
      const { data } = await api.get(`${API_PREFIX}/tasks/project/${projectId}`);
      return data;
    },
  });
};

export const useCreateTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (task: { projectId: string; [key: string]: unknown }) => {
      const { data } = await api.post(`${API_PREFIX}/tasks`, task);
      return data;
    },
    onSuccess: (_, variables) => {
      if (variables.projectId) {
        qc.invalidateQueries({ queryKey: ['tasks', variables.projectId] });
      }
    },
  });
};
