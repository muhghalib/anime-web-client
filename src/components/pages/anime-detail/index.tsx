'use client';

import { Box } from '@app/components/shared/Box';
import { Separator } from '@app/components/shared/Separator';
import { Typography } from '@app/components/shared/Typography';
import { AnimeHeader } from './AnimeHeader';
import { ErrorConnection } from '@app/components/errors/ErrorConnection';
import { AnimeEpisodeList } from './AnimeEpisodeList';

import { useAnimeApi } from '@app/hooks/api/use-anime-api';
import { AnimeService } from '@app/services/anime';
import { notFound } from 'next/navigation';

export type AnimePageProps = {
  params: { anime_slug: string };
};

export const AnimePage = ({ params: { anime_slug } }: AnimePageProps) => {
  const {
    data: anime,
    isLoading: animeIsLoading,
    isError: animeIsError,
  } = useAnimeApi().getBySlug({
    slug: anime_slug,
  });

  const animeService = new AnimeService(anime);

  if (anime?.judul == '') return notFound();

  if (animeIsError) return <ErrorConnection />;

  return (
    <Box className="w-full flex flex-col space-y-3">
      {animeIsLoading ? (
        <AnimeHeader.Skeleton />
      ) : (
        <AnimeHeader
          judul={anime!.judul}
          namaJapan={anime!.namaJapan}
          genres={animeService.getGenres()}
          animeInfo={animeService.getInfo()}
          gambar={anime!.gambar}
          slug={anime!.slug}
        />
      )}
      <Separator />
      <Box className="flex flex-col space-y-3">
        <Typography className="pl-2">Episodes</Typography>
        <AnimeEpisodeList
          anime_slug={anime_slug}
          episodes={animeService.getEpisodes()}
          animeTitle={anime?.judul}
          isLoading={animeIsLoading}
        />
      </Box>
    </Box>
  );
};
