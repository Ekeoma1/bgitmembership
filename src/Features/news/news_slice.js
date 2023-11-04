import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import NewsService from './news_service';
import * as states from '../../utils/strings';

const initialState = {
  getAllNews: {
    status: states.BASE,
    data: {},
  },
  getNewsById: {
    status: states.BASE,
    data: {},
  },
};
// get all news
export const triggerGetAllNews = createAsyncThunk(
  'get-all-news',
  async (params, thunkAPI) => {
    try {
      return await NewsService.getAllNews(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
// get news by ID
export const triggerGetNewsByID = createAsyncThunk(
  'get-news-by-id',
  async (params, thunkAPI) => {
    try {
      return await NewsService.getNewsById(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get all news
    builder.addCase(triggerGetAllNews.pending, (state) => {
      state.getAllNews.status = states.LOADING;
      state.getAllNews.data = {};
    });
    builder.addCase(triggerGetAllNews.fulfilled, (state, action) => {
      state.getAllNews.status = states.SUCCESSFUL;
      state.getAllNews.data = action.payload;
    });
    builder.addCase(triggerGetAllNews.rejected, (state, action) => {
      state.getAllNews.status = states.ERROR;
      state.getAllNews.data = action.payload;
    });

    // Get news by ID
    builder.addCase(triggerGetNewsByID.pending, (state) => {
      state.getNewsById.status = states.LOADING;
      state.getNewsById.data = {};
    });
    builder.addCase(triggerGetNewsByID.fulfilled, (state, action) => {
      state.getNewsById.status = states.SUCCESSFUL;
      state.getNewsById.data = action.payload;
    });
    builder.addCase(triggerGetNewsByID.rejected, (state, action) => {
      state.getNewsById.status = states.ERROR;
      state.getNewsById.data = action.payload;
    });
  },
});

export default newsSlice.reducer;
