import { useState } from "react";
import toast from "react-hot-toast";
import {
    FaCalendar,
    FaCheck,
    FaClock,
    FaCode,
    FaEdit,
    FaExclamationTriangle,
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
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
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
        const res = await dispatch(
            updateRoomData({
                roomId: room.roomId,
                roomName,
                anyoneCanEdit,
            })
        );
        if (res.payload.success) {
            dispatch(fetchRooms());
            toast.success("Room details updated successfully!");
        }
        setEditModalOpen(false);
    };

    const handleDeleteRoom = async () => {
        setIsDeleting(true);
        await dispatch(deleteRoomById({ roomId: room.roomId }));
        dispatch(fetchRooms());
        setIsDeleting(false);
        setDeleteModalOpen(false);
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
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label cursor-pointer justify-start p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={anyoneCanEdit}
                                    onChange={(e) =>
                                        setAnyoneCanEdit(e.target.checked)
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

            {/* Delete Confirmation Modal */}
            <div className={`modal ${deleteModalOpen ? "modal-open" : ""}`}>
                <div className="modal-box bg-base-100 shadow-2xl max-w-md">
                    <div className="flex flex-col items-center text-center">
                        <div className="p-3 bg-error/10 rounded-full mb-4">
                            <FaExclamationTriangle className="w-8 h-8 text-error" />
                        </div>

                        <h3 className="text-2xl font-bold text-base-content mb-2">
                            Delete Room?
                        </h3>

                        <p className="text-base-content/70 mb-6">
                            Are you sure you want to delete{" "}
                            <strong>"{room.roomName}"</strong>? This action
                            cannot be undone and all room data will be lost.
                        </p>
                    </div>

                    <div className="modal-action flex gap-3">
                        <button
                            className="btn btn-outline sm:btn-lg"
                            onClick={() => setDeleteModalOpen(false)}
                            disabled={isDeleting}
                        >
                            <FaTimes className="w-4 h-4 mr-2" />
                            Cancel
                        </button>
                        <button
                            className="btn btn-error sm:btn-lg"
                            onClick={handleDeleteRoom}
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <FaTrash className="w-4 h-4" />
                                    Delete Room
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Room Card */}
            <div className="card bg-base-100 shadow-lg hover:shadow-2xl border border-base-300/50 transition-all duration-300 hover:-translate-y-2 group">
                <div className="card-body p-6">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <FaCode className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-xl font-bold text-base-content truncate group-hover:text-primary transition-colors">
                                        {room.roomName}
                                    </h3>
                                    <p className="text-sm text-base-content/60 font-mono truncate">
                                        ID: {room.roomId}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <div className="badge badge-primary badge-lg gap-2 py-3 px-3">
                                    <FaCode className="w-3 h-3" />
                                    {(
                                        room.language.name || "Unknown"
                                    ).toUpperCase()}
                                </div>

                                <div
                                    className={`badge badge-lg gap-2 py-3 px-3 ${
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
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 self-auto">
                            <button
                                className={`btn btn-circle btn-sm transition-all duration-300 ${
                                    copied
                                        ? "btn-success"
                                        : "btn-ghost hover:bg-info/20 text-info"
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
                                <button
                                    className="btn btn-circle btn-sm btn-ghost hover:bg-warning/20 text-warning"
                                    title="Edit room"
                                    onClick={() => setEditModalOpen(true)}
                                >
                                    <FaEdit className="w-4 h-4" />
                                </button>
                            )}

                            <button
                                className="btn btn-circle btn-sm btn-ghost hover:bg-error/20 text-error"
                                title="Delete room"
                                onClick={() => setDeleteModalOpen(true)}
                            >
                                <FaTrash className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                            <FaClock className="w-4 h-4 text-primary flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-base-content">
                                    Last active
                                </p>
                                <p
                                    className="text-sm text-base-content/70 truncate"
                                    title={formatDateIST(room.updatedAt)}
                                >
                                    {formatTimeAgo(room.updatedAt)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                            <FaCalendar className="w-4 h-4 text-secondary flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-base-content">
                                    Created
                                </p>
                                <p className="text-sm text-base-content/70 truncate">
                                    {formatDateIST(room.createdAt)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Join Button */}
                    <div className="card-actions">
                        <button
                            className="btn btn-primary w-full gap-2 group/btn hover:scale-105 transition-transform duration-300"
                            onClick={() =>
                                navigate(`/playground/${room.roomId}`)
                            }
                        >
                            <FaCode className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                            Join Room
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RoomCard;
