type Props = {
  currentStep: number;
};

const steps = ["Onboarding", "KYC", "Credit Check", "Decision"];

const Stepper = ({ currentStep }: Props) => {
  return (
    <div className="flex justify-between mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex-1 text-center">
          <div
            className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
              index <= currentStep ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            {index + 1}
          </div>
          <p className="text-sm mt-2">{step}</p>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
