import { FaArchive } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { LuLoaderCircle } from "react-icons/lu";

import RoomCard from "./RoomCard";

function RoomList() {
    const rooms = [
        {
            id: "abcd",
            alias: "Hello World",
            language: "JavaScript",
            lastActivity: "2023-01-01T00:00:00.000Z",
        },
        {
            id: "efgh",
            alias: "Hello World",
            language: "JavaScript",
            lastActivity: "2023-01-01T00:00:00.000Z",
        },
        {
            id: "ijkl",
            alias: "Hello World",
            language: "JavaScript",
            lastActivity: "2023-01-01T00:00:00.000Z",
        },
    ];

    const filteredRooms = [
        {
            id: "efgh",
            alias: "Hello World",
            language: "JavaScript",
            lastActivity: "2023-01-01T00:00:00.000Z",
        },
        {
            id: "ijkl",
            alias: "Hello World",
            language: "JavaScript",
            lastActivity: "2023-01-01T00:00:00.000Z",
        },
    ];

    return (
        <>
            <div className="card p-8 text-center bg-base-100 border border-error/20">
                <div className="text-error mb-4">
                    <FaArchive className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold">
                        Error Loading Rooms
                    </h3>
                    <p className="text-sm text-base-content/70 mt-2">
                        This is an error message
                    </p>
                </div>
                <button className="btn btn-outline">
                    <IoMdRefresh className="w-4 h-4 mr-2" />
                    Try Again
                </button>
            </div>
            <div className="card p-8 text-center bg-base-100">
                <LuLoaderCircle className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-base-content/70">Loading rooms...</p>
            </div>
            <div className="card p-8 text-center bg-base-100">
                <FaArchive className="w-12 h-12 mx-auto mb-4 text-base-content/50" />
                <h3 className="text-lg font-semibold text-base-content">
                    No Rooms Found
                </h3>
                <p className="text-base-content/70 mt-2">
                    {rooms.length === 0
                        ? "No rooms have been created yet. Create your first room to get started!"
                        : "No rooms match your current filters. Try adjusting your search criteria."}
                </p>
                {rooms.length > 0 && (
                    <button className="mt-4 btn btn-outline">
                        <IoMdRefresh className="w-4 h-4 mr-2" />
                        Refresh
                    </button>
                )}
            </div>
            <div className="space-y-6">
                {/* Header with stats */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-base-content">
                            Room History
                        </h2>
                        <p className="text-base-content/70">
                            Showing 5 of 10 rooms
                        </p>
                    </div>

                    <button className="btn btn-ghost btn-sm">
                        <IoMdRefresh className={`w-4 h-4 mr-2`} />
                        Refresh
                    </button>
                </div>

                {/* Room Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredRooms.map((room) => (
                        <RoomCard key={room.id} room={room} />
                    ))}
                </div>
                <div className="flex justify-center pt-6">
                    <button className="btn btn-outline btn-lg">
                        "Load More Rooms"
                    </button>
                </div>
            </div>
        </>
    );
}

export default RoomList;
