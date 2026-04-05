import axiosClient from "./axiosClient";
import type { App, CreateAppDto } from "@/shared/types";

const appsApi = {
    getAll: () => {
        return axiosClient.get<App[]>('/apps');
    },
    getOne: (id: number) => {
        return axiosClient.get<App>(`/apps/${id}`);
    },
    create: (data: CreateAppDto) => {
        return axiosClient.post<App>('/apps', data);
    }
}

export default appsApi;
