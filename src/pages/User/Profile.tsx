import {
    FaCheck,
    FaCrown,
    FaEdit,
    FaExclamationTriangle,
    FaKey,
    FaStar,
    FaTimes,
    FaUserTag,
} from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import cancelSubscriptionApi from "../../apis/payment/cancelSubscriptionApi";
import HomeLayout from "../../layouts/HomeLayout";
import { getProfile } from "../../redux/slices/AuthSlice";

function Profile() {
    const { data: userData } = useSelector((state: any) => state?.auth);
    const dispatch: any = useDispatch();

    async function handleCancelation() {
        await cancelSubscriptionApi();
        await dispatch(getProfile());
    }

    function modifyCloudinaryURL(url: string) {
        if (url === "" || url === null) return "";
        if (import.meta.env.VITE_IMAGE_TRANSFORMATION === "true") {
            return url.replace(
                "/upload/",
                "/upload/ar_1:1,c_auto,g_auto,w_500/r_max/"
            );
        }
        return url;
    }

    const getSubscriptionBadge = () => {
        if (userData?.role === "ADMIN") {
            return { label: "Admin", color: "badge-info" };
        }
        if (userData?.subscription?.status === "active") {
            if (userData?.subscription?.plan === "pro") {
                return { label: "Pro", color: "badge-error" };
            } else if (userData?.subscription?.plan === "basic") {
                return { label: "Basic", color: "badge-primary" };
            }
        }
        return { label: "Free", color: "badge-neutral" };
    };

    const subscriptionBadge = getSubscriptionBadge();

    return (
        <HomeLayout>
            {/* Avatar Modal */}
            <dialog id="avatar-modal" className="modal">
                <div className="modal-box max-w-2xl bg-base-100 shadow-xl p-0 overflow-hidden">
                    <form
                        method="dialog"
                        className="absolute right-2 top-2 z-10"
                    >
                        <button className="btn btn-circle btn-neutral btn-sm">
                            <FaTimes className="text-xl" />
                        </button>
                    </form>
                    <div className="flex items-center justify-center min-h-[50vh]">
                        {userData?.avatar?.secure_url ? (
                            <img
                                src={userData.avatar.secure_url}
                                alt="Full Size Avatar"
                                className="w-full h-auto object-contain max-h-[70vh]"
                            />
                        ) : (
                            <div className="text-center p-8">
                                <p className="text-gray-500">
                                    No avatar available
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </dialog>

            {/* Cancel Subscription Modal */}
            <dialog id="cancel-subscription-modal" className="modal">
                <div className="modal-box bg-base-100 border border-error/20 shadow-xl mx-2">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="text-error mb-2 sm:mb-4">
                            <FaExclamationTriangle className="text-4xl sm:text-5xl animate-pulse" />
                        </div>
                        <h3 className="font-bold text-xl sm:text-2xl flex items-center gap-2">
                            Cancel Subscription?
                        </h3>
                        <p className="py-2 sm:py-4 text-base sm:text-lg text-base-content/80">
                            This will revoke your access to all premium content.
                            <br />
                            <span className="text-error font-semibold mt-1 sm:mt-2 block text-sm sm:text-base">
                                This action is irreversible!
                            </span>
                        </p>
                        <div className="modal-action flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 w-full">
                            <button
                                className="btn btn-outline btn-sm sm:btn-md gap-2"
                                onClick={() => {
                                    const element = document.getElementById(
                                        "cancel-subscription-modal"
                                    ) as HTMLDialogElement;
                                    element?.close();
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-error btn-sm sm:btn-md gap-2"
                                onClick={() => {
                                    const element = document.getElementById(
                                        "cancel-subscription-modal"
                                    ) as HTMLDialogElement;
                                    element?.close();
                                    handleCancelation();
                                }}
                            >
                                <FaCheck />
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>

            <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-primary/5 pt-20 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold mb-2 text-primary">My Profile</h1>
                        <p className="text-base-content/70">
                            Manage your account settings and preferences
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Profile Card */}
                        <div className="md:col-span-2">
                            <div className="card bg-base-100 shadow-xl border border-base-300">
                                <div className="card-body p-6">
                                    {/* Avatar Section */}
                                    <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                                        <div className="relative group">
                                            <div className="avatar online">
                                                <div
                                                    className="w-24 rounded-full ring-2 ring-primary ring-offset-2 sm:ring-offset-4 cursor-pointer hover:ring-primary-focus transition-all"
                                                    onClick={() => {
                                                        const element =
                                                            document.getElementById(
                                                                "avatar-modal"
                                                            ) as HTMLDialogElement;
                                                        element?.showModal();
                                                    }}
                                                >
                                                    <img
                                                        src={modifyCloudinaryURL(
                                                            userData?.avatar
                                                                ?.secure_url || ""
                                                        )}
                                                        className="object-cover"
                                                        alt="User Avatar"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-center sm:text-left">
                                            <h2 className="text-2xl font-bold capitalize mb-2">
                                                {userData?.fullName}
                                            </h2>
                                            <div className="badge badge-lg gap-2 font-semibold">
                                                {subscriptionBadge.label ===
                                                    "Pro" && (
                                                    <FaCrown className="min-w-4 min-h-4" />
                                                )}
                                                <span
                                                    className={`badge ${subscriptionBadge.color}`}
                                                >
                                                    {subscriptionBadge.label}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* User Info Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <div className="flex items-center gap-3 p-4 bg-base-200 rounded-lg">
                                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                                <MdEmail className="min-w-5 min-h-5 text-primary" />
                                            </div>
                                            <div className="w-[75%]">
                                                <p className="text-sm text-base-content/60">
                                                    Email
                                                </p>
                                                <p className="font-medium truncate w-full">
                                                    {userData?.email}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-4 bg-base-200 rounded-lg">
                                            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                                                <FaUserTag className="min-w-5 min-h-5 text-secondary" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-base-content/60">
                                                    Role
                                                </p>
                                                <p className="font-medium capitalize">
                                                    {userData?.role}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-4 bg-base-200 rounded-lg">
                                            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                                                <FaStar className="min-w-5 min-h-5 text-accent" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-base-content/60">
                                                    Status
                                                </p>
                                                <p className="font-medium">
                                                    {userData?.subscription
                                                        ?.status === "active"
                                                        ? "Active"
                                                        : "Inactive"}
                                                </p>
                                            </div>
                                        </div>

                                        {userData?.subscription?.status ===
                                            "active" && (
                                            <div className="flex items-center gap-3 p-4 bg-base-200 rounded-lg">
                                                <div className="w-10 h-10 rounded-full bg-info/20 flex items-center justify-center">
                                                    <SlCalender className="min-w-5 min-h-5 text-info" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-base-content/60">
                                                        Subscription Expires
                                                    </p>
                                                    <p className="font-medium">
                                                        {new Date(
                                                            userData?.subscription?.expiresOn
                                                        ).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Link
                                            to="/changepassword"
                                            className="btn btn-warning gap-2"
                                        >
                                            <FaKey className="w-4 h-4" />
                                            Change Password
                                        </Link>
                                        <Link
                                            to="/editprofile"
                                            className="btn btn-info gap-2"
                                        >
                                            <FaEdit className="w-4 h-4" />
                                            Edit Profile
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Sidebar */}
                        <div className="space-y-6">
                            {/* Usage Stats */}
                            <div className="card bg-base-100 shadow-xl border border-base-300">
                                <div className="card-body p-6">
                                    <h3 className="font-bold text-lg mb-4">
                                        Usage Stats
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-base-content/70">
                                                Code Executions
                                            </span>
                                            <span className="font-bold text-primary">
                                                {userData?.codeExecutionCount}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-base-content/70">
                                                AI Interactions
                                            </span>
                                            <span className="font-bold text-secondary">
                                                {userData?.aiInteractionCount}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-base-content/70">
                                                Rooms Created
                                            </span>
                                            <span className="font-bold text-accent">
                                                {userData?.rooms?.length}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Subscription Management */}
                            {userData?.role !== "ADMIN" &&
                                userData?.subscription?.status === "active" && (
                                    <div className="card bg-base-100 shadow-xl border border-error/20">
                                        <div className="card-body p-6">
                                            <h3 className="font-bold text-lg mb-2">
                                                Subscription
                                            </h3>
                                            <p className="text-sm text-base-content/70 mb-4">
                                                Manage your subscription plan
                                            </p>
                                            <button
                                                onClick={() => {
                                                    const element =
                                                        document.getElementById(
                                                            "cancel-subscription-modal"
                                                        ) as HTMLDialogElement;
                                                    element?.showModal();
                                                }}
                                                className="btn btn-error btn-outline w-full gap-2"
                                            >
                                                <IoIosTime className="w-4 h-4" />
                                                Cancel Subscription
                                            </button>
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default Profile;
