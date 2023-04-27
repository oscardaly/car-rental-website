import React, {FC} from "react";
import {Button} from "@/components/Button";
import styles from "./CarCard.module.css";
import s from "@/components/app-structure/Footer.module.css";

// interface Props {
//   car: Car
// }
export const CarCard: FC = () => {
  return (
    <div className={styles.car__card}>
      <div className={styles.car__content}>
        <h1>Porsche 911</h1>
        <p><strong>Price: </strong></p>
        <p><strong>Power: </strong></p>
        <p><strong>0-60mph: </strong></p>
        <p>2 people, Automatic</p>
        {/*<h1>{make} {model}</h1>*/}
        {/*<p>Price: {price}</p>*/}
        {/*<p>Power: {power}</p>*/}
        {/*<p>0-60mph: {0to60Time}</p>*/}
        {/*<p>{seats} people, {transmission}</p>*/}
        <Button type="submit">
          Checkout
        </Button>
      </div>
        <img src="/footer-image.png"
             alt="Image of cars for footer"
             className={styles.car__image}
        />
    </div>
  );
};