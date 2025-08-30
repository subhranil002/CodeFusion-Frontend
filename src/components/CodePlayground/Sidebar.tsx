import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCode, FaCopy, FaSignOutAlt, FaTimes, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import editorSocket from "../../configs/EditorSocketConfig";
import { resetRoomState, setUsers } from "../../redux/slices/RoomSlice";
import type { User } from "../../types/types";

function Sidebar({ children }: any) {
    const [copySuccess, setCopySuccess] = useState<string>("");
    const { users, roomId, owner } = useSelector((state: any) => state.room);
    const { data: userData } = useSelector((state: any) => state.auth);
    const navigate = useNavigate();
    const dispatch: any = useDispatch();

    const copyToClipboard = () => {
        if (!roomId) return;
        navigator.clipboard.writeText(roomId);
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 2000);
    };

    function leaveRoom() {
        editorSocket.emit("leaveRoom");
        dispatch(resetRoomState());
        navigate("/dashboard");
    }

    function kickUser(userId: string) {
        editorSocket.emit("kickCall", userId);
    }

    useEffect(() => {
        editorSocket.on(
            "userJoined",
            ({ userName, users }: { userName: string; users: User[] }) => {
                dispatch(setUsers(users));
                toast.success(`${userName} joined the room!`);
            }
        );
        editorSocket.on("updateUsers", ({ users }: { users: User[] }) => {
            dispatch(setUsers(users));
            console.log(users);
        });
        editorSocket.on(
            "userLeft",
            ({ userName, users }: { userName: string; users: User[] }) => {
                dispatch(setUsers(users));
                toast.success(`${userName} left the room!`);
            }
        );
        editorSocket.on("kickCall", (userId: { userId: string }) => {
            editorSocket.emit("kickAction", userId);
        });

        return () => {
            editorSocket.off("userJoined");
            editorSocket.off("updateUsers");
            editorSocket.off("userLeft");
            editorSocket.off("kickCall");
        };
    }, []);

    return (
        <div className="drawer md:drawer-open">
            <input id="code-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <label
                    htmlFor="code-drawer"
                    className="btn btn-circle btn-primary shadow-lg drawer-button md:hidden fixed bottom-6 right-6 z-10"
                    aria-label="Toggle sidebar"
                >
                    <FaCode className="text-xl" />
                </label>
                {children}
            </div>
            <div className="drawer-side bg-base-100 h-screen w-80 p-5 flex flex-col shadow-xl">
                <label
                    htmlFor="code-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                {/* Room Info */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-3 gap-10">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <span className="badge badge-primary">Room</span>
                            <span>ID: {roomId}</span>
                        </h2>

                        <button
                            onClick={copyToClipboard}
                            className={`btn btn-sm ${
                                copySuccess ? "btn-success" : "btn-outline"
                            }`}
                        >
                            {copySuccess ? (
                                <span>{copySuccess}</span>
                            ) : (
                                <span className="flex items-center gap-1">
                                    <FaCopy /> Copy
                                </span>
                            )}
                        </button>
                    </div>

                    <div className="divider my-2"></div>
                </div>

                {/* Users Section */}
                <div className="mb-6 w-full">
                    <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
                        <FaUser className="text-primary" />
                        <span>Active Users ({users.length})</span>
                    </h3>

                    <div className="space-y-2">
                        <div className="card bg-base-200 border border-base-300 shadow-sm overflow-visible">
                            <div className="card-body p-2">
                                <ul className="space-y-2 pt-2">
                                    {users.slice(0, 5).map((user: User) => (
                                        <li key={user.id} className="p-0">
                                            <button
                                                type="button"
                                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-base-100 hover:outline-none hover:ring-2 hover:ring-primary"
                                            >
                                                <div className="avatar">
                                                    <div className="w-10 rounded-full ring ring-offset-2 ring-primary/20 overflow-hidden">
                                                        <img
                                                            src={user.avatar}
                                                            alt={`${user.name} avatar`}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="min-w-0 grow text-left">
                                                    <div className="flex items-center gap-2">
                                                        <span className="truncate font-medium text-sm">
                                                            {user.name}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* typing indicator */}
                                                {user.isTyping && (
                                                    <div className="ml-2 flex items-center gap-2">
                                                        <span className="loading loading-dots loading-sm" />
                                                        <span className="text-sm text-info">
                                                            typing
                                                        </span>
                                                    </div>
                                                )}

                                                {owner === userData?._id &&
                                                    userData?._id !==
                                                        user?.id && (
                                                        <button
                                                            className="btn btn-error btn-xs"
                                                            onClick={() =>
                                                                kickUser(
                                                                    user.id
                                                                )
                                                            }
                                                        >
                                                            <FaTimes />
                                                        </button>
                                                    )}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Leave Button */}
                <button
                    className="btn btn-error w-[85%] gap-2 absolute bottom-5"
                    onClick={() => leaveRoom()}
                >
                    <FaSignOutAlt />
                    Leave Room
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
