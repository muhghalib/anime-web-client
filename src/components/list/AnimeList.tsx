import type { InfiniteData } from '@tanstack/react-query';

import { AnimeCard } from '@app/components/card/AnimeCard';
import { Box } from '@app/components/shared/Box';
import { cn } from '@app/lib/cn';

type AnimeListProps = {
  isLoading: boolean;
  className?: string;
  anime?: InfiniteData<Anime[]>;
};

export const AnimeList = ({ isLoading, anime, className }: AnimeListProps) => {
  return (
    <Box className={cn('grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3', className)}>
      {isLoading
        ? Array(10)
            .fill('')
            .map((_, idx) => {
              return <AnimeCard.Skeleton key={idx} />;
            })
        : anime!.pages.map((anime) => {
            return anime.map(({ title, slug, image, rating, status }, idx) => {
              return (
                <AnimeCard
                  key={idx}
                  image={image}
                  title={title}
                  rating={rating}
                  slug={slug}
                  status={status}
                />
              );
            });
          })}
    </Box>
  );
};
