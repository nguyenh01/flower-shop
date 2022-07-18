import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from '@src/api/baseQuery';
import {
  PostProductResponse,
  ProductItem,
  ProductRequest,
  ProductResponse,
} from '@src/api/model/product.data-model';

const baseEndpoint = `/products`;

export const ProductAPI = createApi({
  reducerPath: 'UserAPI',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['PRODUCT', 'UPDATE_PRODUCT'],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse, ProductRequest>({
      query: (params) => ({
        url: baseEndpoint,
        params,
      }),
      providesTags: (res, err) => (err ? [] : [{ type: 'PRODUCT' }]),
    }),

    getProduct: builder.query<ProductItem, { id: string }>({
      query: ({ id }) => ({
        url: `${baseEndpoint}/${id}`,
      }),
      providesTags: (res, err) => (err ? [] : [{ type: 'UPDATE_PRODUCT' }]),
    }),

    postProduct: builder.mutation<PostProductResponse, FormData>({
      query: (body) => ({
        url: `${baseEndpoint}/create`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['PRODUCT'],
    }),

    putProduct: builder.mutation<PostProductResponse, FormData>({
      query: (body) => ({
        url: baseEndpoint,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['PRODUCT', 'UPDATE_PRODUCT'],
    }),

    deleteProduct: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `${baseEndpoint}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PRODUCT'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  usePostProductMutation,
  usePutProductMutation,
  useDeleteProductMutation,
} = ProductAPI;
