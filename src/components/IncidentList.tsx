import { INCIDENT_STATUSES } from "@/lib/constants";
import { Incident, IncidentStatus } from "@/lib/types";

type IncidentListProps = {
  incidents: Incident[];
  onStatusChange: (incidentId: string, newStatus: IncidentStatus) => void;
};

function formatCategory(category: string | undefined) {
  return (category ?? "")
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatTimestamp(timestamp: string | undefined) {
  return new Date(timestamp ?? 0).toLocaleString();
}

function getSeverityBadgeClass(severity: string) {
  switch (severity) {
    case "high":
      return "bg-red-100 text-red-700";
    case "medium":
      return "bg-yellow-100 text-yellow-700";
    case "low":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function getStatusBadgeClass(status: string) {
  switch (status) {
    case "verified":
      return "bg-blue-100 text-blue-700";
    case "resolved":
      return "bg-green-100 text-green-700";
    case "dismissed":
      return "bg-gray-200 text-gray-700";
    case "unverified":
    default:
      return "bg-orange-100 text-orange-700";
  }
}

function formatStatus(status: string | undefined) {
  const s = status ?? "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function IncidentList({
  incidents,
  onStatusChange,
}: IncidentListProps) {
  if (incidents.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed p-6 text-sm text-gray-500">
        No incidents match your current filters.
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-[400px] flex-col overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm">
      <div className="shrink-0 border-b px-4 py-3">
        <h2 className="text-lg font-semibold text-gray-900">Incident Reports</h2>
        <p className="text-sm text-gray-500">
          Review community safety and digital wellness alerts.
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-auto">
        <table className="min-w-[900px] w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-600">Title</th>
              <th className="px-4 py-3 font-medium text-gray-600">Category</th>
              <th className="px-4 py-3 font-medium text-gray-600">Location</th>
              <th className="px-4 py-3 font-medium text-gray-600">Severity</th>
              <th className="px-4 py-3 font-medium text-gray-600">Status</th>
              <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-600">Time</th>
            </tr>
          </thead>

          <tbody>
            {incidents.map((incident, index) => (
              <tr key={`${incident.id ?? "incident"}-${index}`} className="border-t align-top">
                <td className="min-w-[200px] px-4 py-3">
                  <div className="font-medium text-gray-900">{incident.title}</div>
                  <div className="mt-1 max-w-xl text-xs text-gray-500">
                    {incident.description}
                  </div>
                </td>

                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                  {formatCategory(incident.category)}
                </td>

                <td className="whitespace-nowrap px-4 py-3 text-gray-700">{incident.location}</td>

                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${getSeverityBadgeClass(
                      incident.severity
                    )}`}
                  >
                    {incident.severity}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <select
                    value={incident.status}
                    onChange={(e) =>
                      onStatusChange(
                        incident.id,
                        e.target.value as IncidentStatus
                      )
                    }
                    className={`cursor-pointer appearance-none rounded-full px-3 py-1 pr-7 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${getStatusBadgeClass(
                      incident.status
                    )} bg-no-repeat bg-[length:0.75rem_0.75rem] bg-[right_0.5rem_center]`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    }}
                  >
                    {INCIDENT_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {formatStatus(status)}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="whitespace-nowrap px-4 py-3 text-xs text-gray-500">
                  {formatTimestamp(incident.timestamp)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}