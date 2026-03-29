import { useState } from "react";
import Stepper from "../components/Stepper";
import {
  WorkflowStage,
  type Application,
  type WorkflowStageType,
} from "../types";
import OnboardingForm from "../components/OnBoardingForm";
import KYCStep from "../components/KycStep";
import {
  createApplication,
  runCredit,
  runDecision,
  runKYC,
} from "../services/applicationApi";
import CreditStep from "../components/CreditStep";

const LoanWorkflow = () => {
  const [stage, setStage] = useState<WorkflowStageType>(WorkflowStage.DRAFT);
  const [appId, setAppId] = useState<string | null>(null);
  const [appData, setAppData] = useState<Application | null>(null);
  const [loading, setLoading] = useState(false);

  const getStep = () => {
    switch (stage) {
      case WorkflowStage.DRAFT:
        return 0;
      case WorkflowStage.KYC_PENDING:
      case WorkflowStage.KYC_COMPLETED:
        return 1;
      case WorkflowStage.CREDIT_PENDING:
      case WorkflowStage.CREDIT_COMPLETED:
        return 2;
      case WorkflowStage.ELIGIBLE:
      case WorkflowStage.NOT_ELIGIBLE:
        return 3;
      default:
        return 0;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Stepper currentStep={getStep()} />

      {/* Step Content */}

      {/* 🥇 Onboarding */}
      {stage === WorkflowStage.DRAFT && (
        <OnboardingForm
          onNext={async (formData) => {
            try {
              setLoading(true);

              const res = await createApplication(formData);

              setAppId(res.data.id);
              setAppData(res.data);
              setStage(WorkflowStage.KYC_PENDING);
            } catch (err) {
              console.error(err);
              alert("Failed to create application");
            } finally {
              setLoading(false);
            }
          }}
        />
      )}

      {/* 🥇 KYC */}
      {stage === WorkflowStage.KYC_PENDING && (
        <KYCStep
          loading={loading}
          result={appData?.kyc}
          onRun={async () => {
            try {
              setLoading(true);

              const res = await runKYC(appId!);
              setAppData(res.data);

              if (res.data.status === "NOT_ELIGIBLE") {
                setStage(WorkflowStage.NOT_ELIGIBLE);
              } else {
                setStage(WorkflowStage.KYC_COMPLETED);
              }
            } catch (err) {
              console.log(err);
              alert("KYC failed");
            } finally {
              setLoading(false);
            }
          }}
        />
      )}

      {/* 🥇 Credit */}
      {stage === WorkflowStage.KYC_COMPLETED && (
        <CreditStep
          loading={loading}
          result={appData?.credit}
          onRun={async () => {
            try {
              setLoading(true);

              const res = await runCredit(appId!);
              setAppData(res.data);

              if (res.data.status === "NOT_ELIGIBLE") {
                setStage(WorkflowStage.NOT_ELIGIBLE);
              } else {
                setStage(WorkflowStage.CREDIT_COMPLETED);
              }
            } catch (err) {
              console.log(err);
              alert("Credit check failed");
            } finally {
              setLoading(false);
            }
          }}
        />
      )}

      {/* 🥇 Decision */}
      {stage === WorkflowStage.CREDIT_COMPLETED && (
        <div className="bg-white p-6 rounded-xl shadow max-w-xl">
          <h2 className="text-xl font-bold mb-4">Final Decision</h2>

          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={async () => {
              try {
                setLoading(true);

                const res = await runDecision(appId!);
                setAppData(res.data);
                setStage(res.data.status);
              } catch (err) {
                console.log(err);
                alert("Decision failed");
              } finally {
                setLoading(false);
              }
            }}
          >
            Check Eligibility
          </button>
        </div>
      )}

      {/* 🥇 Final Result */}
      {(stage === WorkflowStage.ELIGIBLE ||
        stage === WorkflowStage.NOT_ELIGIBLE) && (
        <div className="mt-6 bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-2">Final Result</h2>

          <p
            className={`text-lg font-semibold ${
              stage === WorkflowStage.ELIGIBLE
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {stage === WorkflowStage.ELIGIBLE
              ? "✅ Loan Approved"
              : "❌ Loan Rejected"}
          </p>
        </div>
      )}
    </div>
  );
};

export default LoanWorkflow;
