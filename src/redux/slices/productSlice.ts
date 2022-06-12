import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [
    {
      id: '',
      image: '',
      name: '',
      price: '',
      quantity: '',
    },
  ],
};

const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    setCart(state, action) {
      state.cart = action.payload;
    },
  },
});

const { actions, reducer } = productSlice;

export const { setCart } = actions;

export default reducer;
