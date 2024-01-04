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
  createComment: {
    status: states.BASE,
    data: {},
  },
  replyComment: {
    status: states.BASE,
    data: {},
  },
  likeReply: {
    status: states.BASE,
    data: {},
  },
  unlikeReply: {
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
export const triggerCreateComment = createAsyncThunk(
  'create-forum-comment',
  async (params, thunkAPI) => {
    try {
      return await PostsService.createComment(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerReplyComment = createAsyncThunk(
  'reply-forum-comment',
  async (params, thunkAPI) => {
    try {
      return await PostsService.replyComment(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerLikeReply = createAsyncThunk(
  'like-forum-reply',
  async (params, thunkAPI) => {
    try {
      return await PostsService.likeReply(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerUnlikeReply = createAsyncThunk(
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
      return await PostsService.unlikeComment(params);
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
    resetGetCommentsByPostId: (state) => {
      state.getCommentsByPostId = initialState.getCommentsByPostId;
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

    // like reply
    builder.addCase(triggerLikeReply.pending, (state) => {
      state.likeReply.status = states.LOADING;
      state.likeReply.data = {};
    });
    builder.addCase(triggerLikeReply.fulfilled, (state, action) => {
      state.likeReply.status = states.SUCCESSFUL;
      state.likeReply.data = action.payload;
    });
    builder.addCase(triggerLikeReply.rejected, (state, action) => {
      state.likeReply.status = states.ERROR;
      state.likeReply.data = action.payload;
    });

    // unlike reply
    builder.addCase(triggerUnlikeReply.pending, (state) => {
      state.unlikeReply.status = states.LOADING;
      state.unlikeReply.data = {};
    });
    builder.addCase(triggerUnlikeReply.fulfilled, (state, action) => {
      state.unlikeReply.status = states.SUCCESSFUL;
      state.unlikeReply.data = action.payload;
    });
    builder.addCase(triggerUnlikeReply.rejected, (state, action) => {
      state.unlikeReply.status = states.ERROR;
      state.unlikeReply.data = action.payload;
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
  resetGetCommentsByPostId,
} = postsSlice.actions;
