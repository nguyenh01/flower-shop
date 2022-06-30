import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@src/api/baseQuery';
import { CategoriesRequest, CategoriesResponse } from './DataModel/category.data-model';

const baseEndpoint = '/categories';

export const CategoryAPI = createApi({
  reducerPath: 'CategoryAPI',
  baseQuery,
  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesResponse, CategoriesRequest>({
      query: (params) => ({
        url: baseEndpoint,
        params,
      }),
    }),
  }),
});

export const { useGetCategoriesQuery } = CategoryAPI;
