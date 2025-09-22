import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiArrowLeft, FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../layouts/HomeLayout";

interface ChangePasswordForm {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

function ChangePassword() {
    const navigate = useNavigate();
    const [showPasswords, setShowPasswords] = useState({
        old: false,
        new: false,
        confirm: false,
    });
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ChangePasswordForm>({
        mode: "onSubmit",
    });

    const newPassword = watch("newPassword");

    const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
        setShowPasswords((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/;

    const onSubmit = async (data: ChangePasswordForm) => {
        if (data.oldPassword === data.newPassword) return;

        try {
            setIsLoading(true);
            // simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1300));
            // TODO: call your real API here (e.g. dispatch action)
            console.log("Password change requested", data);
            setIsLoading(false);

            // keep short delay to show success state, then navigate
            setTimeout(() => {
                navigate("/profile");
            }, 1400);
        } catch (err) {
            console.error("Failed to change password:", err);
            setIsLoading(false);
        }
    };

    return (
        <HomeLayout>
            <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-primary/10 pt-20 px-4">
                <div className="max-w-md mx-auto">
                    <div className="flex items-center gap-4 mb-5 text-primary">
                        <Link
                            to="/profile"
                            className="btn btn-ghost btn-circle"
                        >
                            <FiArrowLeft className="text-3xl font-bold" />
                        </Link>
                        <h1 className="text-3xl font-bold">Change Password</h1>
                    </div>

                    <div className="card bg-base-100 shadow-xl border border-base-300/50">
                        <div className="card-body p-6">
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-6"
                            >
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold flex items-center gap-2">
                                            <FiLock className="text-base-content/70" />
                                            Current Password
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={
                                                showPasswords.old
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Enter current password"
                                            className={`input input-bordered w-full pr-12 ${
                                                errors.oldPassword
                                                    ? "input-error"
                                                    : ""
                                            }`}
                                            {...register("oldPassword", {
                                                required:
                                                    "Current password is required",
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
                                                togglePasswordVisibility("old")
                                            }
                                            aria-label="Toggle current password visibility"
                                        >
                                            {showPasswords.old ? (
                                                <FiEyeOff size={18} />
                                            ) : (
                                                <FiEye size={18} />
                                            )}
                                        </button>
                                    </div>
                                    {errors.oldPassword && (
                                        <label className="label">
                                            <span className="label-text-alt text-error text-wrap">
                                                {errors.oldPassword.message}
                                            </span>
                                        </label>
                                    )}
                                </div>

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
                                                validate: (value) =>
                                                    value !==
                                                        watch("oldPassword") ||
                                                    "New password must be different from current password",
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
                                            Confirm New Password
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
                                                togglePasswordVisibility(
                                                    "confirm"
                                                )
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
                                            Update Password
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default ChangePassword;
