import {createContext} from "react";
import {Car} from "@/components/Car";

export const SelectedCarContext = createContext<Car | null>(null);
