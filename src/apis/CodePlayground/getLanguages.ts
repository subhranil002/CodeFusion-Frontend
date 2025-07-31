import axiosInstance from "../../configs/AxiosConfig";

export default async function getLanguages() {
    const { data } = await axiosInstance.get("/editor/languages");
    return data;
}