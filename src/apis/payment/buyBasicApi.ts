import axiosInstance from "../../configs/AxiosConfig";

export default async function buyBasicApi() {
    const res = await axiosInstance.get("/payments/buy/basic");
    return res.data;
}
