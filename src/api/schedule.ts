import type { RequestArgs } from '@app/utils/request-handler';

import { requestHandler } from '@app/utils/request-handler';
import { apiClient } from '@app/lib/api-client';

type GetAllScheduleArgs = RequestArgs<'GET'>;

export const getAllSchedule = requestHandler<GetAllScheduleArgs, Schedule[]>(() => {
  return apiClient('/jadwal').get();
});
