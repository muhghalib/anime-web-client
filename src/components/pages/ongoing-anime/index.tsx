'use client';

import { Typography } from '@app/components/shared/Typography';
import { Box } from '@app/components/shared/Box';
import { AnimeList } from '@app/components/list/AnimeList';
import { Separator } from '@app/components/shared/Separator';
import { OngoingPageHeader } from './OngoingPageHeader';
import { ErrorConnection } from '@app/components/errors/ErrorConnection';

import { useAnimeApi } from '@app/hooks/api/use-anime-api';
import { useWindowBottomScroll } from '@app/hooks/utils/use-window-bottom-scroll';

export const OngoingAnimePage = () => {
  const { data, isLoading, fetchNextPage, isFetching, isError } = useAnimeApi().getInfiniteAnime({
    type: 'ongoing',
  });

  useWindowBottomScroll(fetchNextPage);

  if (isError) return <ErrorConnection />;

  return (
    <Box className="flex flex-col">
      <Box className="w-full flex flex-col space-y-3">
        <OngoingPageHeader />
        <Separator />
        <AnimeList anime={data} isLoading={isLoading} />
      </Box>
      <Box className="w-full inline-flex py-4 items-center justify-center">
        {isFetching && !isLoading ? <Typography weight="regular">loading...</Typography> : null}
      </Box>
    </Box>
  );
};
