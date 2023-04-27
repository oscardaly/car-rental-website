import {Currency} from "./Currency";
import {Car} from "@/components/Car";
import {Dispatch, SetStateAction} from "react";

/* eslint-disable no-unused-vars */

export interface State {
  currency: Currency,
  setCurrency: (currency: Currency) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  location: string;
  setLocation: (location: string) => void;
  car: Car | null;
  setCar: Dispatch<SetStateAction<Car | null>>;
}
