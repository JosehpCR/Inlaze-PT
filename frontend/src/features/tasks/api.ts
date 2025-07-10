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

export const useAssignTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: { id: string; userId: string; projectId: string }) => {
      const { id, userId } = data;
      const res = await api.patch(`${API_PREFIX}/tasks/${id}/assign`, { userId });
      return res.data;
    },
    onSuccess: (_, variables) => {
      if (variables.projectId) {
        qc.invalidateQueries({ queryKey: ['tasks', variables.projectId] });
      }
    },
  });
};

export const useUpdateTaskStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: { id: string; status: string; projectId: string }) => {
      const { id, status } = data;
      const res = await api.patch(`${API_PREFIX}/tasks/${id}/status`, { status });
      return res.data;
    },
    onSuccess: (_, variables) => {
      if (variables.projectId) {
        qc.invalidateQueries({ queryKey: ['tasks', variables.projectId] });
      }
    },
  });
};

export const useAddComment = () => {
  return useMutation({
    mutationFn: async (data: { taskId: string; content: string }) => {
      const res = await api.post(`${API_PREFIX}/tasks/${data.taskId}/comments`, {
        content: data.content,
      });
      return res.data;
    },
  });
};
