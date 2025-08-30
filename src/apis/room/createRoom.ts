import toast from "react-hot-toast";

import axiosInstance from "../../configs/AxiosConfig";

export default async function createRoom(
    roomName: string,
    languageId: number,
    languageName: string
) {
    const res = axiosInstance.post("/rooms/create", {
        roomName,
        languageId,
        languageName,
    });
    toast.promise(res, {
        loading: "Creating room...",
        success: (data) => {
            return data?.data?.message;
        },
    });

    return (await res).data;
}
