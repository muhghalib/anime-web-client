import type { RequestArgsOption } from '@app/utils/request-handler';
import type { AxiosRequestConfig } from 'axios';

import { config } from '@app/config';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: config.api_base_url,
  headers: {
    Accept: 'application/json',
  },
});

export const apiClient = (endpoint: string, config?: AxiosRequestConfig<any>) => {
  return {
    get: () => {
      return axiosInstance.get(endpoint, config);
    },
    post: (body: RequestArgsOption<'POST'>['body']) => {
      return axiosInstance.post(endpoint, body, config);
    },
    put: (body: RequestArgsOption<'POST'>['body']) => {
      return axiosInstance.put(endpoint, body, config);
    },
    patch: (body: RequestArgsOption<'POST'>['body']) => {
      return axiosInstance.patch(endpoint, body, config);
    },
    delete: () => {
      return axiosInstance.delete(endpoint, config);
    },
  };
};
