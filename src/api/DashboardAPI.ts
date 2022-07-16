import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@src/api/baseQuery';
import { DashboardResponse } from './model/dashboard.data-model';

const baseEndpoint = `/dashboards`;

export const DashboardAPI = createApi({
  reducerPath: 'DashboardAPI',
  baseQuery,
  endpoints: (builder) => ({
    getDashboard: builder.query<DashboardResponse, any>({
      query: () => ({
        url: baseEndpoint,
      }),
    }),
  }),
});

export const { useGetDashboardQuery } = DashboardAPI;
