import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from '@src/api/baseQuery';
import { LoginResponse, LoginRequest } from '@src/api/model/login.data-model';
import {
  RegisterResponse,
  RegisterRequest,
  PutUserResponse,
  PutUserRequest,
  ChangePasswordRequest,
  GetAccountListResponse,
  GetAccountListRequest,
  LogoutRequest,
} from '@src/api/model/user.data-model';

const baseEndpoint = `/users`;

export const UserAPI = createApi({
  reducerPath: 'AuthenticationAPI',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['UPDATE_INFO', 'EMPLOYEE'],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: `${baseEndpoint}/login`,
        method: 'POST',
        body,
      }),
    }),

    logout: builder.mutation<any, LogoutRequest>({
      query: (body) => ({
        url: `${baseEndpoint}/logout`,
        method: 'POST',
        body,
      }),
    }),

    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: `${baseEndpoint}/register`,
        method: 'POST',
        body,
      }),
    }),

    updateInfo: builder.mutation<PutUserResponse, PutUserRequest>({
      query: (body) => ({
        url: baseEndpoint,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['UPDATE_INFO'],
    }),

    changePassword: builder.mutation<PutUserResponse, ChangePasswordRequest>({
      query: (body) => ({
        url: `${baseEndpoint}/change-password`,
        method: 'PUT',
        body,
      }),
    }),

    verifyAccessToken: builder.query<any, any>({
      query: () => ({
        url: `${baseEndpoint}/me`,
      }),
      providesTags: (res, err) => (err ? [] : [{ type: 'UPDATE_INFO' }]),
    }),

    getAccountList: builder.query<GetAccountListResponse, GetAccountListRequest>({
      query: (params) => ({
        url: baseEndpoint,
        params,
      }),
      providesTags: (res, err) => (err ? [] : [{ type: 'EMPLOYEE' }]),
    }),

    createEmployee: builder.mutation<{ msg: string }, { email: string }>({
      query: (body) => ({
        url: `${baseEndpoint}/create`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['EMPLOYEE'],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useVerifyAccessTokenQuery,
  useUpdateInfoMutation,
  useChangePasswordMutation,
  useLazyVerifyAccessTokenQuery,
  useGetAccountListQuery,
  useLazyGetAccountListQuery,
  useCreateEmployeeMutation,
} = UserAPI;
