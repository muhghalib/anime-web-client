import type { RequestArgs } from '@app/utils/request-handler';

import { requestHandler } from '@app/utils/request-handler';
import { objectToQueryParams } from '@app/utils/converter';
import { apiClient, axiosInstance } from '@app/lib/api-client';

export type GetAllAnimeArgs = RequestArgs<
  'GET',
  {
    query: {
      page?: string;
      type?: string;
      status?: string;
      genre?: string | Array<string>;
      order?: string;
      title?: string;
    };
  }
>;

export const getAllAnime = requestHandler<GetAllAnimeArgs, Anime[]>(({ query }) => {
  return apiClient(`/anime?${objectToQueryParams(query)}`).get();
});

export type GetAnimeBySlugArgs = RequestArgs<
  'GET',
  {
    params: {
      slug: string;
    };
  }
>;

export const getAnimeBySlug = requestHandler<GetAnimeBySlugArgs, Omit<Anime, 'eps'>>(
  ({ params }) => {
    const { slug } = params;

    return apiClient(`/anime/${slug}`).get();
  },
);

export type GetAnimeIframeArgs = RequestArgs<
  'GET',
  {
    query: {
      post: string;
      nume: string;
    };
  }
>;

export const getAnimeIframe = requestHandler<GetAnimeIframeArgs, { iframe: string }>(
  ({ query }) => {
    return apiClient(`/iframe?${objectToQueryParams(query)}`).get();
  },
);
