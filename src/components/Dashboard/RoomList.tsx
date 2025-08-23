import { useEffect, useState } from "react";
import { FaFilter, FaHistory, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import {
    fetchRooms,
    type RoomCardData,
} from "../../redux/slices/DashboardSlice";
import RoomCard from "./RoomCard";

function RoomList() {
    const dispatch: any = useDispatch();
    const {
        rooms,
    }: {
        rooms: RoomCardData[];
    } = useSelector((state: any) => state.dashboard);

    const [filter, setFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        (async () => {
            dispatch(fetchRooms());
        })();
    }, []);

    const filteredRooms = rooms?.filter((room) => {
        const matchesSearch =
            room.roomName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            room.roomId.toLowerCase().includes(searchQuery.toLowerCase());

        if (filter === "all") return matchesSearch;
        if (filter === "public") return matchesSearch && room.anyoneCanEdit;
        if (filter === "private") return matchesSearch && !room.anyoneCanEdit;

        return matchesSearch;
    });

    const stats = {
        total: rooms?.length || 0,
        public: rooms?.filter((room) => room.anyoneCanEdit).length || 0,
        private: rooms?.filter((room) => !room.anyoneCanEdit).length || 0,
    };

    return (
        <div className="space-y-6 p-4">
            {/* Header with stats and actions */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-4 bg-base-200 rounded-lg">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary text-primary-content rounded-full">
                        <FaHistory className="text-xl" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-base-content">
                            Room History
                        </h2>
                        <p className="text-base-content/70">
                            {stats.total} total rooms • {stats.public} public •{" "}
                            {stats.private} private
                        </p>
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-base-100 rounded-lg border border-base-300">
                <div className="join flex-1">
                    <div className="join-item flex items-center px-4 bg-base-200">
                        <FaSearch className="text-base-content/70" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search rooms..."
                        className="input input-bordered join-item flex-1"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="tabs tabs-boxed bg-base-200">
                    <a
                        className={`tab ${
                            filter === "all" ? "tab-active" : ""
                        }`}
                        onClick={() => setFilter("all")}
                    >
                        All Rooms
                    </a>
                    <a
                        className={`tab ${
                            filter === "public" ? "tab-active" : ""
                        }`}
                        onClick={() => setFilter("public")}
                    >
                        Public
                    </a>
                    <a
                        className={`tab ${
                            filter === "private" ? "tab-active" : ""
                        }`}
                        onClick={() => setFilter("private")}
                    >
                        Private
                    </a>
                </div>
            </div>

            {/* Room Grid */}
            {filteredRooms && filteredRooms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredRooms.map((room) => (
                        <RoomCard key={room.roomId} room={room} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center p-12 bg-base-100 rounded-lg border border-dashed border-base-300">
                    <div className="p-4 bg-base-200 rounded-full mb-4">
                        <FaFilter className="text-3xl text-base-content/50" />
                    </div>
                    <h3 className="text-xl font-semibold text-base-content mb-2">
                        No rooms found
                    </h3>
                    <p className="text-base-content/70 text-center max-w-md">
                        {searchQuery || filter !== "all"
                            ? "Try adjusting your search or filter settings."
                            : "You haven't created or joined any rooms yet."}
                    </p>
                </div>
            )}
        </div>
    );
}

export default RoomList;
