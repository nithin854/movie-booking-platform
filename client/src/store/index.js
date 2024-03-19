import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import { baseAppApi } from '../services/baseService';

export const store = configureStore({
  reducer: {
    user: userReducer,
    [baseAppApi.reducerPath]: baseAppApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAppApi.middleware),
})