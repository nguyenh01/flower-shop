import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@src/api/baseQuery';
import {
  CategoriesRequest,
  CategoriesResponse,
  GetCategoryResponse,
  PostCategoryRequest,
  PutCategoryRequest,
} from './model/category.data-model';

const baseEndpoint = '/categories';

export const CategoryAPI = createApi({
  reducerPath: 'CategoryAPI',
  tagTypes: ['CATEGORY', 'UPDATE_CATEGORY'],
  baseQuery,
  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesResponse, CategoriesRequest>({
      query: (params) => ({
        url: baseEndpoint,
        params,
      }),
      providesTags: (res, err) => (err ? [] : [{ type: 'CATEGORY' }]),
    }),

    getCategory: builder.query<GetCategoryResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${baseEndpoint}/${id}`,
      }),
      providesTags: (res, err) => (err ? [] : [{ type: 'UPDATE_CATEGORY' }]),
    }),

    postCategory: builder.mutation<any, PostCategoryRequest>({
      query: (body) => ({
        url: `${baseEndpoint}/create`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['CATEGORY'],
    }),

    putCategory: builder.mutation<any, PutCategoryRequest>({
      query: (body) => ({
        url: baseEndpoint,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['CATEGORY', 'UPDATE_CATEGORY'],
    }),

    deleteCategory: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `${baseEndpoint}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CATEGORY'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  usePostCategoryMutation,
  usePutCategoryMutation,
  useDeleteCategoryMutation,
} = CategoryAPI;
