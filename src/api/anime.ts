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
      genre?: string | Array<string>;
      search?: string;
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
      content: string;
    };
  }
>;

export const getAnimeIframe = requestHandler<GetAnimeIframeArgs, string>(async ({ query }) => {
  const { content } = query;

  const nonce = await apiClient('/nonce').get();

  return apiClient(`/getIframe?${objectToQueryParams({ content, nonce: nonce.data })}`).get();
});
