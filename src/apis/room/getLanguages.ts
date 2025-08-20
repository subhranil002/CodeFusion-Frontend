import axiosInstance from "../../configs/AxiosConfig";

export default async function getLanguages() {
    const { data } = await axiosInstance.get("/rooms/languages");
    return data;
}