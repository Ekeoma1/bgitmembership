import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ReportsService from './reports_service';
import * as states from '../../utils/strings';

const initialState = {
  reportUser: {
    status: states.BASE,
    data: {},
  },
  getAllReports: {
    status: states.BASE,
    data: {},
  },
};

export const triggerReportUser = createAsyncThunk(
  'report-user',
  async (params, thunkAPI) => {
    try {
      return await ReportsService.signup(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const triggerGetAllReports = createAsyncThunk(
  'get-all-reports',
  async (params, thunkAPI) => {
    try {
      return await ReportsService.signin(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(triggerReportUser.pending, (state) => {
      state.reportUser.status = states.LOADING;
      state.reportUser.data = {};
    });
    builder.addCase(triggerReportUser.fulfilled, (state, action) => {
      state.reportUser.status = states.SUCCESSFUL;
      state.reportUser.data = action.payload;
    });
    builder.addCase(triggerReportUser.rejected, (state, action) => {
      state.reportUser.status = states.ERROR;
      state.reportUser.data = {};
    });

    builder.addCase(triggerGetAllReports.pending, (state) => {
      state.getAllReports.status = states.LOADING;
      state.getAllReports.data = {};
    });
    builder.addCase(triggerGetAllReports.fulfilled, (state, action) => {
      state.getAllReports.status = states.SUCCESSFUL;
      state.getAllReports.data = action.payload;
    });
    builder.addCase(triggerGetAllReports.rejected, (state) => {
      state.getAllReports.status = states.ERROR;
      state.getAllReports.data = {};
    });
  },
});

export default reportsSlice.reducer;
