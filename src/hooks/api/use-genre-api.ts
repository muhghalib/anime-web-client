import { getAllAnimeGenre } from '@app/api/genre';
import { useQuery } from '@tanstack/react-query';

export const useGetAllGenre = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: () => {
      return getAllAnimeGenre({});
    },
  });
};

export const useGenreApi = () => ({
  getAll: useGetAllGenre,
});
