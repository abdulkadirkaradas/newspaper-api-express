import {
  LoginRequest,
  LoginResponse,
} from "@repo/shared/features/auth/login/types";
import {
  RegisterRequest,
  RegisterResponse,
} from "@repo/shared/features/auth/register/types";
import { APIError } from "./error";
import { API_ROUTES } from "@/core/config/routes";
import { PostFlowResponse } from "../../../../../packages/shared/src/features/posts/post/types";

const API_URL =
  (typeof window === "undefined"
    ? process.env.INTERNAL_API_URL
    : process.env.NEXT_PUBLIC_API_URL) +
  "/" +
  process.env.NEXT_PUBLIC_API_SUFFIX;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type RequestConfig = RequestInit & {
  params?: Record<string, string>;
};

export class APIClient {
  private static accessToken: string | null = null;

  static setAccessToken(token: string | null) {
    this.accessToken = token;
  }

  static getAccessToken() {
    return this.accessToken;
  }

  private static getHeaders(
    customHeaders: Record<string, string> = {},
  ): HeadersInit {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...customHeaders,
    };
    if (this.accessToken) {
      headers["Authorization"] = `Bearer ${this.accessToken}`;
    }
    return headers;
  }

  private static async request<T>(
    endpoint: string,
    method: HttpMethod,
    body?: object,
    config: RequestConfig = {},
    isRetry = false,
  ): Promise<T> {
    const { params, ...customConfig } = config;
    const headers = this.getHeaders(
      customConfig.headers as Record<string, string>,
    );

    const url = new URL(`${API_URL}/${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response: Response = await fetch(url.toString(), {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
      ...customConfig,
    });

    if (response.status === 401 && !isRetry) {
      try {
        const refreshResponse = await this.refreshToken();
        if (refreshResponse && refreshResponse.accessToken) {
          this.setAccessToken(refreshResponse.accessToken);
          return this.request<T>(endpoint, method, body, config, true);
        }
      } catch (e) {
        // Refresh failed
      }

      this.setAccessToken(null);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth:unauthorized"));
      }
    }

    if (!response.ok) {
      let errorMessage = "An error occurred";
      let errorData = null;

      try {
        errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // Ignore JSON parse error
      }

      throw new APIError(response.status, errorMessage, errorData);
    }

    if (response.status === 204) {
      return {} as T;
    }

    try {
      return await response.json();
    } catch {
      return {} as T;
    }
  }

  static async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, "GET", undefined, config);
  }

  static async post<T>(
    endpoint: string,
    body: object,
    config?: RequestConfig,
  ): Promise<T> {
    return this.request<T>(endpoint, "POST", body, config);
  }

  static async put<T>(
    endpoint: string,
    body: object,
    config?: RequestConfig,
  ): Promise<T> {
    return this.request<T>(endpoint, "PUT", body, config);
  }

  static async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, "DELETE", undefined, config);
  }

  static async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await this.post<LoginResponse>(
      API_ROUTES.AUTH.LOGIN,
      data,
    );
    if (response.accessToken) {
      this.setAccessToken(response.accessToken);
    }
    return response;
  }

  static async register(data: RegisterRequest): Promise<RegisterResponse> {
    return this.post<RegisterResponse>(API_ROUTES.AUTH.REGISTER, data);
  }

  static async refreshToken() {
    const response = await fetch(`${API_URL}/${API_ROUTES.AUTH.REFRESH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Refresh failed");
    }

    return response.json();
  }

  static async logout(): Promise<void> {
    try {
      await this.post(API_ROUTES.AUTH.LOGOUT, {});
    } catch (e) {
      // ignore
    }
    this.setAccessToken(null);
  }
}
