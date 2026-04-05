export interface User {
    id: number;
    email: string;
    fullName: string;
    avatar?: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user?: User;
}

export interface RegisterData {
    email: string;
    password: string;
    fullName: string;
}

export interface LoginData {
    email: string;
    password: string;
}

// App Types
export interface App {
    id: number;
    name: string;
    logo_url?: string;
    description?: string;
    screens?: Screen[];
}

export interface CreateAppDto {
    name: string;
    logo_url?: string;
    description: string;
}

// Screen Types
export interface Screen {
    id: number;
    name: string;
    image_url: string;
    appId?: number;
    hotspots?: Hotspot[];
}

export interface UploadScreenDto {
    file: File;
    name: string;
    appId: number;
}

// Hotspot Types
export interface Hotspot {
    id: number;
    title: string;
    content: string;
    pos_x: number;
    pos_y: number;
    type: string;
    screenId?: number;
}

export interface CreateHotspotDto {
    title: string;
    content: string;
    pos_x: number;
    pos_y: number;
    type: string;
    screenId: number;
}

