import type { LoginData, LoginResponse, RegisterData, ResetPasswordData } from "@/shared/types";
import axiosClient from "./axiosClient";

const authApi = {
    register: (data: RegisterData) => {
        return axiosClient.post('/auth/register', data);
    },
    login: (data: LoginData) => {
        return axiosClient.post<LoginResponse>('/auth/login', data);
    },
    refresh: (refreshToken: string) => {
        return axiosClient.post<Pick<LoginResponse, 'accessToken'>>('/auth/refresh', { refreshToken });
    },
    getMe: () => {
        return axiosClient.get('/auth/me');
    },
    forgotPassword: (email: string) => {
        return axiosClient.post('/auth/forgot-password', { email });
    },
    resetPassword: (data: ResetPasswordData) => {
        return axiosClient.post('/auth/reset-password', data);
    }
}

export default authApi;
