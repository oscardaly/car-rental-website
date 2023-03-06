import React, {createContext, FC, ReactNode, useContext, useState} from "react";
import {Currency} from "./model/Currency";
import {State} from "./model";
import {useEffectOnFirstRender} from "../hooks/UseEffectOnFirstRender";

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

type Setter<T> = (value: T) => void

export const Context: FC<ContextProps> = ({children}) => {
  const [currency, setCurrency] = useState<Currency>(initialStateValues.currency);

  const createLocalStorageSetter = <T extends string | object>(setter: Setter<T>, key: string): Setter<T> => {
    return (value: T) => {
      setter(value);
      localStorage.setItem(key, JSON.stringify(value));
    };
  };

  const getInitialValue = <T extends any>(key: keyof typeof initialStateValues): T => {
    const localStorageValue = localStorage.getItem(key);

    return localStorageValue
      ? parseLocalStorageValue(localStorageValue)
      : initialStateValues[key];
  };

  const parseLocalStorageValue = (value: string) => {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  };

  useEffectOnFirstRender(() => {
    setCurrency(getInitialValue("currency"));
  });

  return (
    <AppContext.Provider value={{
      currency,
      setCurrency: createLocalStorageSetter(setCurrency, "currency")
    }}>
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}