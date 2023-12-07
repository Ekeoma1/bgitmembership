import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PostsService from './posts_service';
import * as states from '../../utils/strings';

const initialState = {
  createPost: {
    status: states.BASE,
    data: {},
  },
  likePost: {
    status: states.BASE,
    data: {},
  },
  unLikePost: {
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
  replyComment: {
    status: states.BASE,
    data: {},
  },
  likeComment: {
    status: states.BASE,
    data: {},
  },
  unlikeComment: {
    status: states.BASE,
    data: {},
  },
  getCommentsByPostId: {
    status: states.BASE,
    data: {},
  },
  savePost: {
    status: states.BASE,
    data: {},
  },
  unsavePost: {
    status: states.BASE,
    data: {},
  },
  activePostIdForOngoingRequest: '',
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

export const triggerLikePost = createAsyncThunk(
  'like-post',
  async (params, thunkAPI) => {
    try {
      return await PostsService.likePost(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerUnlikePost = createAsyncThunk(
  'unlike-post',
  async (params, thunkAPI) => {
    try {
      return await PostsService.unlikePost(params);
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
export const triggerReplyComment = createAsyncThunk(
  'reply-comment',
  async (params, thunkAPI) => {
    try {
      return await PostsService.replyComment(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerLikeComment = createAsyncThunk(
  'like-comment',
  async (params, thunkAPI) => {
    try {
      return await PostsService.likeComment(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerUnlikeComment = createAsyncThunk(
  'unlike-comment',
  async (params, thunkAPI) => {
    try {
      return await PostsService.unlikeComment(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerGetCommentsByPostId = createAsyncThunk(
  'get-comments-by-post-id',
  async (params, thunkAPI) => {
    try {
      return await PostsService.getCommentsByPostId(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerSavePost = createAsyncThunk(
  'save-post',
  async (params, thunkAPI) => {
    try {
      return await PostsService.savePost(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerUnsavePost = createAsyncThunk(
  'unsave-post',
  async (params, thunkAPI) => {
    try {
      return await PostsService.unsavePost(params);
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
    resetLikePost: (state) => {
      state.likePost = initialState.likePost;
    },
    resetUnlikePost: (state) => {
      state.unLikePost = initialState.unLikePost;
    },
    resetSavePost: (state) => {
      state.savePost = initialState.savePost;
    },
    resteUnsavePost: (state) => {
      state.unsavePost = initialState.unsavePost;
    },
    resetLikeComment: (state) => {
      state.likeComment = initialState.likeComment;
    },
    resetUnlikeComment: (state) => {
      state.unlikeComment = initialState.unlikeComment;
    },
    setActivePostIdForOngoingRequest: (state, action) => {
      state.activePostIdForOngoingRequest = action.payload;
    },
    resetActivePostIdForOngoingRequest: (state) => {
      state.activePostIdForOngoingRequest = '';
    },
    resetCreateComment: (state) => {
      state.createComment = initialState.createComment;
    },
    resetReplyComment: (state) => {
      state.replyComment = initialState.replyComment;
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

    // like  post
    builder.addCase(triggerLikePost.pending, (state) => {
      state.likePost.status = states.LOADING;
      state.likePost.data = {};
    });
    builder.addCase(triggerLikePost.fulfilled, (state, action) => {
      state.likePost.status = states.SUCCESSFUL;
      state.likePost.data = action.payload;
    });
    builder.addCase(triggerLikePost.rejected, (state) => {
      state.likePost.status = states.ERROR;
      state.likePost.data = {};
    });

    //  unlike  post
    builder.addCase(triggerUnlikePost.pending, (state) => {
      state.unLikePost.status = states.LOADING;
      state.unLikePost.data = {};
    });
    builder.addCase(triggerUnlikePost.fulfilled, (state, action) => {
      state.unLikePost.status = states.SUCCESSFUL;
      state.unLikePost.data = action.payload;
    });
    builder.addCase(triggerUnlikePost.rejected, (state) => {
      state.unLikePost.status = states.ERROR;
      state.unLikePost.data = {};
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
    // reply comment
    builder.addCase(triggerReplyComment.pending, (state) => {
      state.replyComment.status = states.LOADING;
      state.replyComment.data = {};
    });
    builder.addCase(triggerReplyComment.fulfilled, (state, action) => {
      state.replyComment.status = states.SUCCESSFUL;
      state.replyComment.data = action.payload;
    });
    builder.addCase(triggerReplyComment.rejected, (state) => {
      state.replyComment.status = states.ERROR;
      state.replyComment.data = {};
    });

    // like comment
    builder.addCase(triggerLikeComment.pending, (state) => {
      state.likeComment.status = states.LOADING;
      state.likeComment.data = {};
    });
    builder.addCase(triggerLikeComment.fulfilled, (state, action) => {
      state.likeComment.status = states.SUCCESSFUL;
      state.likeComment.data = action.payload;
    });
    builder.addCase(triggerLikeComment.rejected, (state, action) => {
      state.likeComment.status = states.ERROR;
      state.likeComment.data = action.payload;
    });

    // unlike comment
    builder.addCase(triggerUnlikeComment.pending, (state) => {
      state.unlikeComment.status = states.LOADING;
      state.unlikeComment.data = {};
    });
    builder.addCase(triggerUnlikeComment.fulfilled, (state, action) => {
      state.unlikeComment.status = states.SUCCESSFUL;
      state.unlikeComment.data = action.payload;
    });
    builder.addCase(triggerUnlikeComment.rejected, (state, action) => {
      state.unlikeComment.status = states.ERROR;
      state.unlikeComment.data = action.payload;
    });

    // get all comments by post id
    builder.addCase(triggerGetCommentsByPostId.pending, (state) => {
      state.getCommentsByPostId.status = states.LOADING;
      state.getCommentsByPostId.data = {};
    });
    builder.addCase(
      triggerGetCommentsByPostId.fulfilled,
      (state, action) => {
        state.getCommentsByPostId.status = states.SUCCESSFUL;
        state.getCommentsByPostId.data = action.payload;
      }
    );
    builder.addCase(triggerGetCommentsByPostId.rejected, (state, action) => {
      state.getCommentsByPostId.status = states.ERROR;
      state.getCommentsByPostId.data = action.payload;
    });

    // save post
    builder.addCase(triggerSavePost.pending, (state) => {
      state.savePost.status = states.LOADING;
      state.savePost.data = {};
    });
    builder.addCase(triggerSavePost.fulfilled, (state, action) => {
      state.savePost.status = states.SUCCESSFUL;
      state.savePost.data = action.payload;
    });
    builder.addCase(triggerSavePost.rejected, (state, action) => {
      state.savePost.status = states.ERROR;
      state.savePost.data = action.payload;
    });

    //  unsave post
    builder.addCase(triggerUnsavePost.pending, (state) => {
      state.unsavePost.status = states.LOADING;
      state.unsavePost.data = {};
    });
    builder.addCase(triggerUnsavePost.fulfilled, (state, action) => {
      state.unsavePost.status = states.SUCCESSFUL;
      state.unsavePost.data = action.payload;
    });
    builder.addCase(triggerUnsavePost.rejected, (state, action) => {
      state.unsavePost.status = states.ERROR;
      state.unsavePost.data = action.payload;
    });
  },
});

export default postsSlice.reducer;
export const {
  resetCreatePost,
  resetLikePost,
  resetUnlikePost,
  resetLikeComment,
  resetUnlikeComment,
  resetSavePost,
  resteUnsavePost,
  setActivePostIdForOngoingRequest,
  resetActivePostIdForOngoingRequest,
  resetCreateComment,
  resetReplyComment,
} = postsSlice.actions;
