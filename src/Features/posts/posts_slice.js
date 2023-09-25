import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PostsService from './posts_service';
import * as states from '../../utils/strings';

const initialState = {
  createPost: {
    status: states.BASE,
    data: {},
  },
  toggleLikePost: {
    status: states.BASE,
    data: {},
  },
  getPostLikedUsers: {
    status: states.BASE,
    data: {},
  },
  getAllPosts: {
    status: states.BASE,
    data: {},
  },
  getAllPostsByUserId: {
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
      return await PostsService.createPost(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const triggerToggleLikePost = createAsyncThunk(
  'toggle-like-post',
  async (params, thunkAPI) => {
    try {
      return await PostsService.toggleLikePost(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const triggerGetPostLikedUsers = createAsyncThunk(
  'get-posts-liked-users',
  async (params, thunkAPI) => {
    try {
      return await PostsService.getPostLikedUsers(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerGetAllPosts = createAsyncThunk(
  'get-all-posts',
  async (params, thunkAPI) => {
    try {
      return await PostsService.getAllPosts(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerGetAllPostsByUserId = createAsyncThunk(
  'get-all-posts-by-user-id',
  async (params, thunkAPI) => {
    try {
      return await PostsService.getAllPostsByUserId(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerGetMyPosts = createAsyncThunk(
  'get-my-posts',
  async (params, thunkAPI) => {
    try {
      return await PostsService.getMyPosts(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerCreateComment = createAsyncThunk(
  'create-comment',
  async (params, thunkAPI) => {
    try {
      return await PostsService.createComment(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetCreatePost: (state) => {
      state.createPost = initialState.createPost;
    },
  },
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

    // toggle like  post
    builder.addCase(triggerToggleLikePost.pending, (state) => {
      state.toggleLikePost.status = states.LOADING;
      state.toggleLikePost.data = {};
    });
    builder.addCase(triggerToggleLikePost.fulfilled, (state, action) => {
      state.toggleLikePost.status = states.SUCCESSFUL;
      state.toggleLikePost.data = action.payload;
    });
    builder.addCase(triggerToggleLikePost.rejected, (state) => {
      state.toggleLikePost.status = states.ERROR;
      state.toggleLikePost.data = {};
    });

    // get posts liked by users
    builder.addCase(triggerGetPostLikedUsers.pending, (state) => {
      state.getPostLikedUsers.status = states.LOADING;
      state.getPostLikedUsers.data = {};
    });
    builder.addCase(triggerGetPostLikedUsers.fulfilled, (state, action) => {
      state.getPostLikedUsers.status = states.SUCCESSFUL;
      state.getPostLikedUsers.data = action.payload;
    });
    builder.addCase(triggerGetPostLikedUsers.rejected, (state) => {
      state.getPostLikedUsers.status = states.ERROR;
      state.getPostLikedUsers.data = {};
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

    // get all posts by user id
    builder.addCase(triggerGetAllPostsByUserId.pending, (state) => {
      state.getAllPostsByUserId.status = states.LOADING;
      state.getAllPostsByUserId.data = {};
    });
    builder.addCase(triggerGetAllPostsByUserId.fulfilled, (state, action) => {
      state.getAllPostsByUserId.status = states.SUCCESSFUL;
      state.getAllPostsByUserId.data = action.payload;
    });
    builder.addCase(triggerGetAllPostsByUserId.rejected, (state) => {
      state.getAllPostsByUserId.status = states.ERROR;
      state.getAllPostsByUserId.data = {};
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

export default postsSlice.reducer;
export const { resetCreatePost } = postsSlice.actions;
