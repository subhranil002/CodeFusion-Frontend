import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { LuLogIn } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { guestLogin, login } from "../redux/slices/AuthSlice";

type FormData = {
    email: string;
    password: string;
};

function SignIn() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const dispatch: any = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || location.state?.from || "/";

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        const res = await dispatch(login(data));
        if (res?.payload?.success) {
            navigate(from, { replace: true });
        }
        setIsSubmitting(false);
    };

    const handleGuest = async () => {
        setIsSubmitting(true);
        const res = await dispatch(guestLogin());
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
                                Welcome Back
                            </h2>
                            <p className="text-base-content/70 mt-1">
                                Sign in to your CodeFusion account
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
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
                                    {...register("email", {
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
                                <div className="text-right mt-2">
                                    <Link
                                        to="/forgotpassword"
                                        className="text-sm text-primary hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="btn btn-warning w-full mt-2 gap-2"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="loading loading-spinner"></span>
                                ) : (
                                    <>
                                        <LuLogIn className="w-5 h-5" />
                                        Sign In
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Guest Login Button */}
                        <button
                            onClick={handleGuest}
                            className="btn btn-outline btn-success w-full mt-4 gap-2"
                            disabled={isSubmitting}
                        >
                            <LuLogIn className="w-5 h-5" />
                            Continue as Guest
                        </button>

                        <div className="divider my-6">OR</div>

                        <div className="text-center">
                            <p className="text-sm text-base-content/70">
                                Don't have an account?{" "}
                                <Link
                                    to="/signup"
                                    state={{ from }}
                                    replace
                                    className="link link-primary font-medium"
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <p className="text-xs text-base-content/60">
                        By signing in, you agree to our{" "}
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

export default SignIn;
