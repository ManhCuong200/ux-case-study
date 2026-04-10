import type { CreateHotspotDto } from "@/shared/types";
import axiosClient from "./axiosClient";

const hotspotsApi = {
    getByScreenId: (screenId: number) => {
        return axiosClient.get(`/hotspots/screen/${screenId}`);
    },
    create: (data: CreateHotspotDto) => {
        return axiosClient.post("/hotspots", data);
    },
    delete: (id: number) => {
        return axiosClient.delete(`/hotspots/${id}`);
    },
    createBulk: (hotspots: CreateHotspotDto[]) => {
        return axiosClient.post('/hotspots/bulk', hotspots);
    },
    update: (id: number, data: Partial<CreateHotspotDto>) => {
        return axiosClient.patch(`/hotspots/${id}`, data);
    }
};

export default hotspotsApi;
