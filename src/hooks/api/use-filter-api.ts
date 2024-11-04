import { getAllFilter } from '@app/api/filter';
import { useQuery } from '@tanstack/react-query';

export const useGetAllFilter = () => {
  return useQuery({
    queryKey: ['filters'],
    queryFn: () => getAllFilter({}),
  });
};

export const useFilterApi = () => ({
  getAll: useGetAllFilter,
});
