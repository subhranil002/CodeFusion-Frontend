import toast from "react-hot-toast";

import axiosInstance from "../../configs/AxiosConfig";
import changeAvatar from "./changeAvatar";
import getCurrentUser from "./getCurrentUser";

export default async function signUp(
    avatar: any,
    fullName: string,
    email: string,
    password: string
) {
    const accountRes: any = axiosInstance.post("/users/register", {
        fullName,
        email,
        password,
    });
    toast.promise(accountRes, {
        loading: "Signing up...",
    });
    await accountRes;
    
    const formData = new FormData();
    formData.append("avatar", avatar);
    await changeAvatar(formData);

    const res = getCurrentUser();
    toast.promise(res, {
        loading: "Fetching user profile...",
        success: "User registered successfully!",
    });

    return (await res).data;
}
