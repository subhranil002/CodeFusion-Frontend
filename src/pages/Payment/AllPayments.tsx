import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
    FaCalendarCheck,
    FaChartLine,
    FaCheck,
    FaChevronDown,
    FaChevronLeft,
    FaChevronRight,
    FaCrown,
    FaFileInvoiceDollar,
    FaFilter,
    FaMoneyBillWave,
    FaPercentage,
    FaReceipt,
    FaRupeeSign,
    FaSearch,
    FaTimesCircle,
    FaUsers,
} from "react-icons/fa";

import getAllPaymentsApi from "../../apis/payment/getAllPaymentsApi";
import HomeLayout from "../../layouts/HomeLayout";

function AllPayments() {
    const [expandedPayment, setExpandedPayment] = useState<string | null>(null);
    const [payments, setPayments] = useState<any[]>([]);
    const [analytics, setAnalytics] = useState({
        totalRevenue: 0,
        totalTransactions: 0,
        completedCount: 0,
        successRate: 0,
        avgTransactionPrice: 0,
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [planFilter, setPlanFilter] = useState("all");
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        start: 0,
        limit: 10,
        totalCount: 0,
    });

    const fetchPayments = async (start: number, limit: number) => {
        setLoading(true);
        try {
            const response = await getAllPaymentsApi(start, limit);
            console.log(response);

            setPayments(response.data.purchases);
            setAnalytics({
                totalRevenue: response.data.totalRevenue,
                totalTransactions: response.data.totalTransactions,
                completedCount: response.data.completedCount,
                successRate: parseFloat(response.data.successRate),
                avgTransactionPrice: response.data.avgTransactionPrice,
            });
            setPagination({
                start: parseInt(response.data.start),
                limit: parseInt(response.data.limit),
                totalCount: Math.ceil(response.data.totalTransactions / limit),
            });
        } catch (error) {
            console.error("Failed to fetch payments:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments(0, 10);
    }, []);

    const toggleExpand = (paymentId: string) => {
        setExpandedPayment(expandedPayment === paymentId ? null : paymentId);
    };

    const handleNextPage = () => {
        const nextStart = pagination.start + pagination.limit;
        if (nextStart < pagination.totalCount) {
            fetchPayments(nextStart, pagination.limit);
        }
    };

    const handlePrevPage = () => {
        const prevStart = Math.max(0, pagination.start - pagination.limit);
        fetchPayments(prevStart, pagination.limit);
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

    const filteredPayments = payments.filter((payment) => {
        const matchesSearch =
            payment.purchasedBy?.fullName
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            payment.purchasedBy?.email
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            payment.razorpay_payment_id
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "all" || payment.status === statusFilter;
        const matchesPlan =
            planFilter === "all" ||
            getPlanName(payment.amount).name === planFilter;

        return matchesSearch && matchesStatus && matchesPlan;
    });

    const currentPage = Math.floor(pagination.start / pagination.limit) + 1;
    const totalPages = Math.ceil(pagination.totalCount / pagination.limit);
    const showingStart = pagination.start + 1;
    const showingEnd = Math.min(
        pagination.start + pagination.limit,
        pagination.totalCount
    );

    return (
        <HomeLayout>
            <div className="min-h-screen bg-base-200 pt-20 py-10 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold mb-4">
                            Payment
                            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                {" "}
                                Analytics
                            </span>
                        </h1>
                        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                            Comprehensive overview of all payment transactions
                            and revenue metrics
                        </p>
                        <div className="divider divider-primary w-24 mx-auto my-6" />
                    </div>

                    {/* Analytics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="card bg-gradient-to-br from-primary to-primary/80 text-primary-content shadow-xl">
                            <div className="card-body">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="card-title text-lg">
                                            Total Revenue
                                        </p>
                                        <h3 className="text-3xl font-bold">
                                            ₹{analytics.totalRevenue}
                                        </h3>
                                        <p className="text-sm opacity-90">
                                            All time earnings
                                        </p>
                                    </div>
                                    <div className="bg-white/20 p-3 rounded-xl">
                                        <FaMoneyBillWave className="text-2xl" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-gradient-to-br from-secondary to-secondary/80 text-secondary-content shadow-xl">
                            <div className="card-body">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="card-title text-lg">
                                            Total Transactions
                                        </p>
                                        <h3 className="text-3xl font-bold">
                                            {analytics.totalTransactions}
                                        </h3>
                                        <p className="text-sm opacity-90">
                                            All payments
                                        </p>
                                    </div>
                                    <div className="bg-white/20 p-3 rounded-xl">
                                        <FaUsers className="text-2xl" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-gradient-to-br from-accent to-accent/80 text-accent-content shadow-xl">
                            <div className="card-body">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="card-title text-lg">
                                            Success Rate
                                        </p>
                                        <h3 className="text-3xl font-bold">
                                            {analytics.successRate}%
                                        </h3>
                                        <p className="text-sm opacity-90">
                                            {analytics.completedCount}/
                                            {analytics.totalTransactions}{" "}
                                            successful
                                        </p>
                                    </div>
                                    <div className="bg-white/20 p-3 rounded-xl">
                                        <FaPercentage className="text-2xl" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-gradient-to-br from-info to-info/80 text-info-content shadow-xl">
                            <div className="card-body">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="card-title text-lg">
                                            Avg. Transaction
                                        </p>
                                        <h3 className="text-3xl font-bold">
                                            ₹{analytics.avgTransactionPrice}
                                        </h3>
                                        <p className="text-sm opacity-90">
                                            Per payment
                                        </p>
                                    </div>
                                    <div className="bg-white/20 p-3 rounded-xl">
                                        <FaChartLine className="text-2xl" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="card bg-base-100 shadow-lg mb-6">
                        <div className="card-body">
                            <div className="flex flex-wrap gap-4 items-end">
                                {/* Search */}
                                <div className="form-control w-full sm:w-auto sm:flex-1">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Search Payments
                                        </span>
                                    </label>
                                    <div className="join w-full">
                                        <span className="join-item bg-base-200 px-4 flex items-center">
                                            <FaSearch className="text-base-content/70" />
                                        </span>
                                        <input
                                            type="text"
                                            placeholder="Search by name, email, or payment ID..."
                                            className="input input-bordered join-item flex-1"
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>

                                {/* Status Filter */}
                                <div className="form-control w-full sm:w-auto">
                                    <label className="label block">
                                        <span className="label-text font-semibold">
                                            Status
                                        </span>
                                    </label>
                                    <select
                                        className="select select-bordered"
                                        value={statusFilter}
                                        onChange={(e) =>
                                            setStatusFilter(e.target.value)
                                        }
                                    >
                                        <option value="all">All Status</option>
                                        <option value="completed">
                                            Completed
                                        </option>
                                        <option value="cancelled">
                                            Cancelled
                                        </option>
                                    </select>
                                </div>

                                {/* Plan Filter */}
                                <div className="form-control w-full sm:w-auto">
                                    <label className="label block">
                                        <span className="label-text font-semibold">
                                            Plan
                                        </span>
                                    </label>
                                    <select
                                        className="select select-bordered"
                                        value={planFilter}
                                        onChange={(e) =>
                                            setPlanFilter(e.target.value)
                                        }
                                    >
                                        <option value="all">All Plans</option>
                                        <option value="Pro Plan">
                                            Pro Plan
                                        </option>
                                        <option value="Basic Plan">
                                            Basic Plan
                                        </option>
                                    </select>
                                </div>

                                {/* Clear Filters */}
                                {(searchTerm ||
                                    statusFilter !== "all" ||
                                    planFilter !== "all") && (
                                    <button
                                        className="btn btn-outline btn-error"
                                        onClick={() => {
                                            setSearchTerm("");
                                            setStatusFilter("all");
                                            setPlanFilter("all");
                                        }}
                                    >
                                        <FaFilter className="w-4 h-4" />
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Results Count & Pagination Info */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                        <p className="text-base-content/70">
                            Showing {showingStart}-{showingEnd} of{" "}
                            {pagination.totalCount} payments
                            {filteredPayments.length !== payments.length &&
                                ` (${filteredPayments.length} filtered)`}
                        </p>

                        {/* Pagination Controls */}
                        <div className="flex items-center gap-2">
                            <button
                                className="btn btn-sm btn-outline"
                                onClick={handlePrevPage}
                                disabled={pagination.start === 0 || loading}
                            >
                                <FaChevronLeft className="w-3 h-3" />
                                Previous
                            </button>

                            <span className="text-sm text-base-content/70 px-3">
                                Page {currentPage} of {totalPages}
                            </span>

                            <button
                                className="btn btn-sm btn-outline"
                                onClick={handleNextPage}
                                disabled={
                                    showingEnd >= pagination.totalCount ||
                                    loading
                                }
                            >
                                Next
                                <FaChevronRight className="w-3 h-3" />
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        /* Loading State */
                        <div className="flex justify-center items-center py-12">
                            <div className="flex flex-col items-center gap-4">
                                <span className="loading loading-spinner loading-lg text-primary"></span>
                                <p className="text-base-content/70">
                                    Loading payments...
                                </p>
                            </div>
                        </div>
                    ) : filteredPayments.length > 0 ? (
                        <div className="space-y-6">
                            {/* Desktop Table */}
                            <div className="hidden lg:block">
                                <div className="card bg-base-100 shadow-xl">
                                    <div className="card-body p-0">
                                        <div className="overflow-x-auto">
                                            <table className="table table-zebra">
                                                <thead className="bg-base-200">
                                                    <tr>
                                                        <th className="text-lg font-bold">
                                                            User
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
                                                        <th className="text-lg font-bold">
                                                            Payment ID
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredPayments.map(
                                                        (payment: any) => {
                                                            const plan =
                                                                getPlanName(
                                                                    payment.amount
                                                                );
                                                            return (
                                                                <tr
                                                                    key={
                                                                        payment._id
                                                                    }
                                                                    className="hover:bg-base-200/50 transition-colors cursor-pointer"
                                                                    onClick={() =>
                                                                        toggleExpand(
                                                                            payment._id
                                                                        )
                                                                    }
                                                                >
                                                                    <td>
                                                                        <div className="flex flex-col">
                                                                            <span className="font-semibold">
                                                                                {payment
                                                                                    .purchasedBy
                                                                                    ?.fullName ||
                                                                                    "N/A"}
                                                                            </span>
                                                                            <span className="text-sm text-base-content/60">
                                                                                {
                                                                                    payment
                                                                                        .purchasedBy
                                                                                        ?.email
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="flex items-center gap-2">
                                                                            <span
                                                                                className={`badge ${plan.color} gap-2`}
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
                                                                            <span className="text-xl font-bold text-primary">
                                                                                <FaRupeeSign className="inline w-4 h-4" />
                                                                                {
                                                                                    payment.amount
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="flex items-center gap-2">
                                                                            <FaCalendarCheck className="text-secondary" />
                                                                            <span className="font-medium">
                                                                                {format(
                                                                                    new Date(
                                                                                        payment.createdAt
                                                                                    ),
                                                                                    "dd MMM yyyy"
                                                                                )}
                                                                            </span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <StatusBadge
                                                                            status={
                                                                                payment.status
                                                                            }
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <div className="font-mono text-sm bg-base-200 px-2 py-1 rounded">
                                                                            {
                                                                                payment.razorpay_payment_id
                                                                            }
                                                                        </div>
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
                            <div className="lg:hidden space-y-4">
                                {filteredPayments.map((payment: any) => {
                                    const plan = getPlanName(payment.amount);
                                    return (
                                        <div
                                            key={payment._id}
                                            className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all"
                                        >
                                            <div
                                                className="card-body p-6 cursor-pointer"
                                                onClick={() =>
                                                    toggleExpand(payment._id)
                                                }
                                            >
                                                {/* Header */}
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex flex-col">
                                                            <span
                                                                className={`badge ${plan.color} gap-1 mb-2`}
                                                            >
                                                                {plan.icon}
                                                                {plan.name}
                                                            </span>
                                                            <StatusBadge
                                                                status={
                                                                    payment.status
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-xl font-bold text-primary">
                                                            ₹{payment.amount}
                                                        </div>
                                                        <div className="text-sm text-base-content/70">
                                                            {format(
                                                                new Date(
                                                                    payment.createdAt
                                                                ),
                                                                "dd MMM yyyy"
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* User Info */}
                                                <div className="space-y-2">
                                                    <div>
                                                        <p className="text-sm text-base-content/70">
                                                            User
                                                        </p>
                                                        <p className="font-semibold">
                                                            {payment.purchasedBy
                                                                ?.fullName ||
                                                                "N/A"}
                                                        </p>
                                                        <p className="text-sm text-base-content/60">
                                                            {
                                                                payment
                                                                    .purchasedBy
                                                                    ?.email
                                                            }
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex justify-between items-center mt-4 pt-4 border-t border-base-300">
                                                    <span className="text-base-content/70">
                                                        More Details
                                                    </span>
                                                    <FaChevronDown
                                                        className={`transition-transform ${
                                                            expandedPayment ===
                                                            payment._id
                                                                ? "rotate-180"
                                                                : ""
                                                        }`}
                                                    />
                                                </div>

                                                {/* Expandable Content */}
                                                <div
                                                    className={`collapse ${
                                                        expandedPayment ===
                                                        payment._id
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
                                                                        payment.razorpay_payment_id
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
                                                                    payment.razorpay_subscription_id
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
                        <div className="max-w-md mx-auto text-center">
                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body p-8">
                                    <div className="w-20 h-20 mx-auto rounded-full bg-secondary/10 flex items-center justify-center mb-6">
                                        <FaFileInvoiceDollar className="text-4xl text-secondary" />
                                    </div>
                                    <h2 className="text-2xl font-bold mb-4">
                                        No Payments Found
                                    </h2>
                                    <p className="text-base-content/70 mb-6">
                                        {searchTerm ||
                                        statusFilter !== "all" ||
                                        planFilter !== "all"
                                            ? "No payments match your search criteria. Try adjusting your filters."
                                            : "No payment records available yet."}
                                    </p>
                                    {(searchTerm ||
                                        statusFilter !== "all" ||
                                        planFilter !== "all") && (
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => {
                                                setSearchTerm("");
                                                setStatusFilter("all");
                                                setPlanFilter("all");
                                            }}
                                        >
                                            Clear Filters
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </HomeLayout>
    );
}

export default AllPayments;
