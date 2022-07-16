import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@src/api/baseQuery';
import { RevenueRequest, RevenueResponse } from './model/revenue.data-model';

const baseEndpoint = `/revenues`;

export const RevenueAPI = createApi({
  reducerPath: 'RevenueAPI',
  baseQuery,
  endpoints: (builder) => ({
    getRevenues: builder.query<RevenueResponse, RevenueRequest>({
      query: (params) => ({
        url: baseEndpoint,
        params,
      }),
    }),
  }),
});

export const { useGetRevenuesQuery } = RevenueAPI;
