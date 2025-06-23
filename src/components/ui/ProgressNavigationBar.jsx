import React from 'react';
import Icon from '../AppIcon';

const ProgressNavigationBar = ({ 
  currentStep = 1, 
  totalSteps = 6, 
  steps = [],
  onStepClick,
  canNavigateBack = true 
}) => {
  const defaultSteps = [
    { id: 1, title: 'Story Theme', description: 'Choose your adventure type' },
    { id: 2, title: 'Characters', description: 'Create your main characters' },
    { id: 3, title: 'Setting', description: 'Pick the perfect location' },
    { id: 4, title: 'Plot Points', description: 'Define key story moments' },
    { id: 5, title: 'Customization', description: 'Add personal touches' },
    { id: 6, title: 'Review', description: 'Final check before creation' }
  ];

  const stepsToUse = steps.length > 0 ? steps : defaultSteps;

  const getStepStatus = (stepNumber) => {
    if (stepNumber < currentStep) return 'completed';
    if (stepNumber === currentStep) return 'current';
    return 'upcoming';
  };

  const handleStepClick = (stepNumber) => {
    if (canNavigateBack && stepNumber < currentStep && onStepClick) {
      onStepClick(stepNumber);
    }
  };

  const getStepIcon = (stepNumber, status) => {
    if (status === 'completed') return 'Check';
    if (status === 'current') return 'Circle';
    return 'Circle';
  };

  return (
    <div className="bg-surface border-b border-primary-100 px-4 py-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-heading text-text-primary">
              Step {currentStep} of {totalSteps}
            </h2>
            <p className="text-sm text-text-secondary">
              {stepsToUse[currentStep - 1]?.title}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-primary">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </div>
            <div className="w-24 h-2 bg-primary-100 rounded-full mt-1">
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full storybook-transition"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Desktop Progress Steps */}
        <div className="hidden md:flex items-center justify-between">
          {stepsToUse.map((step, index) => {
            const stepNumber = index + 1;
            const status = getStepStatus(stepNumber);
            const isClickable = canNavigateBack && stepNumber < currentStep;

            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => handleStepClick(stepNumber)}
                    disabled={!isClickable}
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center border-2 storybook-transition
                      ${status === 'completed' 
                        ? 'bg-success border-success text-white' 
                        : status === 'current' ?'bg-primary border-primary text-white' :'bg-background border-primary-200 text-text-secondary'
                      }
                      ${isClickable ? 'hover:scale-105 cursor-pointer' : 'cursor-default'}
                    `}
                  >
                    <Icon 
                      name={getStepIcon(stepNumber, status)} 
                      size={16}
                      className={status === 'upcoming' ? 'opacity-50' : ''}
                    />
                  </button>
                  <div className="mt-2 text-center">
                    <div className={`
                      text-xs font-medium
                      ${status === 'current' ? 'text-primary' : 'text-text-secondary'}
                    `}>
                      {step.title}
                    </div>
                    <div className="text-xs text-text-secondary mt-0.5 max-w-20">
                      {step.description}
                    </div>
                  </div>
                </div>
                {index < stepsToUse.length - 1 && (
                  <div className={`
                    flex-1 h-0.5 mx-4 storybook-transition
                    ${stepNumber < currentStep ? 'bg-success' : 'bg-primary-100'}
                  `} />
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Progress Steps */}
        <div className="md:hidden">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {stepsToUse.map((step, index) => {
              const stepNumber = index + 1;
              const status = getStepStatus(stepNumber);
              const isClickable = canNavigateBack && stepNumber < currentStep;

              return (
                <div key={step.id} className="flex items-center flex-shrink-0">
                  <button
                    onClick={() => handleStepClick(stepNumber)}
                    disabled={!isClickable}
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium storybook-transition
                      ${status === 'completed' 
                        ? 'bg-success text-white' 
                        : status === 'current' ?'bg-primary text-white' :'bg-primary-100 text-text-secondary'
                      }
                      ${isClickable ? 'hover:scale-105 cursor-pointer' : 'cursor-default'}
                    `}
                  >
                    {status === 'completed' ? (
                      <Icon name="Check" size={12} />
                    ) : (
                      stepNumber
                    )}
                  </button>
                  {index < stepsToUse.length - 1 && (
                    <div className={`
                      w-6 h-0.5 mx-1 storybook-transition
                      ${stepNumber < currentStep ? 'bg-success' : 'bg-primary-100'}
                    `} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-3 text-center">
            <div className="text-sm font-medium text-text-primary">
              {stepsToUse[currentStep - 1]?.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressNavigationBar;