import { FaCode, FaWifi } from "react-icons/fa";
import { MdOutlineWifiOff } from "react-icons/md";

function DashboardHeader() {
    const isConnected = true;

    return (
        <header className="bg-base-100 shadow-lg border-b border-base-300">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-r from-primary to-accent text-primary-content rounded-lg">
                            <FaCode className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-base-content">
                                CodeFusion Dashboard
                            </h1>
                            <p className="text-base-content/70">
                                Collaborative coding made simple
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div
                            className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                                isConnected
                                    ? "bg-success/20 text-success border border-success/30"
                                    : "bg-error/20 text-error border border-error/30"
                            }`}
                        >
                            {isConnected ? (
                                <FaWifi className="w-4 h-4" />
                            ) : (
                                <MdOutlineWifiOff className="w-4 h-4" />
                            )}
                            <span>
                                {isConnected ? "Connected" : "Disconnected"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default DashboardHeader;
