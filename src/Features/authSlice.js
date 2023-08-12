import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: true,
  hasSignedUp: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },

    registered: (state) => {
      state.hasSignedUp = true;
    },

    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;
