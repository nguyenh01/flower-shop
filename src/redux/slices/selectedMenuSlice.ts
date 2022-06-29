import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selected: '1',
};

const selectedMenuSlice = createSlice({
  name: 'selectedMenu',
  initialState,
  reducers: {
    setSelection(state, action) {
      state.selected = action.payload;
    },
  },
});

const { actions, reducer } = selectedMenuSlice;

export const { setSelection } = actions;

export default reducer;
