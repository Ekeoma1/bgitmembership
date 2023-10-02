import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ForumsService from './forums_service';
import * as states from '../../utils/strings';

const initialState = {
  getAllForums: {
    status: states.BASE,
    data: {},
  },
};

// get all forums
export const triggerGetAllForums = createAsyncThunk(
  'get-all-forums',
  async (params, thunkAPI) => {
    try {
      return await ForumsService.getAllForums(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'forums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all forums
    builder.addCase(triggerGetAllForums.pending, (state) => {
      state.getAllForums.status = states.LOADING;
      state.getAllForums.data = {};
    });
    builder.addCase(triggerGetAllForums.fulfilled, (state, action) => {
      state.getAllForums.status = states.SUCCESSFUL;
      state.getAllForums.data = action.payload;
    });
    builder.addCase(triggerGetAllForums.rejected, (state, action) => {
      state.getAllForums.status = states.ERROR;
      state.getAllForums.data = action.payload;
    });
  },
});

export default usersSlice.reducer;

