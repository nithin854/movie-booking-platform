import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const token = localStorage.getItem('user-scaler-bookshow');
export const baseAppApi = createApi({
  reducerPath: 'scaler-bookshow',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  }),
  tagTypes: ['MOVIES', 'MOVIE', 'THEATRES', 'THEATRE', 'THEATRE-BY-OWNER', 'SHOWS', 'SHOW'],
  endpoints: () => ({}),
})