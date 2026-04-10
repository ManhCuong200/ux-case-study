import type { Screen } from "@/shared/types";
import axiosClient from "./axiosClient";

const screensApi = {
    getByAppId: (appId: number) => {
        return axiosClient.get(`/screens/app/${appId}`);
    },
    upload: (formData: FormData) => {
        return axiosClient.post("/screens/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    getById: (id: number) => {
        return axiosClient.get(`/screens/${id}`);
    },
    update: (id: number, data: Partial<Screen>) => {
        return axiosClient.patch(`/screens/${id}`, data);
    },
    delete: (id: number) => {
        return axiosClient.delete(`/screens/${id}`);
    }
};

export default screensApi;
