import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import apiHost from './api-host';

export const baseQuery = fetchBaseQuery({
  baseUrl: apiHost,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  //@ts-ignore
  if (result?.data?.error === 'jwt expired') {
    const refreshArgs = {
      url: '/users/refresh-token',
      body: {
        refreshToken: localStorage.getItem('refreshToken'),
      },
      method: 'POST',
    };
    const { data }: { [key: string]: any } = await baseQuery(refreshArgs, api, extraOptions);
    if (data) {
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    }
    result = await baseQuery(args, api, extraOptions);
  }
  return result;
};
