'use client';

import { Typography } from '@app/components/shared/Typography';
import { Box } from '@app/components/shared/Box';
import { AnimeList } from '@app/components/list/AnimeList';
import { Separator } from '@app/components/shared/Separator';
import { OngoingPageHeader } from './OngoingPageHeader';

import { useAnimeApi } from '@app/hooks/api/use-anime-api';
import { useScrollToBottom } from '@app/hooks/utils/use-scroll-to-bottom';

export const OngoingAnimePage = () => {
  const { data, isLoading, fetchNextPage, isFetching } = useAnimeApi().getInfiniteAnime({
    status: 'Currently Airing',
  });

  useScrollToBottom(fetchNextPage);

  return (
    <Box className="flex flex-col space-y-4">
      <Box className="w-full flex flex-col space-y-3">
        <OngoingPageHeader />
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
