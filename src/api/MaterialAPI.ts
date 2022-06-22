import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@src/api/baseQuery';
import { MaterialResponse } from './DataModel/material.data-model';

const baseEndpoint = '/materials';

export const MaterialAPI = createApi({
  reducerPath: 'MaterialAPI',
  baseQuery,
  endpoints: (builder) => ({
    getMaterials: builder.query<MaterialResponse, any>({
      query: () => ({
        url: `${baseEndpoint}/get`,
      }),
    }),
  }),
});

export const { useGetMaterialsQuery } = MaterialAPI;
