import toast from "react-hot-toast";

import axiosInstance from "../../configs/AxiosConfig";

export default async function deleteRoom(roomId: string) {
    const res = axiosInstance.delete(`/rooms/delete/${roomId}`);
    toast.promise(res, {
        loading: "Deleting room...",
        success: (data) => {
            return data?.data?.message;
        },
    });

    return (await res).data;
}
