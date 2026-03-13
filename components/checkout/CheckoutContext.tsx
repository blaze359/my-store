'use client';

import { createContext, useContext, ReactNode, useMemo } from 'react';

type CheckoutContextType = {
  step: number;
  setStep: (step: number) => void;
};

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children, step, setStep }: Readonly<{ children: ReactNode; step: number; setStep: (step: number) => void }>) {
  const value = useMemo(() => ({ step, setStep }), [step, setStep]);
  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within CheckoutProvider');
  }
  return context;
}
