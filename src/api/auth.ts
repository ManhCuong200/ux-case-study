import type { LoginData, LoginResponse, RegisterData } from "@/shared/types";
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
    }
}

export default authApi;
