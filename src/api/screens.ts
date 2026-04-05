import axiosClient from "./axiosClient";
import type { Screen, UploadScreenDto } from "@/shared/types";

const screensApi = {
    upload: (data: UploadScreenDto) => {
        const formData = new FormData();
        formData.append('file', data.file);
        formData.append('name', data.name);
        formData.append('appId', data.appId.toString());
        
        return axiosClient.post<Screen>('/screens/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    getByApp: (appId: number) => {
        return axiosClient.get<Screen[]>(`/screens/app/${appId}`);
    }
}

export default screensApi;
