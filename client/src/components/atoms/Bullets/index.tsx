interface BulletsProps {
  currentStep: number;
  totalSteps: number;
}
export default function Bullets({ currentStep, totalSteps }: BulletsProps) {
  return (
    <nav
      className="flex items-center justify-center mb-10"
      aria-label="Progress"
    >
      <p className="text-xl font-medium">
        Question {currentStep} sur {totalSteps}
      </p>
      <ol role="list" className="ml-8 flex items-center space-x-5">
        {Array.from({ length: totalSteps < 5 ? totalSteps : 5 }).map(
          (_, index) => {
            if (index + 1 === currentStep) {
              return (
                <span
                  key={index}
                  className="relative flex items-center justify-center"
                  aria-current="step"
                >
                  <span
                    className="absolute flex h-5 w-5 p-px"
                    aria-hidden="true"
                  >
                    <span className="h-full w-full rounded-full bg-indigo-200" />
                  </span>
                  <span
                    className="relative block h-2.5 w-2.5 rounded-full bg-indigo-600"
                    aria-hidden="true"
                  />
                </span>
              );
            } else if (index + 1 < currentStep) {
              return (
                <span className="block h-2.5 w-2.5 rounded-full bg-indigo-600 hover:bg-indigo-900"></span>
              );
            } else {
              return (
                <span className="block h-2.5 w-2.5 rounded-full bg-gray-200 hover:bg-gray-400"></span>
              );
            }
          },
        )}
      </ol>
    </nav>
  );
}
