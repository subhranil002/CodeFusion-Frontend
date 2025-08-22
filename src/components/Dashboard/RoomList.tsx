import { useEffect } from "react";
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

    useEffect(() => {
        (async () => {
            dispatch(fetchRooms());
        })();
    }, []);

    return (
        <>
            <div className="space-y-6">
                {/* Header with stats */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-base-content">
                            Room History
                        </h2>
                    </div>
                </div>

                {/* Room Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {rooms &&
                        rooms.length > 0 &&
                        rooms.map((room) => (
                            <RoomCard key={room.roomId} room={room} />
                        ))}
                </div>
            </div>
        </>
    );
}

export default RoomList;
