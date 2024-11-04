'use client';

import { EpisodeDownload } from './EpisodeDownload';
import { EpisodeHeader } from './EpisodeHeader';
import { EpisodeIframe } from './EpisodeIframe';
import { EpisodeMirror } from './EpisodeMirror';
import { EpisodeNavigation } from './EpisodeNavigation';
import { Box } from '@app/components/shared/Box';

import { useAnimeApi } from '@app/hooks/api/use-anime-api';
import { useEpisodeApi } from '@app/hooks/api/use-episode-api';
import { useEffect, useState } from 'react';

import { iframeContext } from './use-iframe';

export type AnimeEpisodePageProps = {
  params: { anime_slug: string; episode_slug: string };
};

export const AnimeEpisodePage = ({
  params: { anime_slug, episode_slug },
}: AnimeEpisodePageProps) => {
  const [iframeData, setIframeData] = useState({ post: '', nume: '' });

  const { data: anime, isLoading: animeIsLoading } = useAnimeApi().getBySlug({ slug: anime_slug });
  const { data: episode, isLoading: episodeIsLoading } = useEpisodeApi().getBySlug({
    slug: episode_slug,
  });

  const { data: iframe, isLoading: iframeIsLoading } = useAnimeApi().getIframe({
    post: iframeData.post,
    nume: iframeData.nume,
  });

  useEffect(() => {
    if (episode && !episodeIsLoading) {
      setIframeData({
        post: episode.iframe[0].post,
        nume: episode.iframe[0].nume,
      });
    }
  }, [episode, episodeIsLoading]);

  return (
    <iframeContext.Provider value={{ iframe: iframeData, setIframe: setIframeData }}>
      <Box className="w-full flex flex-col space-y-3">
        {animeIsLoading || episodeIsLoading ? (
          <EpisodeHeader.Skeleton />
        ) : (
          <EpisodeHeader anime={{ title: anime!.title }} episode={{ title: episode!.title }} />
        )}
        {episodeIsLoading ? (
          <EpisodeNavigation.Skeleton />
        ) : (
          <EpisodeNavigation
            nextStreaming={episode!.nextStreaming}
            previousStreaming={episode!.previousStreaming}
          />
        )}
        <Box className="flex flex-col space-y-2 w-full">
          {iframeIsLoading || episodeIsLoading ? (
            <EpisodeIframe.Skeleton />
          ) : (
            <EpisodeIframe src={iframe!.iframe} />
          )}
          {episodeIsLoading ? (
            <EpisodeMirror.Skeleton />
          ) : (
            <EpisodeMirror iframe={episode!.iframe} />
          )}
        </Box>
        {episodeIsLoading ? (
          <EpisodeDownload.Skeleton />
        ) : (
          <EpisodeDownload download={episode!.downloads} />
        )}
      </Box>
    </iframeContext.Provider>
  );
};
