import React, { createContext, useState } from "react";

const StepContext = createContext();

const StepProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [color, setColor] = useState(false);

  return (
    <StepContext.Provider
      value={{
        step,
        setStep,
        color,
        setColor,
      }}
    >
      {children}
    </StepContext.Provider>
  );
};

export { StepProvider, StepContext };
