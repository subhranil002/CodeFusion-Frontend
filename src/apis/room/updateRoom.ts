import toast from "react-hot-toast";

import axiosInstance from "../../configs/AxiosConfig";

export default async function updateRoom(
    roomId: string,
    roomName?: string,
    code?: string,
    anyoneCanEdit?: boolean
) {
    const res = axiosInstance.put(`/rooms/update/${roomId}`, {
        roomName,
        code,
        anyoneCanEdit,
    });
    toast.promise(res, {
        loading: "Updating room...",
        success: (data) => {
            return data?.data?.message;
        },
        error: "Failed to update room!",
    });

    return (await res).data;
}
