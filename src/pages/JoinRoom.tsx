import { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    FaUser,
    FaKey,
    FaArrowRight,
    FaPaste,
    FaRandom,
    FaUsers,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { setUsers } from "../redux/slices/EditorSlice";
import { useDispatch } from "react-redux";
import editorSocket from "../configs/EditorSocketConfig";
import toast from "react-hot-toast";

type User = {
    name: string;
    isTyping: boolean;
};

interface FormData {
    userName: string;
    roomId: string[];
}

function JoinRoom() {
    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            userName: "",
            roomId: ["", "", "", ""],
        },
        mode: "onChange",
    });
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const roomId = watch("roomId");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInputChange = (index: number, value: string) => {
        if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
            const newRoomId = [...roomId];
            newRoomId[index] = value.toUpperCase();
            setValue("roomId", newRoomId, { shouldValidate: true });

            if (value && index < 3) {
                setTimeout(() => inputRefs.current[index + 1]?.focus(), 10);
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !roomId[index] && index > 0) {
            setTimeout(() => inputRefs.current[index - 1]?.focus(), 10);
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const paste = e.clipboardData.getData("text").slice(0, 4).toUpperCase();
        const newRoomId = [...roomId];

        paste.split("").forEach((char, i) => {
            if (i < 4 && /^[A-Z0-9]$/.test(char)) {
                newRoomId[i] = char;
            }
        });

        setValue("roomId", newRoomId, { shouldValidate: true });
    };

    const generateRandomId = () => {
        const randomId = Array.from({ length: 4 }, () =>
            Math.random().toString(36).substring(2, 3).toUpperCase()
        );
        setValue("roomId", randomId, { shouldValidate: true });
        setTimeout(() => inputRefs.current[0]?.focus(), 10);
    };

    const onSubmit = (data: FormData) => {
        editorSocket.emit("verifyUniqueUser", {
            roomId: data.roomId.join(""),
            userName: data.userName,
        });
    };

    useEffect(() => {
        editorSocket.on(
            "uniqueUser",
            (data: { roomId: string; userName: string; unique: boolean }) => {
                if (data.unique) {
                    editorSocket.emit("join", {
                        roomId: data.roomId,
                        userName: data.userName,
                    });
                    dispatch(
                        setUsers([
                            {
                                name: data.userName,
                                isTyping: false,
                            },
                        ])
                    );
                    navigate("/playground", {
                        state: {
                            roomId: data.roomId,
                        },
                    });
                } else {
                    toast.error("Username already taken!");
                }
            }
        );
        editorSocket.on("updateUsers", ({users}: {users: User[]}) => {
            dispatch(setUsers(users));
        });

        return () => {
            editorSocket.off("uniqueUser");
            editorSocket.off("updateUsers");
        };
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary to-secondary">
            <div className="card w-full max-w-md bg-base-100 shadow-2xl overflow-hidden border transform transition-all hover:shadow-info/20 hover:shadow-xl">
                <div className="card-body p-6 sm:p-8">
                    <div className="text-center space-y-4 mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg">
                            <FaUsers className="text-2xl text-white" />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Join Code Room
                        </h1>
                        <p className="text-base-content/70">
                            Collaborate in real-time with developers worldwide
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        {/* Name Field */}
                        <div className="form-control">
                            <label className="label justify-start gap-2 p-0 mb-2">
                                <FaUser className="text-secondary" />
                                <span className="label-text text-base-content/80 font-medium">
                                    Your Name
                                </span>
                            </label>
                            <div className="relative">
                                <Controller
                                    name="userName"
                                    control={control}
                                    rules={{
                                        required: "Name is required",
                                        minLength: {
                                            value: 2,
                                            message:
                                                "Name must be at least 2 characters",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            placeholder="Enter your name"
                                            className={`input input-bordered w-full bg-base-200 focus:ring-2 ring-primary transition-all ${
                                                errors.userName
                                                    ? "input-error"
                                                    : ""
                                            }`}
                                        />
                                    )}
                                />
                            </div>
                            {errors.userName && (
                                <label className="label">
                                    <span className="label-text-alt text-error">
                                        {errors.userName.message}
                                    </span>
                                </label>
                            )}
                        </div>

                        {/* Room ID Field */}
                        <div className="form-control">
                            <div className="flex justify-between items-center mb-2">
                                <label className="label justify-start gap-2 p-0">
                                    <FaKey className="text-secondary" />
                                    <span className="label-text text-base-content/80 font-medium">
                                        Room ID
                                    </span>
                                </label>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigator.clipboard
                                                .readText()
                                                .then((text) => {
                                                    const pasteEvent =
                                                        new ClipboardEvent(
                                                            "paste",
                                                            {
                                                                clipboardData:
                                                                    new DataTransfer(),
                                                            }
                                                        );
                                                    pasteEvent.clipboardData?.setData(
                                                        "text/plain",
                                                        text
                                                    );
                                                    handlePaste(
                                                        pasteEvent as any
                                                    );
                                                })
                                        }
                                        className="btn btn-ghost btn-square btn-xs text-primary hover:bg-primary/10 tooltip"
                                        data-tip="Paste"
                                    >
                                        <FaPaste className="text-sm" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={generateRandomId}
                                        className="btn btn-ghost btn-square btn-xs text-primary hover:bg-primary/10 tooltip"
                                        data-tip="Random ID"
                                    >
                                        <FaRandom className="text-sm" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-3 mb-3">
                                {roomId.map((value, index) => (
                                    <Controller
                                        key={index}
                                        name={`roomId.${index}` as const}
                                        control={control}
                                        rules={{ required: "Required" }}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                ref={(el) => {
                                                    inputRefs.current[index] =
                                                        el;
                                                    field.ref(el);
                                                }}
                                                type="text"
                                                value={value}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                                onKeyDown={(e) =>
                                                    handleKeyDown(index, e)
                                                }
                                                onPaste={handlePaste}
                                                maxLength={1}
                                                className={`input input-bordered w-full text-center text-2xl font-mono font-bold h-14 bg-base-200 focus:ring-2 ring-primary transition-all ${
                                                    errors.roomId?.[index]
                                                        ? "input-error"
                                                        : ""
                                                }`}
                                            />
                                        )}
                                    />
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full mt-4"
                        >
                            Join Room
                            <FaArrowRight className="ml-2 text-base" />
                        </button>
                    </form>
                </div>

                <div className="card-actions justify-center p-4 bg-base-200 bg-opacity-50 text-center text-xs text-base-content/70">
                    By joining, you agree to our
                    <span className="text-primary font-medium cursor-pointer hover:underline ml-1">
                        Code of Conduct
                    </span>
                </div>
            </div>
        </div>
    );
}

export default JoinRoom;
