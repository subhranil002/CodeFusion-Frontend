import toast from "react-hot-toast";

import axiosInstance from "../../configs/AxiosConfig";

export default async function getPaymentHistoryApi() {
    const res = axiosInstance.get("/payments/history");

    toast.promise(res, {
        loading: "Getting payment history...",
        success: (data) => {
            return data?.data?.message;
        },
    });

    return (await res).data;
}
