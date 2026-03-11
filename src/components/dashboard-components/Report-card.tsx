import React from "react";

interface ReportCardProps {
  title: string;
  description?: string;
  date?: string;
  author?: string;
  status?: "Completed" | "Processing" | "Pending";
  onView?: () => void;
}

const statusColors = {
  Completed: "bg-green-100 text-green-700",
  Processing: "bg-yellow-100 text-yellow-700",
  Pending: "bg-gray-100 text-gray-600",
};

export const ReportCard: React.FC<ReportCardProps> = ({
  title,
  description,
  date,
  author,
  status = "Completed",
  onView,
}) => {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${
            statusColors[status]
          }`}
        >
          {status}
        </span>
      </div>

      {description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {description}
        </p>
      )}

      <div className="text-xs text-gray-500 flex justify-between mb-4">
        {date && <span>📅 {date}</span>}
        {author && <span>👤 {author}</span>}
      </div>

      <button
        onClick={onView}
        className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition"
      >
        View Report
      </button>
    </div>
  );
};