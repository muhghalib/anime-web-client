'use client';

import { AnimeList } from '@app/components/list/AnimeList';
import { Typography } from '@app/components/shared/Typography';
import { MainPageHeader } from './MainPageHeader';
import { Separator } from '@app/components/shared/Separator';
import { Box } from '@app/components/shared/Box';
import { ErrorConnection } from '@app/components/errors/ErrorConnection';

import { useAnimeApi } from '@app/hooks/api/use-anime-api';
import { useWindowBottomScroll } from '@app/hooks/utils/use-window-bottom-scroll';

export const MainPage = () => {
  const { data, isLoading, fetchNextPage, isFetching, isError } = useAnimeApi().getInfiniteAnime(
    {},
  );

  useWindowBottomScroll(fetchNextPage);

  if (isError) return <ErrorConnection />;

  return (
    <Box className="flex flex-col">
      <Box className="w-full flex flex-col space-y-3">
        <MainPageHeader />
        <Separator />
        <AnimeList anime={data} isLoading={isLoading} />
      </Box>
      <AnimeList anime={data} isLoading={isLoading} />
      <Box className="w-full inline-flex py-4 items-center justify-center">
        {isFetching && !isLoading ? <Typography weight="regular">loading...</Typography> : null}
      </Box>
    </Box>
  );
};
