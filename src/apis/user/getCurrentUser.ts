import axiosInstance from "../../configs/AxiosConfig";

export default async function getCurrentUser() {
    return (await axiosInstance.get("/users/profile")).data;
}
