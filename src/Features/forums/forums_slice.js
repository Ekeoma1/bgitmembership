import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ForumsService from './forums_service';
import * as states from '../../utils/strings';

const initialState = {
  getAllForums: {
    status: states.BASE,
    data: [],
  },
  getAllForumsByIndustry: {
    status: states.BASE,
    data: [],
  },
  getAllForumsByLocation: {
    status: states.BASE,
    data: [],
  },
  joinForum: {
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
// get all forums by industry
export const triggerGetAllForumsByIndustry = createAsyncThunk(
  'get-all-forums-by-industry',
  async (params, thunkAPI) => {
    try {
      return await ForumsService.getAllForumsByIndustry(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
// get all forums by location
export const triggerGetAllForumsByLocation = createAsyncThunk(
  'get-all-forums-by-location',
  async (params, thunkAPI) => {
    try {
      return await ForumsService.getAllForumsByLocation(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
// join forum
export const triggerJoinForum = createAsyncThunk(
  'join-forum',
  async (params, thunkAPI) => {
    try {
      return await ForumsService.joinForum(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const forumsSlice = createSlice({
  name: 'forums',
  initialState,
  reducers: {
    resetJoinForum: (state) => {
      state.joinForum = initialState.joinForum;
    },
  },
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
    // get all forums by industry
    builder.addCase(triggerGetAllForumsByIndustry.pending, (state) => {
      state.getAllForumsByIndustry.status = states.LOADING;
      state.getAllForumsByIndustry.data = {};
    });
    builder.addCase(triggerGetAllForumsByIndustry.fulfilled, (state, action) => {
      state.getAllForumsByIndustry.status = states.SUCCESSFUL;
      state.getAllForumsByIndustry.data = action.payload;
    });
    builder.addCase(triggerGetAllForumsByIndustry.rejected, (state, action) => {
      state.getAllForumsByIndustry.status = states.ERROR;
      state.getAllForumsByIndustry.data = action.payload;
    });

    // get all forums by location
    builder.addCase(triggerGetAllForumsByLocation.pending, (state) => {
      state.getAllForumsByLocation.status = states.LOADING;
      state.getAllForumsByLocation.data = {};
    });
    builder.addCase(triggerGetAllForumsByLocation.fulfilled, (state, action) => {
      state.getAllForumsByLocation.status = states.SUCCESSFUL;
      state.getAllForumsByLocation.data = action.payload;
    });
    builder.addCase(triggerGetAllForumsByLocation.rejected, (state, action) => {
      state.getAllForumsByLocation.status = states.ERROR;
      state.getAllForumsByLocation.data = action.payload;
    });

    // Join forum
    builder.addCase(triggerJoinForum.pending, (state) => {
      state.joinForum.status = states.LOADING;
      state.joinForum.data = {};
    });
    builder.addCase(triggerJoinForum.fulfilled, (state, action) => {
      state.joinForum.status = states.SUCCESSFUL;
      state.joinForum.data = action.payload;
    });
    builder.addCase(triggerJoinForum.rejected, (state, action) => {
      state.joinForum.status = states.ERROR;
      state.joinForum.data = action.payload;
    });
  },
});

export default forumsSlice.reducer;
export const { resetJoinForum } = forumsSlice.actions;
