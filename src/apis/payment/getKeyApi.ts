import axiosInstance from "../../configs/AxiosConfig";

export default async function getKeyApi() {
    const res = await axiosInstance.get("/payments/apikey");
    return res.data;
}
