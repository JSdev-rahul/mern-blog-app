import { createAsyncThunk } from "@reduxjs/toolkit";
import { ASYNC_ROUTES } from "../reduxConstant/redux.constant.js";
import { PostCategoryService } from "../services/postcategory.service.js";

export class PostCategoryAsyncThunk {
  constructor() {
    this.postCategoryService = new PostCategoryService();
  }

  createNewPostCategoryAsyncThunk = createAsyncThunk(
    ASYNC_ROUTES.CREATE_NEW_POST_CATEGORY,
    async (payload, { rejectWithValue }) => {
      try {
        const response =
          await this.postCategoryService.createNewPostCategoryService(payload);
        return response;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  getAllPostCategory = createAsyncThunk(
    ASYNC_ROUTES.GET_ALL_POST_CATEGORY,
    async (payload, { rejectWithValue }) => {
      try {
        const response =
          await this.postCategoryService.getAllPostCategoryService(payload);
        return response;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
}

export const postCategoryAsyncThunk = new PostCategoryAsyncThunk();
