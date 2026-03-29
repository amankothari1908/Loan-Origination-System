import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApplications } from "../services/applicationApi";
import type { Application } from "../types";

const Admin = () => {
  const [data, setData] = useState<Application[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getApplications();
      setData(res.data);
    } catch (err) {
      console.error("Failed to fetch applications", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = filter
    ? data.filter((app) => app.status === filter)
    : data;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

      {/* Filter */}
      <select
        className="mb-6 p-2 border rounded-lg"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="">All</option>
        <option value="ELIGIBLE">Eligible</option>
        <option value="NOT_ELIGIBLE">Not Eligible</option>
        <option value="KYC_COMPLETED">KYC Completed</option>
        <option value="CREDIT_COMPLETED">Credit Completed</option>
      </select>

      {/* Loading */}
      {loading ? (
        <p>Loading applications...</p>
      ) : (
        <div className="grid gap-4">
          {filteredData.map((app) => (
            <div
              key={app.id}
              onClick={() => navigate(`/loan/${app.id}`)} // 🔥 MAIN FEATURE
              className="bg-white p-5 rounded-xl shadow cursor-pointer hover:shadow-lg transition border"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{app.name || "Unnamed User"}</p>
                  <p className="text-sm text-gray-500">ID: {app.id}</p>
                </div>

                <span
                  className={`px-3 py-1 text-xs rounded-full font-semibold ${
                    app.status === "ELIGIBLE"
                      ? "bg-green-100 text-green-600"
                      : app.status === "NOT_ELIGIBLE"
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {app.status}
                </span>
              </div>

              {/* KYC */}
              {app.kyc && (
                <p className="mt-2 text-sm">
                  <b>KYC:</b> {app.kyc.status} (Score: {app.kyc.score})
                </p>
              )}

              {/* Credit */}
              {app.credit && (
                <p className="text-sm">
                  <b>Credit:</b> {app.credit.status} | Score: {app.credit.score}{" "}
                  | Loans: {app.credit.active_loans}
                </p>
              )}

              <p className="text-xs text-blue-500 mt-2">Click to open →</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
