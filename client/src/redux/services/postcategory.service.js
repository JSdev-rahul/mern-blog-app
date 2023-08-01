import { sendRequest } from "../fetchApiHandler";
import { METHODS, SERVICE_ROUTES } from "../reduxConstant/service.constant";

export class PostCategoryService {
  createNewPostCategoryService = (payload) => {
    return sendRequest(SERVICE_ROUTES.CREATE_NEW_POST_CATEGORY, METHODS.POST, payload);
  };

  getAllPostCategoryService = (payload) => {
    return sendRequest(SERVICE_ROUTES.GET_ALL_POST_CATEGORY, METHODS.GET, payload);
  };
}
