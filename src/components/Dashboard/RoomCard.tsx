import { useState } from "react";
import toast from "react-hot-toast";
import {
    FaCalendar,
    FaCheck,
    FaClock,
    FaCode,
    FaEdit,
    FaGlobe,
    FaLink,
    FaLock,
    FaTimes,
    FaTrash,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    fetchRooms,
    type RoomCardData,
} from "../../redux/slices/DashboardSlice";
import { deleteRoomById, updateRoomData } from "../../redux/slices/RoomSlice";

function RoomCard({ room }: { room: RoomCardData }) {
    const { data: userData } = useSelector((state: any) => state.auth);
    const navigate = useNavigate();
    const isOwner = Boolean(room.owner === userData?._id);
    const dispatch: any = useDispatch();

    const [copied, setCopied] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [roomName, setRoomName] = useState(room.roomName);
    const [anyoneCanEdit, setAnyoneCanEdit] = useState(room.anyoneCanEdit);

    const copyLink = () => {
        const url = `${window.location.origin}/playground/${room.roomId}`;
        navigator.clipboard?.writeText(url);
        toast.success("Link copied to clipboard!");
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    const formatTimeAgo = (dateString?: string): string => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        const diffInSeconds = Math.floor((Date.now() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return "Just now";
        if (diffInSeconds < 3600)
            return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400)
            return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
    };

    const formatDateIST = (dateString?: string): string => {
        if (!dateString) return "N/A";
        try {
            const date = new Date(dateString);
            const options: Intl.DateTimeFormatOptions = {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
                timeZone: "Asia/Kolkata",
            };
            return (
                new Intl.DateTimeFormat("en-IN", options).format(date) + " IST"
            );
        } catch {
            return "N/A";
        }
    };

    const handleEditRoom = async () => {
        await dispatch(
            updateRoomData({
                roomId: room.roomId,
                roomName,
                anyoneCanEdit,
            })
        );
        setEditModalOpen(false);
        dispatch(fetchRooms());
    };

    const deleteRoom = async () => {
        if (window.confirm("Are you sure you want to delete this room?")) {
            await dispatch(deleteRoomById({ roomId: room.roomId }));
            dispatch(fetchRooms());
        }
    };

    return (
        <div className="relative">
            {/* Edit Room Modal */}
            <div className={`modal ${editModalOpen ? "modal-open" : ""}`}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">
                        Edit Room Settings
                    </h3>

                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text">Room Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter room name"
                            className="input input-bordered w-full"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                        />
                    </div>

                    <div className="form-control mb-6">
                        <label className="label cursor-pointer justify-start">
                            <input
                                type="checkbox"
                                checked={anyoneCanEdit}
                                onChange={(e) =>
                                    setAnyoneCanEdit(e.target.checked)
                                }
                                className="checkbox checkbox-primary mr-3"
                            />
                            <span className="label-text">Anyone can edit</span>
                        </label>
                    </div>

                    <div className="modal-action">
                        <button
                            className="btn btn-ghost"
                            onClick={() => setEditModalOpen(false)}
                        >
                            <FaTimes className="w-4 h-4 mr-1" /> Cancel
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleEditRoom}
                        >
                            <FaCheck className="w-4 h-4 mr-1" /> Save Changes
                        </button>
                    </div>
                </div>
            </div>

            <div className="card bg-base-100 border border-base-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5">
                <div className="card-body p-5">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <h3 className="text-xl font-bold text-base-content truncate">
                                    {room.roomName}
                                </h3>
                                <span className="badge badge-outline text-xs py-1.5 px-2">
                                    {room.roomId}
                                </span>
                            </div>

                            <div className="flex gap-2">
                                <span className="badge badge-primary gap-1.5">
                                    <FaCode className="w-3 h-3" />
                                    {(
                                        room.language.name || "Unknown"
                                    ).toUpperCase()}
                                </span>

                                <span
                                    className={`badge gap-1.5 ${
                                        room.anyoneCanEdit
                                            ? "badge-success"
                                            : "badge-warning"
                                    }`}
                                >
                                    {room.anyoneCanEdit ? (
                                        <>
                                            <FaGlobe className="w-3 h-3" />
                                            Public
                                        </>
                                    ) : (
                                        <>
                                            <FaLock className="w-3 h-3" />
                                            Private
                                        </>
                                    )}
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-1 self-end sm:self-auto">
                            <button
                                className={`btn btn-ghost btn-square btn-sm transition-all duration-300 ${
                                    copied
                                        ? "btn-success text-success-content"
                                        : "text-info hover:bg-info/20"
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

                            {isOwner && (
                                <>
                                    <button
                                        className="btn btn-ghost btn-square btn-sm text-warning hover:bg-warning/20"
                                        title="Edit room"
                                        onClick={() => setEditModalOpen(true)}
                                    >
                                        <FaEdit className="w-4 h-4" />
                                    </button>
                                    <button
                                        className="btn btn-ghost btn-square btn-sm text-error hover:bg-error/20"
                                        title="Delete room"
                                        onClick={deleteRoom}
                                    >
                                        <FaTrash className="w-4 h-4" />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="space-y-3 text-sm text-base-content/70 mb-5">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 flex-1">
                                <FaClock className="w-4 h-4 text-primary" />
                                <span
                                    title={formatDateIST(room.updatedAt)}
                                    className="truncate"
                                >
                                    Last active {formatTimeAgo(room.updatedAt)}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 flex-1">
                                <FaCalendar className="w-4 h-4 text-secondary" />
                                <span className="truncate">
                                    Created {formatDateIST(room.createdAt)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Join Button */}
                    <button
                        className="btn btn-primary w-full mt-auto group"
                        onClick={() => navigate(`/playground/${room.roomId}`)}
                    >
                        <FaCode className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                        Join Room
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RoomCard;
