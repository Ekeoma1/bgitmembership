import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showPostModalMobile: false,
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
  },
});
export const { setShowPostModalMobile, resetShowPostModalMobile } =
  otherSlice.actions;
export default otherSlice.reducer;
