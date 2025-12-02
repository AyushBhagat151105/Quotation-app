import api from "@/lib/fetch-utils";
import { useAuthStore } from "@/store/auth";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { useCallback } from "react";

export const useApi = () => {
  const token = useAuthStore((s) => s.accessToken);

  const makeRequest = useCallback(
    async <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
      return await api(config);
    },
    [token]
  );

  return {
    get: <T>(url: string, config?: AxiosRequestConfig) =>
      makeRequest<T>({ ...config, method: "GET", url }),

    post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
      makeRequest<T>({ ...config, method: "POST", url, data }),

    put: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
      makeRequest<T>({ ...config, method: "PUT", url, data }),

    patch: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
      makeRequest<T>({ ...config, method: "PATCH", url, data }),

    delete: <T>(url: string, config?: AxiosRequestConfig) =>
      makeRequest<T>({ ...config, method: "DELETE", url }),
  };
};
