import RoomCard from "./RoomCard";

function RoomList() {
    const rooms = [
        {
            roomId: "room-1234",
            roomName: "Intro to JavaScript",
            languageId: "102",
            languageName: "JavaScript",
            owner: "user-001",
            createdAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T00:00:00.000Z",
        },
        {
            roomId: "room-5678",
            roomName: "Python Practice",
            languageId: "109",
            languageName: "Python",
            owner: "user-002",
            createdAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T00:00:00.000Z",
        },
        {
            roomId: "room-91011",
            roomName: "C++ Basics",
            languageId: "105",
            languageName: "CPP",
            owner: "user-003",
            createdAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T00:00:00.000Z",
        },
    ];

    return (
        <>
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
                </div>

                {/* Room Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {rooms.map((room) => (
                        <RoomCard key={room.roomId} room={room} />
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
