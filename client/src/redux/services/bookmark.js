import { sendRequest } from "../fetchApiHandler";
import {
  METHODS,
  replaceUrl,
  SERVICE_ROUTES,
} from "../reduxConstant/service.constant";

export class BookmarkService {
  addPostBookmarkService = (payload) => {
    return sendRequest(SERVICE_ROUTES.BOOKMARK_POST, METHODS.POST, payload);
  };
  getBookmarkPostService = (params) => {
    return sendRequest(
      SERVICE_ROUTES.GET_BOOKMARK_POST,
      METHODS.GET,
      null,
      params
    );
  };
  deleteFromBookmark = (payload) => {
    const { id } = payload;
    const url = replaceUrl(SERVICE_ROUTES.DELETE_FROM_BOOKMARK_ASYNC_THUNK, {
      id,
    });
    return sendRequest(url, METHODS.DELETE);
  };
  getBookmarkIdsService = () => {
    return sendRequest(SERVICE_ROUTES.GET_BOOKMARK_IDS, METHODS.GET);
  };
}
