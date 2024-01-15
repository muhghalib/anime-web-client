import type { RequestArgs } from '@app/utils/request-handler';

import { requestHandler } from '@app/utils/request-handler';
import { apiClient } from '@app/lib/api-client';

type GetAllAnimeGenreArgs = RequestArgs<'GET'>;

export const getAllAnimeGenre = requestHandler<GetAllAnimeGenreArgs, AnimeGenre[]>(() => {
  return apiClient('/genre').get();
});
