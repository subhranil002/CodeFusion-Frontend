import toast from "react-hot-toast";

import axiosInstance from "../../configs/AxiosConfig";

export default async function codeRunner(
    code: string,
    langId: number,
    stdIn?: string
) {
    const res = axiosInstance.post("/rooms/run", {
        code,
        langId,
        stdIn,
    });
    toast.promise(res, {
        loading: "Running code...",
        success: (data) => {
            return data?.data?.message;
        },
        error: "Failed to run code!",
    });

    return (await res).data;
}
