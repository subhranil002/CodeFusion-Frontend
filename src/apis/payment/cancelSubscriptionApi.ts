import toast from "react-hot-toast";

import axiosInstance from "../../configs/AxiosConfig";

export default async function cancelSubscriptionApi() {
    const res = axiosInstance.get("/payments/cancel");
    toast.promise(res, {
        loading: "Cancelling subscription...",
        success: (data) => {
            return data?.data?.message;
        },
    });

    return (await res).data;
}
