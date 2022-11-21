import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import _get from "lodash/get";

export function authorizationInterceptor(
  config: AxiosRequestConfig
): AxiosRequestConfig {
  const token = localStorage.get("@Rembrandtech:token");
  config.headers = config.headers || {};
  config.headers.Authorization = token ? `Bearer ${String(token)}` : null;
  return config;
}

export function successToasterInterceptor(
  response: AxiosResponse
): AxiosResponse {
  if (!response.config && !response.config.cancelToken) {
    return;
  }

  return response;
}

export function errorInterceptor(error: AxiosError): Promise<AxiosError> {
  if (error && axios.isCancel(error)) {
    return Promise.reject(error);
  }
  const safeErrorMessage = _get(error, "response.data.errors[0].message");

  if (!error.response) {
    return Promise.reject(error);
  }

  if (error.response.status === 400) {
    console.warn(safeErrorMessage);
  } else {
    console.error(safeErrorMessage);
  }
  return Promise.reject(error);
}

export function sessionTimeoutInterceptor(
  error: AxiosError
): Promise<AxiosError> {
  if (error.isAxiosError) {
    const errorMessage =
      _get(error, "response.status") || _get(error, "message");

    console.warn("errorMessage:", errorMessage);
  }

  if (error.response.status === 403 || error.response.status === 401) {
    localStorage.removeItem("@Rembrandtech:token");
    window.location.href = "/";
    return;
  }
  return Promise.reject(error);
}
