import { useEffect, useState } from "react";
import { getApplications } from "../services/applicationApi";
import type { Application } from "../types";

const Dashboard = () => {
  const [data, setData] = useState<Application[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getApplications();
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };

    loadData();
  }, []);

  // Metrics
  const total = data.length;

  const eligible = data.filter((app) => app.status === "ELIGIBLE").length;

  const notEligible = data.filter(
    (app) => app.status === "NOT_ELIGIBLE",
  ).length;

  const kycPending = data.filter((app) => app.status === "DRAFT").length;

  const creditDone = data.filter(
    (app) => app.status === "CREDIT_COMPLETED",
  ).length;

  const cards = [
    { title: "Total Applications", value: total },
    { title: "Eligible Loans", value: eligible },
    { title: "Rejected Loans", value: notEligible },
    { title: "Pending KYC", value: kycPending },
    { title: "Credit Completed", value: creditDone },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

      <div className="grid grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-gray-500 text-sm">{card.title}</h3>
            <p className="text-2xl font-bold mt-2">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
