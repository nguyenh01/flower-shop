import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@src/api/baseQuery';
import { LoginResponse, LoginRequest } from '@src/api/DataModel/login.data-model';
import { RegisterResponse, RegisterRequest } from '@src/api/DataModel/register.data-model';

const baseEndpoint = `/users`;

export const AuthenticationAPI = createApi({
  reducerPath: 'AuthenticationAPI',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: `${baseEndpoint}/login`,
        method: 'POST',
        body,
      }),
    }),

    logout: builder.mutation<any, null>({
      query: () => ({
        url: `${baseEndpoint}/logout`,
        method: 'POST',
      }),
    }),

    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: `${baseEndpoint}/register`,
        method: 'POST',
        body,
      }),
    }),

    verifyAccessToken: builder.query<any, any>({
      query: () => ({
        url: `${baseEndpoint}/me`,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useVerifyAccessTokenQuery,
  useLazyVerifyAccessTokenQuery,
} = AuthenticationAPI;
