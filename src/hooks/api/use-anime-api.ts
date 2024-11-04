import type { GetAllAnimeArgs, GetAnimeBySlugArgs, GetAnimeIframeArgs } from '@app/api/anime';

import { getAnimeBySlug, getAllAnime, getAnimeIframe } from '@app/api/anime';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

const useInfiniteAnime = (query: Omit<GetAllAnimeArgs['query'], 'page'>) => {
  return useInfiniteQuery({
    queryKey: ['infinite-anime', query],
    queryFn: ({ pageParam }) =>
      getAllAnime({
        query: {
          page: pageParam.toString(),
          ...query,
        },
      }),
    initialPageParam: 1,
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
  });
};

const useGetAllAnime = (
  query: Omit<GetAllAnimeArgs['query'], 'page'>,
  config?: { enabled?: boolean },
) => {
  return useQuery({
    queryKey: ['anime', query],
    queryFn: () =>
      getAllAnime({
        query,
      }),
    enabled: config?.enabled,
  });
};

const useGetAnimeBySlug = (params: GetAnimeBySlugArgs['params']) => {
  return useQuery({
    queryKey: [`anime-${params.slug}`],
    queryFn: () => getAnimeBySlug({ params }),
  });
};

const useGetAnimeIframe = (query: GetAnimeIframeArgs['query']) => {
  return useQuery({
    queryKey: [`anime-iframe-${query.post}-${query.nume}`],
    queryFn: () => getAnimeIframe({ query }),
  });
};

export const useAnimeApi = () => ({
  getInfiniteAnime: useInfiniteAnime,
  getBySlug: useGetAnimeBySlug,
  getIframe: useGetAnimeIframe,
  getAll: useGetAllAnime,
});
