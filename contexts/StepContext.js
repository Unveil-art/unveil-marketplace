import React, { createContext, useState } from "react";

const StepContext = createContext();

const StepProvider = ({ children }) => {
  const [step, setStep] = useState(1);

  return (
    <StepContext.Provider
      value={{
        step,
        setStep,
      }}
    >
      {children}
    </StepContext.Provider>
  );
};

export { StepProvider, StepContext };
