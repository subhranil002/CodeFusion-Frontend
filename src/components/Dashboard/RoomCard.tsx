import React from "react";
import {
    FaCalendar,
    FaClock,
    FaCode,
    FaEdit,
    FaGlobe,
    FaLink,
    FaLock,
    FaTrash,
    FaUser,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/**
 * Room data shape (matches your dummy plus optional fields).
 */
export type RoomCardData = {
    _id?: string;
    roomId: string;
    roomName: string;
    languageName?: string;
    owner: string;
    public: boolean;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
};

const LANGUAGE_COLORS: Record<string, string> = {
    javascript: "bg-yellow-500",
    typescript: "bg-blue-500",
    python: "bg-green-500",
    java: "bg-orange-500",
    cpp: "bg-purple-500",
    csharp: "bg-indigo-500",
    go: "bg-cyan-500",
    rust: "bg-red-500",
    php: "bg-violet-500",
    ruby: "bg-red-600",
};

/** Relative time (timezone independent) */
const formatTimeAgo = (dateString?: string): string => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((Date.now() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
        return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
};

/** Format an ISO date string into IST (Asia/Kolkata) and append "IST" */
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
        return new Intl.DateTimeFormat("en-IN", options).format(date) + " IST";
    } catch {
        return "N/A";
    }
};

type Props = {
    room: RoomCardData;
    /** optional: id of current authenticated user for ownership checks */
    currentUser?: string;
    onEdit?: (room: RoomCardData) => void;
    onDelete?: (room: RoomCardData) => void;
    onJoin?: (room: RoomCardData) => void;
};

const RoomCard: React.FC<Props> = ({ room, onEdit, onDelete }) => {
    const { data: userData } = useSelector((state: any) => state.auth);
    const navigate = useNavigate();
    const languageKey = (room.languageName || "")
        .toLowerCase()
        .replace(/\s+/g, "");
    const languageColor = LANGUAGE_COLORS[languageKey] || "bg-gray-500";

    // Use owner id internally to decide permissions. Do NOT display the id.
    const isOwner = Boolean(room.owner === userData?._id);

    const copyLink = () => {
        const url = `${window.location.origin}/room/${encodeURIComponent(
            room.roomId
        )}`;
        navigator.clipboard?.writeText(url).catch(() => {
            // ignore failures or add toast if desired
        });
    };

    return (
        <div className="card hover:shadow-lg transition-all duration-200 hover:-translate-y-1 bg-base-100 border border-base-300">
            <div className="card-title pb-3">
                <div className="flex items-start justify-between w-full">
                    <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold font-mono text-base-content">
                                {room.roomName}
                            </h3>
                            <span className="text-sm text-base-content/60">
                                · {room.roomId}
                            </span>
                        </div>

                        <div className="flex items-center space-x-2">
                            <div
                                className={`w-3 h-3 rounded-full ${languageColor}`}
                            />
                            <span className="badge badge-secondary text-xs">
                                {(room.languageName || "Unknown").toUpperCase()}
                            </span>

                            <span
                                className={`badge text-xs ml-2 ${
                                    room.public
                                        ? "badge-success"
                                        : "badge-error"
                                }`}
                                title={
                                    room.public
                                        ? "This room is public"
                                        : "This room is private"
                                }
                            >
                                {room.public ? (
                                    <>
                                        <FaGlobe className="w-3 h-3 mr-1" />
                                        Public
                                    </>
                                ) : (
                                    <>
                                        <FaLock className="w-3 h-3 mr-1" />
                                        Private
                                    </>
                                )}
                            </span>

                            {/* Ownership badge: indicates status without exposing owner id */}
                            <span
                                className={`badge text-xs ml-2 ${
                                    isOwner ? "badge-primary" : "badge-ghost"
                                }`}
                                title={
                                    isOwner
                                        ? "You are the owner — read & write"
                                        : "Read-only"
                                }
                            >
                                <FaUser className="w-3 h-3 mr-1" />
                                {isOwner ? "Owner · Read / Write" : "Read-only"}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            className="p-2 hover:bg-base-200 btn btn-ghost btn-sm"
                            title="Copy link"
                            onClick={copyLink}
                        >
                            <FaLink className="w-4 h-4" />
                        </button>

                        {/* edit/delete buttons controlled by owner check (owner id used internally) */}
                        {isOwner && (
                            <>
                                <button
                                    className="p-2 hover:bg-base-200 btn btn-ghost btn-sm"
                                    title="Edit room"
                                    onClick={() => onEdit?.(room)}
                                >
                                    <FaEdit className="w-4 h-4" />
                                </button>
                                <button
                                    className="p-2 hover:bg-base-200 btn btn-ghost btn-sm"
                                    title="Delete room"
                                    onClick={() => onDelete?.(room)}
                                >
                                    <FaTrash className="w-4 h-4" />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="card-body py-3">
                <div className="space-y-3 text-sm text-base-content/70">
                    {/* Last active: relative + IST exact time in tooltip */}
                    <div className="flex items-center space-x-2">
                        <FaClock className="w-4 h-4" />
                        <span title={formatDateIST(room.updatedAt)}>
                            Last active {formatTimeAgo(room.updatedAt)}
                        </span>
                    </div>

                    {/* Created: absolute IST time */}
                    <div className="flex items-center space-x-2">
                        <FaCalendar className="w-4 h-4" />
                        <span>Created {formatDateIST(room.createdAt)}</span>
                    </div>

                    {/* NOTE: owner id intentionally not displayed */}
                </div>
            </div>

            <div className="card-body pt-3">
                <button
                    className="w-full btn btn-outline"
                    onClick={() => navigate(`/playground/${room.roomId}`)}
                >
                    <FaCode className="w-4 h-4 mr-2" />
                    Join Room
                </button>
            </div>
        </div>
    );
};

export default RoomCard;
