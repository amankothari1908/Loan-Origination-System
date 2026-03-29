import type { FC } from "react";
import type { KYCResult } from "../types";

type Props = {
  onRun: () => Promise<void>;
  loading: boolean;
  result?: KYCResult | null;
};

const KYCStep: FC<Props> = ({ onRun, loading, result }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-xl">
      <h2 className="text-xl font-bold mb-4">KYC Verification</h2>

      {/* Run Button (only if not already done) */}
      {!result && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={onRun}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Run KYC Check"}
        </button>
      )}

      {/* Loading */}
      {loading && <p className="mt-3 text-gray-500">Processing...</p>}

      {/* Result */}
      {result && (
        <div className="mt-4 border-t pt-4">
          <p>
            <b>Status:</b>{" "}
            <span
              className={`font-semibold ${
                result.status === "VERIFIED" ? "text-green-600" : "text-red-600"
              }`}
            >
              {result.status === "VERIFIED" ? "✅ Verified" : "❌ Failed"}
            </span>
          </p>

          <p>
            <b>Score:</b> {result.score}
          </p>
        </div>
      )}
    </div>
  );
};

export default KYCStep;
