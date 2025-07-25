import toast from "react-hot-toast";
import axiosInstance from "../../configs/AxiosConfig";

export default async function codeRunner(
    code: string,
    langId: number,
    stdIn?: string
) {
    const res = axiosInstance.post("/code/run", {
        code,
        langId,
        stdIn,
    });
    toast.promise(res, {
        loading: "Running code...",
        success: "Code executed successfully!",
        error: "Failed to run code!",
    });

    return (await res).data;
}
