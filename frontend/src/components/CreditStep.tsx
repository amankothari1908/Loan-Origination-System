import type { FC } from "react";
import type { CreditResult } from "../types";

type Props = {
  onRun: () => Promise<void>;
  loading: boolean;
  result?: CreditResult | null;
};

const CreditStep: FC<Props> = ({ onRun, loading, result }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-xl">
      <h2 className="text-xl font-bold mb-4">Credit Check</h2>

      {/* Button */}
      {!result && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={onRun}
          disabled={loading}
        >
          {loading ? "Checking..." : "Run Credit Check"}
        </button>
      )}

      {/* Loading state */}
      {loading && <p className="mt-3 text-gray-500">Processing...</p>}

      {/* Result */}
      {result && (
        <div className="mt-4 border-t pt-4">
          <p>
            <b>Score:</b> {result.score}
          </p>
          <p>
            <b>Active Loans:</b> {result.active_loans}
          </p>

          <p
            className={`font-semibold mt-2 ${
              result.status === "APPROVED" ? "text-green-600" : "text-red-600"
            }`}
          >
            {result.status === "APPROVED" ? "✅ Approved" : "❌ Rejected"}
          </p>
        </div>
      )}
    </div>
  );
};

export default CreditStep;
