"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { APIClient } from "@/lib/api/client";
import { useRouter } from "next/navigation";
import { API_ROUTES, WEB_ROUTES } from "@/core/config/routes";

interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  lastname: string;
  avatar?: string | null;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const logout = useCallback(() => {
    APIClient.logout().then(() => {
      setUser(null);
      router.push(WEB_ROUTES.HOME);
    });
  }, [router]);

  const checkAuth = useCallback(async () => {
    try {
      // 1. Try to refresh token (silent login via cookie)
      const data = await APIClient.refreshToken();
      if (data && data.accessToken) {
        APIClient.setAccessToken(data.accessToken);

        // 2. Fetch user data
        const userData = await APIClient.get<User>(API_ROUTES.USER.ME);
        setUser(userData);
      } else {
        throw new Error("No access token returned");
      }
    } catch (error) {
      // If refresh fails, we are strictly logged out
      // console.error("Auth check failed", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();

    const handleUnauthorized = () => logout();
    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () =>
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, [checkAuth, logout]);

  const login = (accessToken: string) => {
    APIClient.setAccessToken(accessToken);
    checkAuth(); // Fetch user data
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
