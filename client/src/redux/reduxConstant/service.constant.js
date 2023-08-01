export let SERVICE_ROUTES = {
  //---------------------Auth------------------//
  LOGIN: "/login", // Endpoint for user login
  SIGN_UP: "/register", // Endpoint for user sign up
  CREATE_NEW_POST: "/post",
  GET_ALL_POST: "/post",
  GET_POST_DETAILS: "/post/:id",
  UPDATE_POST: "/post/:id",
  DELETE_POST: "/post/:id",
  MY_POST_LIST: "/my-post",
  GET_ALL_POST_CATEGORY: "/category",
  CREATE_NEW_POST_CATEGORY: "/category",

  // bookmark

  BOOKMARK_POST: "/bookmark",
  GET_BOOKMARK_POST: "/bookmark",
  DELETE_FROM_BOOKMARK_ASYNC_THUNK: "/bookmark/:id",
  GET_BOOKMARK_IDS:'/bookmark-ids'
};

export const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

export const replaceUrl = (url, data) => {
  var regex = new RegExp(":(" + Object.keys(data).join("|") + ")", "g");
  return url?.replace(regex, (m, $1) => data[$1] || m);
};
