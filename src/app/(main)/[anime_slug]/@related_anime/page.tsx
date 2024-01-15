'use client';

import { AnimeCard } from '@app/components/card/AnimeCard';
import { ErrorConnection } from '@app/components/errors/ErrorConnection';
import { ReactSpinners } from '@app/components/loader/ReactSpinners';
import { AnimeOptionTabs } from '@app/components/pages/anime-detail/AnimeOptionTabs';
import { Box } from '@app/components/shared/Box';
import { Typography } from '@app/components/shared/Typography';

import { useAnimeApi } from '@app/hooks/api/use-anime-api';
import { useWindowBottomScroll } from '@app/hooks/utils/use-window-bottom-scroll';
import { AnimeService } from '@app/services/anime';
import { useState } from 'react';

type RelatedAnimeParallelPageProps = {
  params: { anime_slug: string };
};

export default function RelatedAnimeParallelPage({
  params: { anime_slug },
}: RelatedAnimeParallelPageProps) {
  const [filterBy, setFilterBy] = useState<string>('genre');

  const { data: anime, isLoading: animeIsLoading } = useAnimeApi().getBySlug({
    slug: anime_slug,
  });

  const animeService = new AnimeService(anime);

  //anime collection
  const {
    data: aniCol,
    isError: aniColIsError,
    isLoading: aniColIsLoading,
    fetchNextPage: fetchMoreAniCol,
    isFetchingNextPage: IsFetchingAniCol,
  } = useAnimeApi().getInfiniteAnime({
    genre: filterBy == 'genre' ? animeService.getGenres() : undefined,
    type: filterBy != 'genre' ? filterBy : undefined,
  });

  useWindowBottomScroll(fetchMoreAniCol);

  const handleOnClickOptions = (v: string) => setFilterBy(v);

  if (aniColIsError) return <ErrorConnection />;

  return (
    <Box className="w-full flex flex-col space-y-3">
      <AnimeOptionTabs onChange={handleOnClickOptions} value={filterBy} />
      <Box className="grid w-full grid-cols-2 lg:grid-cols-3 gap-3">
        {aniColIsLoading || animeIsLoading
          ? Array(6)
              .fill('')
              .map((_, idx) => {
                return <AnimeCard.Skeleton key={idx} />;
              })
          : aniCol!.pages.map((anime) => {
              return anime.map(({ eps, gambar, judul, slug }) => {
                return <AnimeCard key={slug} eps={eps} gambar={gambar} judul={judul} slug={slug} />;
              });
            })}
      </Box>
      {IsFetchingAniCol && !aniColIsLoading ? (
        <Box className="w-fit mx-auto">
          <ReactSpinners width={50} height={50} variant="BeatLoader" />
        </Box>
      ) : null}
    </Box>
  );
}
