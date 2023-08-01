import { createAsyncThunk } from "@reduxjs/toolkit";
import { ASYNC_ROUTES } from "../reduxConstant/redux.constant.js";
import { BookmarkService } from "../services/bookmark.js";
import { PostService } from "../services/post.service.js";

export class BookmarkAsyncThunk {
  constructor() {
    this.bookmarkService = new BookmarkService();
  }

  addBookmarkPostAsynThunk = createAsyncThunk(
    ASYNC_ROUTES.BOOKMARK_POST,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await this.bookmarkService.addPostBookmarkService(
          payload
        );
        return response;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  getBookMarkPost = createAsyncThunk(
    ASYNC_ROUTES.GET_BOOKMARK_POST,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await this.bookmarkService.getBookmarkPostService(
          payload
        );
        return response;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  deleteFromBookmakAsyncThunk = createAsyncThunk(
    ASYNC_ROUTES.DELETE_FROM_BOOKMARK_ASYNC_THUNK,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await this.bookmarkService.deleteFromBookmark(
          payload
        );
        return response;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  getBookmakrIdsAsyncThunk=createAsyncThunk(
    ASYNC_ROUTES.GET_BOOKMARK_IDS,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await this.bookmarkService.getBookmarkIdsService(
          payload
        );
        return response;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
}

export const bookmarkAsyncThunk = new BookmarkAsyncThunk();
