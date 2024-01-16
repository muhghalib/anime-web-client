import type { InfiniteData } from '@tanstack/react-query';

import { AnimeCard } from '@app/components/card/AnimeCard';
import { Box } from '@app/components/shared/Box';

type AnimeListProps = {
  isLoading: boolean;
  anime?: InfiniteData<Anime[]>;
};

export const AnimeList = ({ isLoading, anime }: AnimeListProps) => {
  return (
    <Box className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {isLoading
        ? Array(10)
            .fill('')
            .map((_, idx) => {
              return <AnimeCard.Skeleton key={idx} />;
            })
        : anime!.pages.map((anime) => {
            return anime.map(({ eps, gambar, judul, slug }) => {
              return <AnimeCard key={slug} eps={eps} gambar={gambar} judul={judul} slug={slug} />;
            });
          })}
    </Box>
  );
};
