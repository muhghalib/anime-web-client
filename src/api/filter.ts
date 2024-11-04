import type { RequestArgs } from '@app/utils/request-handler';

import { requestHandler } from '@app/utils/request-handler';
import { apiClient } from '@app/lib/api-client';

type GetAllFilter = RequestArgs<'GET'>;

export const getAllFilter = requestHandler<
  GetAllFilter,
  {
    status: { title: string; slug: string }[];
    genre: { title: string; slug: string }[];
    order: { title: string; slug: string }[];
    type: { title: string; slug: string }[];
  }
>(() => {
  return apiClient('/filter').get();
});
