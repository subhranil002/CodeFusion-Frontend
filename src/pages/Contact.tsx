import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import {
    FiMail,
    FiMapPin,
    FiMessageSquare,
    FiPhone,
    FiSend,
} from "react-icons/fi";

import MapLeaflet from "../components/Contact/MapLeaflet";
import HomeLayout from "../layouts/HomeLayout";

type FormData = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

function ContactUs() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        await new Promise<void>((resolve) =>
            setTimeout(() => {
                resolve();
            }, 1500)
        );
        console.log(data);
        reset();
        setLoading(false);
        alert("Message sent successfully. Thank you!");
    };

    return (
        <HomeLayout>
            <div className="py-12 sm:px-5 lg:px-0">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Get in
                            {" "}
                            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                Touch
                            </span>
                        </h1>
                        <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
                            Have questions or need support? We'd love to hear
                            from you. Send us a message and we'll respond as
                            soon as possible.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8">
                        {/* Contact Form */}
                        <div className="card bg-base-100 shadow-xl border border-base-300 w-full lg:max-w-xl">
                            <div className="card-body p-6 md:p-8">
                                <div className="mb-6">
                                    <h2 className="card-title text-2xl font-bold mb-2 flex items-center gap-2">
                                        <FiMessageSquare className="text-warning text-3xl" />
                                        Send us a Message
                                    </h2>
                                    <p className="text-base-content/70">
                                        Fill out the form below and we'll get
                                        back to you within 24 hours.
                                    </p>
                                </div>

                                <form
                                    className="space-y-4"
                                    onSubmit={handleSubmit(onSubmit)}
                                    aria-busy={loading}
                                >
                                    <div className="form-control flex flex-col">
                                        <label
                                            htmlFor="name"
                                            className="label mb-2"
                                        >
                                            <span className="label-text">
                                                Full Name
                                            </span>
                                        </label>
                                        <input
                                            id="name"
                                            {...register("name", {
                                                required:
                                                    "Full name is required",
                                                minLength: {
                                                    value: 2,
                                                    message:
                                                        "Name must be at least 2 characters",
                                                },
                                            })}
                                            type="text"
                                            placeholder="Enter your full name"
                                            className={`input input-bordered ${
                                                errors.name ? "input-error" : ""
                                            }`}
                                        />
                                        {errors.name && (
                                            <span className="label-text-alt text-error mt-1">
                                                {errors.name.message}
                                            </span>
                                        )}
                                    </div>

                                    <div className="form-control flex flex-col">
                                        <label
                                            htmlFor="email"
                                            className="label mb-2"
                                        >
                                            <span className="label-text">
                                                Email Address
                                            </span>
                                        </label>
                                        <input
                                            id="email"
                                            {...register("email", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^(?=.{1,254}$)(?=.{1,64}@)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                                    message:
                                                        "Invalid email format",
                                                },
                                            })}
                                            type="email"
                                            placeholder="Enter your email"
                                            className={`input input-bordered ${
                                                errors.email
                                                    ? "input-error"
                                                    : ""
                                            }`}
                                        />
                                        {errors.email && (
                                            <span className="label-text-alt text-error mt-1">
                                                {errors.email.message}
                                            </span>
                                        )}
                                    </div>

                                    {/* Subject */}
                                    <div className="form-control flex flex-col">
                                        <label
                                            htmlFor="subject"
                                            className="label mb-2"
                                        >
                                            <span className="label-text">
                                                Subject
                                            </span>
                                        </label>
                                        <input
                                            id="subject"
                                            {...register("subject", {
                                                required: "Subject is required",
                                                minLength: {
                                                    value: 3,
                                                    message:
                                                        "Subject must be at least 3 characters",
                                                },
                                            })}
                                            type="text"
                                            placeholder="What is this regarding?"
                                            className={`input input-bordered ${
                                                errors.subject
                                                    ? "input-error"
                                                    : ""
                                            }`}
                                        />
                                        {errors.subject && (
                                            <span className="label-text-alt text-error mt-1">
                                                {errors.subject.message}
                                            </span>
                                        )}
                                    </div>

                                    {/* Message */}
                                    <div className="form-control flex flex-col">
                                        <label
                                            htmlFor="message"
                                            className="label mb-2"
                                        >
                                            <span className="label-text">
                                                Message
                                            </span>
                                        </label>
                                        <textarea
                                            id="message"
                                            {...register("message", {
                                                required: "Message is required",
                                                minLength: {
                                                    value: 10,
                                                    message:
                                                        "Message must be at least 10 characters",
                                                },
                                                maxLength: {
                                                    value: 2000,
                                                    message:
                                                        "Message is too long",
                                                },
                                            })}
                                            placeholder="Tell us how we can help you..."
                                            className={`textarea textarea-bordered h-32 ${
                                                errors.message
                                                    ? "textarea-error"
                                                    : ""
                                            }`}
                                            disabled={loading}
                                            aria-invalid={!!errors.message}
                                        />
                                        {errors.message && (
                                            <span className="label-text-alt text-error mt-1">
                                                {errors.message.message}
                                            </span>
                                        )}
                                    </div>

                                    {/* Submit */}
                                    <div className="form-control mt-6">
                                        <button
                                            type="submit"
                                            className="btn btn-warning gap-2"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <FaSpinner className="animate-spin -ml-1 mr-2 h-5 w-5" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <FiSend className="text-lg" />
                                                    Send Message
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-6 w-full lg:max-w-sm">
                            <div className="card bg-base-100 shadow-md border border-base-300">
                                <div className="card-body p-6">
                                    <h3 className="card-title text-lg font-bold mb-4">
                                        Contact Information
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                                                <FiMail className="text-xl text-warning" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">
                                                    Email
                                                </h4>
                                                <p className="text-base-content/70">
                                                    support@codefusion.com
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                                                <FiPhone className="text-xl text-warning" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">
                                                    Phone
                                                </h4>
                                                <p className="text-base-content/70">
                                                    +91 9123456789
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                                                <FiMapPin className="text-xl text-warning" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">
                                                    Address
                                                </h4>
                                                <p className="text-base-content/70">
                                                    Kolkata,
                                                    <br />
                                                    West Bengal, IN - 700001
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Section */}
                    <div className="card bg-base-100 shadow-xl border border-base-300 mt-12">
                        <div className="card-body p-6">
                            <h2 className="card-title text-2xl font-bold mb-4">
                                Find Us
                            </h2>
                            <div className="rounded-lg overflow-hidden h-64 border">
                                <MapLeaflet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default ContactUs;
