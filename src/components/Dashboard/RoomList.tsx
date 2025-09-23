import { useEffect, useState } from "react";
import {
    FaCode,
    FaFilter,
    FaGlobe,
    FaHistory,
    FaLock,
    FaSearch,
    FaSort,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import {
    fetchRooms,
    type RoomCardData,
} from "../../redux/slices/DashboardSlice";
import RoomCard from "./RoomCard";

function RoomList() {
    const dispatch: any = useDispatch();
    const { rooms } = useSelector((state: any) => state.dashboard);

    const [filter, setFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("recent");

    useEffect(() => {
        dispatch(fetchRooms());
    }, [dispatch]);

    const filteredRooms = (rooms || []).filter((room: RoomCardData) => {
        const matchesSearch =
            room.roomName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            room.roomId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            room.language.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());

        if (filter === "all") return matchesSearch;
        if (filter === "public") return matchesSearch && room.anyoneCanEdit;
        if (filter === "private") return matchesSearch && !room.anyoneCanEdit;

        return matchesSearch;
    });

    const sortedRooms = [...filteredRooms].sort(
        (a: RoomCardData, b: RoomCardData) => {
            if (sortBy === "recent") {
                return (
                    new Date(b.updatedAt).getTime() -
                    new Date(a.updatedAt).getTime()
                );
            }
            if (sortBy === "name") {
                return a.roomName.localeCompare(b.roomName);
            }
            if (sortBy === "language") {
                return a.language.name.localeCompare(b.language.name);
            }
            if (sortBy === "oldest") {
                return (
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                );
            }
            return 0;
        }
    );

    const stats = {
        total: rooms?.length || 0,
        public:
            rooms?.filter((room: RoomCardData) => room.anyoneCanEdit).length ||
            0,
        private:
            rooms?.filter((room: RoomCardData) => !room.anyoneCanEdit).length ||
            0,
        languages: new Set(
            rooms?.map((room: RoomCardData) => room.language.name) || []
        ).size,
    };

    return (
        <div className="space-y-6 flex flex-col items-center justify-center pb-10">
            {/* Header Card */}
            <div className="card bg-gradient-to-br from-primary/10 to-secondary/10 shadow-xl border border-primary/20 lg:w-4xl mx-4 min-w-[80%] lg:min-w-auto">
                <div className="card-body p-6 sm:p-8">
                    <div className="flex flex-col items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-br from-primary to-secondary text-primary-content rounded-2xl shadow-lg">
                                <FaHistory className="text-2xl" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-base-content">
                                Your Coding Rooms
                            </h2>
                        </div>
                        <div>
                            <div>
                                <p className="text-base-content/70 flex flex-wrap items-center gap-3 mt-2">
                                    {stats.total > 1 && (
                                        <span className="badge badge-primary badge-lg">
                                            <FaCode className="mr-1" />{" "}
                                            {stats.total} ROOMS
                                        </span>
                                    )}
                                    <span className="badge badge-success badge-lg">
                                        <FaGlobe className="mr-1" />{" "}
                                        {stats.public} PUBLIC
                                    </span>
                                    <span className="badge badge-warning badge-lg">
                                        <FaLock className="mr-1" />{" "}
                                        {stats.private} PRIVATE
                                    </span>
                                    {stats.languages > 1 && (
                                        <span className="badge badge-info badge-lg">
                                            {stats.languages} LANGUAGES
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filter Card */}
            <div className="card bg-base-100 shadow-lg border border-base-300 min-w-[80%] lg:min-w-auto lg:w-4xl mx-4">
                <div className="card-body p-6">
                    <div className="flex flex-col lg:flex-row gap-4 items-center">
                        {/* Search */}
                        <div className="join flex-1 w-full">
                            <div className="join-item flex items-center px-4 bg-base-200 border border-base-300">
                                <FaSearch className="text-base-content/70" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search rooms by name, ID, or language..."
                                className="input input-bordered join-item flex-1"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Filter and Sort */}
                        <div className="flex flex-row gap-3 w-full lg:w-auto">
                            <div className="dropdown dropdown-bottom">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-outline gap-2"
                                >
                                    <FaFilter />
                                    Filter
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-lg border border-base-300"
                                >
                                    <li>
                                        <a
                                            onClick={() => setFilter("all")}
                                            className={
                                                filter === "all" ? "active" : ""
                                            }
                                        >
                                            All Rooms
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            onClick={() => setFilter("public")}
                                            className={
                                                filter === "public"
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <FaGlobe className="text-success" />{" "}
                                            Public Rooms
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            onClick={() => setFilter("private")}
                                            className={
                                                filter === "private"
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <FaLock className="text-warning" />{" "}
                                            Private Rooms
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <select
                                className="select select-bordered"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="recent">Most Recent</option>
                                <option value="oldest">Oldest First</option>
                                <option value="name">Name A-Z</option>
                                <option value="language">Language</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Count */}
            {sortedRooms.length > 0 && (
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <p className="text-base-content/70">
                        Showing{" "}
                        <span className="font-semibold text-primary">
                            {sortedRooms.length}
                        </span>{" "}
                        room{sortedRooms.length !== 1 ? "s" : ""}
                        {searchQuery && ` for "${searchQuery}"`}
                    </p>
                    <div className="text-sm text-base-content/50 flex items-center gap-2">
                        <FaSort className="text-xs" />
                        Sorted by{" "}
                        {sortBy === "recent"
                            ? "most recent"
                            : sortBy === "oldest"
                            ? "oldest first"
                            : sortBy === "name"
                            ? "name"
                            : "language"}
                    </div>
                </div>
            )}

            {/* Room Grid */}
            {sortedRooms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mx-4 min-w-[90vw]">
                    {sortedRooms.map((room: RoomCardData) => (
                        <RoomCard key={room.roomId} room={room} />
                    ))}
                </div>
            ) : (
                <div className="card bg-base-100 shadow-lg border border-dashed border-base-300 mx-4">
                    <div className="card-body text-center py-16">
                        <div className="p-4 bg-base-200 rounded-full w-max mx-auto mb-4">
                            <FaSearch className="text-4xl text-error" />
                        </div>
                        <h3 className="text-xl font-semibold text-error mb-2">
                            {searchQuery || filter !== "all"
                                ? "No matching rooms found"
                                : "No rooms yet"}
                        </h3>
                        <p className="text-base-content/70 mb-6 max-w-md mx-auto">
                            {searchQuery || filter !== "all"
                                ? "Try adjusting your search terms or filters to find what you're looking for."
                                : "Get started by creating your first collaborative coding room!"}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RoomList;
