import type { CreateAppDto } from "@/shared/types";
import axiosClient from "./axiosClient";

const appsApi = {
    getAll: () => {
        return axiosClient.get("/apps");
    },
    getById: (id: number) => {
        return axiosClient.get(`/apps/${id}`);
    },
    create: (formData: FormData) => {
        return axiosClient.post("/apps", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    update: (id: number, data: Partial<CreateAppDto>) => {
        return axiosClient.patch(`/apps/${id}`, data);
    },
    delete: (id: number) => {
        return axiosClient.delete(`/apps/${id}`);
    }
};

export default appsApi;
