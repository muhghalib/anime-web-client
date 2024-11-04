'use client';

import { Box } from '@app/components/shared/Box';
import { Separator } from '@app/components/shared/Separator';
import { Typography } from '@app/components/shared/Typography';
import { AnimeInfo } from './AnimeInfo';

import { AnimeEpisodeList } from './AnimeEpisodeList';

import { useAnimeApi } from '@app/hooks/api/use-anime-api';
import { notFound } from 'next/navigation';

export type AnimePageProps = {
  params: { anime_slug: string };
};

export const AnimePage = ({ params: { anime_slug } }: AnimePageProps) => {
  const { data: anime, isLoading: animeIsLoading } = useAnimeApi().getBySlug({
    slug: anime_slug,
  });

  if (anime?.title == '') return notFound();

  return (
    <Box className="w-full flex flex-col space-y-3">
      {animeIsLoading ? (
        <AnimeInfo.Skeleton />
      ) : (
        <AnimeInfo
          title={anime!.title}
          trailer={anime!.trailer}
          genre={anime!.genre}
          image={anime!.image}
          producers={anime!.producers}
          rating={anime!.rating}
          released={anime!.released}
          status={anime!.status}
          total_episode={anime!.total_episode}
          type={anime!.type}
          synopsis={anime!.synopsis}
        />
      )}
      <Separator />
      <Box className="flex flex-col space-y-3">
        <Typography className="pl-2">Episodes</Typography>
        <AnimeEpisodeList
          episodes={[...(anime?.episode || [])].reverse()}
          animeTitle={anime?.title}
          animeSlug={anime_slug}
          isLoading={animeIsLoading}
        />
      </Box>
    </Box>
  );
};
