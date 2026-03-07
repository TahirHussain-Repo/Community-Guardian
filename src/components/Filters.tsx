import {
    INCIDENT_CATEGORIES,
    INCIDENT_SEVERITIES,
    INCIDENT_STATUSES
} from "@/lib/constants";

type FiltersProps = {
    searchTerm: string;
    selectedCategory: string;
    selectedSeverity: string;
    selectedStatus: string;
    onSearchTermChange: (value: string) => void;
    onCategoryChange: (value: string) => void;
    onSeverityChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onClear: () => void;
}

function formatLabel(value: string) {
    return value
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

const filterInputClass =
    "h-10 min-w-0 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500";

const filterSelectClass =
    "h-10 min-w-0 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 pr-9 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-no-repeat bg-[length:1.25rem_1.25rem] bg-[right_0.5rem_center]";

const selectChevron =
    'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236b7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")';

export default function Filters({
    searchTerm,
    selectedCategory,
    selectedSeverity,
    selectedStatus,
    onSearchTermChange,
    onCategoryChange,
    onSeverityChange,
    onStatusChange,
    onClear,
    }: FiltersProps) {
    return (
        <div className="rounded-2xl border border-gray-300 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">Search & Filter</h2>
                    <p className="text-sm text-gray-500">
                        Narrow incidents by keyword, category, severity, or status.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onClear}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Clear
                </button>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Search
                    </label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => onSearchTermChange(e.target.value)}
                        placeholder="Search title or description"
                        className={filterInputClass}
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        className={filterSelectClass}
                        style={{ backgroundImage: selectChevron }}
                    >
                        <option value="">All categories</option>
                        {INCIDENT_CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                            {formatLabel(category)}
                        </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Severity
                    </label>
                    <select
                        value={selectedSeverity}
                        onChange={(e) => onSeverityChange(e.target.value)}
                        className={filterSelectClass}
                        style={{ backgroundImage: selectChevron }}
                    >
                        <option value="">All severities</option>
                        {INCIDENT_SEVERITIES.map((severity) => (
                            <option key={severity} value={severity}>
                                {formatLabel(severity)}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Status
                    </label>
                    <select
                        value={selectedStatus}
                        onChange={(e) => onStatusChange(e.target.value)}
                        className={filterSelectClass}
                        style={{ backgroundImage: selectChevron }}
                    >
                        <option value="">All statuses</option>
                        {INCIDENT_STATUSES.map((status) => (
                            <option key={status} value={status}>
                                {formatLabel(status)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}