import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { Task } from "@/types";

// export const useGetTasks = (column: string, search: string) => {
//   return useQuery({
//     queryKey: ["tasks", column, search],
//     queryFn: async () => {
//       const params = search ? { q: search } : {};
//       const { data } = await api.get<Task[]>("/tasks", { params });

//       return data.filter(task => task.column === column);
//     },
//   });
// };

export const useGetTasks = (column: string, search: string) => {
  return useQuery({
    queryKey: ["tasks", column, search],
    queryFn: async () => {
      const { data } = await api.get<Task[]>("/tasks");

      // Filter by column first
      const columnTasks = data.filter(task => task.column === column);

      // Then apply case-insensitive search manually
      const filteredTasks = search
        ? columnTasks.filter(task => {
            const query = search.toLowerCase();
            return (
              task.title.toLowerCase().includes(query) ||
              task.description.toLowerCase().includes(query)
            );
          })
        : columnTasks;

      return filteredTasks;
    },
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<Task, "id">) => {
      const res = await api.post("/tasks", data);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Task> & { id: number }) => {
      const res = await api.patch(`/tasks/${data.id}`, data);
      return res.data;
    },

    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/tasks/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
};
