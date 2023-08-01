export const ASYNC_ROUTES = {
  // Authentication
  LOGIN: "auth/login",
  SIGN_UP: "auth/signup",

  CREATE_NEW_POST: "post/CrateNewPost",
  GET_ALL_POST: "post/GetAllPost",
  GET_POST_DETAILS: "post/GetPostDetails",
  UPDATE_POST: "post/UpdatePost",
  DELETE_POST: "post/deletePost",
  MY_POST_LIST: "post/MyPostList",
  GET_ALL_POST_CATEGORY: "post/GetAllPostCategory",
  CREATE_NEW_POST_CATEGORY: "post/CreateNewCategory",

  // Bookmark

  BOOKMARK_POST: "bookmark/addPostBookmark",
  GET_BOOKMARK_POST: "bookmark/GetBookMarkPost",
  DELETE_FROM_BOOKMARK_ASYNC_THUNK: "bookmark/deleteFromBookmark",
  GET_BOOKMARK_IDS:"bookmark/getBookmarkIds"

};

export const THUNK_STATUS = {
  PENDING: "pending",
  SUCCESS: "success",
  FAILED: "failed",
};
