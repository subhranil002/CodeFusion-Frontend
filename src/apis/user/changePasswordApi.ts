import toast from "react-hot-toast";

import axiosInstance from "../../configs/AxiosConfig";

export default async function changePasswordApi(data: any) {
    const res = axiosInstance.post("/users/change-password", data);
    toast.promise(res, {
        loading: "Changing password...",
        success: (data) => {
            return data?.data?.message;
        },
    });

    return (await res).data;
}
