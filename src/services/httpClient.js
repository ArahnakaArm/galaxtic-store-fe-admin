import axios from "axios";

axios.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    return err.response.data;
  }
);
export const httpClient = axios;
