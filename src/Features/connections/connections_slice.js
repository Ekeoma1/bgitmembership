import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ConnectionService from './connections_service';
import * as states from '../../utils/strings';

const initialState = {
  getAcceptedConnections: {
    status: states.BASE,
    data: {},
  },
  getConnectionsByUserId: {
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
  cancelConnectionRequest: {
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
  removeConnection: {
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
export const triggerGetConnectionsByUserId = createAsyncThunk(
  'get-connections-by-user-id',
  async (params, thunkAPI) => {
    try {
      return await ConnectionService.getConnectionsByUserId(params);
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
export const triggerCancelConnectionRequest = createAsyncThunk(
  'cancel-connection-request',
  async (params, thunkAPI) => {
    try {
      return await ConnectionService.cancelConnectionRequest(params);
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
export const triggerRemoveConnection = createAsyncThunk(
  'remove-connection',
  async (params, thunkAPI) => {
    try {
      return await ConnectionService.removeConnection(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const connectionSlice = createSlice({
  name: 'connections',
  initialState,
  reducers: {
    resetSendConnectionRequest: (state) => {
      state.sendConnectionRequest = initialState.sendConnectionRequest;
    },
    resetCancelConnectionRequest: (state) => {
      state.cancelConnectionRequest = initialState.cancelConnectionRequest;
    },
    resetRemoveConnection: (state) => {
      state.removeConnection = initialState.removeConnection;
    },
  },
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
    // Get connections by user id
    builder.addCase(triggerGetConnectionsByUserId.pending, (state) => {
      state.getConnectionsByUserId.status = states.LOADING;
      state.getConnectionsByUserId.data = {};
    });
    builder.addCase(
      triggerGetConnectionsByUserId.fulfilled,
      (state, action) => {
        state.getConnectionsByUserId.status = states.SUCCESSFUL;
        state.getConnectionsByUserId.data = action.payload;
      }
    );
    builder.addCase(triggerGetConnectionsByUserId.rejected, (state, action) => {
      state.getConnectionsByUserId.status = states.ERROR;
      state.getConnectionsByUserId.data = {};
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
    // cancel connection requests
    builder.addCase(triggerCancelConnectionRequest.pending, (state) => {
      state.cancelConnectionRequest.status = states.LOADING;
      state.cancelConnectionRequest.data = {};
    });
    builder.addCase(
      triggerCancelConnectionRequest.fulfilled,
      (state, action) => {
        state.cancelConnectionRequest.status = states.SUCCESSFUL;
        state.cancelConnectionRequest.data = action.payload;
      }
    );
    builder.addCase(triggerCancelConnectionRequest.rejected, (state) => {
      state.cancelConnectionRequest.status = states.ERROR;
      state.cancelConnectionRequest.data = {};
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

    // remove connection
    builder.addCase(triggerRemoveConnection.pending, (state) => {
      state.removeConnection.status = states.LOADING;
      state.removeConnection.data = {};
    });
    builder.addCase(triggerRemoveConnection.fulfilled, (state, action) => {
      state.removeConnection.status = states.SUCCESSFUL;
      state.removeConnection.data = action.payload;
    });
    builder.addCase(triggerRemoveConnection.rejected, (state) => {
      state.removeConnection.status = states.ERROR;
      state.removeConnection.data = {};
    });
  },
});

export default connectionSlice.reducer;
export const {
  resetSendConnectionRequest,
  resetCancelConnectionRequest,
  resetRemoveConnection,
} = connectionSlice.actions;
