import axiosClient from "./axiosClient";
import type { Hotspot, CreateHotspotDto } from "@/shared/types";

const hotspotsApi = {
    create: (data: CreateHotspotDto) => {
        return axiosClient.post<Hotspot>('/hotspots', data);
    },
    getByScreen: (screenId: number) => {
        return axiosClient.get<Hotspot[]>(`/hotspots/screen/${screenId}`);
    },
    remove: (id: number) => {
        return axiosClient.delete(`/hotspots/${id}`);
    }
}

export default hotspotsApi;
