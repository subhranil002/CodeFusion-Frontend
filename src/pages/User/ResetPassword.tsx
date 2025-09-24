import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { resetPassword } from "../../redux/slices/AuthSlice";

interface ResetPasswordForm {
    newPassword: string;
    confirmPassword: string;
}

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [showPasswords, setShowPasswords] = useState({
        new: false,
        confirm: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/;
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ResetPasswordForm>({
        mode: "onSubmit",
    });
    const dispatch: any = useDispatch();
    const newPassword = watch("newPassword");

    const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
        setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const onSubmit = async (data: any) => {
        try {
            setIsLoading(true);
            const res = await dispatch(
                resetPassword({
                    ...data,
                    resetToken: token,
                    password: data.newPassword,
                })
            );
            setIsLoading(false);
            if (res.payload.success) {
                navigate("/signin");
            }
        } catch (err) {
            console.error("Failed to reset password:", err);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-primary/10 pt-40 px-4">
            <div className="max-w-md mx-auto">
                <div className="card bg-base-100 shadow-xl border border-base-300/50">
                    <div className="card-body p-6">
                        <div className="text-center mb-6">
                            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                <FiLock className="text-warning w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-warning">
                                Create your new password
                            </h2>
                            <p className="text-base-content/70 mt-1">
                                Enter a strong password to secure your account
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        New Password
                                    </span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={
                                            showPasswords.new
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Enter new password"
                                        className={`input input-bordered w-full pr-12 ${
                                            errors.newPassword
                                                ? "input-error"
                                                : ""
                                        }`}
                                        {...register("newPassword", {
                                            required:
                                                "New password is required",
                                            minLength: {
                                                value: 8,
                                                message:
                                                    "Password must be at least 8 characters",
                                            },
                                            pattern: {
                                                value: passwordPattern,
                                                message:
                                                    "Must contain uppercase, lowercase, number, and special character",
                                            },
                                        })}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-3 text-base-content/70 hover:text-base-content z-10"
                                        onClick={() =>
                                            togglePasswordVisibility("new")
                                        }
                                        aria-label="Toggle new password visibility"
                                    >
                                        {showPasswords.new ? (
                                            <FiEyeOff size={18} />
                                        ) : (
                                            <FiEye size={18} />
                                        )}
                                    </button>
                                </div>
                                {errors.newPassword && (
                                    <label className="label">
                                        <span className="label-text-alt text-error text-wrap">
                                            {errors.newPassword.message}
                                        </span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        Confirm Password
                                    </span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={
                                            showPasswords.confirm
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Confirm new password"
                                        className={`input input-bordered w-full pr-12 ${
                                            errors.confirmPassword
                                                ? "input-error"
                                                : ""
                                        }`}
                                        {...register("confirmPassword", {
                                            required:
                                                "Please confirm your password",
                                            validate: (value) =>
                                                value === newPassword ||
                                                "Passwords do not match",
                                        })}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-3 text-base-content/70 hover:text-base-content z-10"
                                        onClick={() =>
                                            togglePasswordVisibility("confirm")
                                        }
                                        aria-label="Toggle confirm password visibility"
                                    >
                                        {showPasswords.confirm ? (
                                            <FiEyeOff size={18} />
                                        ) : (
                                            <FiEye size={18} />
                                        )}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <label className="label">
                                        <span className="label-text-alt text-error text-wrap">
                                            {errors.confirmPassword.message}
                                        </span>
                                    </label>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="btn btn-warning w-full gap-2"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="loading loading-spinner"></span>
                                ) : (
                                    <>
                                        <FiLock className="w-4 h-4" />
                                        Reset Password
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
