import type { AnimeEpisodePageProps } from '@app/components/pages/anime-detail/episode-detail';

import { AnimeEpisodePage } from '@app/components/pages/anime-detail/episode-detail';

import { getEpisodeBySlug } from '@app/api/episode';
import { ANIME_EPISODE_PAGE_METADATA } from '@app/constant/metadata';

export default AnimeEpisodePage;

export const generateMetadata = async ({
  params: { episode_slug, anime_slug },
}: AnimeEpisodePageProps) => {
  const episode = await getEpisodeBySlug({ params: { slug: episode_slug } });

  return ANIME_EPISODE_PAGE_METADATA({ episode, anime_slug, episode_slug });
};
