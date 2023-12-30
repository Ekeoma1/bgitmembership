import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import JobsApplicationService from './jobs_application_service';
import * as states from '../../utils/strings';

const initialState = {
  applyForJob: {
    status: states.BASE,
    data: {},
  },
};
export const triggerApplyForJob = createAsyncThunk(
  'apply-for-job',
  async (params, thunkAPI) => {
    try {
      return await JobsApplicationService.applyForJob(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const jobsApplicationSlice = createSlice({
  name: 'jobs-application',
  initialState,
  reducers: {
    resetApplyForJob: (state) => {
      state.applyForJob = initialState.applyForJob;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(triggerApplyForJob.pending, (state) => {
      state.applyForJob.status = states.LOADING;
      state.applyForJob.data = {};
    });
    builder.addCase(triggerApplyForJob.fulfilled, (state, action) => {
      state.applyForJob.status = states.SUCCESSFUL;
      state.applyForJob.data = action.payload;
    });
    builder.addCase(triggerApplyForJob.rejected, (state, action) => {
      state.applyForJob.status = states.ERROR;
      state.applyForJob.data = action.payload;
    });
  },
});

export default jobsApplicationSlice.reducer;
export const {resetApplyForJob} = jobsApplicationSlice.actions;
