import { createSlice } from "@reduxjs/toolkit";

import { postCategoryAsyncThunk } from "../asyncThunk/postCategory.asyncThunk";

const initialState = {
  status: "idle",
  categorys: [],
};

const postCategorySlice = createSlice({
  name: "postCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postCategoryAsyncThunk.getAllPostCategory.pending, (state) => {
        state.status = "pending";
      })
      .addCase(
        postCategoryAsyncThunk.getAllPostCategory.fulfilled,
        (state, action) => {
          state.status = "fulfilled";
          state.categorys = action.payload?.data;
        }
      )
      .addCase(postCategoryAsyncThunk.getAllPostCategory.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export const selectPostCategoryState = (state) => state.post;

export default postCategorySlice.reducer;
