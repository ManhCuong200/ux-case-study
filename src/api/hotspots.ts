import axiosClient from "./axiosClient";

const hotspotsApi = {
    getByScreenId: (screenId: number) => {
        return axiosClient.get(`/hotspots/screen/${screenId}`);
    },
    create: (data: any) => {
        return axiosClient.post("/hotspots", data);
    },
    delete: (id: number) => {
        return axiosClient.delete(`/hotspots/${id}`);
    }
};

export default hotspotsApi;
