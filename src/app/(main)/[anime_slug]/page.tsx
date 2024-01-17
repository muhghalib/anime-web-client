import type { AnimePageProps } from '@app/components/pages/anime-detail';
import type { Metadata } from 'next';

import { getAnimeBySlug } from '@app/api/anime';
import { AnimePage } from '@app/components/pages/anime-detail';
import { ANIME_PAGE_METADATA } from '@app/constant/metadata';

export default AnimePage;

export const generateMetadata = async ({
  params: { anime_slug },
}: AnimePageProps): Promise<Metadata> => {
  const anime = await getAnimeBySlug({
    params: { slug: anime_slug },
  });

  return ANIME_PAGE_METADATA({ anime, anime_slug: anime_slug });
};
