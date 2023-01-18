import axios from "axios";
import { getToken } from "../services/common";
axios.interceptors.request.use(
  (config) => {
    const token = getToken()
      .toString()
      .replace(/^"(.*)"$/, "$1");

    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    console.log("error");
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    return err.response;
  }
);
export const httpClient = axios;
