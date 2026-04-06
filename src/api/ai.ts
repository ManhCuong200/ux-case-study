import axiosClient from "./axiosClient";

const aiApi = {
    analyzeScreen: (screenId: number) => {
        return axiosClient.get(`/ai/analyze/${screenId}`);
    }
};

export default aiApi;
