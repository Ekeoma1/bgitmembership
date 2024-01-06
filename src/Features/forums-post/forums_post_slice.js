import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PostsService from './forums_post_service';
import * as states from '../../utils/strings';

const initialState = {
  createForumPost: {
    status: states.BASE,
    data: {},
  },
  likeForumPost: {
    status: states.BASE,
    data: {},
  },
  unlikeForumPost: {
    status: states.BASE,
    data: {},
  },
  getForumPostsByForumId: {
    status: states.BASE,
    data: {},
  },
  createCommentForumsPost: {
    status: states.BASE,
    data: {},
  },
  replyCommentForumsPost: {
    status: states.BASE,
    data: {},
  },
  likeReplyForumsPost: {
    status: states.BASE,
    data: {},
  },
  unlikeReplyForumsPost: {
    status: states.BASE,
    data: {},
  },
  likeForumPostComment: {
    status: states.BASE,
    data: {},
  },
  unlikeForumPostComment: {
    status: states.BASE,
    data: {},
  },
  saveForumPost: {
    status: states.BASE,
    data: {},
  },
  unsaveForumPost: {
    status: states.BASE,
    data: {},
  },
  getAllCommentsByForumPostId: {
    status: states.BASE,
    data: {},
  },
};
export const triggerCreateForumPost = createAsyncThunk(
  'create-forum-post',
  async (params, thunkAPI) => {
    try {
      return await PostsService.createForumPost(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const triggerLikeForumPost = createAsyncThunk(
  'like-forum-post',
  async (params, thunkAPI) => {
    try {
      return await PostsService.likeForumPost(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerUnlikeForumPost = createAsyncThunk(
  'unlike-forum-post',
  async (params, thunkAPI) => {
    try {
      return await PostsService.unlikeForumPost(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const triggerGetForumPostsByForumId = createAsyncThunk(
  'get-forum-posts-by-forum-id',
  async (params, thunkAPI) => {
    try {
      return await PostsService.getForumPostsByForumId(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerCreateCommentForumsPost = createAsyncThunk(
  'create-forum-comment',
  async (params, thunkAPI) => {
    try {
      return await PostsService.createComment(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerReplyCommentForumsPost = createAsyncThunk(
  'reply-forum-comment',
  async (params, thunkAPI) => {
    try {
      return await PostsService.replyComment(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerLikeReplyForumsPost = createAsyncThunk(
  'like-forum-reply',
  async (params, thunkAPI) => {
    try {
      return await PostsService.likeReply(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerUnlikeReplyForumsPost = createAsyncThunk(
  'unlike-forum-reply',
  async (params, thunkAPI) => {
    try {
      return await PostsService.unlikeReply(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerLikeForumPostComment = createAsyncThunk(
  'like-forum-post-comment',
  async (params, thunkAPI) => {
    try {
      return await PostsService.likeForumPostComment(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerUnlikeForumPostComment = createAsyncThunk(
  'unlike-forum-post-comment',
  async (params, thunkAPI) => {
    try {
      return await PostsService.unlikeForumPostComment(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerSaveForumPost = createAsyncThunk(
  'save-forum-post',
  async (params, thunkAPI) => {
    try {
      return await PostsService.saveForumPost(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerUnsaveForumPost = createAsyncThunk(
  'unsave-forum-post',
  async (params, thunkAPI) => {
    try {
      return await PostsService.unsaveForumPost(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const triggerGetAllCommentsByForumPostId = createAsyncThunk(
  'get-all-comments-by-forum-post-id',
  async (params, thunkAPI) => {
    try {
      return await PostsService.getAllCommentsByForumPostId(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetCreateForumPost: (state) => {
      state.createForumPost = initialState.createForumPost;
    },
    resetCreateCommentForumsPost: (state) => {
      state.createCommentForumsPost = initialState.createCommentForumsPost;
    },
    resetReplyCommentForumsPost: (state) => {
      state.createCommentForumsPost = initialState.createCommentForumsPost;
    },
  },
  extraReducers: (builder) => {
    //create forum post
    builder.addCase(triggerCreateForumPost.pending, (state) => {
      state.createForumPost.status = states.LOADING;
      state.createForumPost.data = {};
    });
    builder.addCase(triggerCreateForumPost.fulfilled, (state, action) => {
      state.createForumPost.status = states.SUCCESSFUL;
      state.createForumPost.data = action.payload;
    });
    builder.addCase(triggerCreateForumPost.rejected, (state) => {
      state.createForumPost.status = states.ERROR;
      state.createForumPost.data = {};
    });

    // like forum post
    builder.addCase(triggerLikeForumPost.pending, (state) => {
      state.likeForumPost.status = states.LOADING;
      state.likeForumPost.data = {};
    });
    builder.addCase(triggerLikeForumPost.fulfilled, (state, action) => {
      state.likeForumPost.status = states.SUCCESSFUL;
      state.likeForumPost.data = action.payload;
    });
    builder.addCase(triggerLikeForumPost.rejected, (state) => {
      state.likeForumPost.status = states.ERROR;
      state.likeForumPost.data = {};
    });

    //  unlike forum post
    builder.addCase(triggerUnlikeForumPost.pending, (state) => {
      state.unlikeForumPost.status = states.LOADING;
      state.unlikeForumPost.data = {};
    });
    builder.addCase(triggerUnlikeForumPost.fulfilled, (state, action) => {
      state.unlikeForumPost.status = states.SUCCESSFUL;
      state.unlikeForumPost.data = action.payload;
    });
    builder.addCase(triggerUnlikeForumPost.rejected, (state) => {
      state.unlikeForumPost.status = states.ERROR;
      state.unlikeForumPost.data = {};
    });

    // get forum posts by forum id
    builder.addCase(triggerGetForumPostsByForumId.pending, (state) => {
      state.getForumPostsByForumId.status = states.LOADING;
      state.getForumPostsByForumId.data = {};
    });
    builder.addCase(
      triggerGetForumPostsByForumId.fulfilled,
      (state, action) => {
        state.getForumPostsByForumId.status = states.SUCCESSFUL;
        state.getForumPostsByForumId.data = action.payload;
      }
    );
    builder.addCase(triggerGetForumPostsByForumId.rejected, (state) => {
      state.getForumPostsByForumId.status = states.ERROR;
      state.getForumPostsByForumId.data = {};
    });

    // create comment
    builder.addCase(triggerCreateCommentForumsPost.pending, (state) => {
      state.createCommentForumsPost.status = states.LOADING;
      state.createCommentForumsPost.data = {};
    });
    builder.addCase(
      triggerCreateCommentForumsPost.fulfilled,
      (state, action) => {
        state.createCommentForumsPost.status = states.SUCCESSFUL;
        state.createCommentForumsPost.data = action.payload;
      }
    );
    builder.addCase(triggerCreateCommentForumsPost.rejected, (state) => {
      state.createCommentForumsPost.status = states.ERROR;
      state.createCommentForumsPost.data = {};
    });
    // reply comment
    builder.addCase(triggerReplyCommentForumsPost.pending, (state) => {
      state.replyCommentForumsPost.status = states.LOADING;
      state.replyCommentForumsPost.data = {};
    });
    builder.addCase(
      triggerReplyCommentForumsPost.fulfilled,
      (state, action) => {
        state.replyCommentForumsPost.status = states.SUCCESSFUL;
        state.replyCommentForumsPost.data = action.payload;
      }
    );
    builder.addCase(triggerReplyCommentForumsPost.rejected, (state) => {
      state.replyCommentForumsPost.status = states.ERROR;
      state.replyCommentForumsPost.data = {};
    });

    // like reply
    builder.addCase(triggerLikeReplyForumsPost.pending, (state) => {
      state.likeReplyForumsPost.status = states.LOADING;
      state.likeReplyForumsPost.data = {};
    });
    builder.addCase(triggerLikeReplyForumsPost.fulfilled, (state, action) => {
      state.likeReplyForumsPost.status = states.SUCCESSFUL;
      state.likeReplyForumsPost.data = action.payload;
    });
    builder.addCase(triggerLikeReplyForumsPost.rejected, (state, action) => {
      state.likeReplyForumsPost.status = states.ERROR;
      state.likeReplyForumsPost.data = action.payload;
    });

    // unlike reply
    builder.addCase(triggerUnlikeReplyForumsPost.pending, (state) => {
      state.unlikeReplyForumsPost.status = states.LOADING;
      state.unlikeReplyForumsPost.data = {};
    });
    builder.addCase(triggerUnlikeReplyForumsPost.fulfilled, (state, action) => {
      state.unlikeReplyForumsPost.status = states.SUCCESSFUL;
      state.unlikeReplyForumsPost.data = action.payload;
    });
    builder.addCase(triggerUnlikeReplyForumsPost.rejected, (state, action) => {
      state.unlikeReplyForumsPost.status = states.ERROR;
      state.unlikeReplyForumsPost.data = action.payload;
    });

    // like forumpost comment
    builder.addCase(triggerLikeForumPostComment.pending, (state) => {
      state.likeForumPostComment.status = states.LOADING;
      state.likeForumPostComment.data = {};
    });
    builder.addCase(triggerLikeForumPostComment.fulfilled, (state, action) => {
      state.likeForumPostComment.status = states.SUCCESSFUL;
      state.likeForumPostComment.data = action.payload;
    });
    builder.addCase(triggerLikeForumPostComment.rejected, (state) => {
      state.likeForumPostComment.status = states.ERROR;
      state.likeForumPostComment.data = {};
    });

    // unlike forum post comment
    builder.addCase(triggerUnlikeForumPostComment.pending, (state) => {
      state.unlikeForumPostComment.status = states.LOADING;
      state.unlikeForumPostComment.data = {};
    });
    builder.addCase(
      triggerUnlikeForumPostComment.fulfilled,
      (state, action) => {
        state.unlikeForumPostComment.status = states.SUCCESSFUL;
        state.unlikeForumPostComment.data = action.payload;
      }
    );
    builder.addCase(triggerUnlikeForumPostComment.rejected, (state) => {
      state.unlikeForumPostComment.status = states.ERROR;
      state.unlikeForumPostComment.data = {};
    });

    // save forum post
    builder.addCase(triggerSaveForumPost.pending, (state) => {
      state.saveForumPost.status = states.LOADING;
      state.saveForumPost.data = {};
    });
    builder.addCase(triggerSaveForumPost.fulfilled, (state, action) => {
      state.saveForumPost.status = states.SUCCESSFUL;
      state.saveForumPost.data = action.payload;
    });
    builder.addCase(triggerSaveForumPost.rejected, (state, action) => {
      state.saveForumPost.status = states.ERROR;
      state.saveForumPost.data = action.payload;
    });

    // unsave forum post
    builder.addCase(triggerUnsaveForumPost.pending, (state) => {
      state.unsaveForumPost.status = states.LOADING;
      state.unsaveForumPost.data = {};
    });
    builder.addCase(triggerUnsaveForumPost.fulfilled, (state, action) => {
      state.unsaveForumPost.status = states.SUCCESSFUL;
      state.unsaveForumPost.data = action.payload;
    });
    builder.addCase(triggerUnsaveForumPost.rejected, (state, action) => {
      state.unsaveForumPost.status = states.ERROR;
      state.unsaveForumPost.data = action.payload;
    });

    // get all comments by post id
    builder.addCase(triggerGetAllCommentsByForumPostId.pending, (state) => {
      state.getAllCommentsByForumPostId.status = states.LOADING;
      state.getAllCommentsByForumPostId.data = {};
    });
    builder.addCase(
      triggerGetAllCommentsByForumPostId.fulfilled,
      (state, action) => {
        state.getAllCommentsByForumPostId.status = states.SUCCESSFUL;
        state.getAllCommentsByForumPostId.data = action.payload;
      }
    );
    builder.addCase(
      triggerGetAllCommentsByForumPostId.rejected,
      (state, action) => {
        state.getAllCommentsByForumPostId.status = states.ERROR;
        state.getAllCommentsByForumPostId.data = action.payload;
      }
    );
  },
});

export default postsSlice.reducer;
export const {
  resetCreateForumPost,
  resetCreateCommentForumsPost,
  resetReplyCommentForumsPost,
} = postsSlice.actions;
