'use client';

import { AnimeList } from '@app/components/list/AnimeList';
import { Typography } from '@app/components/shared/Typography';
import { MainPageHeader } from './MainPageHeader';
import { Separator } from '@app/components/shared/Separator';
import { Box } from '@app/components/shared/Box';

import { useAnimeApi } from '@app/hooks/api/use-anime-api';
import { useScrollToBottom } from '@app/hooks/utils/use-scroll-to-bottom';

export const MainPage = () => {
  const { data, isLoading, fetchNextPage, isFetching } = useAnimeApi().getInfiniteAnime({});

  useScrollToBottom(fetchNextPage);

  return (
    <Box className="flex flex-col space-y-4">
      <Box className="w-full flex flex-col space-y-3">
        <MainPageHeader />
        <Separator />
        <AnimeList anime={data} isLoading={isLoading} />
      </Box>
      {isFetching && !isLoading ? (
        <Typography weight="regular" className="mx-auto">
          loading...
        </Typography>
      ) : null}
    </Box>
  );
};
