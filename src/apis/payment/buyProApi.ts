import axiosInstance from "../../configs/AxiosConfig";

export default async function buyProApi() {
    const res = await axiosInstance.get("/payments/buy/pro");
    return res.data;
}
