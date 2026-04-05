import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
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
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    }
  }, []);

  const checkUserSession = async () => {
    try {
      const res = await authApi.getMe();
      setUser(res.data);
    } catch (e) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: any) => {
    const res = await authApi.login(credentials);
    localStorage.setItem("access_token", res.data.accessToken);
    localStorage.setItem("refresh_token", res.data.refreshToken);
    setUser(res.data.user || {} as User);
  };

  const register = async (data: any) => {
    await authApi.register(data);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
  };

  const setSession = async (accessToken: string, refreshToken: string, user?: User) => {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    if (user) {
      setUser(user);
      setLoading(false);
    } else {
      await checkUserSession();
    }
  };

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
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
