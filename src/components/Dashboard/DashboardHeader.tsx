import { FaCode } from "react-icons/fa";

function DashboardHeader() {
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
                </div>
            </div>
        </header>
    );
}

export default DashboardHeader;
