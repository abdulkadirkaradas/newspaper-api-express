export const WEB_ROUTES = {
  HOME: "/",
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
  DASHBOARD: "/dashboard",
} as const;

export const API_ROUTES = {
  AUTH: {
    LOGIN: "auth/login",
    REGISTER: "auth/register",
    LOGOUT: "auth/logout",
    REFRESH: "auth/refresh-token",
  },
  USER: {
    ME: "auth/me",
  },
  POSTS: {
    POST_FLOW: "post/flow",
  },
} as const;
