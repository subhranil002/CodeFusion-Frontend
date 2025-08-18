import { FaCalendar, FaClock, FaCode, FaLink, FaUsers } from "react-icons/fa";

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

const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
        return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
};

function RoomCard({ room }: { room: any }) {
    const languageColor = LANGUAGE_COLORS[room.language] || "bg-gray-500";

    return (
        <div className="card hover:shadow-lg transition-all duration-200 hover:-translate-y-1 bg-base-100 border border-base-300">
            <div className="card-title pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold font-mono text-base-content">
                                {room.id}
                            </h3>
                            {room.isActive && (
                                <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
                            )}
                        </div>

                        {room.alias && (
                            <p className="text-sm text-base-content/70 mb-2">
                                {room.alias}
                            </p>
                        )}

                        <div className="flex items-center space-x-1">
                            <div
                                className={`w-3 h-3 rounded-full ${languageColor}`}
                            ></div>
                            <span className="badge badge-secondary text-xs">
                                {room.language.toUpperCase()}
                            </span>
                        </div>
                    </div>

                    <button className="p-2 hover:bg-base-200 btn btn-ghost btn-sm">
                        <FaLink className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="card-body py-3">
                <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-base-content/70">
                        <FaUsers className="w-4 h-4" />
                        <span>
                            {room.participantsCount} participant
                            {room.participantsCount !== 1 ? "s" : ""}
                        </span>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-base-content/70">
                        <FaClock className="w-4 h-4" />
                        <span>
                            Last active {formatTimeAgo(room.lastActivity)}
                        </span>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-base-content/70">
                        <FaCalendar className="w-4 h-4" />
                        <span>
                            Created{" "}
                            {new Date(room.createdAt).toLocaleDateString()}
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
