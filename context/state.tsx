import React, {createContext, FC, ReactNode, useContext, useState} from "react";
import {Currency} from "./model/Currency";
import {State} from "./model";
import {useEffectOnFirstRender} from "../helpers/hooks/UseEffectOnFirstRender";
import {Car} from "@/components/Car";

const initialStateValues = {
  currency: "GBP" as const,
  startDate: "",
  endDate: "",
  location: "",
  car: null as Car | null,
};

const AppContext = createContext<State>({
  currency: initialStateValues.currency,
  setCurrency: () => {},
  startDate: initialStateValues.startDate,
  setStartDate: () => {},
  endDate: initialStateValues.endDate,
  setEndDate: () => {},
  location: initialStateValues.location,
  setLocation: () => {},
  car: initialStateValues.car,
  setCar: () => {},
});

interface ContextProps {
  children: ReactNode;
}

type Setter<T> = (value: T) => void;

export const Context: FC<ContextProps> = ({children}) => {
  const [currency, setCurrency] = useState<Currency>(initialStateValues.currency);
  const [startDate, setStartDate] = useState(initialStateValues.startDate);
  const [endDate, setEndDate] = useState(initialStateValues.startDate);
  const [location, setLocation] = useState(initialStateValues.location);
  const [car, setCar] = useState<Car | null>(initialStateValues.car);

  const createLocalStorageSetter = <T extends string | object | null>(
    setter: Setter<T>,
    key: string
  ): Setter<T> => {
    return (value: T) => {
      setter(value);
      localStorage.setItem(key, JSON.stringify(value));
    };
  };


  const getInitialValue = <T extends any>(key: keyof typeof initialStateValues): T => {
    const localStorageValue = localStorage.getItem(key);

    return localStorageValue ? parseLocalStorageValue(localStorageValue) : initialStateValues[key];
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
    setStartDate(getInitialValue("startDate"));
    setEndDate(getInitialValue("endDate"));
    setLocation(getInitialValue("location"));
    setCar(getInitialValue("car"));
  });

  return (
    <AppContext.Provider
      value={{
        currency,
        setCurrency: createLocalStorageSetter(setCurrency, "currency"),
        startDate,
        setStartDate: createLocalStorageSetter(setStartDate, "startDate"),
        endDate,
        setEndDate: createLocalStorageSetter(setEndDate, "endDate"),
        location,
        setLocation: createLocalStorageSetter(setLocation, "location"),
        car,
        setCar: createLocalStorageSetter(setCar, "car"),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}
