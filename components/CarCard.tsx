import React, {FC, FormEvent, useContext} from "react";
import {Button} from "@/components/Button";
import styles from "./CarCard.module.css";
import {Car} from "@/components/Car";
import {useRouter} from "next/router";
import {useAppContext} from "../context/state";
import {SelectedCarContext} from "../context/model/SelectedCarContext";


interface Props {
  car: Car;
}

export const CarCard: FC<Props> = ({car}) => {
  const router = useRouter();
  const context = useAppContext();
  const selectedCarContext = useContext(SelectedCarContext);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    context.setCar(car); // Pass the selected car to the context
    await router.push("/checkout");
  };


  return (
    <SelectedCarContext.Provider value={selectedCarContext}>
    <form onSubmit={onSubmit} className={styles.car__card} data-testid="car-card">
      <div className={styles.car__content}>
        <h1>{car.make} {car.model}</h1>
        <p>Price: £{car.price} per day</p>
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
             alt={`Image of ${car.make} ${car.model}`}
        />
      </div>
    </form>
    </SelectedCarContext.Provider>
  );
};
