import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    FaCheck,
    FaChevronDown,
    FaFont,
    FaLock,
    FaLockOpen,
    FaTimes,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { executeCode } from "../../redux/slices/RoomSlice";
import type { Language, User } from "../../types/types";
import UserInput from "./UserInput";

function EditorHeader({
    setLanguage,
    writeLock,
    setWriteLock,
    fontSize,
    setFontSize,
}: any) {
    const { users, currentLanguage, languageList, code } = useSelector(
        (state: any) => state.editor
    );
    const [userInput, setUserInput] = useState(false);
    const [runCode, setRunCode] = useState(false);
    const [userInputValue, setUserInputValue] = useState("");
    const dispatch: any = useDispatch();

    useEffect(() => {
        setWriteLock(false);
        if (users.some((user: User) => user.isTyping)) {
            setWriteLock(true);
        }
    }, [users, setWriteLock]);

    const handleCodeRun = () => {
        if (code.length > 5 && code.trim() === "// Write code here...") {
            toast.error("Please write valid code!");
            return;
        }
        setRunCode(true);
        const res = dispatch(
            executeCode({
                code: code,
                langId: currentLanguage?.id,
                stdIn: userInputValue,
            })
        );
        res.then(() => {
            setRunCode(false);
            setUserInputValue("");
        });
    };

    return (
        <>
            <UserInput
                userInputValue={userInputValue}
                setUserInputValue={setUserInputValue}
                runCode={handleCodeRun}
            />
            <div className="flex flex-wrap items-center justify-between pb-3 bg-base-200 border-b border-base-300 gap-2">
                {/* Left Section */}
                <div className="flex flex-wrap items-center gap-3">
                    {/* Language Selector */}
                    <div className="dropdown dropdown-start">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-sm btn-outline rounded-tl-xl flex items-center gap-2 h-8"
                        >
                            <span>{currentLanguage?.name.toUpperCase()}</span>
                            <FaChevronDown className="text-xs" />
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content z-1 menu p-2 shadow bg-base-100 rounded-box mt-1"
                        >
                            {languageList &&
                                languageList.length > 0 &&
                                languageList?.map((lang: Language) => (
                                    <li key={lang.id}>
                                        <a
                                            onClick={() => {
                                                setLanguage(lang);
                                                // @ts-expect-error hehe
                                                document.activeElement?.blur();
                                            }}
                                        >
                                            {lang.name.toUpperCase()}
                                        </a>
                                    </li>
                                ))}
                        </ul>
                    </div>

                    {/* Font Size Controls */}
                    <div className="dropdown dropdown-center">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-sm btn-outline flex items-center gap-2"
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

                    {/* Write Lock Toggle */}
                    <span
                        className={`badge h-8 ${
                            writeLock ? "badge-error" : "badge-success"
                        }`}
                    >
                        {writeLock ? <FaLock /> : <FaLockOpen />}
                        <span className="font-semibold">
                            {writeLock
                                ? "Someone is writing code"
                                : "Writeable"}
                        </span>
                    </span>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-5">
                    {/* User Input Toggle */}
                    <div className="flex items-center">
                        <button
                            className="btn btn-info btn-sm pr-12"
                            onClick={() => setUserInput(!userInput)}
                        >
                            <span className="font-bold">User Input</span>
                        </button>

                        <label className="toggle toggle-sm text-base-content relative ml-[-40px]">
                            <input
                                type="checkbox"
                                checked={userInput}
                                onChange={() => setUserInput(!userInput)}
                            />
                            <FaTimes />
                            <FaCheck />
                        </label>
                    </div>

                    {/* Run Code Button */}
                    <button
                        className="btn btn-sm btn-warning font-bold min-w-20"
                        disabled={runCode}
                        onClick={() => {
                            if (userInput) {
                                const element = document.getElementById(
                                    "user_input_modal"
                                ) as HTMLDialogElement;
                                element?.showModal();
                            } else {
                                handleCodeRun();
                            }
                        }}
                    >
                        {runCode ? (
                            <span className="loading loading-dots loading-sm text-warning"></span>
                        ) : (
                            "Run Code"
                        )}
                    </button>
                </div>
            </div>
        </>
    );
}

export default EditorHeader;
