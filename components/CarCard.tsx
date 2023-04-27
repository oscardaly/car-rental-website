import React, {FC} from "react";
import {Button} from "@/components/Button";
import styles from "./CarCard.module.css";
import {Car} from "@/components/Car";

interface Props {
  car: Car;
}

export const CarCard: FC<Props> = ({car}) => {
  return (
    <div className={styles.car__card}>
      <div className={styles.car__content}>
        <h1>{car.make} {car.model}</h1>
        <p>Price: {car.price}</p>
        <p>Power: {car.power}</p>
        <p>0-60 mph: {car.zeroToSixtyTime} sec</p>
        <p>Seats: {car.seats}</p>
        <p>Transmission: {car.transmission}</p>
        <div>
          <Button type="submit">
            Checkout
          </Button>
        </div>
      </div>
      <div>
        <img src={car.imageUrl}
             className={styles.car__image}
        />
      </div>
    </div>
  );
};
