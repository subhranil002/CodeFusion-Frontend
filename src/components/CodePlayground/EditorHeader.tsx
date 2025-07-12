import { FaChevronDown, FaFont, FaLock, FaLockOpen } from "react-icons/fa";

function EditorHeader({
    language,
    setLanguage,
    writeLock,
    setWriteLock,
    fontSize,
    setFontSize,
}: any) {
    return (
        <div className="flex flex-wrap items-center justify-between p-3 bg-base-200 border-b border-base-300 gap-2">
            {/* Left Section */}
            <div className="flex items-center gap-3">
                {/* Language Selector */}
                <div className="dropdown dropdown-center">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-sm btn-outline flex items-center gap-2"
                    >
                        <span>{language.toUpperCase()}</span>
                        <FaChevronDown className="text-xs" />
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content z-1 menu p-2 shadow bg-base-100 rounded-box mt-1"
                    >
                        {["javascript", "python", "java"].map((lang) => (
                            <li key={lang}>
                                <a
                                    onClick={() => {
                                        setLanguage(lang);
                                        // @ts-expect-error hehe
                                        document.activeElement?.blur();
                                    }}
                                >
                                    {lang.toUpperCase()}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Write Lock Toggle */}
                <button
                    className={`btn btn-sm flex items-center gap-2 ${
                        writeLock ? "btn-error" : "btn-success"
                    }`}
                    onClick={() => setWriteLock(!writeLock)}
                >
                    {writeLock ? <FaLock /> : <FaLockOpen />}
                    <span>{writeLock ? "Read-only" : "Editable"}</span>
                </button>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
                {/* Font Size Controls */}
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-sm btn-neutral flex items-center gap-2"
                    >
                        <FaFont />
                        <span>{fontSize}px</span>
                        <FaChevronDown className="text-xs" />
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content z-1 menu menu-md p-2 shadow bg-base-100 rounded-box mt-1"
                    >
                        {[10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30].map(
                            (size) => (
                                <li key={size}>
                                    <a
                                        onClick={() => {
                                            setFontSize(size);
                                            // @ts-expect-error hehe
                                            document.activeElement?.blur();
                                        }}
                                    >
                                        {size}px
                                    </a>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default EditorHeader;
