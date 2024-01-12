import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ForumsService from './forums_service';
import * as states from '../../utils/strings';
import { renderToast } from '../../components/Molecules/CustomToastify';

const initialState = {
  joinForum: {
    status: states.BASE,
    data: {},
  },
  leaveForum: {
    status: states.BASE,
    data: {},
  },
  cancelJoinForumRequest: {
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
  getSuggestedForums: {
    status: states.BASE,
    data: [],
  },
  getMyForums: {
    status: states.BASE,
    data: [],
  },
  getForumById: {
    status: states.BASE,
    data: [],
  },
  getForumConnectionStatusByForumId: {
    status: states.BASE,
    data: {},
  },
  getAllForumsByIndustry: {
    status: states.BASE,
    data: [],
  },
  getAllForumsByLocation: {
    status: states.BASE,
    data: [],
  },
  getForumsByUserId: {
    status: states.BASE,
    data: [],
  },
  getForumMembershipStatus: {
    status: states.BASE,
    data: [],
  },
  activeForumIdForOngoingRequest: '',
  activeForumsForOngoingRequest: [],
  activeForumsCurrentRequests: {},
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
// cancel join forum request
export const triggerCancelJoinForumRequest = createAsyncThunk(
  'cancel-join-forum-request',
  async (params, thunkAPI) => {
    try {
      return await ForumsService.cancelJoinForumRequest(params);
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
      const response = await ForumsService.createForum(params);
      if (response.status === 400) {
        renderToast({
          status: 'error',
          message: response.title,
        });
      } else {
        renderToast({
          status: 'success',
          message: response,
        });
      }
    } catch (e) {
      renderToast({
        status: 'error',
        message: e.message,
      });
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
// get suggested forums
export const triggerGetSuggestedForums = createAsyncThunk(
  'get-suggested-forums',
  async (params, thunkAPI) => {
    try {
      return await ForumsService.getSuggestedForums(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// get my forums
export const triggerGetMyForums = createAsyncThunk(
  'get-my-forums',
  async (params, thunkAPI) => {
    try {
      return await ForumsService.getMyForums(params);
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
// get forum connection status by forum Id
export const triggerGetForumConnectionStatusByForumId = createAsyncThunk(
  'get-forum-connection-status-by-id',
  async (params, thunkAPI) => {
    try {
      return await ForumsService.getForumConnectionStatusByForumId(params);
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
// get forums by user id
export const triggerGetForumsByUserId= createAsyncThunk(
  'get-forums-by-user-id',
  async (params, thunkAPI) => {
    try {
      return await ForumsService.getForumsByUserId(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
// get forum membership status
export const triggerGetForumMembershipStatus= createAsyncThunk(
  'get-forum-membership-status',
  async (params, thunkAPI) => {
    try {
      return await ForumsService.getForumMembershipStatus(params);
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
    setActiveForumsForOngoingRequest: (state, action) => {
      state.activeForumsForOngoingRequest = action.payload;
    },
    resetActiveForumIdForOngoingRequest: (state) => {
      state.activeForumIdForOngoingRequest =
        initialState.activeForumIdForOngoingRequest;
    },
    resetCanceljoinForumRequest: (state) => {
      state.cancelJoinForumRequest = initialState.cancelJoinForumRequest;
    },
    resetCreateForum: (state) => {
      state.createForum = initialState.createForum;
    },
  },
  extraReducers: (builder) => {
    // Join forum
    builder.addCase(triggerJoinForum.pending, (state, action) => {
      state.joinForum.status = states.LOADING;
      state.joinForum.data = {};
      state.activeForumsCurrentRequests[`${action.meta.arg.forumId}`] = {
        status: action.meta.requestStatus,
        type: 'join-forum',
      };
    });
    builder.addCase(triggerJoinForum.fulfilled, (state, action) => {
      state.joinForum.status = states.SUCCESSFUL;
      state.joinForum.data = action.payload;
      state.activeForumsCurrentRequests[`${action.meta.arg.forumId}`] = {
        status: action.meta.requestStatus,
        type: 'join-forum',
      };
    });
    builder.addCase(triggerJoinForum.rejected, (state, action) => {
      state.joinForum.status = states.ERROR;
      state.joinForum.data = action.payload;
      state.activeForumsCurrentRequests[`${action.meta.arg.forumId}`] = {
        status: action.meta.requestStatus,
        type: 'join-forum',
      };
    });

    // cancel join forum request
    builder.addCase(triggerCancelJoinForumRequest.pending, (state, action) => {
      state.cancelJoinForumRequest.status = states.LOADING;
      state.cancelJoinForumRequest.data = {};
      state.activeForumsCurrentRequests[`${action.meta.arg.forumId}`] = {
        status: action.meta.requestStatus,
        type: 'cancel-request',
      };
    });
    builder.addCase(
      triggerCancelJoinForumRequest.fulfilled,
      (state, action) => {
        state.cancelJoinForumRequest.status = states.SUCCESSFUL;
        state.cancelJoinForumRequest.data = action.payload;
        state.activeForumsCurrentRequests[`${action.meta.arg.forumId}`] = {
          status: action.meta.requestStatus,
          type: 'cancel-request',
        };
      }
    );
    builder.addCase(triggerCancelJoinForumRequest.rejected, (state, action) => {
      state.cancelJoinForumRequest.status = states.ERROR;
      state.cancelJoinForumRequest.data = action.payload;
      state.activeForumsCurrentRequests[`${action.meta.arg.forumId}`] = {
        status: action.meta.requestStatus,
        type: 'cancel-request',
      };
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
    // get suggested forums
    builder.addCase(triggerGetSuggestedForums.pending, (state) => {
      state.getSuggestedForums.status = states.LOADING;
      state.getSuggestedForums.data = {};
    });
    builder.addCase(triggerGetSuggestedForums.fulfilled, (state, action) => {
      state.getSuggestedForums.status = states.SUCCESSFUL;
      state.getSuggestedForums.data = action.payload;
    });
    builder.addCase(triggerGetSuggestedForums.rejected, (state, action) => {
      state.getSuggestedForums.status = states.ERROR;
      state.getSuggestedForums.data = action.payload;
    });

    // get my forums
    builder.addCase(triggerGetMyForums.pending, (state) => {
      state.getMyForums.status = states.LOADING;
      state.getMyForums.data = {};
    });
    builder.addCase(triggerGetMyForums.fulfilled, (state, action) => {
      state.getMyForums.status = states.SUCCESSFUL;
      state.getMyForums.data = action.payload;
    });
    builder.addCase(triggerGetMyForums.rejected, (state, action) => {
      state.getMyForums.status = states.ERROR;
      state.getMyForums.data = action.payload;
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

    // get forum connection status
    builder.addCase(
      triggerGetForumConnectionStatusByForumId.pending,
      (state) => {
        state.getForumConnectionStatusByForumId.status = states.LOADING;
        state.getForumConnectionStatusByForumId.data = {};
      }
    );
    builder.addCase(
      triggerGetForumConnectionStatusByForumId.fulfilled,
      (state, action) => {
        state.getForumConnectionStatusByForumId.status = states.SUCCESSFUL;
        state.getForumConnectionStatusByForumId.data = action.payload;
      }
    );
    builder.addCase(
      triggerGetForumConnectionStatusByForumId.rejected,
      (state, action) => {
        state.getForumConnectionStatusByForumId.status = states.ERROR;
        state.getForumConnectionStatusByForumId.data = action.payload;
      }
    );

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

    // get forums by user id
    builder.addCase(triggerGetForumsByUserId.pending, (state) => {
      state.getForumsByUserId.status = states.LOADING;
      state.getForumsByUserId.data = {};
    });
    builder.addCase(
      triggerGetForumsByUserId.fulfilled,
      (state, action) => {
        state.getForumsByUserId.status = states.SUCCESSFUL;
        state.getForumsByUserId.data = action.payload;
      }
    );
    builder.addCase(triggerGetForumsByUserId.rejected, (state, action) => {
      state.getForumsByUserId.status = states.ERROR;
      state.getForumsByUserId.data = action.payload;
    });

    // get forum membership status
    builder.addCase(triggerGetForumMembershipStatus.pending, (state) => {
      state.getForumMembershipStatus.status = states.LOADING;
      state.getForumMembershipStatus.data = {};
    });
    builder.addCase(
      triggerGetForumMembershipStatus.fulfilled,
      (state, action) => {
        state.getForumMembershipStatus.status = states.SUCCESSFUL;
        state.getForumMembershipStatus.data = action.payload;
      }
    );
    builder.addCase(triggerGetForumMembershipStatus.rejected, (state, action) => {
      state.getForumMembershipStatus.status = states.ERROR;
      state.getForumMembershipStatus.data = action.payload;
    });
  },
});

export default forumsSlice.reducer;
export const {
  resetJoinForum,
  resetLeaveForum,
  setActiveForumIdForOngoingRequest,
  setActiveForumsForOngoingRequest,
  resetActiveForumIdForOngoingRequest,
  resetCanceljoinForumRequest,
  resetCreateForum,
} = forumsSlice.actions;
