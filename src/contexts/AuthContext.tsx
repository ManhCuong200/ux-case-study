import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import authApi from "@/api/auth";
import type { User, LoginData, RegisterData } from "@/shared/types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Khôi phục user từ token (nếu có) khi load trang
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      // Ở đây ta có thể gọi API để lấy thông tin user hiện tại (/auth/profile)
      // Tạm thời set user bằng một object rỗng để đánh dấu đã login
      setUser({} as User); 
    }
    setLoading(false);
  }, []);

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

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
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
