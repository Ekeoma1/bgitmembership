import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SocialLinksService from './social_links_service';
import * as states from '../../utils/strings';

const initialState = {
  addSocialLinks: {
    status: states.BASE,
    data: {},
  },
  getSocialLinks: {
    status: states.BASE,
    data: {},
  },
  getSocialLinksByUserId: {
    status: states.BASE,
    data: {},
  },
  updateSocialLinks: {
    status: states.BASE,
    data: {},
  },
  deleteSocialLink: {
    status: states.BASE,
    data: {},
  },
};

export const triggerAddSocialLink = createAsyncThunk(
  'add-social-link',
  async (params, thunkAPI) => {
    try {
      return await SocialLinksService.addSocialLinks(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const triggerGetSocialLinks = createAsyncThunk(
  'get-social-links',
  async (params, thunkAPI) => {
    try {
      return await SocialLinksService.getSocialLinks(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerGetSocialLinksByUserId = createAsyncThunk(
  'get-social-links-by-user-id',
  async (params, thunkAPI) => {
    try {
      return await SocialLinksService.getSocialLinksByUserId(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const triggerUpdateSocialLinks = createAsyncThunk(
  'update-social-links',
  async (params, thunkAPI) => {
    try {
      return await SocialLinksService.updateSocialLinks(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerDeleteSocialLink = createAsyncThunk(
  'delete-social-link',
  async (params, thunkAPI) => {
    try {
      return await SocialLinksService.deleteSocialLink(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const socialLinksSlice = createSlice({
  name: 'social-links',
  initialState,
  reducers: {
    resetAddSocialLinks: (state) => {
      state.addSocialLinks = initialState.addSocialLinks;
    },
    resetUpdateSocialLinks: (state) => {
      state.updateSocialLinks = initialState.updateSocialLinks;
    },
  },
  extraReducers: (builder) => {
    // add social links
    builder.addCase(triggerAddSocialLink.pending, (state) => {
      state.addSocialLinks.status = states.LOADING;
      state.addSocialLinks.data = {};
    });
    builder.addCase(triggerAddSocialLink.fulfilled, (state, action) => {
      state.addSocialLinks.status = states.SUCCESSFUL;
      state.addSocialLinks.data = action.payload;
    });
    builder.addCase(triggerAddSocialLink.rejected, (state, action) => {
      state.addSocialLinks.status = states.ERROR;
      state.addSocialLinks.data = {};
    });

    // get social links
    builder.addCase(triggerGetSocialLinks.pending, (state) => {
      state.getSocialLinks.status = states.LOADING;
      state.getSocialLinks.data = {};
    });
    builder.addCase(triggerGetSocialLinks.fulfilled, (state, action) => {
      state.getSocialLinks.status = states.SUCCESSFUL;
      state.getSocialLinks.data = action.payload;
    });
    builder.addCase(triggerGetSocialLinks.rejected, (state) => {
      state.getSocialLinks.status = states.ERROR;
      state.getSocialLinks.data = {};
    });

    // get social links by user id
    builder.addCase(triggerGetSocialLinksByUserId.pending, (state) => {
      state.getSocialLinksByUserId.status = states.LOADING;
      state.getSocialLinksByUserId.data = {};
    });
    builder.addCase(triggerGetSocialLinksByUserId.fulfilled, (state, action) => {
      state.getSocialLinksByUserId.status = states.SUCCESSFUL;
      state.getSocialLinksByUserId.data = action.payload;
    });
    builder.addCase(triggerGetSocialLinksByUserId.rejected, (state) => {
      state.getSocialLinksByUserId.status = states.ERROR;
      state.getSocialLinksByUserId.data = {};
    });

    // update social links
    builder.addCase(triggerUpdateSocialLinks.pending, (state) => {
      state.updateSocialLinks.status = states.LOADING;
      state.updateSocialLinks.data = {};
    });
    builder.addCase(triggerUpdateSocialLinks.fulfilled, (state, action) => {
      state.updateSocialLinks.status = states.SUCCESSFUL;
      state.updateSocialLinks.data = action.payload;
    });
    builder.addCase(triggerUpdateSocialLinks.rejected, (state) => {
      state.updateSocialLinks.status = states.ERROR;
      state.updateSocialLinks.data = {};
    });

    // delete social link
    builder.addCase(triggerDeleteSocialLink.pending, (state) => {
      state.deleteSocialLink.status = states.LOADING;
      state.deleteSocialLink.data = {};
    });
    builder.addCase(triggerDeleteSocialLink.fulfilled, (state, action) => {
      state.deleteSocialLink.status = states.SUCCESSFUL;
      state.deleteSocialLink.data = action.payload;
    });
    builder.addCase(triggerDeleteSocialLink.rejected, (state) => {
      state.deleteSocialLink.status = states.ERROR;
      state.deleteSocialLink.data = {};
    });
  },
});

export default socialLinksSlice.reducer;
export const { resetAddSocialLinks, resetUpdateSocialLinks } =
  socialLinksSlice.actions;
