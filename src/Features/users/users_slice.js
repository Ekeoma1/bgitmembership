import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UsersService from './users_service';
import * as states from '../../utils/strings';

const initialState = {
  getUserByProfileId: {
    status: states.BASE,
    data: {},
  },
  getMyProfile: {
    status: states.BASE,
    data: {},
  },
  changePassword: {
    status: states.BASE,
    data: {},
  },
  updateMyProfile: {
    status: states.BASE,
    data: {},
  },
  getFeedPreference: {
    status: states.BASE,
    data: {},
  },
  updateFeedPreference: {
    status: states.BASE,
    data: {},
  },
  getPrivacySettings: {
    status: states.BASE,
    data: {},
  },
  updatePrivacySettings: {
    status: states.BASE,
    data: {},
  },
  closeAccount: {
    status: states.BASE,
    data: {},
  },
};

// get user profile by id
export const triggerGetUserProfileById = createAsyncThunk(
  'get-user-profile-by-id',
  async (params, thunkAPI) => {
    try {
      return await UsersService.getUserProfileById(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// get my profile
export const triggerGetMyProfile = createAsyncThunk(
  'get-my-profile',
  async (params, thunkAPI) => {
    try {
      return await UsersService.getMyProfile(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// change password
export const triggerChangePassword = createAsyncThunk(
  'change-password',
  async (params, thunkAPI) => {
    try {
      return await UsersService.changePassword(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// update my profile
export const triggerUpdateMyProfile = createAsyncThunk(
  'update-my-profile',
  async (params, thunkAPI) => {
    try {
      return await UsersService.updateMyProfile(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// get feed preference
export const triggerGetFeedPreference = createAsyncThunk(
  'get-feed-preference',
  async (params, thunkAPI) => {
    try {
      return await UsersService.getFeedPreference(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// update feed preference
export const triggerUpdateFeedPreference = createAsyncThunk(
  'update-feed-preference',
  async (params, thunkAPI) => {
    try {
      return await UsersService.updateFeedPreference(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// get privacy settings
export const triggerGetPrivacySettings = createAsyncThunk(
  'get-privacy-settings',
  async (params, thunkAPI) => {
    try {
      return await UsersService.getPrivacySettings(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// update privacy settings
export const triggerUpdatePrivacySettings = createAsyncThunk(
  'update-privacy-settings',
  async (params, thunkAPI) => {
    try {
      return await UsersService.updatePrivacySettings(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// close account
export const triggerCloseAccount = createAsyncThunk(
  'close-account',
  async (params, thunkAPI) => {
    try {
      return await UsersService.closeAccount(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetUpdateMyProfile: (state) => {
      state.updateMyProfile = initialState.updateMyProfile;
    },
    resetChangePassword: (state) => {
      state.changePassword = initialState.changePassword;
    },
    resetUpdateFeedPreference: (state) => {
      state.updateFeedPreference = initialState.updateFeedPreference;
    },
    resetUpdatePrivacySettings: (state) => {
      state.updatePrivacySettings = initialState.updatePrivacySettings;
    },
  },
  extraReducers: (builder) => {
    // get user profile by id
    builder.addCase(triggerGetUserProfileById.pending, (state) => {
      state.getUserByProfileId.status = states.LOADING;
      state.getUserByProfileId.data = {};
    });
    builder.addCase(triggerGetUserProfileById.fulfilled, (state, action) => {
      state.getUserByProfileId.status = states.SUCCESSFUL;
      state.getUserByProfileId.data = action.payload;
    });
    builder.addCase(triggerGetUserProfileById.rejected, (state, action) => {
      state.getUserByProfileId.status = states.ERROR;
      state.getUserByProfileId.data = {};
    });

    // get my profile
    builder.addCase(triggerGetMyProfile.pending, (state) => {
      state.getMyProfile.status = states.LOADING;
      state.getMyProfile.data = {};
    });
    builder.addCase(triggerGetMyProfile.fulfilled, (state, action) => {
      state.getMyProfile.status = states.SUCCESSFUL;
      state.getMyProfile.data = action.payload;
    });
    builder.addCase(triggerGetMyProfile.rejected, (state) => {
      state.getMyProfile.status = states.ERROR;
      state.getMyProfile.data = {};
    });

    // change password
    builder.addCase(triggerChangePassword.pending, (state) => {
      state.changePassword.status = states.LOADING;
      state.changePassword.data = {};
    });
    builder.addCase(triggerChangePassword.fulfilled, (state, action) => {
      state.changePassword.status = states.SUCCESSFUL;
      state.changePassword.data = action.payload;
    });
    builder.addCase(triggerChangePassword.rejected, (state) => {
      state.changePassword.status = states.ERROR;
      state.changePassword.data = {};
    });

    // update my profile
    builder.addCase(triggerUpdateMyProfile.pending, (state) => {
      state.updateMyProfile.status = states.LOADING;
      state.updateMyProfile.data = {};
    });
    builder.addCase(triggerUpdateMyProfile.fulfilled, (state, action) => {
      state.updateMyProfile.status = states.SUCCESSFUL;
      state.updateMyProfile.data = action.payload;
    });
    builder.addCase(triggerUpdateMyProfile.rejected, (state) => {
      state.updateMyProfile.status = states.ERROR;
      state.updateMyProfile.data = {};
    });

    // get feed preference
    builder.addCase(triggerGetFeedPreference.pending, (state) => {
      state.getFeedPreference.status = states.LOADING;
      state.getFeedPreference.data = {};
    });
    builder.addCase(triggerGetFeedPreference.fulfilled, (state, action) => {
      state.getFeedPreference.status = states.SUCCESSFUL;
      state.getFeedPreference.data = action.payload;
    });
    builder.addCase(triggerGetFeedPreference.rejected, (state) => {
      state.getFeedPreference.status = states.ERROR;
      state.getFeedPreference.data = {};
    });

    // update feed preference
    builder.addCase(triggerUpdateFeedPreference.pending, (state) => {
      state.updateFeedPreference.status = states.LOADING;
      state.updateFeedPreference.data = {};
    });
    builder.addCase(triggerUpdateFeedPreference.fulfilled, (state, action) => {
      state.updateFeedPreference.status = states.SUCCESSFUL;
      state.updateFeedPreference.data = action.payload;
    });
    builder.addCase(triggerUpdateFeedPreference.rejected, (state) => {
      state.updateFeedPreference.status = states.ERROR;
      state.updateFeedPreference.data = {};
    });

    // get privacy settings
    builder.addCase(triggerGetPrivacySettings.pending, (state) => {
      state.getPrivacySettings.status = states.LOADING;
      state.getPrivacySettings.data = {};
    });
    builder.addCase(triggerGetPrivacySettings.fulfilled, (state, action) => {
      state.getPrivacySettings.status = states.SUCCESSFUL;
      state.getPrivacySettings.data = action.payload;
    });
    builder.addCase(triggerGetPrivacySettings.rejected, (state) => {
      state.getPrivacySettings.status = states.ERROR;
      state.getPrivacySettings.data = {};
    });

    // update privacy settings
    builder.addCase(triggerUpdatePrivacySettings.pending, (state) => {
      state.updatePrivacySettings.status = states.LOADING;
      state.updatePrivacySettings.data = {};
    });
    builder.addCase(triggerUpdatePrivacySettings.fulfilled, (state, action) => {
      state.updatePrivacySettings.status = states.SUCCESSFUL;
      state.updatePrivacySettings.data = action.payload;
    });
    builder.addCase(triggerUpdatePrivacySettings.rejected, (state) => {
      state.updatePrivacySettings.status = states.ERROR;
      state.updatePrivacySettings.data = {};
    });

    // close account
    builder.addCase(triggerCloseAccount.pending, (state) => {
      state.closeAccount.status = states.LOADING;
      state.closeAccount.data = {};
    });
    builder.addCase(triggerCloseAccount.fulfilled, (state, action) => {
      state.closeAccount.status = states.SUCCESSFUL;
      state.closeAccount.data = action.payload;
    });
    builder.addCase(triggerCloseAccount.rejected, (state) => {
      state.closeAccount.status = states.ERROR;
      state.closeAccount.data = {};
    });
  },
});

export default usersSlice.reducer;
export const {
  resetUpdateMyProfile,
  resetChangePassword,
  resetUpdateFeedPreference,
  resetUpdatePrivacySettings,
} = usersSlice.actions;
