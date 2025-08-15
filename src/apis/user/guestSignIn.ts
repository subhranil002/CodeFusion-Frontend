import toast from "react-hot-toast";

import axiosInstance from "../../configs/AxiosConfig";

export default async function guestSignIn() {
    const res = axiosInstance.get("/users/guest-login");
    toast.promise(res, {
        loading: "Logging in...",
        success: (data) => {
            return data?.data?.message;
        },
    });

    return (await res).data;
}
