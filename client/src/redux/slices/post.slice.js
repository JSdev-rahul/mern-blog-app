import { createSlice } from "@reduxjs/toolkit";
import { uniqBy } from "lodash";
import { postAsyncThunk } from "../asyncThunk/post.asyncThunk";

const initialState = {
  status: "idle",
  posts: [],
  totalPostCount: 0,
  totalPages: 0,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    removePosts: (state) => {
      state.posts = [];
    },
    filterPosts: (state, action) => {
      state.posts = state.posts.filter((item) => item?._id !== action.payload);
    },
    updatePost: (state, { payload }) => {
      state.posts = state.posts?.map((item) => {
        if (payload._id == item?._id) {
          return { ...item, ...payload };
        } else {
          return { ...item };
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postAsyncThunk.getAllPost.pending, (state) => {
        state.status = "pending";
      })
      .addCase(postAsyncThunk.getAllPost.fulfilled, (state, action) => {
        state.status = "fulfilled";

        const data = [...state.posts, ...action.payload.data.posts];
        const uniqueObject = uniqBy(data, (obj) => obj._id);
        state.posts = uniqueObject;
        state.totalPostCount = action.payload.data.totalPostCount;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(postAsyncThunk.getAllPost.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(postAsyncThunk.myPostLisAsyncThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(
        postAsyncThunk.myPostLisAsyncThunk.fulfilled,
        (state, action) => {
          state.status = "fulfilled";
          const data = [...state.posts, ...action.payload.data.posts];
          const uniqueObject = uniqBy(data, (obj) => obj._id);
          state.posts = uniqueObject;
          state.totalPostCount = action.payload.data.totalPostCount;
          state.totalPages = action.payload.data.totalPages;
        }
      )
      .addCase(postAsyncThunk.myPostLisAsyncThunk.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export const {
  removePosts,
  updatePost,
  filterPosts,
  removeFromBookmarkReducer,
} = postSlice.actions;
export const selectPostState = (state) => state.post;

export default postSlice.reducer;
