import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@src/api/baseQuery';
import { OrderResponse, OrderRequest } from './DataModel/order.data-model';

const baseEndpoint = '/orders/create';

export const OrderAPI = createApi({
  reducerPath: 'OrderAPI',
  baseQuery,
  endpoints: (builder) => ({
    createOrder: builder.mutation<OrderResponse, OrderRequest>({
      query: () => ({
        url: baseEndpoint,
        method: 'POST',
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = OrderAPI;
