import {useAppContext} from "../../context/state";

// In a real project we would use an api to do this calculation
const EU_EXCHANGE_RATE = 1.13;
export const usePriceCalculator = (): (britishPrice: number) => number => {
  const {currency} = useAppContext();

  return (britishPrice) => {
    return currency === "GBP"
      ? britishPrice
      : britishPrice * EU_EXCHANGE_RATE;
  };
};