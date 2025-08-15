import toast from "react-hot-toast";

import axiosInstance from "../../configs/AxiosConfig";

export default async function logoutUser() {
    const res = axiosInstance.get("/users/logout");
    toast.promise(res, {
        loading: "Logging out...",
        success: (data) => {
            return data?.data?.message;
        },
    });

    return (await res).data;
}
