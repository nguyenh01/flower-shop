import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from '@src/api/baseQuery';
import { MessageResponse } from './model/message.data-model';

const baseEndpoint = `/messages`;

export const MessageAPI = createApi({
  reducerPath: 'MessageAPI',
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getMessages: builder.query<MessageResponse, any>({
      query: () => ({
        url: baseEndpoint,
      }),
    }),

    getMessageById: builder.query<MessageResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${baseEndpoint}/${id}`,
      }),
    }),
  }),
});

export const { useLazyGetMessagesQuery, useLazyGetMessageByIdQuery } = MessageAPI;
