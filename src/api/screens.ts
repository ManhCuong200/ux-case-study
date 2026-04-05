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
    }
};

export default screensApi;
