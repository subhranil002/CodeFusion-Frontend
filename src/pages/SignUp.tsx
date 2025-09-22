import { useState } from "react";
import { useForm } from "react-hook-form";
import {
    FiEye,
    FiEyeOff,
    FiImage,
    FiLock,
    FiMail,
    FiUser,
} from "react-icons/fi";
import { LuLogIn } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { register } from "../redux/slices/AuthSlice";

type FormData = {
    file: FileList;
    fullName: string;
    email: string;
    password: string;
};

function SignUp() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const {
        register: registerInput,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>();
    const dispatch: any = useDispatch();
    const navigate = useNavigate();
    const selectedFile = watch("file")?.[0];
    const location = useLocation();
    const from = location.state?.from || "/";

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        const res = await dispatch(register(data));
        if (res?.payload?.success) {
            navigate(from, { replace: true });
        }
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-primary/20 flex items-center justify-center p-4 sm:p-15">
            <div className="w-full max-w-md">
                <div className="card bg-base-100 shadow-2xl border border-base-300/50">
                    <div className="card-body p-6 sm:p-8">
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-bold text-warning">
                                Create Your Account
                            </h2>
                            <p className="text-base-content/70 mt-1">
                                Join thousands of developers coding together
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            {/* Avatar Upload */}
                            <div className="form-control mx-auto my-auto flex flex-col mb-4">
                                <div className="flex flex-col justify-center">
                                    <div className="flex justify-center">
                                        <label className="label w-24 h-24 rounded-full bg-base-200 relative group">
                                            {selectedFile?.type?.startsWith(
                                                "image/"
                                            ) ? (
                                                <img
                                                    src={URL.createObjectURL(
                                                        selectedFile as any
                                                    )}
                                                    className="rounded-full object-cover w-full h-full"
                                                    alt="Profile preview"
                                                />
                                            ) : (
                                                <FiUser className="w-full h-full p-4 text-base-content/50" />
                                            )}
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                <FiImage className="text-2xl text-white" />
                                            </div>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept=".jpg, .jpeg, .png, .svg"
                                                {...registerInput("file", {
                                                    required:
                                                        "Profile picture is required",
                                                })}
                                            />
                                        </label>
                                    </div>
                                </div>
                                {errors.file && (
                                    <label className="label">
                                        <p className="label-text-alt text-error whitespace-normal text-center">
                                            {errors.file.message}
                                        </p>
                                    </label>
                                )}
                            </div>

                            {/* Full Name Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text flex items-center gap-2">
                                        <FiUser className="text-base-content/70" />
                                        Full Name
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    className={`input input-bordered w-full ${
                                        errors.fullName ? "input-error" : ""
                                    }`}
                                    {...registerInput("fullName", {
                                        required: "Full name is required",
                                        minLength: {
                                            value: 2,
                                            message:
                                                "Name must be at least 2 characters",
                                        },
                                    })}
                                />
                                {errors.fullName && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">
                                            {errors.fullName.message}
                                        </span>
                                    </label>
                                )}
                            </div>

                            {/* Email Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text flex items-center gap-2">
                                        <FiMail className="text-base-content/70" />
                                        Email Address
                                    </span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className={`input input-bordered w-full ${
                                        errors.email ? "input-error" : ""
                                    }`}
                                    {...registerInput("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^(?=.{1,254}$)(?=.{1,64}@)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                            message: "Invalid email format",
                                        },
                                    })}
                                />
                                {errors.email && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">
                                            {errors.email.message}
                                        </span>
                                    </label>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text flex items-center gap-2">
                                        <FiLock className="text-base-content/70" />
                                        Password
                                    </span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="Create a secure password"
                                        className={`input input-bordered w-full pr-12 ${
                                            errors.password ? "input-error" : ""
                                        }`}
                                        {...registerInput("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 8,
                                                message:
                                                    "Password must be at least 8 characters",
                                            },
                                            pattern: {
                                                value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
                                                message:
                                                    "Must include uppercase, number, and special character",
                                            },
                                        })}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-3 text-base-content/70 hover:text-base-content z-10"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? (
                                            <FiEyeOff size={18} />
                                        ) : (
                                            <FiEye size={18} />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">
                                            {errors.password.message}
                                        </span>
                                    </label>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="btn btn-warning w-full mt-6 gap-2"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="loading loading-spinner"></span>
                                ) : (
                                    <>
                                        <LuLogIn className="w-5 h-5" />
                                        Create Account
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="divider my-6">OR</div>

                        <div className="text-center">
                            <p className="text-sm text-base-content/70">
                                Already have an account?{" "}
                                <Link
                                    to="/signin"
                                    state={{ from }}
                                    replace
                                    className="link link-primary font-medium"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <p className="text-xs text-base-content/60">
                        By signing up, you agree to our{" "}
                        <a href="#" className="link link-hover">
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="link link-hover">
                            Privacy Policy
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
