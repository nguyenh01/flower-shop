import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@src/api/baseQuery';
import {
  PostProductResponse,
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

    postProduct: builder.mutation<PostProductResponse, FormData>({
      query: (body) => ({
        url: `${baseEndpoint}/create`,
        method: 'POST',
        body,
      }),
    }),

    putProduct: builder.mutation<PostProductResponse, FormData>({
      query: (body) => ({
        url: baseEndpoint,
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  usePostProductMutation,
  usePutProductMutation,
} = ProductAPI;
