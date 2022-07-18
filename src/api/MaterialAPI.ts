import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from '@src/api/baseQuery';
import {
  GetMaterialResponse,
  MaterialsRequest,
  MaterialsResponse,
  PostMaterialRequest,
  PutMaterialRequest,
} from './model/material.data-model';

const baseEndpoint = '/materials';

export const MaterialAPI = createApi({
  reducerPath: 'MaterialAPI',
  tagTypes: ['MATERIAL', 'UPDATE_MATERIAL'],
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getMaterials: builder.query<MaterialsResponse, MaterialsRequest>({
      query: (params) => ({
        url: baseEndpoint,
        params,
      }),
      providesTags: (res, err) => (err ? [] : [{ type: 'MATERIAL' }]),
    }),

    getMaterial: builder.query<GetMaterialResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${baseEndpoint}/${id}`,
      }),
      providesTags: (res, err) => (err ? [] : [{ type: 'UPDATE_MATERIAL' }]),
    }),

    postMaterial: builder.mutation<any, PostMaterialRequest>({
      query: (body) => ({
        url: `${baseEndpoint}/create`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['MATERIAL'],
    }),

    putMaterial: builder.mutation<any, PutMaterialRequest>({
      query: (body) => ({
        url: baseEndpoint,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['MATERIAL', 'UPDATE_MATERIAL'],
    }),

    deleteMaterial: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `${baseEndpoint}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MATERIAL'],
    }),
  }),
});

export const {
  useGetMaterialsQuery,
  useGetMaterialQuery,
  usePostMaterialMutation,
  usePutMaterialMutation,
  useDeleteMaterialMutation,
} = MaterialAPI;
