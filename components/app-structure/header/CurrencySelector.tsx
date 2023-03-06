import React, {ChangeEvent, FC} from "react";
import styles from "./CurrencySelector.module.css";
import {useAppContext} from "../../../context/state";
import {currencies, Currency} from "../../../context/model/Currency";

export const CurrencySelector: FC = () => {
  const {currency, setCurrency} = useAppContext();

  const handleCurrencySelection = (event: ChangeEvent<HTMLSelectElement>): void => {
    setCurrency(event.target.value as Currency);
  };


  return (
    <select value={currency} onChange={handleCurrencySelection} className={styles.currencySelector}>
      {
        currencies.map((currency, index) => (
          <option value={currency} key={index}>{currency}</option>)
        )
      }
    </select>
  );
};