import { useState } from "react";
import {
    FaChevronDown,
    FaCode,
    FaCopy,
    FaKeyboard,
    FaSignOutAlt,
    FaUser,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import editorSocket from "../../configs/EditorSocketConfig";
import type { SidebarPropsType,User } from "../../types/types";

function Sidebar({ roomId, children }: SidebarPropsType) {
    const [copySuccess, setCopySuccess] = useState<string>("");
    const { users } = useSelector(
        (state: any) => state.editor
    );
    const navigate = useNavigate();

    const copyToClipboard = () => {
        if (!roomId) return;
        navigator.clipboard.writeText(roomId);
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 2000);
    };

    const typingUsers = users.filter((user: User) => user.isTyping);

    function leaveRoom() {
        editorSocket.emit("leaveRoom", {});
        navigate("/");
    }

    return (
        <div className="drawer md:drawer-open">
            <input id="code-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <label
                    htmlFor="code-drawer"
                    className="btn btn-circle btn-primary shadow-lg drawer-button md:hidden fixed bottom-6 right-6 z-10"
                    aria-label="Toggle sidebar"
                >
                    <FaCode className="text-xl" />
                </label>
                {children}
            </div>
            <div className="drawer-side bg-base-100 h-screen w-80 p-5 flex flex-col shadow-xl">
                <label
                    htmlFor="code-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                {/* Room Info */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-3 gap-10">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <span className="badge badge-primary">Room</span>
                            <span>ID: {roomId}</span>
                        </h2>

                        <button
                            onClick={copyToClipboard}
                            className={`btn btn-sm ${
                                copySuccess ? "btn-success" : "btn-outline"
                            }`}
                        >
                            {copySuccess ? (
                                <span>{copySuccess}</span>
                            ) : (
                                <span className="flex items-center gap-1">
                                    <FaCopy /> Copy
                                </span>
                            )}
                        </button>
                    </div>

                    <div className="divider my-2"></div>
                </div>

                {/* Users Section */}
                <div className="mb-6 w-full">
                    <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
                        <FaUser className="text-primary" />
                        <span>Active Users ({users.length})</span>
                    </h3>

                    <div className="space-y-2">
                        <div className="collapse bg-base-200 border border-base-300 overflow-visible">
                            <input type="checkbox" className="peer" />
                            <div className="collapse-title p-3 flex items-center justify-between">
                                <div className="avatar-group -space-x-4">
                                    {users
                                        .slice(0, 5)
                                        .map((user: User, index: number) => (
                                            <div className="avatar" key={index}>
                                                <div className="w-10 rounded-full ring-2 ring-base-100">
                                                    <img
                                                        src="https://img.freepik.com/free-vector/hacker-operating-laptop-cartoon-icon-illustration-technology-icon-concept-isolated-flat-cartoon-style_138676-2387.jpg?semt=ais_hybrid&w=740"
                                                        alt={user.name}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    {users.length > 5 && (
                                        <div className="avatar">
                                            <div className="w-10 rounded-full ring-2 ring-base-100">
                                                <span>+{users.length - 5}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <FaChevronDown className="text-base" />
                            </div>
                            <div className="collapse-content">
                                <ul className="pt-2 space-y-2">
                                    {users
                                        .slice(0, 5)
                                        .map((user: User, index: number) => (
                                            <li
                                                key={index}
                                                className="flex items-center gap-3 bg-base-100 px-4 py-3 rounded-lg"
                                            >
                                                <div className="avatar">
                                                    <div className="w-8 rounded-full">
                                                        <img
                                                            src="https://img.freepik.com/free-vector/hacker-operating-laptop-cartoon-icon-illustration-technology-icon-concept-isolated-flat-cartoon-style_138676-2387.jpg?semt=ais_hybrid&w=740"
                                                            alt={user.name}
                                                        />
                                                    </div>
                                                </div>
                                                <span className="truncate font-medium">
                                                    {user.name}
                                                </span>
                                                {user.isTyping && (
                                                    <span className="badge badge-info badge-xs ml-auto">
                                                        typing
                                                    </span>
                                                )}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Typing Indicator */}
                {typingUsers.length > 0 && (
                    <div className="mb-6 bg-info/10 p-3 rounded-lg border border-info/20">
                        <div className="flex items-center gap-2 text-info">
                            <FaKeyboard className="animate-pulse min-w-10" />
                            {typingUsers.length > 1
                                ? `${typingUsers
                                      .slice(0, -1)
                                      .map((u: User) => u.name.split(" ")[0])
                                      .join(", ")} 
                                            and ${
                                                typingUsers[
                                                    typingUsers.length - 1
                                                ].name.split(" ")[0]
                                            } are typing...`
                                : `${
                                      typingUsers[0].name.split(" ")[0]
                                  } is typing...`}
                        </div>
                    </div>
                )}

                {/* Leave Button */}
                <button
                    className="btn btn-error w-[85%] gap-2 absolute bottom-5"
                    onClick={() => leaveRoom()}
                >
                    <FaSignOutAlt />
                    Leave Room
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
