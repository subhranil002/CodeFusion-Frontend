import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import CodeEditor from "../components/CodePlayground/CodeEditor";
import EditorHeader from "../components/CodePlayground/EditorHeader";
import Sidebar from "../components/CodePlayground/Sidebar";
import Terminal from "../components/CodePlayground/Terminal";
import editorSocket from "../configs/EditorSocketConfig";
import { joinRoomById, resetRoomState } from "../redux/slices/RoomSlice";

function CodePlayground() {
    const [fontSize, setFontSize] = useState(18);
    const { roomId } = useParams();
    const dispatch: any = useDispatch();
    const navigate = useNavigate();
    const { data: user } = useSelector((state: any) => state.auth);
    const { owner, anyoneCanEdit } = useSelector((state: any) => state.room);

    useEffect(() => {
        if (!roomId) {
            navigate("/dashboard");
        } else {
            editorSocket.emit("verifyUniqueUser", {
                roomId: roomId,
                userId: user?._id,
            });

            editorSocket.on("uniqueUser", async (unique: boolean) => {
                if (unique) {
                    const res = await dispatch(joinRoomById({ roomId }));
                    if (!res?.payload?.success) {
                        navigate("/dashboard");
                    }
                    editorSocket.emit("join", {
                        roomId: roomId,
                        userId: user?._id,
                        userName: user?.fullName.split(" ")[0],
                        avatar: user?.avatar?.secure_url,
                    });
                } else {
                    toast.error("You are already in this room!");
                    navigate("/dashboard");
                }
            });
        }

        editorSocket.on("IAMKICKED", () => {
            dispatch(resetRoomState());
            navigate("/dashboard");
            toast.error("You’ve been kicked out from the room!");
        });

        return () => {
            editorSocket.off("uniqueUser");
            editorSocket.off("IAMKICKED");
        };
    }, []);

    const writeLock = () => {
        if (user?._id === owner) {
            return false;
        }

        return !anyoneCanEdit;
    };

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
                                writeLock={writeLock()}
                                fontSize={fontSize}
                                setFontSize={setFontSize}
                            />
                            {/* Editor Body */}
                            <div className="flex-1">
                                <CodeEditor
                                    options={{
                                        readOnly: writeLock(),
                                        fontSize: fontSize,
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
