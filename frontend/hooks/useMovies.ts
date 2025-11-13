import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiService from '@/services/api';
import { Movie } from '@/types/movie';

interface MoviesResponse {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  movies: Movie[];
}

export const useMovies = (page: number = 1) => {
  return useQuery({
    queryKey: ['movies', page],
    queryFn: () => apiService.get<MoviesResponse>(`/movies?page=${page}`),
  });
};

export const useMovieDetails = (movieId: number) => {
  return useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => apiService.get<Movie>(`/movies/${movieId}`),
  });
}

export const useCreateMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (movieData: Omit<Movie, 'id' | 'actors'>) => 
      apiService.post<Movie>('/movies', movieData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });
};

export const useUpdateMovie = (movieId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (movieData: Partial<Omit<Movie, 'id' | 'actors'>>) => 
      apiService.put<Movie>(`/movies/${movieId}`, movieData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
      queryClient.invalidateQueries({ queryKey: ['movie', movieId] });
    },
  });
};

export const useDeleteMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (movieId: number) => 
      apiService.delete<void>(`/movies/${movieId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });
}

export const useAddActorToMovie = (movieId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (actorId: number) => 
      apiService.post<void>(`/movies/${movieId}/actors`, { actorId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movie', movieId] });
    },
  });
};

export const useRemoveActorFromMovie = (movieId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (actorId: number) => 
      apiService.delete<void>(`/movies/${movieId}/actors`, { data: { actorId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movie', movieId] });
    },
  });
};