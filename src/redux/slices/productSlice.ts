import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  count: 0,
  loading: false,
};

const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    setCart(state, action) {
      state.cartItems = action.payload;
    },
    setCountCookie(state, action) {
      state.count = action.payload;
    },
    setLoadingCart(state, action) {
      state.loading = action.payload;
    },
  },
});

const { actions, reducer } = productSlice;

export const { setCart, setCountCookie, setLoadingCart } = actions;

export default reducer;
