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
    update: (id: number, data: any) => {
        return axiosClient.patch(`/apps/${id}`, data);
    },
    delete: (id: number) => {
        return axiosClient.delete(`/apps/${id}`);
    }
};

export default appsApi;
