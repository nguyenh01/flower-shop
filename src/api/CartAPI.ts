import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from '@src/api/baseQuery';
import {
  CartResponse,
  DeleteCartRequest,
  DeleteCartResponse,
  PostCartItemRequest,
  PutCartItemRequest,
  PutCartItemResponse,
} from '@src/api/model/cart.data-model';

const baseEndpoint = `/shoppingCarts`;

export const CartAPI = createApi({
  reducerPath: 'CartAPI',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['CART'],
  endpoints: (builder) => ({
    getCartById: builder.query<CartResponse, any>({
      query: () => ({
        url: baseEndpoint,
      }),
      providesTags: (res, err) => (err ? [] : [{ type: 'CART' }]),
    }),

    postCartItem: builder.mutation<any, PostCartItemRequest>({
      query: (body) => ({
        url: `${baseEndpoint}/addProduct`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['CART'],
    }),

    putCartItem: builder.mutation<PutCartItemResponse, PutCartItemRequest>({
      query: (body) => ({
        url: `${baseEndpoint}/updateProduct`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['CART'],
    }),

    deleteCartItem: builder.mutation<DeleteCartResponse, DeleteCartRequest>({
      query: (body) => ({
        url: baseEndpoint,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['CART'],
    }),

    deleteCart: builder.mutation<DeleteCartResponse, any>({
      query: () => ({
        url: baseEndpoint,
        method: 'DELETE',
      }),
      invalidatesTags: ['CART'],
    }),
  }),
});

export const {
  useGetCartByIdQuery,
  usePostCartItemMutation,
  usePutCartItemMutation,
  useDeleteCartItemMutation,
  useDeleteCartMutation,
} = CartAPI;
