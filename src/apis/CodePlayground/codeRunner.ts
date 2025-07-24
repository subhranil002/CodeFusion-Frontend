import axiosInstance from "../../configs/AxiosConfig";

export default async function codeRunner(
    code: string,
    langId: number,
    stdIn?: string
) {
    const { data } = await axiosInstance.post("/code/run", {
        code,
        langId,
        stdIn,
    });
    return data;
}
