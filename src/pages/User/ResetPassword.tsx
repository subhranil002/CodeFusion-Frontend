import { useForm } from "react-hook-form";
import { FiLock } from "react-icons/fi";

type ResetPasswordFormValues = {
    newPassword: string;
    confirmPassword: string;
};

function ResetPassword() {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ResetPasswordFormValues>();

    const onSubmit = async (data: ResetPasswordFormValues) => {
        console.log("Reset password request:", data);

        // Example: API call
        // await api.resetPassword({ newPassword: data.newPassword });

        reset();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center">
            <div className="card glass-card w-full max-w-md">
                <div className="card-body p-6">
                    <h2 className="text-2xl font-bold text-center mb-4">
                        Reset Password
                    </h2>
                    <p className="text-muted-foreground text-center mb-6">
                        Enter your new password below
                    </p>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
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

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="label">
                                <span className="label-text">
                                    Confirm Password
                                </span>
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                className="input input-bordered w-full"
                                {...register("confirmPassword", {
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

                        <button
                            type="submit"
                            className="btn w-full"
                            disabled={isSubmitting}
                        >
                            <FiLock className="mr-2 h-4 w-4" />
                            {isSubmitting ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
