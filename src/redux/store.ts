import { combineReducers, configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { StatusCodeErrorMiddleware } from '@src/redux/middlewares/StatusCodeErrorMiddleware';

import userProfile from '@src/redux/slices/userSlice';
import productSilce from '@src/redux/slices/productSlice';

import { AuthenticationAPI } from '@src/api/AuthenticationAPI';
import { ProductAPI } from '@src/api/ProductAPI';
import { CartAPI } from '@src/api/CartAPI';
import { LocationAPI } from '@src/api/LocationAPI';

const rootReducer = combineReducers({
  userProfile,
  productSilce,

  [AuthenticationAPI.reducerPath]: AuthenticationAPI.reducer,
  [ProductAPI.reducerPath]: ProductAPI.reducer,
  [CartAPI.reducerPath]: CartAPI.reducer,
  [LocationAPI.reducerPath]: LocationAPI.reducer,
});

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(StatusCodeErrorMiddleware)
        .concat(AuthenticationAPI.middleware)
        .concat(ProductAPI.middleware)
        .concat(CartAPI.middleware)
        .concat(LocationAPI.middleware),
  });
}

const store = makeStore();

export type RootState = ReturnType<typeof rootReducer>;

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
