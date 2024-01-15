'use client';

import { Box } from '@app/components/shared/Box';
import { AnimeList } from '@app/components/list/AnimeList';
import { Typography } from '@app/components/shared/Typography';
import { GenrePageHeader } from './GenrePageHeader';
import { ErrorConnection } from '@app/components/errors/ErrorConnection';
import { Separator } from '@app/components/shared/Separator';

import { useWindowBottomScroll } from '@app/hooks/utils/use-window-bottom-scroll';
import { useAnimeApi } from '@app/hooks/api/use-anime-api';

export type GenrePageProps = {
  params: { genre_slug: string };
};

export const GenrePage = ({ params: { genre_slug } }: GenrePageProps) => {
  const { data, isLoading, fetchNextPage, isFetching, isError } = useAnimeApi().getInfiniteAnime({
    genre: genre_slug,
  });

  useWindowBottomScroll(fetchNextPage);

  if (isError) return <ErrorConnection />;

  return (
    <Box className="flex flex-col">
      <Box className="flex flex-col space-y-4">
        <GenrePageHeader genreName={genre_slug} />
        <Separator />
        <AnimeList anime={data} isLoading={isLoading} />
      </Box>
      <Box className="w-full inline-flex py-4 items-center justify-center">
        {isFetching && !isLoading ? <Typography weight="regular">loading...</Typography> : null}
      </Box>
    </Box>
  );
};
