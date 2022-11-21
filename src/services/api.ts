import axios from "axios";
import {
  sessionTimeoutInterceptor,
  successToasterInterceptor,
  authorizationInterceptor,
} from "./middlewares";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config: any) => {
  config.headers.Authorization =
    localStorage.getItem("@Rembrandtech:token") ?? "";
  return config;
});

api.interceptors.request.use(authorizationInterceptor);
api.interceptors.response.use(undefined, sessionTimeoutInterceptor);
api.interceptors.response.use(successToasterInterceptor);

export default api;
