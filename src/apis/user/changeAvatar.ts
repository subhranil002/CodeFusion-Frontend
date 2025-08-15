import toast from "react-hot-toast";

import axiosInstance from "../../configs/AxiosConfig";

export default async function changeAvatar(avatar: any) {
    const res = axiosInstance.post("/users/avatar", avatar);
    toast.promise(res, {
        loading: "Uploading avatar...",
        success: (data) => {
            return data?.data?.message;
        },
    });

    return (await res).data;
}
