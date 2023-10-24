import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ForumsService from './forums_service';
import * as states from '../../utils/strings';

const initialState = {
  joinForum: {
    status: states.BASE,
    data: {},
  },
  leaveForum: {
    status: states.BASE,
    data: {},
  },
  createForum: {
    status: states.BASE,
    data: {},
  },
  getAllForums: {
    status: states.BASE,
    data: [],
  },
  getForumById: {
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
  activeForumIdForOngoingRequest: '',
};
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
// leave forum
export const triggerLeaveForum = createAsyncThunk(
  'leave-forum',
  async (params, thunkAPI) => {
    try {
      return await ForumsService.leaveForum(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
// create forum
export const triggerCreateForum = createAsyncThunk(
  'create-forum',
  async (params, thunkAPI) => {
    try {
      return await ForumsService.createForum(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
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
// get forum by Id
export const triggerGetForumById = createAsyncThunk(
  'get-forum-by-id',
  async (params, thunkAPI) => {
    try {
      return await ForumsService.getForumById(params);
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

const forumsSlice = createSlice({
  name: 'forums',
  initialState,
  reducers: {
    resetJoinForum: (state) => {
      state.joinForum = initialState.joinForum;
    },
    resetLeaveForum: (state) => {
      state.leaveForum = initialState.leaveForum;
    },
    setActiveForumIdForOngoingRequest: (state, action) => {
      state.activeForumIdForOngoingRequest = action.payload;
    },
    resetActiveForumIdForOngoingRequest: (state) => {
      state.activeForumIdForOngoingRequest =
        initialState.activeForumIdForOngoingRequest;
    },
  },
  extraReducers: (builder) => {
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

    // leave forum
    builder.addCase(triggerLeaveForum.pending, (state) => {
      state.leaveForum.status = states.LOADING;
      state.leaveForum.data = {};
    });
    builder.addCase(triggerLeaveForum.fulfilled, (state, action) => {
      state.leaveForum.status = states.SUCCESSFUL;
      state.leaveForum.data = action.payload;
    });
    builder.addCase(triggerLeaveForum.rejected, (state, action) => {
      state.leaveForum.status = states.ERROR;
      state.leaveForum.data = action.payload;
    });

    // create forum
    builder.addCase(triggerCreateForum.pending, (state) => {
      state.createForum.status = states.LOADING;
      state.createForum.data = {};
    });
    builder.addCase(triggerCreateForum.fulfilled, (state, action) => {
      state.createForum.status = states.SUCCESSFUL;
      state.createForum.data = action.payload;
    });
    builder.addCase(triggerCreateForum.rejected, (state, action) => {
      state.createForum.status = states.ERROR;
      state.createForum.data = action.payload;
    });
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

    // get forums by ID
    builder.addCase(triggerGetForumById.pending, (state) => {
      state.getForumById.status = states.LOADING;
      state.getForumById.data = {};
    });
    builder.addCase(triggerGetForumById.fulfilled, (state, action) => {
      state.getForumById.status = states.SUCCESSFUL;
      state.getForumById.data = action.payload;
    });
    builder.addCase(triggerGetForumById.rejected, (state, action) => {
      state.getForumById.status = states.ERROR;
      state.getForumById.data = action.payload;
    });

    // get all forums by industry
    builder.addCase(triggerGetAllForumsByIndustry.pending, (state) => {
      state.getAllForumsByIndustry.status = states.LOADING;
      state.getAllForumsByIndustry.data = {};
    });
    builder.addCase(
      triggerGetAllForumsByIndustry.fulfilled,
      (state, action) => {
        state.getAllForumsByIndustry.status = states.SUCCESSFUL;
        state.getAllForumsByIndustry.data = action.payload;
      }
    );
    builder.addCase(triggerGetAllForumsByIndustry.rejected, (state, action) => {
      state.getAllForumsByIndustry.status = states.ERROR;
      state.getAllForumsByIndustry.data = action.payload;
    });

    // get all forums by location
    builder.addCase(triggerGetAllForumsByLocation.pending, (state) => {
      state.getAllForumsByLocation.status = states.LOADING;
      state.getAllForumsByLocation.data = {};
    });
    builder.addCase(
      triggerGetAllForumsByLocation.fulfilled,
      (state, action) => {
        state.getAllForumsByLocation.status = states.SUCCESSFUL;
        state.getAllForumsByLocation.data = action.payload;
      }
    );
    builder.addCase(triggerGetAllForumsByLocation.rejected, (state, action) => {
      state.getAllForumsByLocation.status = states.ERROR;
      state.getAllForumsByLocation.data = action.payload;
    });
  },
});

export default forumsSlice.reducer;
export const {
  resetJoinForum,
  resetLeaveForum,
  setActiveForumIdForOngoingRequest,
  resetActiveForumIdForOngoingRequest,
} = forumsSlice.actions;
