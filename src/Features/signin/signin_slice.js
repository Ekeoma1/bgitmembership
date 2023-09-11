import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SigninService from './signin_service';
import * as states from '../../utils/strings';

const initialState = {
  signin: {
    status: states.BASE,
    data: {},
  },
};

export const triggerSignin = createAsyncThunk(
  'sign in',
  async (params, thunkAPI) => {
    try {
      return await SigninService.signin(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const signinSlice = createSlice({
  name: 'sign in',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(triggerSignin.pending, (state) => {
      state.signin.status = states.LOADING;
      state.signin.data = {};
    });
    builder.addCase(triggerSignin.fulfilled, (state, action) => {
      state.signin.status = states.SUCCESSFUL;
      state.signin.data = action.payload;
    });
    builder.addCase(triggerSignin.rejected, (state, action) => {
      state.signin.status = states.ERROR;
      state.signin.data = {};
    });
  },
});

export default signinSlice.reducer;
