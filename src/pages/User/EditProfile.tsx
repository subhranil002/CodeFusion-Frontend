import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiArrowLeft, FiImage, FiMail, FiSave, FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../layouts/HomeLayout";
import { getProfile, updateProfile } from "../../redux/slices/AuthSlice";

interface EditProfileForm {
    fullName: string;
    email: string;
    file: FileList | null;
}

function EditProfile() {
    const dispatch: any = useDispatch();
    const navigate = useNavigate();
    const { data } = useSelector((state: any) => state.auth);
    const [isLoading, setIsLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EditProfileForm>({
        defaultValues: {
            fullName: data?.fullName || "",
            email: data?.email || "",
            file: null,
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const onSubmit = async (formData: EditProfileForm) => {
        setIsLoading(true);
        try {
            await dispatch(updateProfile(formData));
            await dispatch(getProfile());
            navigate("/profile");
        } catch (error) {
            console.error("Update failed:", error);
        }
        setIsLoading(false);
    };

    const getAvatarUrl = () => {
        if (previewUrl) return previewUrl;
        if (data?.avatar?.secure_url) {
            return data.avatar.secure_url.replace(
                "/upload/",
                "/upload/ar_1:1,c_auto,g_auto,w_500/r_max/"
            );
        }
        return null;
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
                        <h1 className="text-3xl font-bold">Edit Profile</h1>
                    </div>

                    <div className="card bg-base-100 shadow-xl border border-base-300/50">
                        <div className="card-body p-6">
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-6"
                            >
                                <div className="flex flex-col items-center">
                                    <div className="relative group">
                                        <div className="avatar">
                                            <div className="w-24 h-24 rounded-full bg-base-300 flex items-center justify-center">
                                                {getAvatarUrl() ? (
                                                    <img
                                                        src={getAvatarUrl()!}
                                                        alt="Profile"
                                                        className="rounded-full object-cover w-full h-full"
                                                    />
                                                ) : (
                                                    <FiUser className="w-12 h-12 text-base-content/50" />
                                                )}
                                            </div>
                                        </div>

                                        <label className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                            <FiImage className="text-white text-2xl" />
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept=".jpg,.jpeg,.png,.webp"
                                                {...register("file", {
                                                    onChange: handleFileChange,
                                                })}
                                            />
                                        </label>
                                    </div>
                                    <p className="text-sm text-base-content/70 mt-2">
                                        Click avatar to change photo
                                    </p>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold flex items-center gap-2">
                                            <FiUser className="text-base-content/70" />
                                            Full Name
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your full name"
                                        className={`input input-bordered w-full ${
                                            errors.fullName ? "input-error" : ""
                                        }`}
                                        {...register("fullName", {
                                            required: "Full name is required",
                                            minLength: {
                                                value: 2,
                                                message:
                                                    "Name must be at least 2 characters",
                                            },
                                        })}
                                    />
                                    {errors.fullName && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.fullName.message}
                                            </span>
                                        </label>
                                    )}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold flex items-center gap-2">
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
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message:
                                                    "Invalid email address",
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
                                            <FiSave className="w-4 h-4" />
                                            Update Profile
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

export default EditProfile;
