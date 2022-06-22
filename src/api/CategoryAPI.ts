import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@src/api/baseQuery';
import { CategoriesResponse } from './DataModel/category.data-model';

const baseEndpoint = '/categories';

export const CategoryAPI = createApi({
  reducerPath: 'CategoryAPI',
  baseQuery,
  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesResponse, any>({
      query: () => ({
        url: `${baseEndpoint}/get`,
      }),
    }),
  }),
});

export const { useGetCategoriesQuery } = CategoryAPI;
