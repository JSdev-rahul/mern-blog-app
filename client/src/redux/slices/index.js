import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import bookmarkSlice from "./bookmark.slice";
import myPostSlice from "./myPostSlice";
import pageDataSlice from "./pageData.slice";
import postSlice from "./post.slice";
import postCategorySlice from "./postCategory.slice";
export default combineReducers({
  auth: authSlice,
  post:postSlice,
  postCategory:postCategorySlice,
  myPostSlice:myPostSlice,
  pageDataSlice:pageDataSlice,
  bookmarkSlice:bookmarkSlice
});
