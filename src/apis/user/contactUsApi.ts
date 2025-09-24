import toast from "react-hot-toast";

import axiosInstance from "../../configs/AxiosConfig";

export default async function contactUsApi(data: any) {
    const res = axiosInstance.post("/users/contact", data);
    toast.promise(res, {
        loading: "Sending message...",
        success: (data) => {
            return data?.data?.message;
        },
    });

    return (await res).data;
}
