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

const productSilce = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    setCart(state, action) {
      state.cart = action.payload;
    },
  },
});

const { actions, reducer } = productSilce;

export const { setCart } = actions;

export default reducer;
