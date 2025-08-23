import toast from "react-hot-toast";

import axiosInstance from "../../configs/AxiosConfig";

export default async function joinRoom(roomId: string) {
    const res = axiosInstance.get(`/rooms/join/${roomId}`);
    toast.promise(res, {
        loading: "Joining room...",
        success: (data) => {
            return data?.data?.message;
        },
        error: "Failed to join room!",
    });

    return (await res).data;
}
