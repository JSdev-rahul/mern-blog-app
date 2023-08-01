import { sendRequest } from "../fetchApiHandler";
import { METHODS, SERVICE_ROUTES } from "../reduxConstant/service.constant";

export class AuthService {
  loginService = (payload) => {
    return sendRequest(SERVICE_ROUTES.LOGIN, METHODS.POST, payload);
  };

  userSignUpService = (payload) => {
    return sendRequest(SERVICE_ROUTES.SIGN_UP, METHODS.POST, payload);
  };
}
