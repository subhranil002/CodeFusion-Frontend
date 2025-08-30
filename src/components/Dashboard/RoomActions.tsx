import { useEffect, useState } from "react";
import {
    FaArrowRight,
    FaCode,
    FaPlus,
    FaSpinner,
    FaUsers,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    fetchLanguages,
    type Language,
} from "../../redux/slices/DashboardSlice";
import { createNewRoom } from "../../redux/slices/RoomSlice";

function RoomActions() {
    const {
        languageList,
    }: {
        languageList: Language[];
    } = useSelector((state: any) => state.dashboard);
    const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(
        null
    );
    const [roomName, setRoomName] = useState<string>("");
    const [roomId, setRoomId] = useState<string>("");
    const dispatch: any = useDispatch();
    const [loadingCreateRoom, setLoadingCreateRoom] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            await dispatch(fetchLanguages());
        })();
    }, []);

    const handleCreateRoom = async () => {
        if (!roomName.trim()) return;
        if (!selectedLanguage) return;
        setLoadingCreateRoom(true);
        const res = await dispatch(
            createNewRoom({
                roomName,
                languageId: selectedLanguage.id,
                languageName: selectedLanguage.name,
            })
        );
        setRoomName("");
        setSelectedLanguage(null);
        setLoadingCreateRoom(false);
        if (res.payload.success) {
            navigate(`/playground/${res.payload.data.roomId}`);
        }
    };

    return (
        <div className="grid md:grid-cols-2 gap-6 mb-8 px-4 md:px-0">
            {/* Create Room Card */}
            <div className="card bg-base-100 shadow-xl border border-primary/20 hover:shadow-2xl transition-all duration-300">
                <form className="card-body p-6 md:p-8">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 mx-auto">
                        <FaCode className="w-8 h-8" />
                    </div>
                    <h3 className="card-title text-xl md:text-2xl font-bold justify-center mb-2">
                        Create New Room
                    </h3>
                    <p className="text-base-content/70 text-center mb-6">
                        Start a new collaborative coding session
                    </p>

                    <div className="space-y-4">
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Room Name
                                </span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter a room name"
                                className="input input-bordered w-full text-lg font-mono tracking-wide"
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Programming Language
                                </span>
                            </label>
                            <select
                                className="select select-bordered w-full"
                                value={selectedLanguage?.name ?? ""}
                                onChange={(e) =>
                                    setSelectedLanguage(
                                        languageList.find(
                                            (lang) =>
                                                lang.name === e.target.value
                                        ) || null
                                    )
                                }
                            >
                                <option disabled value="">
                                    Select language
                                </option>
                                {languageList.map((lang) => (
                                    <option key={lang.id} value={lang.name}>
                                        {lang.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            className="btn btn-primary btn-lg w-full mt-4"
                            onClick={() => handleCreateRoom()}
                            disabled={
                                !roomName.trim() ||
                                !selectedLanguage ||
                                loadingCreateRoom
                            }
                        >
                            {loadingCreateRoom ? (
                                <FaSpinner className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                                <>
                                    <FaPlus className="w-4 h-4 mr-2" />
                                    Create Room
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Join Room Card */}
            <div className="card bg-base-100 shadow-xl border border-secondary/20 hover:shadow-2xl transition-all duration-300">
                <div className="card-body p-6 md:p-8">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 text-secondary mb-4 mx-auto">
                        <FaUsers className="w-8 h-8" />
                    </div>
                    <h3 className="card-title text-xl md:text-2xl font-bold justify-center mb-2">
                        Join Existing Room
                    </h3>
                    <p className="text-base-content/70 text-center mb-6">
                        Enter a 6-character room ID to join
                    </p>

                    <div className="space-y-4">
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Room ID
                                </span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. ahB4ek"
                                className="input input-bordered w-full text-lg font-mono tracking-widest uppercase text-center"
                                maxLength={6}
                                minLength={6}
                                value={roomId}
                                onChange={(e) =>
                                    setRoomId(
                                        e.target.value.toUpperCase()
                                    )
                                }
                            />
                        </div>

                        <button
                            className="w-full btn btn-secondary btn-lg mt-4"
                            onClick={() => navigate(`/playground/${roomId}`)}
                            disabled={roomId.length !== 6}
                        >
                            <FaArrowRight className="w-4 h-4 mr-2" />
                            Join Room
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomActions;
