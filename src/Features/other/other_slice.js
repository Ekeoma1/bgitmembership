import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showPostModalMobile: false,
  showMobileNav: false,
};

const otherSlice = createSlice({
  name: 'other',
  initialState,
  reducers: {
    setShowPostModalMobile: (state) => {
      state.showPostModalMobile = true;
    },
    resetShowPostModalMobile: (state) => {
      state.showPostModalMobile = false;
    },
    setShowMobileNav: (state) => {
      state.showMobileNav = true;
    },
    resetShowMobileNav: (state) => {
      state.showMobileNav = false;
    },
  },
});
export const {
  setShowPostModalMobile,
  resetShowPostModalMobile,
  setShowMobileNav,
  resetShowMobileNav,
} = otherSlice.actions;
export default otherSlice.reducer;
