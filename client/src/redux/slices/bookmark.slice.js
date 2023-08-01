// import { createSlice } from "@reduxjs/toolkit";
// import { uniqBy } from "lodash";
// import { bookmarkAsyncThunk } from "../asyncThunk/bookmark.asyncThunk";

// const initialState = {
//   status: "idle",
//   bookmarkPosts: [],
//   totalBookmarkCount: 0,
//   totalPages: 0,
// };

// const bookmarkSlice = createSlice({
//   name: "bookamark",
//   initialState,
//   reducers: {
//     filterBookmarkPost: (state, action) => {
//       state.bookmarkPosts = state.bookmarkPosts.filter(
//         (item) => item?._id !== action.payload
//       );
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(bookmarkAsyncThunk.getBookMarkPost.pending, (state) => {
//         state.status = "pending";
//       })
//       .addCase(
//         bookmarkAsyncThunk.getBookMarkPost.fulfilled,
//         (state, action) => {
//           console.log("payload", action);
//           state.status = "fulfilled";
//           debugger
//           const data = [...state?.bookmarkPosts,...action.payload?.data?.bookmarks];
//           console.log("data",data)
//           const uniqueObject = uniqBy(data, (obj) => obj._id);
//           state.bookmarkPosts = uniqueObject;

//           state.totalBookmarkCount = action.payload.data?.totalBookmarkCount;
//           state.totalPages = action.payload.data?.totalPages;
//         }
//       )
//       .addCase(bookmarkAsyncThunk.getBookMarkPost.rejected, (state) => {
//         state.status = "rejected";
//       });
//   },
// });

// export const { filterBookmarkPost } = bookmarkSlice.actions;
// export const selectBookmarkPostState = (state) => bookmarkSlice.post;

// export default bookmarkSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { uniqBy } from "lodash";
import { bookmarkAsyncThunk } from "../asyncThunk/bookmark.asyncThunk";

const initialState = {
  status: "idle",
  bookmarkPosts: [],
  totalBookmarkCount: 0,
  totalPages: 0,
  error: null, // New field to store proxy errors
};

const bookmarkSlice = createSlice({
  name: "bookamark",
  initialState,
  reducers: {
    filterBookmarkPost: (state, action) => {
      state.bookmarkPosts = state.bookmarkPosts.filter(
        (item) => item?._id !== action.payload
      );
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookmarkAsyncThunk.getBookMarkPost.pending, (state) => {
        state.status = "pending";
        state.error = null; // Reset the error when making the request
      })
      .addCase(
        bookmarkAsyncThunk.getBookMarkPost.fulfilled,
        (state, action) => {
       
          state.status = "fulfilled";
          const data = [
            ...state?.bookmarkPosts,
            ...action.payload?.data?.bookmarks,
          ];
          console.log("data",data)
          const uniqueObject = uniqBy(data, (obj) => obj._id);
          state.bookmarkPosts = uniqueObject;

          state.totalBookmarkCount = action.payload.data?.totalBookmarkCount;
          state.totalPages = action.payload.data?.totalPages;
        }
      )
      .addCase(bookmarkAsyncThunk.getBookMarkPost.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message; // Store the error message in state
      });
  },
});

export const { filterBookmarkPost, clearError } = bookmarkSlice.actions;
export const selectBookmarkPostState = (state) => bookmarkSlice.post;

export default bookmarkSlice.reducer;
