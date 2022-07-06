import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import apiHost from './api-host';

export const baseQuery = fetchBaseQuery({
  baseUrl: apiHost,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});
