import axiosClient from "./axiosClient";

const usersApi = {
    updateProfile: (data: { fullName?: string }) => {
        return axiosClient.patch("/users/profile", data);
    },
    updateAvatar: (formData: FormData) => {
        return axiosClient.post("/users/avatar", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }
};

export default usersApi;
