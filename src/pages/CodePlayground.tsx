import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import CodeEditor from "../components/CodePlayground/CodeEditor";
import EditorHeader from "../components/CodePlayground/EditorHeader";
import Sidebar from "../components/CodePlayground/Sidebar";
import Terminal from "../components/CodePlayground/Terminal";
import editorSocket from "../configs/EditorSocketConfig";
import {
    fetchLanguages,
    setUsers,
} from "../redux/slices/RoomSlice";
import type { User } from "../types/types";

function CodePlayground() {
    const [writeLock, setWriteLock] = useState(false);
    const [fontSize, setFontSize] = useState(18);
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const { users } = useSelector((state: any) => state.room);
    const location = useLocation();
    const roomId = location.state?.roomId;

    useEffect(() => {
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

        return () => {
            editorSocket.off("userJoined");
            editorSocket.off("userLeft");
            editorSocket.off("languageUpdate");
        };
    }, []);

    return (
        <Sidebar>
            <div className="min-h-screen bg-base-200">
                {/* Main Content */}
                <div className="drawer-content flex flex-col h-screen">
                    {/* Editor Area */}
                    <div className="flex-1 p-3 md:p-5">
                        <div className="bg-base-100 rounded-xl shadow-lg overflow-hidden flex flex-col h-full md:max-h-[95vh]">
                            {/* Editor Header */}
                            <EditorHeader
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
