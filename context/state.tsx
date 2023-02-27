import React, {createContext, FC, ReactNode, useContext, useState} from "react";
import {Currency} from "./model/Currency";
import {State} from "./model";

const initialStateValues = {
  currency: "GBP"
} as const;

const AppContext = createContext<State>({
  currency: initialStateValues.currency,
  setCurrency: () => {}
});

interface ContextProps {
  children: ReactNode
}
export const Context: FC<ContextProps> = ({children}) => {
  const [currency, setCurrency] = useState<Currency>(initialStateValues.currency);

  return (
    <AppContext.Provider value={{
      currency,
      setCurrency
    }}>
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}