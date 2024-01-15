'use client';

import { Separator } from '@app/components/shared/Separator';
import { ErrorConnection } from '@app/components/errors/ErrorConnection';
import { SearchPageHeader } from './SearchPageHeader';
import { Typography } from '@app/components/shared/Typography';
import { AnimeList } from '@app/components/list/AnimeList';
import { Box } from '@app/components/shared/Box';

import { useAnimeApi } from '@app/hooks/api/use-anime-api';
import { useWindowBottomScroll } from '@app/hooks/utils/use-window-bottom-scroll';

export type SearchPageProps = {
  params: { search_query: string };
};

export const SearchPage = ({ params: { search_query } }: SearchPageProps) => {
  const {
    data: anime,
    isLoading: animeIsLoading,
    isError: animeIsError,
    isFetching:isFetchingAnime,
    fetchNextPage:fetchNextAnime
  } = useAnimeApi().getInfiniteAnime({
    search: search_query,
  });

  useWindowBottomScroll(fetchNextAnime);

  if (animeIsError) return <ErrorConnection />;

  return (
    <Box className="flex flex-col w-full space-y-4">
      <SearchPageHeader searchQuery={decodeURIComponent(search_query)} />
      <Separator />
      <AnimeList anime={anime} isLoading={animeIsLoading} />
      <Box className="w-full inline-flex py-4 items-center justify-center">
        {isFetchingAnime && !animeIsLoading ? <Typography weight="regular">loading...</Typography> : null}
      </Box>
    </Box>
  );
};
