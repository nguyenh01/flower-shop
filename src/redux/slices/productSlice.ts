import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  count: 0,
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
  },
});

const { actions, reducer } = productSlice;

export const { setCart, setCountCookie } = actions;

export default reducer;
