import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@src/api/baseQuery';
import {
  ProductItem,
  ProductRequest,
  ProductResponse,
} from '@src/api/DataModel/product.data-model';

const baseEndpoint = `/products`;

export const ProductAPI = createApi({
  reducerPath: 'UserAPI',
  baseQuery,
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse, ProductRequest>({
      query: (params) => ({
        url: baseEndpoint,
        params,
      }),
    }),

    getProduct: builder.query<ProductItem, { id: string }>({
      query: ({ id }) => ({
        url: `${baseEndpoint}/${id}`,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = ProductAPI;
