import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@src/api/baseQuery';
import { MaterialsRequest, MaterialsResponse } from './DataModel/material.data-model';

const baseEndpoint = '/materials';

export const MaterialAPI = createApi({
  reducerPath: 'MaterialAPI',
  baseQuery,
  endpoints: (builder) => ({
    getMaterials: builder.query<MaterialsResponse, MaterialsRequest>({
      query: (params) => ({
        url: baseEndpoint,
        params,
      }),
    }),
  }),
});

export const { useGetMaterialsQuery } = MaterialAPI;
