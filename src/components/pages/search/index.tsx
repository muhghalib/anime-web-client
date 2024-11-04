'use client';

import { Separator } from '@app/components/shared/Separator';
import { Typography } from '@app/components/shared/Typography';
import { AnimeList } from '@app/components/list/AnimeList';
import { Box } from '@app/components/shared/Box';

import { useAnimeApi } from '@app/hooks/api/use-anime-api';
import { useScrollToBottom } from '@app/hooks/utils/use-scroll-to-bottom';
import { SearchActionBar } from './SearchActionBar';
import { useFilterApi } from '@app/hooks/api/use-filter-api';

export type SearchPageProps = {
  searchParams: {
    query: string;
    genre?: string | string[];
    order?: string;
    type?: string;
    status?: string;
  };
};

export const SearchPage = ({
  searchParams: { query, genre, status, order, type },
}: SearchPageProps) => {
  const {
    data: anime,
    isLoading: animeIsLoading,
    isFetching: isFetchingAnime,
    fetchNextPage: fetchNextAnime,
  } = useAnimeApi().getInfiniteAnime({
    title: query,
    genre,
    status,
    type,
    order,
  });

  const { data: filter, isLoading: filterIsLoading } = useFilterApi().getAll();

  useScrollToBottom(fetchNextAnime);

  return (
    <Box className="relative flex flex-col w-full h-full space-y-4">
      {filterIsLoading ? (
        <SearchActionBar.Skeleton />
      ) : (
        <SearchActionBar
          genre={filter!.genre}
          order={filter!.order}
          status={filter!.status}
          type={filter!.type}
        />
      )}
      <Separator />
      <AnimeList anime={anime} isLoading={animeIsLoading} />
      {isFetchingAnime && !animeIsLoading ? (
        <Typography weight="regular" className="mx-auto">
          loading...
        </Typography>
      ) : null}
    </Box>
  );
};
