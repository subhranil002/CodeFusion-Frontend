import toast from "react-hot-toast";

import axiosInstance from "../../configs/AxiosConfig";

export default async function verifySubscriptionApi(
    razorpay_payment_id: string,
    razorpay_signature: number,
    amount: number,
    plan: string
) {
    const res = axiosInstance.post("/payments/verify", {
        razorpay_payment_id,
        razorpay_signature,
        amount,
        plan,
    });
    toast.promise(res, {
        loading: "Verifying subscription...",
        success: (data) => {
            return data?.data?.message;
        },
    });

    return (await res).data;
}
