import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiCamera, FiEdit2, FiSave } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { updateProfile } from "../../redux/slices/AuthSlice";

function Profile() {
    const { data } = useSelector((state: any) => state.auth);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [profileLoading, setProfileLoading] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            fullName: data?.fullName ?? "",
            email: data?.email ?? "",
            avatar: data?.avatar?.secure_url ?? "",
            file: null,
        },
    });
    const selectedFile: any = watch("file")?.[0];
    const dispatch: any = useDispatch();

    const onSubmitProfile = async (formData: any) => {
        setProfileLoading(true);
        await dispatch(updateProfile(formData));
        reset({
            fullName: formData.fullName ?? data?.fullName ?? "",
            email: formData.email ?? data?.email ?? "",
            avatar: "",
            file: null,
        });
        setProfileLoading(false);
        setIsEditingProfile(false);
    };

    const handleCancel = () => {
        reset({
            fullName: data?.fullName ?? "",
            email: data?.email ?? "",
            avatar: data?.avatar?.secure_url ?? "",
            file: undefined,
        });
        setIsEditingProfile(false);
    };

    function modifyCloudinaryURL(url: string) {
        if (import.meta.env.VITE_IMAGE_TRANSFORMATION === "true") {
            return url.replace(
                "/upload/",
                "/upload/ar_1:1,c_auto,g_auto,w_500/r_max/"
            );
        }
        return url;
    }

    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <h1 className="text-3xl font-bold mb-6 text-base-content">
                    My Profile
                </h1>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body p-6 md:p-8">
                        <div className="relative">
                            <div className="transition-all duration-300 ease-in-out opacity-100 translate-x-0 relative">
                                <div className="space-y-6 mb-6">
                                    <div className="flex items-center justify-between">
                                        {!isEditingProfile && (
                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary btn-outline btn-sm gap-2"
                                                    onClick={() =>
                                                        setIsEditingProfile(
                                                            true
                                                        )
                                                    }
                                                    aria-label="Edit profile"
                                                >
                                                    <FiEdit2 className="h-4 w-4" />
                                                    Edit
                                                </button>

                                                {/* ✅ Change Password Button */}
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary btn-outline btn-sm gap-2"
                                                    onClick={() =>
                                                        navigate(
                                                            "/changepassword"
                                                        )
                                                    }
                                                    aria-label="Change password"
                                                >
                                                    Change Password
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Avatar Section */}
                                    <div className="flex flex-col items-center space-y-4">
                                        <div className="relative">
                                            <div className="avatar">
                                                <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                                                    {selectedFile?.type?.startsWith(
                                                        "image/"
                                                    ) ? (
                                                        <img
                                                            src={URL.createObjectURL(
                                                                selectedFile
                                                            )}
                                                            className="rounded-full object-cover w-full h-full"
                                                            alt="Profile preview"
                                                        />
                                                    ) : data?.avatar
                                                          ?.secure_url ? (
                                                        <img
                                                            src={modifyCloudinaryURL(
                                                                data.avatar
                                                                    .secure_url
                                                            )}
                                                            alt={
                                                                data.fullName ||
                                                                "avatar"
                                                            }
                                                            className="object-cover w-full h-full"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full rounded-full bg-neutral flex items-center justify-center text-2xl font-bold text-neutral-content">
                                                            {
                                                                data
                                                                    ?.fullName?.[0]
                                                            }
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {isEditingProfile && (
                                                <>
                                                    <label
                                                        htmlFor="fileUpload"
                                                        className="absolute -bottom-2 -right-2 btn btn-circle btn-outline btn-sm cursor-pointer"
                                                        aria-label="Upload profile picture"
                                                    >
                                                        <FiCamera className="h-4 w-4" />
                                                    </label>
                                                    <input
                                                        id="fileUpload"
                                                        type="file"
                                                        className="hidden"
                                                        accept=".jpg, .jpeg, .png"
                                                        {...register("file")}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Read-only View */}
                                    {!isEditingProfile && (
                                        <div className="space-y-4">
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text text-base-content">
                                                        Full Name
                                                    </span>
                                                </label>
                                                <div className="py-2 px-4 rounded-lg bg-base-200 text-base-content">
                                                    {data?.fullName}
                                                </div>
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text text-base-content">
                                                        Email Address
                                                    </span>
                                                </label>
                                                <div className="py-2 px-4 rounded-lg bg-base-200 text-base-content">
                                                    {data?.email}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Editing Form */}
                                    {isEditingProfile && (
                                        <form
                                            onSubmit={handleSubmit(
                                                onSubmitProfile
                                            )}
                                            className="space-y-4"
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="form-control">
                                                    <label
                                                        className="label"
                                                        htmlFor="name"
                                                    >
                                                        <span className="label-text text-base-content">
                                                            Full Name
                                                        </span>
                                                    </label>
                                                    <input
                                                        id="name"
                                                        className={`input input-bordered ${
                                                            errors.fullName
                                                                ? "input-error"
                                                                : ""
                                                        }`}
                                                        {...register(
                                                            "fullName",
                                                            {
                                                                required:
                                                                    "Name is required",
                                                            }
                                                        )}
                                                        placeholder="Enter your full name"
                                                    />
                                                    {errors.fullName && (
                                                        <span className="label-text-alt text-error mt-1">
                                                            {
                                                                errors.fullName
                                                                    .message as string
                                                            }
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="form-control">
                                                    <label
                                                        className="label"
                                                        htmlFor="email"
                                                    >
                                                        <span className="label-text text-base-content">
                                                            Email Address
                                                        </span>
                                                    </label>
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        className={`input input-bordered ${
                                                            errors.email
                                                                ? "input-error"
                                                                : ""
                                                        }`}
                                                        {...register("email", {
                                                            required:
                                                                "Email is required",
                                                            pattern: {
                                                                value: /^(?=.{1,254}$)(?=.{1,64}@)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                                                message:
                                                                    "Invalid email format",
                                                            },
                                                        })}
                                                        placeholder="Enter your email"
                                                    />
                                                    {errors.email && (
                                                        <span className="label-text-alt text-error mt-1">
                                                            {
                                                                errors.email
                                                                    .message as string
                                                            }
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex flex-col sm:flex-row gap-2 mt-6">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary flex-1"
                                                    disabled={profileLoading}
                                                >
                                                    {!profileLoading && (
                                                        <FiSave className="mr-2 h-4 w-4" />
                                                    )}
                                                    {profileLoading
                                                        ? "Saving..."
                                                        : "Save Changes"}
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-outline flex-1"
                                                    onClick={handleCancel}
                                                    disabled={profileLoading}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;