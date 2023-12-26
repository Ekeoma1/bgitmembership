import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import NotificationService from './notification_service';
import * as states from '../../utils/strings';

const initialState = {
  getAllNotifications: {
    status: states.BASE,
    data: {},
  },
  getUnreadNotificationCount: {
    status: states.BASE,
    data: {},
  },
  getPendingRequestCount: {
    status: states.BASE,
    data: {},
  },
};

export const triggerGetAllNotifications = createAsyncThunk(
  'get-all-notifications',
  async (params, thunkAPI) => {
    try {
      return await NotificationService.getAllNotifications(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerGetUnreadNotificationCount = createAsyncThunk(
  'get-unread-notofication-count',
  async (params, thunkAPI) => {
    try {
      return await NotificationService.getUnreadNotificationCount(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerGetPendingRequestCount = createAsyncThunk(
  'get-pending-request-count',
  async (params, thunkAPI) => {
    try {
      return await NotificationService.getPendingRequestCount(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const notificationsSlice = createSlice({
  name: 'connections',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get all notification
    builder.addCase(triggerGetAllNotifications.pending, (state) => {
      state.getAllNotifications.status = states.LOADING;
      state.getAllNotifications.data = {};
    });
    builder.addCase(triggerGetAllNotifications.fulfilled, (state, action) => {
      state.getAllNotifications.status = states.SUCCESSFUL;
      state.getAllNotifications.data = action.payload;
    });
    builder.addCase(triggerGetAllNotifications.rejected, (state, action) => {
      state.getAllNotifications.status = states.ERROR;
      state.getAllNotifications.data = {};
    });

    // Get unread notification count
    builder.addCase(triggerGetUnreadNotificationCount.pending, (state) => {
      state.getUnreadNotificationCount.status = states.LOADING;
      state.getUnreadNotificationCount.data = {};
    });
    builder.addCase(triggerGetUnreadNotificationCount.fulfilled, (state, action) => {
      state.getUnreadNotificationCount.status = states.SUCCESSFUL;
      state.getUnreadNotificationCount.data = action.payload;
    });
    builder.addCase(triggerGetUnreadNotificationCount.rejected, (state, action) => {
      state.getUnreadNotificationCount.status = states.ERROR;
      state.getUnreadNotificationCount.data = {};
    });

    // Get pending request count
    builder.addCase(triggerGetPendingRequestCount.pending, (state) => {
      state.getPendingRequestCount.status = states.LOADING;
      state.getPendingRequestCount.data = {};
    });
    builder.addCase(triggerGetPendingRequestCount.fulfilled, (state, action) => {
      state.getPendingRequestCount.status = states.SUCCESSFUL;
      state.getPendingRequestCount.data = action.payload;
    });
    builder.addCase(triggerGetPendingRequestCount.rejected, (state, action) => {
      state.getPendingRequestCount.status = states.ERROR;
      state.getPendingRequestCount.data = {};
    });
  },
});

export default notificationsSlice.reducer;

