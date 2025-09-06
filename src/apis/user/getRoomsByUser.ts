import toast from "react-hot-toast";

import axiosInstance from "../../configs/AxiosConfig";

export default async function getRoomsByUser() {
    const res = axiosInstance.get("/users/rooms");
    toast.promise(res, {
        loading: "Getting rooms...",
        success: (data) => {
            return data?.data?.message;
        },
    });

    return (await res).data;
}
