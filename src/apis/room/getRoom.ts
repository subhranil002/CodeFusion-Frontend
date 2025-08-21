import toast from "react-hot-toast";

import axiosInstance from "../../configs/AxiosConfig";

export default async function getRoom(
    roomId: string,
) {
    const res = axiosInstance.get(`/rooms/get/${roomId}`);
    toast.promise(res, {
        loading: "Getting room...",
        success: (data) => {
            return data?.data?.message;
        },
        error: "Failed to get room!",
    });

    return (await res).data;
}
