import { useEffect, useState } from "react";
import { FaArrowRight, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import {
    fetchLanguages,
    type Language,
} from "../../redux/slices/DashboardSlice";

function RoomActions() {
    const {
        languageList,
    }: {
        languageList: Language[];
    } = useSelector((state: any) => state.dashboard);
    const [selectedLanguage, setSelectedLanguage] =
        useState<string>("javascript");

    const dispatch: any = useDispatch();

    useEffect(() => {
        (async () => {
            dispatch(fetchLanguages());
        })();
    }, []);

    return (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Create Room Card */}
            <div className="card bg-base-100 shadow-xl border border-base-300">
                <div className="card-body">
                    <h3 className="card-title text-xl font-semibold flex items-center">
                        <FaPlus className="w-5 h-5 mr-2" />
                        Create New Room
                    </h3>
                    <p className="text-base-content/70 mb-4">
                        Start a new collaborative coding session
                    </p>

                    <div className="space-y-4">
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">
                                    Room Name
                                </span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter a room name"
                                className="input w-full text-center text-2xl font-mono tracking-widest uppercase"
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">
                                    Programming Language
                                </span>
                            </label>
                            <select
                                className="select"
                                defaultValue={selectedLanguage}
                                onChange={(e) =>
                                    setSelectedLanguage(e.target.value)
                                }
                            >
                                <option disabled={true}>Select language</option>
                                {languageList.map((lang) => (
                                    <option key={lang.id} value={lang.name}>
                                        {lang.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            className="btn btn-lg w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                            onClick={() => {}}
                        >
                            <FaPlus className="w-4 h-4 mr-2" />
                            Create Room
                        </button>
                    </div>
                </div>
            </div>

            {/* Join Room Card */}
            <div className="card bg-base-100 shadow-xl border border-base-300">
                <div className="card-body">
                    <h3 className="card-title text-xl font-semibold flex items-center">
                        <FaArrowRight className="w-5 h-5 mr-2" />
                        Join Existing Room
                    </h3>
                    <p className="text-base-content/70 mb-4">
                        Enter a 6-character room ID to join
                    </p>

                    <div className="space-y-4">
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">
                                    Room ID
                                </span>
                            </label>
                            <input
                                type="text"
                                placeholder="ahB4ek"
                                className="input w-full text-center text-2xl font-mono tracking-widest uppercase"
                                maxLength={6}
                                minLength={6}
                            />
                        </div>

                        <button
                            className="w-full btn btn-outline btn-lg"
                            onClick={() => {}}
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
