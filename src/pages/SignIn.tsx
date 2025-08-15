import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { guestLogin, login } from "../redux/slices/AuthSlice";

type FormData = {
    email: string;
    password: string;
};

function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const dispatch: any = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        const res = await dispatch(login(data));
        if (res?.payload?.success) {
            navigate("/");
        }
        setIsSubmitting(false);
    };

    const handleGuest = async () => {
        setIsSubmitting(true);
        const res = await dispatch(guestLogin());
        if (res?.payload?.success) {
            navigate("/");
        }
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-warning to-error/50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="card bg-base-100 shadow-xl border border-base-300">
                    <div className="card-body p-6 sm:p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-warning to-warning/50 bg-clip-text text-transparent mb-2">
                                Welcome Back
                            </h1>
                            <p className="text-base-content/70">
                                Sign in to your CodeFusion account
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
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
                                <div className="text-right mt-2">
                                    <Link
                                        to="/forgot-password"
                                        className="text-sm text-info hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-warning w-full flex justify-center items-center space-x-2 mt-2"
                                disabled={isSubmitting}
                            >
                                <LuLogIn className="h-5 w-5" />
                                <span>Sign In</span>
                            </button>
                        </form>

                        <button
                            onClick={handleGuest}
                            className="btn btn-success btn-block gap-2 mt-3"
                            disabled={isSubmitting}
                        >
                            <LuLogIn className="text-xl" />
                            Guest Login
                        </button>

                        <div className="text-center mt-4">
                            <p className="text-sm text-base-content/70">
                                Don't have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="text-info hover:underline font-medium"
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
