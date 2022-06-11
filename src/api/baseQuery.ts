import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import host from './host';

export const baseQuery = fetchBaseQuery({
  baseUrl: host,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});
