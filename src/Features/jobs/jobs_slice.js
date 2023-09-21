import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import JobsService from './jobs_service';
import * as states from '../../utils/strings';

const initialState = {
  addJob: {
    status: states.BASE,
    data: {},
  },
  editJob: {
    status: states.BASE,
    data: {},
  },
  getAllJobs: {
    status: states.BASE,
    data: {},
  },
  getAllInactiveJobs: {
    status: states.BASE,
    data: {},
  },
  getAllClosedJobs: {
    status: states.BASE,
    data: {},
  },
  deleteJob: {
    status: states.BASE,
    data: {},
  },
};
export const triggerAddJob = createAsyncThunk(
  'add-job',
  async (params, thunkAPI) => {
    try {
      return await JobsService.addJob(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const triggerEditJob = createAsyncThunk(
  'edit-job',
  async (params, thunkAPI) => {
    try {
      return await JobsService.editJob(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerGetAllJobs = createAsyncThunk(
  'get-all-jobs',
  async (params, thunkAPI) => {
    try {
      return await JobsService.getAllJobs(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerGetAllInactiveJobs = createAsyncThunk(
  'get-all-inactive-jobs',
  async (params, thunkAPI) => {
    try {
      return await JobsService.getAllInactiveJobs(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerGetAllClosedJobs = createAsyncThunk(
  'get-all-closed-jobs',
  async (params, thunkAPI) => {
    try {
      return await JobsService.getAllClosedJobs(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerDeleteJob = createAsyncThunk(
  'delete-job',
  async (params, thunkAPI) => {
    try {
      return await JobsService.deleteJob(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const connectionSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //add job
    builder.addCase(triggerAddJob.pending, (state) => {
      state.addJob.status = states.LOADING;
      state.addJob.data = {};
    });
    builder.addCase(triggerAddJob.fulfilled, (state, action) => {
      state.addJob.status = states.SUCCESSFUL;
      state.addJob.data = action.payload;
    });
    builder.addCase(triggerAddJob.rejected, (state) => {
      state.addJob.status = states.ERROR;
      state.addJob.data = {};
    });

    // edit job
    builder.addCase(triggerEditJob.pending, (state) => {
      state.editJob.status = states.LOADING;
      state.editJob.data = {};
    });
    builder.addCase(triggerEditJob.fulfilled, (state, action) => {
      state.editJob.status = states.SUCCESSFUL;
      state.editJob.data = action.payload;
    });
    builder.addCase(triggerEditJob.rejected, (state) => {
      state.editJob.status = states.ERROR;
      state.editJob.data = {};
    });

    // Get all jobs
    builder.addCase(triggerGetAllJobs.pending, (state) => {
      state.getAllJobs.status = states.LOADING;
      state.getAllJobs.data = {};
    });
    builder.addCase(triggerGetAllJobs.fulfilled, (state, action) => {
      state.getAllJobs.status = states.SUCCESSFUL;
      state.getAllJobs.data = action.payload;
    });
    builder.addCase(triggerGetAllJobs.rejected, (state) => {
      state.getAllJobs.status = states.ERROR;
      state.getAllJobs.data = {};
    });

    // get all inactive jobs
    builder.addCase(triggerGetAllInactiveJobs.pending, (state) => {
      state.getAllInactiveJobs.status = states.LOADING;
      state.getAllInactiveJobs.data = {};
    });
    builder.addCase(triggerGetAllInactiveJobs.fulfilled, (state, action) => {
      state.getAllInactiveJobs.status = states.SUCCESSFUL;
      state.getAllInactiveJobs.data = action.payload;
    });
    builder.addCase(triggerGetAllInactiveJobs.rejected, (state) => {
      state.getAllInactiveJobs.status = states.ERROR;
      state.getAllInactiveJobs.data = {};
    });

    // get all closed jobs
    builder.addCase(triggerGetAllClosedJobs.pending, (state) => {
      state.getAllClosedJobs.status = states.LOADING;
      state.getAllClosedJobs.data = {};
    });
    builder.addCase(triggerGetAllClosedJobs.fulfilled, (state, action) => {
      state.getAllClosedJobs.status = states.SUCCESSFUL;
      state.getAllClosedJobs.data = action.payload;
    });
    builder.addCase(triggerGetAllClosedJobs.rejected, (state) => {
      state.getAllClosedJobs.status = states.ERROR;
      state.getAllClosedJobs.data = {};
    });

    // delete job
    builder.addCase(triggerDeleteJob.pending, (state) => {
      state.deleteJob.status = states.LOADING;
      state.deleteJob.data = {};
    });
    builder.addCase(triggerDeleteJob.fulfilled, (state, action) => {
      state.deleteJob.status = states.SUCCESSFUL;
      state.deleteJob.data = action.payload;
    });
    builder.addCase(triggerDeleteJob.rejected, (state) => {
      state.deleteJob.status = states.ERROR;
      state.deleteJob.data = {};
    });
  },
});

export default connectionSlice.reducer;
