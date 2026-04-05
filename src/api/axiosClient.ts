import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers: { 'Content-Type': 'application/json' },
});

// Interceptor cho Request: Tự động đính Token vào mọi cuộc gọi
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor cho Response: Xử lý Tự động Refresh Token
axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refresh_token');
                const res = await axios.post('http://localhost:3000/auth/refresh', { refreshToken });

                localStorage.setItem('access_token', res.data.accessToken);
                // Thử lại request cũ với token mới
                return axiosClient(originalRequest);
            } catch (refreshError) {
                // Nếu refresh token cũng hết hạn -> Đá ra màn hình Login
                localStorage.clear();
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosClient;