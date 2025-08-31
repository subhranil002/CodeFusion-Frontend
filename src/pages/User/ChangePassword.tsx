import { useForm } from "react-hook-form";
import { FiLock } from "react-icons/fi";

type PasswordFormValues = {
    current: string;
    newPassword: string;
    confirmPassword: string;
};

function ChangePassword() {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<PasswordFormValues>();

    const onSubmit = (data: PasswordFormValues) => {
        console.log("Password change request:", data);
        reset();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center">
            <div className="card glass-card w-full max-w-md">
                <div className="card-body p-6">
                    <h2 className="text-2xl font-bold text-center mb-4">
                        Change Password
                    </h2>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        {/* Current Password */}
                        <div className="space-y-2">
                            <label htmlFor="current" className="label">
                                <span className="label-text">
                                    Current Password
                                </span>
                            </label>
                            <input
                                id="current"
                                type="password"
                                className="input input-bordered w-full"
                                {...register("current", {
                                    required: "Current password is required",
                                    minLength: {
                                        value: 8,
                                        message:
                                            "Old password must be at least 8 characters",
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
                                        message:
                                            "Must contain uppercase, number, and special character",
                                    },
                                })}
                                placeholder="Enter current password"
                            />
                            {errors.current && (
                                <p className="text-red-500 text-sm">
                                    {errors.current.message}
                                </p>
                            )}
                        </div>

                        {/* New Password */}
                        <div className="space-y-2">
                            <label htmlFor="newPassword" className="label">
                                <span className="label-text">New Password</span>
                            </label>
                            <input
                                id="newPassword"
                                type="password"
                                className="input input-bordered w-full"
                                {...register("newPassword", {
                                    required: "New password is required",
                                    minLength: {
                                        value: 8,
                                        message:
                                            "New password must be at least 8 characters",
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
                                        message:
                                            "Must contain uppercase, number, and special character",
                                    },
                                })}
                                placeholder="Enter new password"
                            />
                            {errors.newPassword && (
                                <p className="text-red-500 text-sm">
                                    {errors.newPassword.message}
                                </p>
                            )}
                        </div>

                        {/* Confirm New Password */}
                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="label">
                                <span className="label-text">
                                    Confirm New Password
                                </span>
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                className="input input-bordered w-full"
                                {...register("confirmPassword", {
                                    required:
                                        "Please confirm your new password",
                                    minLength: {
                                        value: 8,
                                        message:
                                            "Confirm password must be at least 8 characters",
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
                                        message:
                                            "Must contain uppercase, number, and special character",
                                    },
                                    validate: (value) =>
                                        value === watch("newPassword") ||
                                        "Passwords do not match",
                                })}
                                placeholder="Confirm new password"
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        <button type="submit" className="btn w-full">
                            <FiLock className="mr-2 h-4 w-4" />
                            Update Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;
