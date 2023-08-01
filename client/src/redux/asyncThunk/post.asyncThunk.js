import { createAsyncThunk } from "@reduxjs/toolkit";
import { ASYNC_ROUTES } from "../reduxConstant/redux.constant.js";
import { PostService } from "../services/post.service.js";

export class PostAsyncThunk {
  constructor() {
    this.postService = new PostService();
  }

  createNewPostAsyncThunk = createAsyncThunk(
    ASYNC_ROUTES.CREATE_NEW_POST,
    async (payload, { rejectWithValue }) => {
      console.log("payload", payload);
      try {
        const response = await this.postService.createNewPostService(payload);
        return response;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  getAllPost = createAsyncThunk(
    ASYNC_ROUTES.GET_ALL_POST,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await this.postService.getAllPostService(payload);
        return response;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  getPostDetails = createAsyncThunk(
    ASYNC_ROUTES.GET_POST_DETAILS,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await this.postService.getPostDetails(payload);
        return response;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  myPostLisAsyncThunk = createAsyncThunk(
    ASYNC_ROUTES.MY_POST_LIST,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await this.postService.myPostListService(payload);
        return response;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  updatePostAsyncThunk = createAsyncThunk(
    ASYNC_ROUTES.UPDATE_POST,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await this.postService.updatePostService(payload);
        return response;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  deletePostAsyncThunk = createAsyncThunk(
    ASYNC_ROUTES.DELETE_POST,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await this.postService.deletePostService(payload);
        return response;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
}

export const postAsyncThunk = new PostAsyncThunk();
