import { combineReducers, configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { statusCodeErrorMiddleware } from '@src/redux/middleware/StatusCodeErrorMiddleware';

import userProfile from '@src/redux/slices/userSlice';
import productSlice from '@src/redux/slices/productSlice';
import selectedMenu from './slices/selectedMenuSlice';

import { UserAPI } from '@src/api/UserAPI';
import { ProductAPI } from '@src/api/ProductAPI';
import { CartAPI } from '@src/api/CartAPI';
import { LocationAPI } from '@src/api/LocationAPI';
import { OrderAPI } from '@src/api/OrderAPI';
import { CategoryAPI } from '@src/api/CategoryAPI';
import { MaterialAPI } from '@src/api/MaterialAPI';
import { RevenueAPI } from '@src/api/RevenueAPI';
import { DashboardAPI } from '@src/api/DashboardAPI';

const rootReducer = combineReducers({
  userProfile,
  productSlice,
  selectedMenu,

  [UserAPI.reducerPath]: UserAPI.reducer,
  [ProductAPI.reducerPath]: ProductAPI.reducer,
  [CartAPI.reducerPath]: CartAPI.reducer,
  [LocationAPI.reducerPath]: LocationAPI.reducer,
  [OrderAPI.reducerPath]: OrderAPI.reducer,
  [CategoryAPI.reducerPath]: CategoryAPI.reducer,
  [MaterialAPI.reducerPath]: MaterialAPI.reducer,
  [RevenueAPI.reducerPath]: RevenueAPI.reducer,
  [DashboardAPI.reducerPath]: DashboardAPI.reducer,
});

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(statusCodeErrorMiddleware)
        .concat(UserAPI.middleware)
        .concat(ProductAPI.middleware)
        .concat(CartAPI.middleware)
        .concat(LocationAPI.middleware)
        .concat(OrderAPI.middleware)
        .concat(CategoryAPI.middleware)
        .concat(MaterialAPI.middleware)
        .concat(RevenueAPI.middleware)
        .concat(DashboardAPI.middleware),
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
