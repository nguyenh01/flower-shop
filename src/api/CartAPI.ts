import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@src/api/baseQuery';
import {
  CartResponse,
  DeleteCartRequest,
  DeleteCartResponse,
  PostCartItemRequest,
} from '@src/api/DataModel/cart.data-model';

const baseEndpoint = `/shoppingCarts`;

export const CartAPI = createApi({
  reducerPath: 'CartAPI',
  baseQuery,
  tagTypes: ['CART'],
  endpoints: (builder) => ({
    getCartById: builder.query<CartResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${baseEndpoint}/${id}`,
      }),
      providesTags: (res, err, arg) => (err ? [] : [{ type: 'CART', id: arg.id }]),
    }),

    postCartItem: builder.mutation<any, PostCartItemRequest>({
      query: (body) => ({
        url: `${baseEndpoint}/addProduct`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['CART'],
    }),

    deleteCartItem: builder.mutation<DeleteCartResponse, DeleteCartRequest>({
      query: (body) => ({
        url: '/shoppingCartDetails',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['CART'],
    }),

    deleteCart: builder.mutation<DeleteCartResponse, DeleteCartRequest>({
      query: (body) => ({
        url: baseEndpoint,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['CART'],
    }),
  }),
});

export const {
  useGetCartByIdQuery,
  usePostCartItemMutation,
  useDeleteCartItemMutation,
  useDeleteCartMutation,
} = CartAPI;
