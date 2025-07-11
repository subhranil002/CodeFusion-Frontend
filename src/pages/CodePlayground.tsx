import { useState, useRef, useEffect } from "react";
import CodeEditor from "../components/CodeEditor";
import {
    FaCopy,
    FaSignOutAlt,
    FaUser,
    FaKeyboard,
    FaCode,
    FaLock,
    FaLockOpen,
    FaFont,
    FaChevronDown,
    FaChevronUp,
    FaUsers,
} from "react-icons/fa";
import { useParams } from "react-router-dom";

function CodePlayground() {
    const [value, setValue] = useState<string>("");
    const [language, setLanguage] = useState<string>("javascript");
    const [copySuccess, setCopySuccess] = useState<string>("");
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const [writeLock, setWriteLock] = useState(false);
    const [fontSize, setFontSize] = useState<number>(18);
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const [showFontDropdown, setShowFontDropdown] = useState(false);
    const [showUserList, setShowUserList] = useState(false);

    const langDropdownRef = useRef<HTMLDivElement>(null);
    const fontDropdownRef = useRef<HTMLDivElement>(null);

    const users = [
        {
            name: "Alex Johnson",
            avatar: "https://img.daisyui.com/images/profile/demo/batperson@192.webp",
            isTyping: true,
            isOnline: true,
        },
        {
            name: "Taylor Swift",
            avatar: "https://img.daisyui.com/images/profile/demo/batperson@192.webp",
            isTyping: false,
            isOnline: true,
        },
        {
            name: "Jamie Smith",
            avatar: "https://img.daisyui.com/images/profile/demo/batperson@192.webp",
            isTyping: false,
            isOnline: false,
        },
        {
            name: "John Doe",
            avatar: "https://img.daisyui.com/images/profile/demo/batperson@192.webp",
            isTyping: true,
            isOnline: true,
        },
    ];
    const { roomId } = useParams();

    const handleChange = (e: string | undefined) => {
        setValue(e ?? "");
    };

    const copyToClipboard = () => {
        if (roomId) {
            navigator.clipboard.writeText(roomId);
            setCopySuccess("Copied!");
            setTimeout(() => setCopySuccess(""), 2000);
        }
    };

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const typingUsers = users.filter((user) => user.isTyping);
    const onlineUsers = users.filter((user) => user.isOnline);

    const changeFontSize = (size: number) => {
        setFontSize(size);
        setShowFontDropdown(false);
    };

    const changeLanguage = (lang: string) => {
        setLanguage(lang);
        setShowLanguageDropdown(false);
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                langDropdownRef.current &&
                !langDropdownRef.current.contains(event.target as Node)
            ) {
                setShowLanguageDropdown(false);
            }
            if (
                fontDropdownRef.current &&
                !fontDropdownRef.current.contains(event.target as Node)
            ) {
                setShowFontDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="min-h-screen bg-base-200">
            <div
                className={`drawer ${
                    isDrawerOpen ? "drawer-open" : ""
                } lg:drawer-open`}
            >
                <input
                    id="code-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                    checked={isDrawerOpen}
                    onChange={toggleDrawer}
                />

                {/* Main Content */}
                <div className="drawer-content flex flex-col h-screen">
                    {/* Editor Area */}
                    <div className="flex-1 p-4 lg:p-6">
                        <div className="bg-base-100 rounded-xl shadow-lg h-full overflow-hidden flex flex-col border border-base-300">
                            {/* Enhanced Editor Header */}
                            <div className="flex flex-wrap items-center justify-between p-3 bg-base-200 border-b border-base-300 gap-3">
                                {/* Left Controls */}
                                <div className="flex flex-wrap items-center gap-3">
                                    {/* Language Selector */}
                                    <div
                                        className="relative"
                                        ref={langDropdownRef}
                                    >
                                        <button
                                            className="btn btn-sm btn-outline flex items-center gap-2 pr-2"
                                            onClick={() =>
                                                setShowLanguageDropdown(
                                                    !showLanguageDropdown
                                                )
                                            }
                                        >
                                            <span className="font-mono font-bold">
                                                {language.toUpperCase()}
                                            </span>
                                            {showLanguageDropdown ? (
                                                <FaChevronUp className="text-xs" />
                                            ) : (
                                                <FaChevronDown className="text-xs" />
                                            )}
                                        </button>

                                        {showLanguageDropdown && (
                                            <div className="absolute z-10 mt-1 bg-base-100 rounded-box shadow-lg border border-base-300 w-48 max-h-60 overflow-y-auto">
                                                <ul className="menu menu-sm">
                                                    {[
                                                        "javascript",
                                                        "python",
                                                        "java",
                                                        "cpp",
                                                        "typescript",
                                                        "php",
                                                    ].map((lang) => (
                                                        <li key={lang}>
                                                            <a
                                                                className={`${
                                                                    language ===
                                                                    lang
                                                                        ? "active"
                                                                        : ""
                                                                }`}
                                                                onClick={() =>
                                                                    changeLanguage(
                                                                        lang
                                                                    )
                                                                }
                                                            >
                                                                <span className="font-mono">
                                                                    {lang
                                                                        .charAt(
                                                                            0
                                                                        )
                                                                        .toUpperCase() +
                                                                        lang.slice(
                                                                            1
                                                                        )}
                                                                </span>
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    {/* Write Lock Toggle */}
                                    <button
                                        className={`btn btn-sm flex items-center gap-2 ${
                                            writeLock
                                                ? "btn-error"
                                                : "btn-success"
                                        }`}
                                        onClick={() => setWriteLock(!writeLock)}
                                    >
                                        {writeLock ? (
                                            <FaLock />
                                        ) : (
                                            <FaLockOpen />
                                        )}
                                        <span className="hidden sm:inline">
                                            {writeLock
                                                ? "Read-only"
                                                : "Editable"}
                                        </span>
                                    </button>
                                </div>

                                {/* Right Controls */}
                                <div className="flex items-center gap-3">
                                    {/* Font Size Controls */}
                                    <div
                                        className="relative"
                                        ref={fontDropdownRef}
                                    >
                                        <button
                                            className="btn btn-sm btn-ghost flex items-center gap-2"
                                            onClick={() =>
                                                setShowFontDropdown(
                                                    !showFontDropdown
                                                )
                                            }
                                        >
                                            <FaFont className="text-primary" />
                                            <span className="font-bold">
                                                {fontSize}px
                                            </span>
                                            {showFontDropdown ? (
                                                <FaChevronUp className="text-xs" />
                                            ) : (
                                                <FaChevronDown className="text-xs" />
                                            )}
                                        </button>

                                        {showFontDropdown && (
                                            <div className="absolute right-0 z-10 mt-1 bg-base-100 rounded-box shadow-lg border border-base-300">
                                                <ul className="menu menu-sm">
                                                    {[
                                                        10, 12, 14, 16, 18, 20,
                                                        22, 24, 26, 28, 30,
                                                    ].map((size) => (
                                                        <li key={size}>
                                                            <a
                                                                className={`${
                                                                    fontSize ===
                                                                    size
                                                                        ? "active"
                                                                        : ""
                                                                }`}
                                                                onClick={() =>
                                                                    changeFontSize(
                                                                        size
                                                                    )
                                                                }
                                                            >
                                                                <span className="font-mono">
                                                                    {size}px
                                                                </span>
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Editor Body */}
                            <div className="flex-1">
                                <CodeEditor
                                    language={language}
                                    value={value}
                                    handleChange={handleChange}
                                    options={{
                                        fontSize: fontSize,
                                        readOnly: writeLock,
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Mobile Drawer Toggle */}
                    <div className="lg:hidden fixed bottom-6 right-6 z-10">
                        <label
                            htmlFor="code-drawer"
                            className="btn btn-circle btn-primary shadow-lg"
                            aria-label="Toggle sidebar"
                        >
                            <FaCode className="text-xl" />
                        </label>
                    </div>
                </div>

                {/* Sidebar Drawer */}
                <div className="drawer-side z-20">
                    <label
                        htmlFor="code-drawer"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                        onClick={toggleDrawer}
                    ></label>

                    <div className="bg-base-100 h-full w-80 p-5 flex flex-col shadow-xl border-l border-base-300">
                        {/* Room Info */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <span className="badge badge-primary badge-lg">
                                        <FaUsers />
                                    </span>
                                    <span className="font-mono">
                                        Room: {roomId}
                                    </span>
                                </h2>

                                <button
                                    onClick={copyToClipboard}
                                    className={`btn btn-sm gap-1 ${
                                        copySuccess
                                            ? "btn-success"
                                            : "btn-outline"
                                    }`}
                                >
                                    {copySuccess ? (
                                        <span>{copySuccess}</span>
                                    ) : (
                                        <>
                                            <FaCopy /> Copy
                                        </>
                                    )}
                                </button>
                            </div>

                            <div className="divider my-2"></div>
                        </div>

                        {/* Users Section */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="flex items-center gap-2 text-lg font-semibold">
                                    <FaUser className="text-primary" />
                                    <span>
                                        Active Users ({onlineUsers.length})
                                    </span>
                                </h3>
                                <button
                                    className="btn btn-xs"
                                    onClick={() =>
                                        setShowUserList(!showUserList)
                                    }
                                >
                                    {showUserList ? "Hide" : "Show"}
                                </button>
                            </div>

                            <div className="space-y-2">
                                <div className="flex flex-wrap gap-2">
                                    {onlineUsers
                                        .slice(0, 4)
                                        .map((user, index) => (
                                            <div
                                                key={index}
                                                className="tooltip"
                                                data-tip={user.name}
                                            >
                                                <div className="avatar relative">
                                                    <div className="w-10 rounded-full ring-2 ring-base-100">
                                                        <img
                                                            src={user.avatar}
                                                            alt={user.name}
                                                        />
                                                        {user.isOnline && (
                                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-base-100"></div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    {onlineUsers.length > 4 && (
                                        <div className="avatar placeholder">
                                            <div className="w-10 bg-neutral text-neutral-content rounded-full">
                                                <span>
                                                    +{onlineUsers.length - 4}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {showUserList && (
                                    <div className="mt-4 bg-base-200 rounded-lg p-3">
                                        <ul className="space-y-2">
                                            {users.map((user, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-center gap-3 bg-base-100 px-4 py-3 rounded-lg"
                                                >
                                                    <div className="avatar relative">
                                                        <div className="w-8 rounded-full">
                                                            <img
                                                                src={
                                                                    user.avatar
                                                                }
                                                                alt={user.name}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-base-100 ${
                                                                user.isOnline
                                                                    ? "bg-success"
                                                                    : "bg-error"
                                                            }`}
                                                        ></div>
                                                    </div>
                                                    <span className="truncate font-medium">
                                                        {user.name}
                                                    </span>
                                                    {user.isTyping && (
                                                        <span className="badge badge-info badge-sm ml-auto flex items-center gap-1">
                                                            <FaKeyboard className="text-xs" />
                                                            typing
                                                        </span>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Typing Indicator */}
                        {typingUsers.length > 0 && (
                            <div className="mb-6 bg-info/10 p-3 rounded-lg border border-info/20">
                                <div className="flex items-center gap-2 text-info">
                                    <FaKeyboard className="animate-pulse" />
                                    <span className="truncate">
                                        {typingUsers.length > 1
                                            ? `${typingUsers
                                                  .slice(0, -1)
                                                  .map(
                                                      (u) =>
                                                          u.name.split(" ")[0]
                                                  )
                                                  .join(", ")} 
                                            and ${
                                                typingUsers[
                                                    typingUsers.length - 1
                                                ].name.split(" ")[0]
                                            } are typing...`
                                            : `${
                                                  typingUsers[0].name.split(
                                                      " "
                                                  )[0]
                                              } is typing...`}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Spacer */}
                        <div className="flex-1"></div>

                        {/* Leave Button */}
                        <button className="btn btn-error w-full mt-4 gap-2 hover:scale-[1.02] transition-transform">
                            <FaSignOutAlt />
                            Leave Room
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CodePlayground;
