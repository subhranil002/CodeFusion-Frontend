import { useEffect, useState } from "react";
import CodeEditor from "../components/CodePlayground/CodeEditor";
import Sidebar from "../components/CodePlayground/Sidebar";
import EditorHeader from "../components/CodePlayground/EditorHeader";
import editorSocket from "../configs/EditorSocketConfig";
import {
    setUsers,
    setLanguage,
    fetchLanguages,
} from "../redux/slices/EditorSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { Language, User } from "../types/types";
import Terminal from "../components/CodePlayground/Terminal";

function CodePlayground() {
    const [writeLock, setWriteLock] = useState(false);
    const [fontSize, setFontSize] = useState(18);
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const { users } = useSelector((state: any) => state.editor);
    const location = useLocation();
    const roomId = location.state?.roomId;

    useEffect(() => {
        if (!roomId || users.length === 0) navigate("/");
        (async () => {
            await dispatch(fetchLanguages());
        })();
    }, [users, roomId, navigate, dispatch]);

    useEffect(() => {
        editorSocket.on(
            "userJoined",
            ({ userName, users }: { userName: string; users: User[] }) => {
                dispatch(setUsers(users));
                toast.success(`${userName} joined the room!`);
            }
        );
        editorSocket.on(
            "userLeft",
            ({ userName, users }: { userName: string; users: User[] }) => {
                dispatch(setUsers(users));
                toast.success(`${userName} left the room!`);
            }
        );
        editorSocket.on("languageUpdate", (newLang: Language) =>
            dispatch(setLanguage(newLang))
        );

        return () => {
            editorSocket.off("userJoined");
            editorSocket.off("userLeft");
            editorSocket.off("languageUpdate");
        };
    }, []);

    const onLanguageChange = (newLang: Language) => {
        dispatch(setLanguage(newLang));
        editorSocket.emit("languageChange", { language: newLang });
    };

    return (
        <Sidebar roomId={roomId}>
            <div className="min-h-screen bg-base-200">
                {/* Main Content */}
                <div className="drawer-content flex flex-col h-screen">
                    {/* Editor Area */}
                    <div className="flex-1 p-3 md:p-5">
                        <div className="bg-base-100 rounded-xl shadow-lg overflow-hidden flex flex-col h-full md:max-h-[95vh]">
                            {/* Editor Header */}
                            <EditorHeader
                                setLanguage={onLanguageChange}
                                writeLock={writeLock}
                                setWriteLock={setWriteLock}
                                fontSize={fontSize}
                                setFontSize={setFontSize}
                            />
                            {/* Editor Body */}
                            <div className="flex-1">
                                <CodeEditor
                                    options={{
                                        fontSize: fontSize,
                                        readOnly: writeLock,
                                    }}
                                />
                            </div>
                            <Terminal />
                        </div>
                    </div>
                </div>
            </div>
        </Sidebar>
    );
}

export default CodePlayground;
