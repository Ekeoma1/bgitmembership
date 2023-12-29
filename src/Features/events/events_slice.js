import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import EventsService from './events_service';
import * as states from '../../utils/strings';

const initialState = {
  getAllEvents: {
    status: states.BASE,
    data: [],
  },
  getMyAppliedEvents: {
    status: states.BASE,
    data: [],
  },
  getEventById: {
    status: states.BASE,
    data: {},
  },
  applyForEvent: {
    status: states.BASE,
    data: {},
  },
  cancelEventApplication: {
    status: states.BASE,
    data: {},
  },
};
// get all events
export const triggerGetAllEvents = createAsyncThunk(
  'get-all-events',
  async (params, thunkAPI) => {
    try {
      return await EventsService.getAllEvents(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
// get my applied events
export const triggerGetMyAppliedEvents = createAsyncThunk(
  'get-my-applied-events',
  async (params, thunkAPI) => {
    try {
      return await EventsService.getMyAppliedEvents(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
// get event by ID
export const triggerGetEventByID = createAsyncThunk(
  'get-event-by-id',
  async (params, thunkAPI) => {
    try {
      return await EventsService.getEventById(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

//apply for event
export const triggerApplyForEvent = createAsyncThunk(
  'apply-for-event',
  async (params, thunkAPI) => {
    try {
      return await EventsService.applyForEvent(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

//cancel event application
export const triggerCancelEventApplication = createAsyncThunk(
  'cancel-event-application',
  async (params, thunkAPI) => {
    try {
      return await EventsService.cancelEventApplication(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    resetApplyForEvent: (state) => {
      state.applyForEvent = initialState.applyForEvent;
    },
    resetCancelEventApplication: (state) => {
      state.cancelEventApplication = initialState.cancelEventApplication;
    },
  },
  extraReducers: (builder) => {
    // Get all events
    builder.addCase(triggerGetAllEvents.pending, (state) => {
      state.getAllEvents.status = states.LOADING;
      state.getAllEvents.data = {};
    });
    builder.addCase(triggerGetAllEvents.fulfilled, (state, action) => {
      state.getAllEvents.status = states.SUCCESSFUL;
      state.getAllEvents.data = action.payload;
    });
    builder.addCase(triggerGetAllEvents.rejected, (state, action) => {
      state.getAllEvents.status = states.ERROR;
      state.getAllEvents.data = action.payload;
    });

    // Get my applied events
    builder.addCase(triggerGetMyAppliedEvents.pending, (state) => {
      state.getMyAppliedEvents.status = states.LOADING;
      state.getMyAppliedEvents.data = {};
    });
    builder.addCase(triggerGetMyAppliedEvents.fulfilled, (state, action) => {
      state.getMyAppliedEvents.status = states.SUCCESSFUL;
      state.getMyAppliedEvents.data = action.payload;
    });
    builder.addCase(triggerGetMyAppliedEvents.rejected, (state, action) => {
      state.getMyAppliedEvents.status = states.ERROR;
      state.getMyAppliedEvents.data = action.payload;
    });

    // Get event by ID
    builder.addCase(triggerGetEventByID.pending, (state) => {
      state.getEventById.status = states.LOADING;
      state.getEventById.data = {};
    });
    builder.addCase(triggerGetEventByID.fulfilled, (state, action) => {
      state.getEventById.status = states.SUCCESSFUL;
      state.getEventById.data = action.payload;
    });
    builder.addCase(triggerGetEventByID.rejected, (state, action) => {
      state.getEventById.status = states.ERROR;
      state.getEventById.data = action.payload;
    });

    // Apply for event
    builder.addCase(triggerApplyForEvent.pending, (state) => {
      state.applyForEvent.status = states.LOADING;
      state.applyForEvent.data = {};
    });
    builder.addCase(triggerApplyForEvent.fulfilled, (state, action) => {
      state.applyForEvent.status = states.SUCCESSFUL;
      state.applyForEvent.data = action.payload;
    });
    builder.addCase(triggerApplyForEvent.rejected, (state, action) => {
      state.applyForEvent.status = states.ERROR;
      state.applyForEvent.data = action.payload;
    });

    // cancel event application
    builder.addCase(triggerCancelEventApplication.pending, (state) => {
      state.cancelEventApplication.status = states.LOADING;
      state.cancelEventApplication.data = {};
    });
    builder.addCase(
      triggerCancelEventApplication.fulfilled,
      (state, action) => {
        state.cancelEventApplication.status = states.SUCCESSFUL;
        state.cancelEventApplication.data = action.payload;
      }
    );
    builder.addCase(triggerCancelEventApplication.rejected, (state, action) => {
      state.cancelEventApplication.status = states.ERROR;
      state.cancelEventApplication.data = action.payload;
    });
  },
});

export default eventsSlice.reducer;
export const { resetApplyForEvent,resetCancelEventApplication } = eventsSlice.actions;
