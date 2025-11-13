import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiService from '@/services/api';
import { Actor } from '@/types/actor';

interface ActorsResponse {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  actors: Actor[];
}

export const useActors = (page: number = 1) => {
  return useQuery({
    queryKey: ['actors', page],
    queryFn: () => apiService.get<ActorsResponse>(`/actors?page=${page}`),
  });
};

export const useActorDetails = (actorId: number) => {
  return useQuery({
    queryKey: ['actor', actorId],
    queryFn: () => apiService.get<Actor>(`/actors/${actorId}`),
  });
};

export const useCreateActor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (actorData: Omit<Actor, 'id' | 'movies'>) => 
      apiService.post<Actor>('/actors', actorData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actors'] });
    },
  });
};

export const useUpdateActor = (actorId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (actorData: Partial<Omit<Actor, 'id' | 'movies'>>) => 
      apiService.put<Actor>(`/actors/${actorId}`, actorData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actors'] });
      queryClient.invalidateQueries({ queryKey: ['actor', actorId] });
    },
  });
};

export const useDeleteActor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (actorId: number) => 
      apiService.delete<void>(`/actors/${actorId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actors'] });
    },
  });
};