import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FiImage, FiUser } from "react-icons/fi";
import { LuLogIn } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

type FormData = {
    file: FileList;
    fullName: string;
    email: string;
    password: string;
};

function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>();
    const selectedFile = watch("file")?.[0];

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(data);
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-warning to-error/50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="card bg-base-100 shadow-xl border border-base-300">
                    <div className="card-body p-6 sm:p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-warning to-warning/50 bg-clip-text text-transparent mb-2">
                                Create Account
                            </h1>
                            <p className="text-base-content/70">
                                Code, learn, and build together
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
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
                                                {...register("file", {
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
                            <div className="form-control">
                                <label className="label mb-1">
                                    <span className="label-text flex items-center gap-2">
                                        <FiUser className="text-base-content/70" />
                                        Full Name
                                    </span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        className="input input-bordered w-full"
                                        {...register("fullName", {
                                            required: "Full name is required",
                                        })}
                                    />
                                </div>
                                {errors.fullName && (
                                    <label className="label">
                                        <span className="label-text-alt text-error whitespace-normal">
                                            {errors.fullName.message}
                                        </span>
                                    </label>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label mb-1" htmlFor="email">
                                    <span className="label-text font-medium">
                                        Email
                                    </span>
                                </label>
                                <input
                                    placeholder="Enter your email"
                                    className={`input input-bordered w-full ${
                                        errors.email ? "input-error" : ""
                                    }`}
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^(?=.{1,254}$)(?=.{1,64}@)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                            message: "Invalid email format",
                                        },
                                    })}
                                />
                                {errors.email && (
                                    <label className="label mt-1">
                                        <span className="label-text-alt text-error text-wrap">
                                            {errors.email.message}
                                        </span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control">
                                <label
                                    className="label mb-1"
                                    htmlFor="password"
                                >
                                    <span className="label-text font-medium">
                                        Password
                                    </span>
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="Enter your password"
                                        className={`input input-bordered w-full pr-12 ${
                                            errors.password ? "input-error" : ""
                                        }`}
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 8,
                                                message:
                                                    "Password must be at least 8 characters",
                                            },
                                            pattern: {
                                                value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
                                                message:
                                                    "Password must contain at least one uppercase letter, one number, and one special character",
                                            },
                                        })}
                                    />
                                    <button
                                        className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? (
                                            <FaRegEyeSlash className="h-5 w-5 text-base-content/70" />
                                        ) : (
                                            <FaRegEye className="h-5 w-5 text-base-content/70" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <label className="label mt-1">
                                        <span className="label-text-alt text-error text-wrap">
                                            {errors.password.message}
                                        </span>
                                    </label>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="btn btn-warning w-full flex justify-center items-center space-x-2 mt-2"
                                disabled={isSubmitting}
                            >
                                <LuLogIn className="h-5 w-5" />
                                <span>Sign Up</span>
                            </button>
                        </form>

                        <div className="text-center mt-4">
                            <p className="text-sm text-base-content/70">
                                Already have an account?{" "}
                                <Link
                                    to="/signin"
                                    className="text-info hover:underline font-medium"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
