/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios, { AxiosRequestConfig } from "axios";

import {
  authorizationInterceptor,
  errorInterceptor,
  sessionTimeoutInterceptor,
  successToasterInterceptor,
} from "./middlewares";

const apiFileUpload = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
});

apiFileUpload.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = localStorage.get("@Rembrandtech:token");
    config.headers.Authorization = token ? `Bearer ${String(token)}` : null;
    return config;
  }
);

apiFileUpload.interceptors.request.use(authorizationInterceptor);
apiFileUpload.interceptors.response.use(undefined, sessionTimeoutInterceptor);
apiFileUpload.interceptors.response.use(successToasterInterceptor);
apiFileUpload.interceptors.response.use(undefined, errorInterceptor);

export default apiFileUpload;
