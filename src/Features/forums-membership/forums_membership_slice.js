import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ConnectionService from './forums_membership_service';
import * as states from '../../utils/strings';

const initialState = {
  acceptForumJoinRequest: {
    status: states.BASE,
    data: {},
  },
  rejectForumJoinRequest: {
    status: states.BASE,
    data: {},
  },
  getPendingJoinRequestsByForumId: {
    status: states.BASE,
    data: {},
  },
  getPendingJoinRequests: {
    status: states.BASE,
    data: {},
  },
  getForumMembersByForumId: {
    status: states.BASE,
    data: {},
  },
};
export const triggerAcceptForumJoinRequest = createAsyncThunk(
  'accept-forum-join-request',
  async (params, thunkAPI) => {
    try {
      return await ConnectionService.acceptForumJoinRequest(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerRejectForumJoinRequest = createAsyncThunk(
  'reject-forum-join-request',
  async (params, thunkAPI) => {
    try {
      return await ConnectionService.rejectForumJoinRequest(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerGetPendingJoinRequestsByForumId = createAsyncThunk(
  'get-pending-join-requests-by-forum-id',
  async (params, thunkAPI) => {
    try {
      return await ConnectionService.getPendingJoinRequestsByForumId(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerGetPendingJoinRequests = createAsyncThunk(
  'get-pending-join-requests',
  async (params, thunkAPI) => {
    try {
      return await ConnectionService.getPendingJoinRequests(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerGetForumMembersByForumId = createAsyncThunk(
  'get-forum-members-by-forum-id',
  async (params, thunkAPI) => {
    try {
      return await ConnectionService.getForumMembersByForumId(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const forumsMembershipSlice = createSlice({
  name: 'forums-membership',
  initialState,
  reducers: {
    resetSendConnectionRequest: (state) => {
      state.sendConnectionRequest = initialState.sendConnectionRequest;
    },
  },
  extraReducers: (builder) => {
    // accept forum join request
    builder.addCase(triggerAcceptForumJoinRequest.pending, (state) => {
      state.acceptForumJoinRequest.status = states.LOADING;
      state.acceptForumJoinRequest.data = {};
    });
    builder.addCase(
      triggerAcceptForumJoinRequest.fulfilled,
      (state, action) => {
        state.acceptForumJoinRequest.status = states.SUCCESSFUL;
        state.acceptForumJoinRequest.data = action.payload;
      }
    );
    builder.addCase(triggerAcceptForumJoinRequest.rejected, (state, action) => {
      state.acceptForumJoinRequest.status = states.ERROR;
      state.acceptForumJoinRequest.data = {};
    });

    // reject forum join request
    builder.addCase(triggerRejectForumJoinRequest.pending, (state) => {
      state.rejectForumJoinRequest.status = states.LOADING;
      state.rejectForumJoinRequest.data = {};
    });
    builder.addCase(
      triggerRejectForumJoinRequest.fulfilled,
      (state, action) => {
        state.rejectForumJoinRequest.status = states.SUCCESSFUL;
        state.rejectForumJoinRequest.data = action.payload;
      }
    );
    builder.addCase(triggerRejectForumJoinRequest.rejected, (state, action) => {
      state.rejectForumJoinRequest.status = states.ERROR;
      state.rejectForumJoinRequest.data = {};
    });

    // get pending join requests by forum id
    builder.addCase(triggerGetPendingJoinRequestsByForumId.pending, (state) => {
      state.getPendingJoinRequestsByForumId.status = states.LOADING;
      state.getPendingJoinRequestsByForumId.data = {};
    });
    builder.addCase(
      triggerGetPendingJoinRequestsByForumId.fulfilled,
      (state, action) => {
        state.getPendingJoinRequestsByForumId.status = states.SUCCESSFUL;
        state.getPendingJoinRequestsByForumId.data = action.payload;
      }
    );
    builder.addCase(
      triggerGetPendingJoinRequestsByForumId.rejected,
      (state, action) => {
        state.getPendingJoinRequestsByForumId.status = states.ERROR;
        state.getPendingJoinRequestsByForumId.data = {};
      }
    );

    // get pending join requests
    builder.addCase(triggerGetPendingJoinRequests.pending, (state) => {
      state.getPendingJoinRequests.status = states.LOADING;
      state.getPendingJoinRequests.data = {};
    });
    builder.addCase(
      triggerGetPendingJoinRequests.fulfilled,
      (state, action) => {
        state.getPendingJoinRequests.status = states.SUCCESSFUL;
        state.getPendingJoinRequests.data = action.payload;
      }
    );
    builder.addCase(triggerGetPendingJoinRequests.rejected, (state, action) => {
      state.getPendingJoinRequests.status = states.ERROR;
      state.getPendingJoinRequests.data = {};
    });

    // get forum members by forum id
    builder.addCase(triggerGetForumMembersByForumId.pending, (state) => {
      state.getForumMembersByForumId.status = states.LOADING;
      state.getForumMembersByForumId.data = {};
    });
    builder.addCase(
      triggerGetForumMembersByForumId.fulfilled,
      (state, action) => {
        state.getForumMembersByForumId.status = states.SUCCESSFUL;
        state.getForumMembersByForumId.data = action.payload;
      }
    );
    builder.addCase(
      triggerGetForumMembersByForumId.rejected,
      (state, action) => {
        state.getForumMembersByForumId.status = states.ERROR;
        state.getForumMembersByForumId.data = {};
      }
    );
  },
});

export default forumsMembershipSlice.reducer;
export const { resetSendConnectionRequest } = forumsMembershipSlice.actions;
