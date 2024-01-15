import type { AxiosResponse } from 'axios';

export type RequestArgsOption<T extends 'GET' | 'POST' | 'PUT' | 'DELETE'> = T extends
  | 'GET'
  | 'DELETE'
  ? {
      query?: Record<string, string | number | Array<string> | Array<number>>;
      params?: Record<string, string | number>;
    }
  : {
      query?: Record<string, string | number | Array<string> | Array<number>>;
      params?: Record<string, string | number>;
      body?: any;
    };

export type RequestArgs<
  T extends 'GET' | 'POST' | 'PUT' | 'DELETE',
  K extends RequestArgsOption<T> = any,
> = K;

export const requestHandler =
  <T extends RequestArgs<any, any>, R extends any>(
    request: (props: T) => Promise<AxiosResponse<R>>,
  ) =>
  async (props: T) => {
    return request(props).then((res) => res.data);
  };
