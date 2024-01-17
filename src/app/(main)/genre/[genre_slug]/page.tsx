import type { GenrePageProps } from '@app/components/pages/genre';
import type { Metadata } from 'next';

import { getAllAnimeGenre } from '@app/api/genre';
import { GenrePage } from '@app/components/pages/genre';
import { GENRE_PAGE_METADATA } from '@app/constant/metadata';

export const dynamicParams = false;

export default GenrePage;

export async function generateStaticParams() {
  const genres = await getAllAnimeGenre({});

  return genres.map((genre) => ({
    genre_slug: genre.slug,
  }));
}

export async function generateMetadata({
  params: { genre_slug },
}: GenrePageProps): Promise<Metadata> {
  const genres = await getAllAnimeGenre({});

  const genre = genres.find(({ slug }) => slug == genre_slug);

  return GENRE_PAGE_METADATA({ genre: genre?.judul, genres, genre_slug: genre_slug });
}
