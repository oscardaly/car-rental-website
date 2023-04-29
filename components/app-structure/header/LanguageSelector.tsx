import React, {FC} from "react";
import styles from "./CurrencySelector.module.css";
import {languages} from "../../../context/model/Language";

export const LanguageSelector: FC = () => {
  return (
    <select defaultValue={languages.at(0)} data-testid="LanguageSelector" className={styles.currencySelector}>
      {
        languages.map((language, index) => (
          <option value={language} key={index}>{language}</option>)
        )
      }
    </select>
  );
};