import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ConnectionService from './connections_service';
import * as states from '../../utils/strings';

const initialState = {
  getAcceptedConnections: {
    status: states.BASE,
    data: {},
  },
  getSentRejectedRequests: {
    status: states.BASE,
    data: {},
  },
  getPotentialConnections: {
    status: states.BASE,
    data: {},
  },
  sendConnectionRequest: {
    status: states.BASE,
    data: {},
  },
  getPendingRequestConnections: {
    status: states.BASE,
    data: {},
  },
  acceptConnectionRequest: {
    status: states.BASE,
    data: {},
  },
  rejectConnectionRequest: {
    status: states.BASE,
    data: {},
  },
  getBlockedUsers: {
    status: states.BASE,
    data: {},
  },
  blockUser: {
    status: states.BASE,
    data: {},
  },
  unblockUser: {
    status: states.BASE,
    data: {},
  },
  muteUser: {
    status: states.BASE,
    data: {},
  },
  unmuteUser: {
    status: states.BASE,
    data: {},
  },
};
export const triggerGetAcceptedConnections = createAsyncThunk(
  'get-accepted-connections',
  async (params, thunkAPI) => {
    try {
      return await ConnectionService.getAcceptedConnections(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const triggerGetSentRejectedRequests = createAsyncThunk(
  'get-sent-rejected-requests',
  async (params, thunkAPI) => {
    try {
      return await ConnectionService.getSentRejectedRequests(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerGetPotentialConnections = createAsyncThunk(
  'get-potential-connections',
  async (params, thunkAPI) => {
    try {
      return await ConnectionService.getPotentialConnections(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerSendConnectionRequest = createAsyncThunk(
  'send-connection-request',
  async (params, thunkAPI) => {
    try {
      return await ConnectionService.sendConnectionRequest(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerGetPendingRequestConnections = createAsyncThunk(
  'get-pending-request-connections',
  async (params, thunkAPI) => {
    try {
      return await ConnectionService.getPendingRequestConnections(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerAcceptConnectionRequest = createAsyncThunk(
  'accept-connection-request',
  async (params, thunkAPI) => {
    try {
      return await ConnectionService.acceptConnectionRequest(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerRejectConnectionRequest = createAsyncThunk(
  'reject-connection-request',
  async (params, thunkAPI) => {
    try {
      return await ConnectionService.rejectConnectionRequest(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerGetBlockedUsers = createAsyncThunk(
  'get-blocked-users',
  async (params, thunkAPI) => {
    try {
      return await ConnectionService.getBlockedUsers(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerBlockUser = createAsyncThunk(
  'block-user',
  async (params, thunkAPI) => {
    try {
      return await ConnectionService.blockUser(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerUnblockUser = createAsyncThunk(
  'unblock-user',
  async (params, thunkAPI) => {
    try {
      return await ConnectionService.unblockUser(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerMuteUser = createAsyncThunk(
  'mute-user',
  async (params, thunkAPI) => {
    try {
      return await ConnectionService.muteUser(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerUnmuteUser = createAsyncThunk(
  'unmute-user',
  async (params, thunkAPI) => {
    try {
      return await ConnectionService.unmuteUser(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const connectionSlice = createSlice({
  name: 'connections',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get accepted connections
    builder.addCase(triggerGetAcceptedConnections.pending, (state) => {
      state.getAcceptedConnections.status = states.LOADING;
      state.getAcceptedConnections.data = {};
    });
    builder.addCase(
      triggerGetAcceptedConnections.fulfilled,
      (state, action) => {
        state.getAcceptedConnections.status = states.SUCCESSFUL;
        state.getAcceptedConnections.data = action.payload;
      }
    );
    builder.addCase(triggerGetAcceptedConnections.rejected, (state, action) => {
      state.getAcceptedConnections.status = states.ERROR;
      state.getAcceptedConnections.data = {};
    });

    // Get sent rejected requests
    builder.addCase(triggerGetSentRejectedRequests.pending, (state) => {
      state.getSentRejectedRequests.status = states.LOADING;
      state.getSentRejectedRequests.data = {};
    });
    builder.addCase(
      triggerGetSentRejectedRequests.fulfilled,
      (state, action) => {
        state.getSentRejectedRequests.status = states.SUCCESSFUL;
        state.getSentRejectedRequests.data = action.payload;
      }
    );
    builder.addCase(triggerGetSentRejectedRequests.rejected, (state) => {
      state.getSentRejectedRequests.status = states.ERROR;
      state.getSentRejectedRequests.data = {};
    });

    // Get potential connections
    builder.addCase(triggerGetPotentialConnections.pending, (state) => {
      state.getPotentialConnections.status = states.LOADING;
      state.getPotentialConnections.data = {};
    });
    builder.addCase(
      triggerGetPotentialConnections.fulfilled,
      (state, action) => {
        state.getPotentialConnections.status = states.SUCCESSFUL;
        state.getPotentialConnections.data = action.payload;
      }
    );
    builder.addCase(triggerGetPotentialConnections.rejected, (state) => {
      state.getPotentialConnections.status = states.ERROR;
      state.getPotentialConnections.data = {};
    });

    // send connection requests
    builder.addCase(triggerSendConnectionRequest.pending, (state) => {
      state.sendConnectionRequest.status = states.LOADING;
      state.sendConnectionRequest.data = {};
    });
    builder.addCase(triggerSendConnectionRequest.fulfilled, (state, action) => {
      state.sendConnectionRequest.status = states.SUCCESSFUL;
      state.sendConnectionRequest.data = action.payload;
    });
    builder.addCase(triggerSendConnectionRequest.rejected, (state) => {
      state.sendConnectionRequest.status = states.ERROR;
      state.sendConnectionRequest.data = {};
    });

    // get pending request connections
    builder.addCase(triggerGetPendingRequestConnections.pending, (state) => {
      state.getPendingRequestConnections.status = states.LOADING;
      state.getPendingRequestConnections.data = {};
    });
    builder.addCase(
      triggerGetPendingRequestConnections.fulfilled,
      (state, action) => {
        state.getPendingRequestConnections.status = states.SUCCESSFUL;
        state.getPendingRequestConnections.data = action.payload;
      }
    );
    builder.addCase(triggerGetPendingRequestConnections.rejected, (state) => {
      state.getPendingRequestConnections.status = states.ERROR;
      state.getPendingRequestConnections.data = {};
    });

    // accept connection requests
    builder.addCase(triggerAcceptConnectionRequest.pending, (state) => {
      state.acceptConnectionRequest.status = states.LOADING;
      state.acceptConnectionRequest.data = {};
    });
    builder.addCase(
      triggerAcceptConnectionRequest.fulfilled,
      (state, action) => {
        state.acceptConnectionRequest.status = states.SUCCESSFUL;
        state.acceptConnectionRequest.data = action.payload;
      }
    );
    builder.addCase(triggerAcceptConnectionRequest.rejected, (state) => {
      state.acceptConnectionRequest.status = states.ERROR;
      state.acceptConnectionRequest.data = {};
    });

    // reject connection requests
    builder.addCase(triggerRejectConnectionRequest.pending, (state) => {
      state.rejectConnectionRequest.status = states.LOADING;
      state.rejectConnectionRequest.data = {};
    });
    builder.addCase(
      triggerRejectConnectionRequest.fulfilled,
      (state, action) => {
        state.rejectConnectionRequest.status = states.SUCCESSFUL;
        state.rejectConnectionRequest.data = action.payload;
      }
    );
    builder.addCase(triggerRejectConnectionRequest.rejected, (state) => {
      state.rejectConnectionRequest.status = states.ERROR;
      state.rejectConnectionRequest.data = {};
    });

    // get blocked users
    builder.addCase(triggerGetBlockedUsers.pending, (state) => {
      state.getBlockedUsers.status = states.LOADING;
      state.getBlockedUsers.data = {};
    });
    builder.addCase(triggerGetBlockedUsers.fulfilled, (state, action) => {
      state.getBlockedUsers.status = states.SUCCESSFUL;
      state.getBlockedUsers.data = action.payload;
    });
    builder.addCase(triggerGetBlockedUsers.rejected, (state) => {
      state.getBlockedUsers.status = states.ERROR;
      state.getBlockedUsers.data = {};
    });

    // block user
    builder.addCase(triggerBlockUser.pending, (state) => {
      state.blockUser.status = states.LOADING;
      state.blockUser.data = {};
    });
    builder.addCase(triggerBlockUser.fulfilled, (state, action) => {
      state.blockUser.status = states.SUCCESSFUL;
      state.blockUser.data = action.payload;
    });
    builder.addCase(triggerBlockUser.rejected, (state) => {
      state.blockUser.status = states.ERROR;
      state.blockUser.data = {};
    });

    // unblock user
    builder.addCase(triggerUnblockUser.pending, (state) => {
      state.unblockUser.status = states.LOADING;
      state.unblockUser.data = {};
    });
    builder.addCase(triggerUnblockUser.fulfilled, (state, action) => {
      state.unblockUser.status = states.SUCCESSFUL;
      state.unblockUser.data = action.payload;
    });
    builder.addCase(triggerUnblockUser.rejected, (state) => {
      state.unblockUser.status = states.ERROR;
      state.unblockUser.data = {};
    });

    // mute user
    builder.addCase(triggerMuteUser.pending, (state) => {
      state.muteUser.status = states.LOADING;
      state.muteUser.data = {};
    });
    builder.addCase(triggerMuteUser.fulfilled, (state, action) => {
      state.muteUser.status = states.SUCCESSFUL;
      state.muteUser.data = action.payload;
    });
    builder.addCase(triggerMuteUser.rejected, (state) => {
      state.muteUser.status = states.ERROR;
      state.muteUser.data = {};
    });

    // unmute user
    builder.addCase(triggerUnmuteUser.pending, (state) => {
      state.unmuteUser.status = states.LOADING;
      state.unmuteUser.data = {};
    });
    builder.addCase(triggerUnmuteUser.fulfilled, (state, action) => {
      state.unmuteUser.status = states.SUCCESSFUL;
      state.unmuteUser.data = action.payload;
    });
    builder.addCase(triggerUnmuteUser.rejected, (state) => {
      state.unmuteUser.status = states.ERROR;
      state.unmuteUser.data = {};
    });
  },
});

export default connectionSlice.reducer;
