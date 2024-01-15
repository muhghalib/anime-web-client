import type { GetEpisodeBySlugArgs } from '@app/api/episode';

import { getEpisodeBySlug } from '@app/api/episode';
import { useQuery } from '@tanstack/react-query';

const useGetEpisodeBySlug = (params: GetEpisodeBySlugArgs['params']) => {
  return useQuery({
    queryKey: [`anime-episode-${params.slug}`],
    queryFn: () => getEpisodeBySlug({ params }),
  });
};

export const useEpisodeApi = () => ({
  getBySlug: useGetEpisodeBySlug,
});
