import toast from "react-hot-toast";

import axiosInstance from "../../configs/AxiosConfig";

export default async function updateUser(fullName?: string, email?: string) {
    const res = axiosInstance.put("/users/update", {
        fullName,
        email,
    });
    toast.promise(res, {
        loading: "Updating profile...",
        success: (data) => {
            return data?.data?.message;
        },
    });

    return (await res).data;
}
