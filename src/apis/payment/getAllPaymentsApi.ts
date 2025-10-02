import toast from "react-hot-toast";

import axiosInstance from "../../configs/AxiosConfig";

export default async function getAllPaymentsApi(start: number, limit: number) {
    const res = axiosInstance.post("/payments/all", {
        start,
        limit,
    });
    toast.promise(res, {
        loading: "Getting payments...",
        success: (data) => {
            return data?.data?.message;
        },
    });

    return (await res).data;
}
