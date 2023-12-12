import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AccountPrivaciesService from './account_privacies_service';
import * as states from '../../utils/strings';

const initialState = {
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

export const triggerGetBlockedUsers = createAsyncThunk(
  'get-blocked-users',
  async (params, thunkAPI) => {
    try {
      return await AccountPrivaciesService.getBlockedUsers(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerBlockUser = createAsyncThunk(
  'block-user',
  async (params, thunkAPI) => {
    try {
      return await AccountPrivaciesService.blockUser(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerUnblockUser = createAsyncThunk(
  'unblock-user',
  async (params, thunkAPI) => {
    try {
      return await AccountPrivaciesService.unblockUser(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerMuteUser = createAsyncThunk(
  'mute-user',
  async (params, thunkAPI) => {
    try {
      return await AccountPrivaciesService.muteUser(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerUnmuteUser = createAsyncThunk(
  'unmute-user',
  async (params, thunkAPI) => {
    try {
      return await AccountPrivaciesService.unmuteUser(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const accountPrivaciesSlice = createSlice({
  name: 'account-privacies',
  initialState,
  reducers: {
    resetBlockUser: (state) => {
      state.blockUser = initialState.blockUser;
    },
    resetUnblockUser: (state) => {
      state.unblockUser = initialState.unblockUser;
    },
    resetMuteUser: (state) => {
      state.muteUser = initialState.muteUser;
    },
    resetUnmuteUser: (state) => {
      state.unmuteUser = initialState.unmuteUser;
    },
  },
  extraReducers: (builder) => {
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

export default accountPrivaciesSlice.reducer;
export const {resetBlockUser,resetUnblockUser,resetMuteUser,resetUnmuteUser}=accountPrivaciesSlice.actions
