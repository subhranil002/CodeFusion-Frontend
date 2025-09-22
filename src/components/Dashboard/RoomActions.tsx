import { useEffect, useState } from "react";
import {
    FaArrowRight,
    FaMagic,
    FaPlus,
    FaRandom,
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

    const generateRandomRoomName = () => {
        const adjectives = [
            "Epic",
            "Swift",
            "Quantum",
            "Neon",
            "Cosmic",
            "Digital",
            "Alpha",
            "Fusion",
            "Vector",
            "Binary",
            "Turbo",
            "Apex",
            "Radial",
            "Hyper",
            "Primal",
            "Zenith",
            "Luminous",
            "Velocity",
            "Nimble",
            "Spectral",
        ];

        const nouns = [
            "Coders",
            "Hackers",
            "Developers",
            "Team",
            "Squad",
            "Workspace",
            "Lab",
            "Studio",
            "Collective",
            "Guild",
            "Engine",
            "Works",
            "Forge",
            "Hub",
            "Unit",
            "Crew",
            "Foundry",
            "Network",
            "Assembly",
            "Nest",
        ];

        const randomAdjective =
            adjectives[Math.floor(Math.random() * adjectives.length)];
        const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
        setRoomName(`${randomAdjective} ${randomNoun}`);
    };

    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Start Coding in{" "}
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Seconds
                    </span>
                </h2>
                <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                    Create a new collaborative room or join an existing one to
                    start coding with your team
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Create Room Card */}
                <div className="card bg-base-100 shadow-2xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-3xl">
                    <div className="card-body p-8">
                        <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/60 text-primary-content mb-6 mx-auto">
                            <FaPlus className="w-8 h-8" />
                        </div>

                        <h3 className="card-title text-2xl font-bold justify-center text-center mb-3">
                            Create New Room
                        </h3>
                        <p className="text-base-content/70 text-center mb-6">
                            Launch a fresh coding environment for your team
                        </p>

                        <div className="space-y-6">
                            <div className="form-control">
                                <label className="label mb-2">
                                    <span className="label-text font-semibold text-lg">
                                        Room Name
                                    </span>
                                    <button
                                        type="button"
                                        onClick={generateRandomRoomName}
                                        className="btn btn-ghost btn-xs gap-1"
                                    >
                                        <FaRandom className="w-3 h-3" />
                                        Random
                                    </button>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., Team Project"
                                    className="input input-bordered input-lg w-full text-base"
                                    value={roomName}
                                    onChange={(e) =>
                                        setRoomName(e.target.value)
                                    }
                                />
                            </div>

                            <div className="form-control">
                                <label className="label mb-2">
                                    <span className="label-text font-semibold text-lg">
                                        Programming Language
                                    </span>
                                </label>
                                <select
                                    className="select select-bordered select-lg w-full"
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
                                        Choose your language
                                    </option>
                                    {languageList.map((lang) => (
                                        <option key={lang.id} value={lang.name}>
                                            {lang.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                className="btn btn-primary btn-lg w-full mt-4 gap-2 group"
                                onClick={handleCreateRoom}
                                disabled={
                                    !roomName.trim() ||
                                    !selectedLanguage ||
                                    loadingCreateRoom
                                }
                            >
                                {loadingCreateRoom ? (
                                    <>
                                        <FaSpinner className="w-5 h-5 animate-spin" />
                                        Creating Room...
                                    </>
                                ) : (
                                    <>
                                        <FaMagic className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        Create Room
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Join Room Card */}
                <div className="card bg-base-100 shadow-2xl border border-secondary/10 hover:border-secondary/30 transition-all duration-300 hover:shadow-3xl">
                    <div className="card-body p-8">
                        <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary to-secondary/60 text-secondary-content mb-6 mx-auto">
                            <FaUsers className="w-8 h-8" />
                        </div>

                        <h3 className="card-title text-2xl font-bold justify-center text-center mb-3">
                            Join Existing Room
                        </h3>
                        <p className="text-base-content/70 text-center mb-6">
                            Enter a room ID to join your team's session
                        </p>

                        <div className="space-y-6">
                            <div className="form-control">
                                <label className="label mb-2">
                                    <span className="label-text font-semibold text-lg">
                                        6-Digit Room ID
                                    </span>
                                    <span className="label-text-alt text-base-content/50">
                                        {roomId.length}/6
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter room code"
                                    className="input input-bordered input-lg w-full text-center font-mono tracking-widest text-lg uppercase"
                                    maxLength={6}
                                    minLength={6}
                                    value={roomId}
                                    onChange={(e) =>
                                        setRoomId(
                                            e.target.value
                                                .toUpperCase()
                                                .replace(/[^A-Z0-9]/g, "")
                                        )
                                    }
                                />
                                <label className="label">
                                    <span className="label-text-alt text-base-content/50">
                                        Letters and numbers only
                                    </span>
                                </label>
                            </div>

                            <button
                                className="btn btn-secondary btn-lg w-full mt-4 gap-2 group"
                                onClick={() =>
                                    navigate(`/playground/${roomId}`)
                                }
                                disabled={roomId.length !== 6}
                            >
                                <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                Join Room
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Tips */}
            <div className="text-center">
                <div className="bg-base-200/50 rounded-2xl p-6 max-w-2xl mx-auto">
                    <h4 className="font-semibold text-lg mb-2">💡 Pro Tip</h4>
                    <p className="text-base-content/70">
                        Share the Room ID with your teammates to collaborate in
                        real-time. Each room supports AI chatbot and live code
                        execution.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RoomActions;
