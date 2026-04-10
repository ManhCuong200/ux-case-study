import { createContext, useState, useEffect, useCallback, type ReactNode } from "react";
import authApi from "@/api/auth";
import type { User, LoginData, RegisterData } from "@/shared/types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  setSession: (accessToken: string, refreshToken: string, user?: User) => Promise<void>;
  checkUserSession: () => Promise<void>;
  updateUser: (user: User) => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkUserSession = useCallback(async () => {
    try {
      const res = await authApi.getMe();
      setUser(res.data);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (credentials: LoginData) => {
    const res = await authApi.login(credentials);
    localStorage.setItem("access_token", res.data.accessToken);
    localStorage.setItem("refresh_token", res.data.refreshToken);
    setUser(res.data.user || {} as User);
  };

  const register = async (data: RegisterData) => {
    await authApi.register(data);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
  };

  const setSession = useCallback(async (accessToken: string, refreshToken: string, user?: User) => {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    if (user) {
      setUser(user);
      setLoading(false);
    } else {
      await checkUserSession();
    }
  }, [checkUserSession]);

  // Khôi phục user từ token (nếu có) khi load trang
  useEffect(() => {
    // 1. Kiểm tra URL xem có token từ Google trả về không
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("accessToken");
    const urlRefreshToken = params.get("refreshToken");

    if (urlToken && urlRefreshToken) {
      setSession(urlToken, urlRefreshToken);
      // Xóa query params trên URL cho sạch
      window.history.replaceState({}, document.title, "/");
      return;
    }

    // 2. Nếu không có ở URL, kiểm tra ở localStorage
    const token = localStorage.getItem("access_token");
    if (token) {
      checkUserSession();
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [checkUserSession, setSession]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        setSession,
        checkUserSession,
        updateUser: (newUser: User) => setUser(newUser),
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

