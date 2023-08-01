import { sendRequest } from "../fetchApiHandler";
import {
  METHODS,
  replaceUrl,
  SERVICE_ROUTES,
} from "../reduxConstant/service.constant";

export class PostService {
  createNewPostService = (payload) => {
    return sendRequest(SERVICE_ROUTES.CREATE_NEW_POST, METHODS.POST, payload);
  };
  getAllPostService = (pageData) => {
    return sendRequest(
      SERVICE_ROUTES.GET_ALL_POST,
      METHODS.GET,
      null,
      pageData
    );
  };
  getPostDetails = (payload) => {
    const { id } = payload;
    const url = replaceUrl(SERVICE_ROUTES.GET_POST_DETAILS, { id });
    return sendRequest(url, METHODS.GET);
  };
  myPostListService = (pageData) => {
    return sendRequest(
      SERVICE_ROUTES.MY_POST_LIST,
      METHODS.GET,
      null,
      pageData
    );
  };
  updatePostService = (payload) => {
    const { id, data } = payload;

    const url = replaceUrl(SERVICE_ROUTES.UPDATE_POST, { id });
    return sendRequest(url, METHODS.PUT, data);
  };
  deletePostService = (payload) => {
    const { id } = payload;
    const url = replaceUrl(SERVICE_ROUTES.DELETE_POST, { id });
    return sendRequest(url, METHODS.DELETE);
  };
}
