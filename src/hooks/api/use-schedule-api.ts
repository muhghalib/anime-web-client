import { getAllSchedule } from '@app/api/schedule';
import { useQuery } from '@tanstack/react-query';

export const useGetAllSchedule = () => {
  return useQuery({
    queryKey: ['schedule'],
    queryFn: () => {
      return getAllSchedule({});
    },
  });
};

export const useScheduleApi = () => ({
  getAll: useGetAllSchedule,
});
