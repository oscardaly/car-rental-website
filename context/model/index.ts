import {Currency} from "./Currency";
/* eslint-disable no-unused-vars */

export interface State {
  currency: Currency,
  setCurrency: (currency: Currency) => void;
}