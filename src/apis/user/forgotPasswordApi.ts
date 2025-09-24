import toast from "react-hot-toast";

import axiosInstance from "../../configs/AxiosConfig";

export default async function forgotPasswordApi(data: any) {
    const res = axiosInstance.post("/users/forgot-password", data);
    toast.promise(res, {
        loading: "Sending reset password email...",
        success: (data) => {
            return data?.data?.message;
        },
    });

    return (await res).data;
}
