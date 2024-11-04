'use client';

import { AnimeList } from '@app/components/list/AnimeList';
import { ReactSpinners } from '@app/components/loader/ReactSpinners';
import { Box } from '@app/components/shared/Box';
import { Separator } from '@app/components/shared/Separator';
import { Typography } from '@app/components/shared/Typography';

import { useAnimeApi } from '@app/hooks/api/use-anime-api';
import { useScrollToBottom } from '@app/hooks/utils/use-scroll-to-bottom';

type RelatedAnimeParallelPageProps = {
  params: { anime_slug: string };
};

export default function RelatedAnimeParallelPage({
  params: { anime_slug },
}: RelatedAnimeParallelPageProps) {
  const { data: anime, isLoading: animeIsLoading } = useAnimeApi().getBySlug({
    slug: anime_slug,
  });

  const {
    data: recommendAnime,
    isLoading: recommendAnimeIsLoading,
    fetchNextPage: fetchMoreRecommendAnime,
    isFetchingNextPage: IsFetchingRecommendAnime,
  } = useAnimeApi().getInfiniteAnime({
    genre: anime?.genre.map((genre) => genre.title).slice(0, 1),
  });

  useScrollToBottom(fetchMoreRecommendAnime);

  return (
    <Box className="w-full flex flex-col space-y-3">
      <Typography>Kamu mungkin suka</Typography>
      <Separator className="h-[2px]" />
      <AnimeList
        className="grid-cols-2 lg:grid-cols-3 gap-3"
        anime={recommendAnime}
        isLoading={recommendAnimeIsLoading || animeIsLoading}
      />
      {IsFetchingRecommendAnime && !recommendAnimeIsLoading ? (
        <Typography weight="regular" className="mx-auto">
          loading...
        </Typography>
      ) : null}
    </Box>
  );
}
