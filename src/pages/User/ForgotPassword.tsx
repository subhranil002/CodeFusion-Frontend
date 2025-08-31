import { useForm } from "react-hook-form";
import { FiMail } from "react-icons/fi";

type ForgotPasswordFormValues = {
    email: string;
};

function ForgotPassword() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordFormValues>();

    const onSubmit = async (data: ForgotPasswordFormValues) => {
        console.log("Forgot password request:", data);
        reset();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center">
            <div className="card glass-card w-full max-w-md">
                <div className="card-body p-6">
                    <h2 className="text-2xl font-bold text-center mb-4">
                        Forgot Password
                    </h2>
                    <p className="text-muted-foreground text-center mb-6">
                        Enter your email to receive a reset link
                    </p>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="label">
                                <span className="label-text">
                                    Email Address
                                </span>
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="input input-bordered w-full"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^(?=.{1,254}$)(?=.{1,64}@)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                        message: "Invalid email format",
                                    },
                                })}
                                placeholder="Enter your email"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn w-full"
                            disabled={isSubmitting}
                        >
                            <FiMail className="mr-2 h-4 w-4" />
                            {isSubmitting ? "Sending..." : "Send Reset Link"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
