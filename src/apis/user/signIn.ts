import toast from "react-hot-toast";

import axiosInstance from "../../configs/AxiosConfig";

export default async function signIn(email: string, password: string) {
    const res = axiosInstance.post("/users/login", {
        email,
        password,
    });
    toast.promise(res, {
        loading: "Logging in...",
        success: (data) => {
            return data?.data?.message;
        },
    });

    return (await res).data;
}
