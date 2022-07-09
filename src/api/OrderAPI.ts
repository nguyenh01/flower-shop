import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@src/api/baseQuery';
import {
  CreateOrderResponse,
  CreateOrderRequest,
  GetOrdersRequest,
  GetOrderResponse,
  UpdateStatusRequest,
} from './model/order.data-model';

const baseEndpoint = '/orders';

export const OrderAPI = createApi({
  reducerPath: 'OrderAPI',
  baseQuery,
  tagTypes: ['ORDER', 'STATUS'],
  endpoints: (builder) => ({
    getOrders: builder.query<any, GetOrdersRequest>({
      query: (params) => ({
        url: baseEndpoint,
        params,
      }),
      providesTags: (res, err) => (err ? [] : [{ type: 'ORDER' }]),
    }),

    getOrder: builder.query<GetOrderResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${baseEndpoint}/${id}`,
      }),
      providesTags: (res, err) => (err ? [] : [{ type: 'STATUS' }]),
    }),

    createOrder: builder.mutation<CreateOrderResponse, CreateOrderRequest>({
      query: (body) => ({
        url: `${baseEndpoint}/create`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['ORDER'],
    }),

    updateStatus: builder.mutation<any, UpdateStatusRequest>({
      query: (body) => ({
        url: baseEndpoint,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['ORDER', 'STATUS'],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
  useUpdateStatusMutation,
} = OrderAPI;
