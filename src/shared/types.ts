export interface User {
    id: number;
    email: string;
    fullName: string;
    // Thêm các fields khác nếu backend có trả về
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface RegisterData {
    email: string;
    password?: string;
    fullName: string;
}

export interface LoginData {
    email: string;
    password?: string;
}
