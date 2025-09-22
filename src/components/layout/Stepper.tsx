import { Check } from 'lucide-react';
import classNames from 'classnames';

export interface StepConfig {
  key: string;
  label: string;
  num: number;
}

interface StepperProps {
  steps: StepConfig[];
  currentStep: number;
  completedSteps: number[];
}

const Stepper = ({ steps, currentStep, completedSteps }: StepperProps) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6">
      <div className="flex items-center gap-2 text-sm py-3">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = completedSteps.includes(index);
          const isLast = index === steps.length - 1;

          return (
            <div key={step.key} className="flex items-center">
              {/* Step Circle */}
              <div className={classNames(
                'h-6 w-6 grid place-items-center rounded-full text-xs font-medium transition-colors',
                {
                  'bg-green-600 text-white': isCompleted,
                  'border border-green-600 text-green-600': isActive && !isCompleted,
                  'border border-gray-300 text-gray-500': !isActive && !isCompleted
                }
              )}>
                {isCompleted ? (
                  <Check size={12} />
                ) : (
                  step.num
                )}
              </div>
              
              {/* Step Label */}
              <div className={classNames(
                'ml-2 transition-colors',
                {
                  'text-green-600 font-medium': isActive || isCompleted,
                  'text-gray-700': !isActive && !isCompleted
                }
              )}>
                {step.label}
              </div>
              
              {/* Connector Line */}
              {!isLast && (
                <div className="mx-3 w-24 h-px bg-gray-200" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { Stepper };
