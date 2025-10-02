import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
    FaCalendarCheck,
    FaCheck,
    FaChevronDown,
    FaCrown,
    FaFileInvoiceDollar,
    FaReceipt,
    FaRupeeSign,
    FaTimesCircle,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import getPaymentHistoryApi from "../../apis/payment/getPaymentHistoryApi";
import HomeLayout from "../../layouts/HomeLayout";

function PurchaseHistory() {
    const navigate = useNavigate();
    const { data } = useSelector((state: any) => state.auth);
    const [expandedPurchase, setExpandedPurchase] = useState<string | null>(
        null
    );
    const [paymentHistory, setPaymentHistory] = useState<any>([]);

    useEffect(() => {
        (async () => {
            setPaymentHistory((await getPaymentHistoryApi()).data);
        })();
    }, []);

    const toggleExpand = (purchaseId: string) => {
        setExpandedPurchase(
            expandedPurchase === purchaseId ? null : purchaseId
        );
    };

    const getPlanName = (amount: number) => {
        switch (amount) {
            case 999:
                return {
                    name: "Pro Plan",
                    color: "badge-warning",
                    icon: <FaCrown className="w-3 h-3" />,
                };
            case 499:
                return {
                    name: "Basic Plan",
                    color: "badge-primary",
                    icon: <FaReceipt className="w-3 h-3" />,
                };
            default:
                return {
                    name: "Custom Plan",
                    color: "badge-neutral",
                    icon: <FaReceipt className="w-3 h-3" />,
                };
        }
    };

    const StatusBadge = ({ status }: { status: string }) => (
        <span
            className={`badge badge-sm font-semibold ${
                status === "completed" ? "badge-success" : "badge-error"
            } gap-1`}
        >
            {status === "completed" ? (
                <>
                    <FaCheck className="w-3 h-3" />
                    Completed
                </>
            ) : (
                <>
                    <FaTimesCircle className="w-3 h-3" />
                    Cancelled
                </>
            )}
        </span>
    );

    const isCurrentSubscription = (subscriptionId: string) => {
        return data?.subscription?.id === subscriptionId;
    };

    return (
        <HomeLayout>
            <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-primary/5 pt-20 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">
                            Purchase
                            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                {" "}
                                History
                            </span>
                        </h1>
                        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                            Track all your subscription purchases and manage
                            your billing history
                        </p>
                        <div className="divider divider-primary w-24 mx-auto my-6" />
                    </div>

                    {paymentHistory?.length > 0 ? (
                        <div className="space-y-6">
                            {/* Desktop Table */}
                            <div className="hidden md:block">
                                <div className="card bg-base-100 shadow-xl border border-base-300">
                                    <div className="card-body p-0">
                                        <div className="overflow-x-auto">
                                            <table className="table table-zebra">
                                                <thead className="bg-base-200">
                                                    <tr>
                                                        <th className="text-lg font-bold">
                                                            Subscription Details
                                                        </th>
                                                        <th className="text-lg font-bold">
                                                            Plan
                                                        </th>
                                                        <th className="text-lg font-bold">
                                                            Amount
                                                        </th>
                                                        <th className="text-lg font-bold">
                                                            Date
                                                        </th>
                                                        <th className="text-lg font-bold">
                                                            Status
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {paymentHistory.map(
                                                        (purchase: any) => {
                                                            const plan =
                                                                getPlanName(
                                                                    purchase.amount
                                                                );
                                                            return (
                                                                <tr
                                                                    key={
                                                                        purchase._id
                                                                    }
                                                                    className="hover:bg-base-200/50 transition-colors"
                                                                >
                                                                    <td>
                                                                        <div className="flex flex-col gap-2">
                                                                            <div className="flex items-center gap-2">
                                                                                <FaFileInvoiceDollar className="text-primary" />
                                                                                <span className="font-mono text-sm">
                                                                                    {
                                                                                        purchase.razorpay_payment_id
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                            <div className="text-xs text-base-content/60 font-mono">
                                                                                {
                                                                                    purchase.razorpay_subscription_id
                                                                                }
                                                                            </div>
                                                                            {isCurrentSubscription(
                                                                                purchase.razorpay_subscription_id
                                                                            ) && (
                                                                                <div className="badge badge-success badge-sm gap-1">
                                                                                    <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
                                                                                    Active
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="flex items-center gap-2">
                                                                            <span
                                                                                className={`badge ${plan.color} badge-lg gap-2`}
                                                                            >
                                                                                {
                                                                                    plan.icon
                                                                                }
                                                                                {
                                                                                    plan.name
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="text-2xl font-bold text-primary">
                                                                                <FaRupeeSign className="inline w-4 h-4" />
                                                                                {
                                                                                    purchase.amount
                                                                                }
                                                                            </span>
                                                                            <span className="text-sm text-base-content/60">
                                                                                INR
                                                                            </span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="flex items-center gap-2">
                                                                            <FaCalendarCheck className="text-secondary" />
                                                                            <span className="font-medium">
                                                                                {format(
                                                                                    new Date(
                                                                                        purchase.createdAt
                                                                                    ),
                                                                                    "dd MMM yyyy"
                                                                                )}
                                                                            </span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <StatusBadge
                                                                            status={
                                                                                purchase.status
                                                                            }
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Cards */}
                            <div className="md:hidden space-y-4">
                                {paymentHistory.map((purchase: any) => {
                                    const plan = getPlanName(purchase.amount);
                                    return (
                                        <div
                                            key={purchase._id}
                                            className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all"
                                        >
                                            <div
                                                className="card-body p-6 cursor-pointer"
                                                onClick={() =>
                                                    toggleExpand(purchase._id)
                                                }
                                            >
                                                {/* Header */}
                                                <div className="flex justify-between items-start ">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex flex-col">
                                                            <span
                                                                className={`badge ${plan.color} gap-1`}
                                                            >
                                                                {plan.icon}
                                                                {plan.name}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end gap-2">
                                                        <StatusBadge
                                                            status={
                                                                purchase.status
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                {/* Current Plan Indicator */}
                                                {isCurrentSubscription(
                                                    purchase.razorpay_subscription_id
                                                ) && (
                                                    <div className="badge badge-success badge-lg gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
                                                        Active
                                                    </div>
                                                )}

                                                {/* Amount */}
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-base-content/70">
                                                        Amount:
                                                    </span>
                                                    <span className="text-xl font-bold text-primary">
                                                        ₹{purchase.amount}
                                                    </span>
                                                </div>

                                                {/* Date */}
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-base-content/70">
                                                        Date:
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        <FaCalendarCheck className="text-secondary" />
                                                        <span className="font-medium">
                                                            {format(
                                                                new Date(
                                                                    purchase.createdAt
                                                                ),
                                                                "dd MMM yyyy"
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex justify-between items-center">
                                                    <span className="text-base-content/70">
                                                        More Details:
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        <FaChevronDown
                                                            className={`transition-transform ${
                                                                expandedPurchase ===
                                                                purchase._id
                                                                    ? "rotate-180"
                                                                    : ""
                                                            }`}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Expandable Content */}
                                                <div
                                                    className={`collapse ${
                                                        expandedPurchase ===
                                                        purchase._id
                                                            ? "collapse-open"
                                                            : ""
                                                    }`}
                                                >
                                                    <div className="collapse-content pt-4 space-y-3 border-t border-base-300">
                                                        {/* Payment ID */}
                                                        <div className="flex flex-col gap-1">
                                                            <span className="text-sm text-base-content/70">
                                                                Payment ID:
                                                            </span>
                                                            <div className="flex items-center gap-2 font-mono text-sm bg-base-200 p-2 rounded">
                                                                <FaFileInvoiceDollar className="text-primary shrink-0" />
                                                                <span className="truncate">
                                                                    {
                                                                        purchase.razorpay_payment_id
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* Subscription ID */}
                                                        <div className="flex flex-col gap-1">
                                                            <span className="text-sm text-base-content/70">
                                                                Subscription ID:
                                                            </span>
                                                            <div className="font-mono text-sm bg-base-200 p-2 rounded truncate">
                                                                {
                                                                    purchase.razorpay_subscription_id
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="max-w-md mx-auto text-center ">
                            <div className="card bg-base-100 shadow-xl border border-base-300">
                                <div className="card-body p-8">
                                    <div className="w-20 h-20 mx-auto rounded-full bg-secondary/10 flex items-center justify-center mb-6">
                                        <FaFileInvoiceDollar className="text-4xl text-secondary" />
                                    </div>
                                    <h2 className="text-2xl font-bold mb-4">
                                        No Subscription History
                                    </h2>
                                    <p className="text-base-content/70 mb-6">
                                        Your subscription records will appear
                                        here after you make your first purchase.
                                    </p>
                                    <button
                                        className="btn btn-warning btn-lg gap-2"
                                        onClick={() => navigate("/pricing")}
                                    >
                                        <FaCrown className="w-5 h-5" />
                                        View Pricing Plans
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </HomeLayout>
    );
}

export default PurchaseHistory;
