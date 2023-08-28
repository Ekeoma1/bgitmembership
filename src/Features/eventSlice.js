import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookEventData: {
    promo_code: '',
    general_admission: 0,
    general_admission_plus_merch: 0,
    general_admission_price: '',
    general_admission_plus_merch_price: '',
  },
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    bookEvent: (state, action) => {
      state.bookEventData = action.payload;
    },
  },
});

export const { bookEvent } = eventSlice.actions;
export default eventSlice.reducer;
