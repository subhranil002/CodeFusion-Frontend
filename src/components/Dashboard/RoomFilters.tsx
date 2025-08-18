import { FaCalendar, FaFilter, FaSearch, FaTimes } from "react-icons/fa";

const LANGUAGES: { value: string; label: string }[] = [
    { value: "all", label: "All Languages" },
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "csharp", label: "C#" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
    { value: "php", label: "PHP" },
    { value: "ruby", label: "Ruby" },
];

function RoomFilters() {
    const filters = {
        search: "Hello",
        language: "Python",
        dateRange: {
            start: "2023-01-01",
            end: "2023-01-31",
        },
    };

    return (
        <div className="card p-6 mb-6 bg-base-100 border border-base-300">
            <div className="flex flex-col space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <FaFilter className="w-5 h-5 text-base-content/70" />
                        <h3 className="text-lg font-semibold">Filter Rooms</h3>
                    </div>

                    <button className="btn btn-sm btn-ghost text-base-content/70 hover:text-base-content">
                        <FaTimes className="w-4 h-4 mr-2" />
                        Clear Filters
                    </button>
                </div>

                {/* Filter Controls */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/50" />
                        <input
                            type="text"
                            placeholder="Search by room ID..."
                            className="input pl-10"
                        />
                    </div>

                    {/* Language Filter */}
                    <select className="select" defaultValue={filters.language}>
                        <option disabled={true}>Select language</option>
                        {LANGUAGES.map((lang) => (
                            <option key={lang.value} value={lang.value}>
                                {lang.label}
                            </option>
                        ))}
                    </select>

                    {/* Date Range Start */}
                    <div className="relative">
                        <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/50" />
                        <input
                            type="date"
                            value={filters.dateRange.start || ""}
                            className="input pl-10"
                            placeholder="Start date"
                        />
                    </div>

                    {/* Date Range End */}
                    <div className="relative">
                        <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/50" />
                        <input
                            type="date"
                            value={filters.dateRange.end || ""}
                            className="input pl-10"
                            placeholder="End date"
                            min={filters.dateRange.start || undefined}
                        />
                    </div>
                </div>

                {/* Active Filters Display */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-base-300">
                    {filters.search && (
                        <span className="badge badge-primary">
                            Search: {filters.search}
                        </span>
                    )}
                    {filters.language !== "all" && (
                        <span className="badge badge-secondary">
                            Language:{" "}
                            {
                                LANGUAGES.find(
                                    (l) => l.value === filters.language
                                )?.label
                            }
                        </span>
                    )}
                    {filters.dateRange.start && (
                        <span className="badge badge-accent">
                            From: {filters.dateRange.start}
                        </span>
                    )}
                    {filters.dateRange.end && (
                        <span className="badge badge-accent">
                            To: {filters.dateRange.end}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RoomFilters;
