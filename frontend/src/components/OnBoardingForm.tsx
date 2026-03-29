import { useState } from "react";
import type { ApplicationForm } from "../types";

type Props = {
  onNext: (data: ApplicationForm) => void;
};

const OnboardingForm = ({ onNext }: Props) => {
  const [form, setForm] = useState<ApplicationForm>({
    name: "",
    mobile: "",
    pan: "",
    dob: "",
    employment: "Salaried",
    income: 0,
    loan_amount: 0,
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (
      !form.name ||
      !form.mobile ||
      !form.pan ||
      !form.dob ||
      !form.income ||
      !form.loan_amount
    ) {
      alert("Please fill all required fields");
      return;
    }

    onNext({
      ...form,
      income: Number(form.income),
      loan_amount: Number(form.loan_amount),
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-xl">
      <h2 className="text-xl font-bold mb-4">Customer Onboarding</h2>

      <input
        className="w-full mb-3 p-2 border rounded"
        placeholder="Full Name"
        onChange={(e) => handleChange("name", e.target.value)}
      />

      <input
        className="w-full mb-3 p-2 border rounded"
        placeholder="Mobile Number"
        onChange={(e) => handleChange("mobile", e.target.value)}
      />

      <input
        className="w-full mb-3 p-2 border rounded"
        placeholder="PAN"
        onChange={(e) => handleChange("pan", e.target.value)}
      />

      <input
        type="date"
        className="w-full mb-3 p-2 border rounded"
        onChange={(e) => handleChange("dob", e.target.value)}
      />

      <select
        className="w-full mb-3 p-2 border rounded"
        onChange={(e) => handleChange("employment", e.target.value)}
      >
        <option value="Salaried">Salaried</option>
        <option value="Self-Employed">Self-Employed</option>
      </select>

      <input
        type="number"
        className="w-full mb-3 p-2 border rounded"
        placeholder="Monthly Income"
        onChange={(e) => handleChange("income", e.target.value)}
      />

      <input
        type="number"
        className="w-full mb-3 p-2 border rounded"
        placeholder="Loan Amount Required"
        onChange={(e) => handleChange("loan_amount", e.target.value)}
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Continue to KYC
      </button>
    </div>
  );
};

export default OnboardingForm;
