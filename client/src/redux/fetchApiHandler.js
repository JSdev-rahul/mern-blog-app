import axios from "axios";

export const sendRequest = (
  url,
  method,
  data = null,
  params = null,
  headers = {}
) => {
  const config = {
    url,
    method,
    data,
    headers,
    params,
  };
  return axios.request(config);
};
