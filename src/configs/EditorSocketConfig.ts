import { io } from "socket.io-client";

const editorSocket = io(`${import.meta.env.VITE_BACKEND_URL!}/editor`);

export default editorSocket;
