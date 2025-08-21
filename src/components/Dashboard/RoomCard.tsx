import {
    FaCalendar,
    FaClock,
    FaCode,
    FaEdit,
    FaLink,
    FaTrash,
} from "react-icons/fa";

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

const formatTimeAgo = (dateString?: string): string => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
        return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
};

type RoomProp = {
    room: {
        roomId: string;
        roomName: string;
        languageId?: string;
        languageName?: string;
        owner?: string;
        createdAt?: string;
        updatedAt?: string;
        // any other fields you might have
    };
};

function RoomCard({ room }: RoomProp) {
    // hardcoded current user as requested; replace with real auth id later
    const currentUser = "user-002";

    const languageKey = (room.languageName || "")
        .toLowerCase()
        .replace(/\s+/g, "");
    const languageColor = LANGUAGE_COLORS[languageKey] || "bg-gray-500";

    const isOwner = room.owner === currentUser;

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
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            className="p-2 hover:bg-base-200 btn btn-ghost btn-sm"
                            title="Copy link"
                        >
                            <FaLink className="w-4 h-4" />
                        </button>

                        {isOwner && (
                            <>
                                <button
                                    className="p-2 hover:bg-base-200 btn btn-ghost btn-sm"
                                    title="Edit room"
                                >
                                    <FaEdit className="w-4 h-4" />
                                </button>
                                <button
                                    className="p-2 hover:bg-base-200 btn btn-ghost btn-sm"
                                    title="Delete room"
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
                    <div className="flex items-center space-x-2">
                        <FaClock className="w-4 h-4" />
                        <span>Last active {formatTimeAgo(room.updatedAt)}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <FaCalendar className="w-4 h-4" />
                        <span>
                            Created{" "}
                            {room.createdAt
                                ? new Date(room.createdAt).toLocaleDateString()
                                : "N/A"}
                        </span>
                    </div>
                </div>
            </div>

            <div className="card-body pt-3">
                <button className="w-full btn btn-outline">
                    <FaCode className="w-4 h-4 mr-2" />
                    Join Room
                </button>
            </div>
        </div>
    );
}

export default RoomCard;
