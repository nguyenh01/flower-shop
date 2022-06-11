import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@src/api/baseQuery';
import { CartResponse, PostCartItemRequest } from '@src/api/DataModel/cart.data-model';

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
    }),
  }),
});

export const { useGetCartByIdQuery, usePostCartItemMutation } = CartAPI;
