import styles from "@/pages/car-selection.module.css";
import Head from "next/head";
import {FC} from "react";
import {InputField} from "@/components/InputField";

const CarSelection: FC = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Select Car</title>
      </Head>
      <div className={styles.header}>
        <p>.../Car Selection</p>
        <div className={styles.header}>
          <h2>Choose your car:</h2>
          <InputField
            value={""}
            setValue={() => console.log("Still need to implement this")}
            placeholder={"Your make/model"}
            className={styles.search__input}
          />
        </div>
        <div className={styles.header}>
          <p>Sort by:</p>
          <select className={styles.sort__select}>
            <option value="Price" selected>Price</option>
            <option value="Popularity">Popularity</option>
            <option value="Brand A-Z">Brand A-Z</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CarSelection;