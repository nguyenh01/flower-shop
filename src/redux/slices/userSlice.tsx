import { createSlice } from '@reduxjs/toolkit';
import cookies from 'js-cookie';
import router from 'next/router';

const initialState = {
  isAuth: false,
  type: 0,
  profile: { email: '', firstName: '', lastName: '', phone: '', id: '' },
};

const userSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuth = true;
      state.type = action.payload.type;
    },
    logout(state) {
      state.isAuth = false;
      state.type = 0;
      state.profile = initialState.profile;
      cookies.remove('token');
      localStorage.removeItem('token');
      localStorage.removeItem('type');
      //localStorage.removeItem('refreshToken');
      router.push('/');
    },
    setUserProfile(state, action) {
      state.profile.email = action.payload.email;
      state.profile.firstName = action.payload.firstName;
      state.profile.lastName = action.payload.lastName;
      state.profile.phone = action.payload.phone;
      state.profile.id = action.payload.id;
    },
  },
});

const { actions, reducer } = userSlice;

export const { login, logout, setUserProfile } = actions;

export default reducer;
