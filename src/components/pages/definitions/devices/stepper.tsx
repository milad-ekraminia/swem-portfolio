import React from 'react';
import { DefinitionsStepperCheck } from '@/assets/icons/definition-stepper-check';
import { DefinitionsStepperActiveCircle } from '@/assets/icons/definitions-stepper-active-circle';
import { DefinitionsStepperPassiveCircle } from '@/assets/icons/definitions-stepper-passive-circle';

type Step = {
  title: string;
  description: string;
};

type StepperProps = {
  steps: Step[];
  activeStep: number;
};

const Stepper: React.FC<StepperProps> = ({ steps, activeStep }) => {
  return (
    <div className="stepper">
      <div className="stepper__circles">
        <div className="stepper__circles-item">
          <div
            className={`circle ${activeStep == 0 ? 'active' : ''} ${
              activeStep == 1 ? 'completed' : ''
            }`}
          >
            {activeStep == 0 ? (
              <DefinitionsStepperActiveCircle />
            ) : (
              <DefinitionsStepperCheck />
            )}
          </div>
          <div className="text">
            <div className={`title ${activeStep == 0 ? 'active' : ''}`}>
              {steps[0].title}
            </div>
            <div className={`description ${activeStep == 0 ? 'active' : ''}`}>
              {steps[0].description}
            </div>
          </div>
        </div>

        <div className={`line ${activeStep == 1 ? 'line-completed' : ''}`} />
        <div className="stepper__circles-item">
          <div
            className={`circle ${activeStep == 1 ? 'active' : ''} ${
              activeStep == 1 ? 'completed' : ''
            }`}
          >
            {activeStep == 0 ? (
              <DefinitionsStepperPassiveCircle />
            ) : (
              <DefinitionsStepperActiveCircle />
            )}
          </div>
          <div className="text">
            <div className={`title ${activeStep == 1 ? 'active' : ''}`}>
              {steps[1].title}
            </div>
            <div className={`description ${activeStep == 1 ? 'active' : ''}`}>
              {steps[1].description}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="stepper__texts">
        <div className="text">
          <div className={`title ${activeStep == 0 ? "active" : ""}`}>
            {steps[0].title}
          </div>
          <div className={`description ${activeStep == 0 ? "active" : ""}`}>
            {steps[0].description}
          </div>
        </div>
        <div className="text">
          <div className={`title ${activeStep == 1 ? "active" : ""}`}>
            {steps[1].title}
          </div>
          <div className={`description ${activeStep == 1 ? "active" : ""}`}>
            {steps[1].description}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Stepper;
