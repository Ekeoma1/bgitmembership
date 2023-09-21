import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PostsService from './posts_service';
import * as states from '../../utils/strings';

const initialState = {
  createPost: {
    status: states.BASE,
    data: {},
  },
  toggleLikeUnlikePost: {
    status: states.BASE,
    data: {},
  },
  getAllPosts: {
    status: states.BASE,
    data: {},
  },
  getPostsByUserId: {
    status: states.BASE,
    data: {},
  },
  getMyPosts: {
    status: states.BASE,
    data: {},
  },
  createComment: {
    status: states.BASE,
    data: {},
  },
};
export const triggerCreatePost = createAsyncThunk(
  'create-post',
  async (params, thunkAPI) => {
    try {
      return await PostsService.addJob(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const triggerToggleLikeUnlikePost = createAsyncThunk(
  'toggle-like-unlike-post',
  async (params, thunkAPI) => {
    try {
      return await PostsService.editJob(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerGetAllPosts = createAsyncThunk(
  'get-all-posts',
  async (params, thunkAPI) => {
    try {
      return await PostsService.getAllJobs(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerGetPostsByUserId = createAsyncThunk(
  'get-posts-by-user-id',
  async (params, thunkAPI) => {
    try {
      return await PostsService.getAllInactiveJobs(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerGetMyPosts = createAsyncThunk(
  'get-my-posts',
  async (params, thunkAPI) => {
    try {
      return await PostsService.getAllClosedJobs(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerCreateComment = createAsyncThunk(
  'create-comment',
  async (params, thunkAPI) => {
    try {
      return await PostsService.deleteJob(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const connectionSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //create post
    builder.addCase(triggerCreatePost.pending, (state) => {
      state.createPost.status = states.LOADING;
      state.createPost.data = {};
    });
    builder.addCase(triggerCreatePost.fulfilled, (state, action) => {
      state.createPost.status = states.SUCCESSFUL;
      state.createPost.data = action.payload;
    });
    builder.addCase(triggerCreatePost.rejected, (state) => {
      state.createPost.status = states.ERROR;
      state.createPost.data = {};
    });

    // toggle like unlike post
    builder.addCase(triggerToggleLikeUnlikePost.pending, (state) => {
      state.toggleLikeUnlikePost.status = states.LOADING;
      state.toggleLikeUnlikePost.data = {};
    });
    builder.addCase(triggerToggleLikeUnlikePost.fulfilled, (state, action) => {
      state.toggleLikeUnlikePost.status = states.SUCCESSFUL;
      state.toggleLikeUnlikePost.data = action.payload;
    });
    builder.addCase(triggerToggleLikeUnlikePost.rejected, (state) => {
      state.toggleLikeUnlikePost.status = states.ERROR;
      state.toggleLikeUnlikePost.data = {};
    });

    // Get all posts
    builder.addCase(triggerGetAllPosts.pending, (state) => {
      state.getAllPosts.status = states.LOADING;
      state.getAllPosts.data = {};
    });
    builder.addCase(triggerGetAllPosts.fulfilled, (state, action) => {
      state.getAllPosts.status = states.SUCCESSFUL;
      state.getAllPosts.data = action.payload;
    });
    builder.addCase(triggerGetAllPosts.rejected, (state) => {
      state.getAllPosts.status = states.ERROR;
      state.getAllPosts.data = {};
    });

    // get posts by user id
    builder.addCase(triggerGetPostsByUserId.pending, (state) => {
      state.getPostsByUserId.status = states.LOADING;
      state.getPostsByUserId.data = {};
    });
    builder.addCase(triggerGetPostsByUserId.fulfilled, (state, action) => {
      state.getPostsByUserId.status = states.SUCCESSFUL;
      state.getPostsByUserId.data = action.payload;
    });
    builder.addCase(triggerGetPostsByUserId.rejected, (state) => {
      state.getPostsByUserId.status = states.ERROR;
      state.getPostsByUserId.data = {};
    });

    // get my posts
    builder.addCase(triggerGetMyPosts.pending, (state) => {
      state.getMyPosts.status = states.LOADING;
      state.getMyPosts.data = {};
    });
    builder.addCase(triggerGetMyPosts.fulfilled, (state, action) => {
      state.getMyPosts.status = states.SUCCESSFUL;
      state.getMyPosts.data = action.payload;
    });
    builder.addCase(triggerGetMyPosts.rejected, (state) => {
      state.getMyPosts.status = states.ERROR;
      state.getMyPosts.data = {};
    });

    // create comment
    builder.addCase(triggerCreateComment.pending, (state) => {
      state.createComment.status = states.LOADING;
      state.createComment.data = {};
    });
    builder.addCase(triggerCreateComment.fulfilled, (state, action) => {
      state.createComment.status = states.SUCCESSFUL;
      state.createComment.data = action.payload;
    });
    builder.addCase(triggerCreateComment.rejected, (state) => {
      state.createComment.status = states.ERROR;
      state.createComment.data = {};
    });
  },
});

export default connectionSlice.reducer;
