'use client';

import { EpisodeDownload } from './EpisodeDownload';
import { EpisodeHeader } from './EpisodeHeader';
import { EpisodeIframe } from './EpisodeIframe';
import { EpisodeMirror } from './EpisodeMirror';
import { EpisodeResolution } from './EpisodeResolution';
import { Box } from '@app/components/shared/Box';

import { useAnimeApi } from '@app/hooks/api/use-anime-api';
import { useEpisodeApi } from '@app/hooks/api/use-episode-api';
import { useEffect, useState } from 'react';

export type AnimeEpisodePageProps = {
  params: { anime_slug: string; episode_slug: string };
};

export const AnimeEpisodePage = ({
  params: { anime_slug, episode_slug },
}: AnimeEpisodePageProps) => {
  const [mirrorContent, setMirrorContent] = useState<string>('');
  const [currentResolution, setCurrentResolution] = useState<MirrorType>('m360p');

  const { data: anime, isLoading: animeIsLoading } = useAnimeApi().getBySlug({ slug: anime_slug });
  const { data: episode, isLoading: episodeIsLoading } = useEpisodeApi().getBySlug({
    slug: episode_slug,
  });
  const { data: iframe, isLoading: iframeIsLoading } = useAnimeApi().getIframe({
    content: mirrorContent,
  });

  useEffect(() => {
    if (episode) {
      for (const [key, mirror] of Object.entries(episode.mirror)) {
        if (mirror.length > 0) {
          setCurrentResolution(key as MirrorType);

          break;
        }
      }
    }
  }, [episode]);

  useEffect(() => {
    if (episode) setMirrorContent(episode.mirror[currentResolution]?.at(0)?.content || '');
  }, [currentResolution, episode]);

  return (
    <Box className="w-full flex flex-col space-y-3">
      <EpisodeHeader
        animeTitle={anime?.judul}
        episodeTitle={episode?.judul}
        isLoading={animeIsLoading || episodeIsLoading}
      />
      <Box className="flex flex-col space-y-2 w-full">
        <EpisodeResolution
          currentResolution={currentResolution}
          isLoading={episodeIsLoading}
          mirror={episode?.mirror}
          onChange={(v) => setCurrentResolution(v)}
        />
        <EpisodeIframe
          isLoading={iframeIsLoading || episodeIsLoading}
          src={
            (typeof iframe !== 'object'
              && iframe?.match(/<iframe[^>]*src=["']([^"']*)["'][^>]*>/i)?.at(1)) ||
              episode?.iframe
          }
        />
        <EpisodeMirror
          isLoading={episodeIsLoading}
          mirror={episode?.mirror}
          currentResolution={currentResolution}
          currentMirror={mirrorContent}
          onChange={(v) => setMirrorContent(v)}
        />
      </Box>
      <EpisodeDownload isLoading={episodeIsLoading} download={episode?.download} />
    </Box>
  );
};
