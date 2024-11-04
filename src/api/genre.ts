import type { RequestArgs } from '@app/utils/request-handler';

import { requestHandler } from '@app/utils/request-handler';
import { apiClient } from '@app/lib/api-client';

type GetAllAnimeGenreArgs = RequestArgs<'GET'>;

export const getAllAnimeGenre = requestHandler<GetAllAnimeGenreArgs, Genre[]>(() => {
  return apiClient('/genre').get();
});

type GetAnimeGenreBySlugArgs = RequestArgs<
  'GET',
  {
    params: { slug: string };
  }
>;

export const getAnimeGenreBySlug = requestHandler<GetAnimeGenreBySlugArgs, Genre>(({ params }) => {
  return apiClient(`/genre/${params.slug}`).get();
});
