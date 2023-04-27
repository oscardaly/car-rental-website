import styles from "@/pages/car-selection.module.css";
import Head from "next/head";
import {FC} from "react";
import {InputField} from "@/components/InputField";
import {CarCard} from "@/components/CarCard";

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
      <div className={styles.car__container}>
        <div className={styles.filter}>
          <p>Filter by:</p>
          <div className={styles.filter__header}>
            <p><strong>Price</strong></p>
          </div>
          <div className={styles.filter__content}>
            <p>£75</p>
            <p>£100</p>
            <p>£125</p>
            <p>£150</p>
            <p>£175</p>
          </div>
          <div className={styles.filter__header}>
            <p><strong>Brand</strong></p>
          </div>
          <div className={styles.filter__content}>
            <p>Porsche</p>
            <p>Audi</p>
            <p>BMW</p>
            <p>Ferrari</p>
          </div>
          <div className={styles.filter__header}>
            <p><strong>Seats</strong></p>
          </div>
          <div className={styles.filter__content}>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
          </div>
          <div className={styles.filter__header}>
            <p><strong>Power</strong></p>
          </div>
          <div className={styles.filter__content}>
            <p>300hp</p>
            <p>350hp</p>
            <p>400hp</p>
            <p>450hp</p>
            <p>500hp</p>
            <p>550hp</p>
            <p>600+hp</p>
          </div>
        </div>
        <div className={styles.car__card}>
          <CarCard/>
          <CarCard/>
          <CarCard/>
        </div>
      </div>
    </div>
  );
};

export default CarSelection;