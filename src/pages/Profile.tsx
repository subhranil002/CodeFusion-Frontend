import React, { useState } from "react";
import { FiCamera, FiLock, FiSave } from "react-icons/fi";
import { useSelector } from "react-redux";

function Profile() {
    const { data } = useSelector((state: any) => state.auth);

    const [profile, setProfile] = useState({
        name: data?.fullName || "",
        email: data?.email || "",
        avatar: data?.avatar.secure_url || "",
    });

    const [passwords, setPasswords] = useState({
        current: "",
        new: "",
        confirm: "",
    });

    const [tab, setTab] = useState<"profile" | "password">("profile");

    const handleProfileUpdate = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const initials = profile.name
        .split(" ")
        .map((n: any) => n[0])
        .join("");

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                        User Profile
                    </h1>
                    <p className="text-muted-foreground">
                        Manage your account settings
                    </p>
                </div>

                {/* Card (daisyUI) */}
                <div className="card glass-card">
                    <div className="card-body p-6">
                        {/* Tabs - implemented with local state and daisyUI/tailwind classes */}
                        <div className="w-full">
                            <div className="grid w-full grid-cols-2 mb-4">
                                <button
                                    type="button"
                                    onClick={() => setTab("profile")}
                                    className={`tab tab-lifted ${
                                        tab === "profile" ? "tab-active" : ""
                                    }`}
                                >
                                    Edit Profile
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setTab("password")}
                                    className={`tab tab-lifted ${
                                        tab === "password" ? "tab-active" : ""
                                    }`}
                                >
                                    Change Password
                                </button>
                            </div>

                            {/* Profile Tab Content */}
                            {tab === "profile" && (
                                <div className="space-y-6">
                                    <div className="flex flex-col items-center space-y-4">
                                        <div className="relative">
                                            {/* Avatar (daisyUI) */}
                                            <div className="avatar h-24 w-24">
                                                {profile.avatar ? (
                                                    <div className="w-24 h-24 rounded-full overflow-hidden">
                                                        <img
                                                            src={profile.avatar}
                                                            alt={profile.name}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-24 h-24 rounded-full bg-base-200 flex items-center justify-center text-lg">
                                                        {initials}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Camera button */}
                                            <button
                                                type="button"
                                                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full btn btn-outline p-0"
                                                aria-label="Change avatar"
                                            >
                                                <FiCamera className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <form
                                        onSubmit={handleProfileUpdate}
                                        className="space-y-4"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label
                                                    className="label"
                                                    htmlFor="name"
                                                >
                                                    <span className="label-text">
                                                        Full Name
                                                    </span>
                                                </label>
                                                <input
                                                    id="name"
                                                    className="input input-bordered w-full"
                                                    value={profile.name}
                                                    onChange={(e) =>
                                                        setProfile({
                                                            ...profile,
                                                            name: e.target
                                                                .value,
                                                        })
                                                    }
                                                    placeholder="Enter your full name"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label
                                                    className="label"
                                                    htmlFor="email"
                                                >
                                                    <span className="label-text">
                                                        Email Address
                                                    </span>
                                                </label>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    className="input input-bordered w-full"
                                                    value={profile.email}
                                                    onChange={(e) =>
                                                        setProfile({
                                                            ...profile,
                                                            email: e.target
                                                                .value,
                                                        })
                                                    }
                                                    placeholder="Enter your email"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn w-full"
                                        >
                                            <FiSave className="mr-2 h-4 w-4" />
                                            Save Changes
                                        </button>
                                    </form>
                                </div>
                            )}

                            {/* Password Tab Content */}
                            {tab === "password" && (
                                <div className="space-y-6">
                                    <form
                                        onSubmit={handlePasswordChange}
                                        className="space-y-4"
                                    >
                                        <div className="space-y-2">
                                            <label
                                                className="label"
                                                htmlFor="current-password"
                                            >
                                                <span className="label-text">
                                                    Current Password
                                                </span>
                                            </label>
                                            <input
                                                id="current-password"
                                                type="password"
                                                className="input input-bordered w-full"
                                                value={passwords.current}
                                                onChange={(e) =>
                                                    setPasswords({
                                                        ...passwords,
                                                        current: e.target.value,
                                                    })
                                                }
                                                placeholder="Enter current password"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label
                                                className="label"
                                                htmlFor="new-password"
                                            >
                                                <span className="label-text">
                                                    New Password
                                                </span>
                                            </label>
                                            <input
                                                id="new-password"
                                                type="password"
                                                className="input input-bordered w-full"
                                                value={passwords.new}
                                                onChange={(e) =>
                                                    setPasswords({
                                                        ...passwords,
                                                        new: e.target.value,
                                                    })
                                                }
                                                placeholder="Enter new password"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label
                                                className="label"
                                                htmlFor="confirm-password"
                                            >
                                                <span className="label-text">
                                                    Confirm New Password
                                                </span>
                                            </label>
                                            <input
                                                id="confirm-password"
                                                type="password"
                                                className="input input-bordered w-full"
                                                value={passwords.confirm}
                                                onChange={(e) =>
                                                    setPasswords({
                                                        ...passwords,
                                                        confirm: e.target.value,
                                                    })
                                                }
                                                placeholder="Confirm new password"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn w-full"
                                        >
                                            <FiLock className="mr-2 h-4 w-4" />
                                            Change Password
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
