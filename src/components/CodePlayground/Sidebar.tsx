import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    FaCheck,
    FaCode,
    FaLink,
    FaSignOutAlt,
    FaTimes,
    FaUser,
} from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import editorSocket from "../../configs/EditorSocketConfig";
import {
    resetRoomState,
    setUsers,
    updateRoomData,
} from "../../redux/slices/RoomSlice";
import type { User } from "../../types/types";

function Sidebar({ children }: any) {
    const [copied, setCopied] = useState(false);
    const { users, roomId, owner, roomName, anyoneCanEdit } = useSelector(
        (state: any) => state.room
    );
    const { data: userData } = useSelector((state: any) => state.auth);
    const navigate = useNavigate();
    const dispatch: any = useDispatch();
    const [editModalOpen, setEditModalOpen] = useState(false);
    const isOwner = Boolean(owner === userData?._id);
    const [newRoomName, setNewRoomName] = useState(roomName);
    const [canEdit, setCanEdit] = useState(anyoneCanEdit);

    const copyLink = () => {
        const url = `${window.location.origin}/playground/${roomId}`;
        navigator.clipboard?.writeText(url);
        toast.success("Link copied to clipboard!");
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
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

    function modifyCloudinaryURL(url: string) {
        if (url === "" || url === null) return "";
        if (import.meta.env.VITE_IMAGE_TRANSFORMATION === "true") {
            return url.replace(
                "/upload/",
                "/upload/ar_1:1,c_auto,g_auto,w_500/r_max/"
            );
        }
        return url;
    }

    useEffect(() => {
        setNewRoomName(roomName);
        setCanEdit(anyoneCanEdit);
    }, [roomName, anyoneCanEdit]);

    const handleEditRoom = async () => {
        const res = await dispatch(
            updateRoomData({
                roomId,
                roomName: newRoomName,
                anyoneCanEdit: canEdit,
            })
        );
        if (res.payload.success) {
            editorSocket.emit("roomUpdateTrigger");
            toast.success("Room details updated successfully!");
        }
        setEditModalOpen(false);
    };

    return (
        <>
            {/* Edit Room Modal */}
            <div className={`modal ${editModalOpen ? "modal-open" : ""}`}>
                <div className="modal-box bg-base-100 shadow-2xl">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-base-content">
                            Edit Room Settings
                        </h3>
                        <button
                            onClick={() => setEditModalOpen(false)}
                            className="btn btn-ghost btn-circle btn-sm"
                        >
                            <FaTimes className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div className="form-control flex flex-col">
                            <label className="label mb-2">
                                <span className="label-text text-lg font-semibold">
                                    Room Name
                                </span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter room name"
                                className="input input-bordered input-lg bg-base-200 focus:bg-base-100 transition-colors"
                                value={newRoomName}
                                onChange={(e) => setNewRoomName(e.target.value)}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label cursor-pointer justify-start p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={canEdit}
                                    onChange={(e) =>
                                        setCanEdit(e.target.checked)
                                    }
                                    className="checkbox checkbox-primary sm:checkbox-lg mr-4"
                                />
                                <div>
                                    <span className="label-text font-semibold sm:text-lg">
                                        Anyone can edit
                                    </span>
                                    <p className="text-sm text-base-content/70 mt-1 text-wrap">
                                        Allow other users to edit code in this
                                        room
                                    </p>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="modal-action mt-8">
                        <button
                            className="btn btn-outline sm:btn-lg"
                            onClick={() => setEditModalOpen(false)}
                        >
                            <FaTimes className="w-4 h-4 mr-2" />
                            Cancel
                        </button>
                        <button
                            className="btn btn-primary sm:btn-lg"
                            onClick={handleEditRoom}
                        >
                            <FaCheck className="w-4 h-4" />
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
            <div className="drawer md:drawer-open">
                <input
                    id="code-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                />
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
                <div className="drawer-side bg-base-100 h-screen min-w-80 p-5 flex flex-col shadow-xl">
                    <label
                        htmlFor="code-drawer"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    {/* Room Info */}
                    <div className="flex gap-2">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <span className="badge badge-primary badge-lg sm:badge-xl">
                                Room ID: {roomId}
                            </span>
                        </h2>
                        {isOwner && (
                            <button
                                className="btn btn-secondary btn-sm"
                                title="Edit room"
                                onClick={() => setEditModalOpen(true)}
                            >
                                <IoMdSettings className="w-4 h-4" />
                            </button>
                        )}

                        <button
                            className={`btn btn-sm ${
                                copied ? "btn-success" : "btn-info"
                            }`}
                            title={copied ? "Copied!" : "Copy link"}
                            onClick={copyLink}
                            disabled={copied}
                        >
                            {copied ? (
                                <FaCheck className="w-4 h-4" />
                            ) : (
                                <FaLink className="w-4 h-4" />
                            )}
                        </button>
                    </div>

                    <div className="divider my-2 w-full"></div>

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
                                                <div className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-base-100 hover:outline-none hover:ring-2 hover:ring-primary">
                                                    <div className="avatar">
                                                        <div className="w-10 rounded-full ring ring-offset-2 ring-primary/20 overflow-hidden">
                                                            <img
                                                                src={modifyCloudinaryURL(
                                                                    user.avatar || ""
                                                                )}
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

                                                    {isOwner &&
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
                                                </div>
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
        </>
    );
}

export default Sidebar;
