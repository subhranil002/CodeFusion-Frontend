import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiMail } from "react-icons/fi";
import { useDispatch } from "react-redux";

import { forgotPassword } from "../../redux/slices/AuthSlice";

interface ForgotPasswordForm {
    email: string;
}

function ForgotPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordForm>({
        mode: "onSubmit",
    });
    const dispatch: any = useDispatch();

    const onSubmit = async (data:any) => {
        try {
            setIsLoading(true);
            await dispatch(forgotPassword(data));
            setIsLoading(false);
        } catch (err) {
            console.error("Failed to request password reset:", err);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-primary/10 pt-40 px-4">
            <div className="max-w-md mx-auto">
                <div className="card bg-base-100 shadow-xl border border-base-300/50 p-5">
                    <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                            <FiMail className="text-warning w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold text-warning">
                            Forgot Password
                        </h2>
                        <p className="text-base-content/70 mt-1">
                            Enter your email to receive a reset link
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div className="form-control">
                            <label className="label mb-2">
                                <span className="label-text font-semibold">
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
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address",
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

                        <button
                            type="submit"
                            className="btn btn-warning w-full gap-2"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                <>
                                    <FiMail className="w-4 h-4" />
                                    Send Reset Link
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
