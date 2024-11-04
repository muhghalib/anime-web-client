import type { RequestArgs } from '@app/utils/request-handler';

import { apiClient } from '@app/lib/api-client';
import { requestHandler } from '@app/utils/request-handler';

export type GetEpisodeBySlugArgs = RequestArgs<
  'GET',
  {
    params: {
      slug: string;
    };
  }
>;

export const getEpisodeBySlug = requestHandler<GetEpisodeBySlugArgs, Episode>(({ params }) => {
  const { slug } = params;

  return apiClient(`/episode/${slug}`).get();
});
