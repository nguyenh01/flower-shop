import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from '@src/api/baseQuery';
import {
  DistrictRequest,
  DistrictResponse,
  ProvinceResponse,
  ShipFeeRequest,
  ShipFeeResponse,
  WardRequest,
  WardResponse,
} from '@src/api/model/location.data-model';

const baseEndpoint = '/shipFee';

export const LocationAPI = createApi({
  reducerPath: 'LocationAPI',
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getProvince: builder.query<ProvinceResponse, any>({
      query: () => ({
        url: `${baseEndpoint}/province`,
      }),
    }),

    getDistrict: builder.query<DistrictResponse, DistrictRequest>({
      query: ({ id }) => ({
        url: `${baseEndpoint}/district/${id}`,
      }),
    }),

    getWard: builder.query<WardResponse, WardRequest>({
      query: ({ id }) => ({
        url: `${baseEndpoint}/ward/${id}`,
      }),
    }),

    getShipFee: builder.mutation<ShipFeeResponse, ShipFeeRequest>({
      query: (body) => ({
        url: `${baseEndpoint}/getshipfee`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetProvinceQuery, useGetDistrictQuery, useGetWardQuery, useGetShipFeeMutation } =
  LocationAPI;
