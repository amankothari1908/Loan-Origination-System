export type LoginRequest = {
  email: string;
  password: string;
};

export const WorkflowStage = {
  DRAFT: "DRAFT",
  KYC_PENDING: "KYC_PENDING",
  KYC_COMPLETED: "KYC_COMPLETED",
  CREDIT_PENDING: "CREDIT_PENDING",
  CREDIT_COMPLETED: "CREDIT_COMPLETED",
  ELIGIBLE: "ELIGIBLE",
  NOT_ELIGIBLE: "NOT_ELIGIBLE",
} as const;

export type Application = {
  id: string;
  name: string;
  status:
    | "DRAFT"
    | "KYC_COMPLETED"
    | "CREDIT_COMPLETED"
    | "ELIGIBLE"
    | "NOT_ELIGIBLE";

  kyc?: {
    status: string;
    score: number;
  };

  credit?: {
    status: string;
    score: number;
    active_loans: number;
  };
};

export type KYCResult = {
  status: string;
  score: number;
};

export type CreditResult = {
  score: number;
  active_loans: number;
  status: string;
};

export type ApplicationForm = {
  name: string;
  mobile: string;
  pan: string;
  dob: string;
  employment: "Salaried" | "Self-Employed";
  income: number;
  loan_amount: number;
};

export type WorkflowStageType =
  (typeof WorkflowStage)[keyof typeof WorkflowStage];
