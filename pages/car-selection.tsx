import styles from "@/pages/car-selection.module.css";
import Head from "next/head";
import React, {FC, useEffect, useState} from "react";
import {InputField} from "@/components/InputField";
import {CarCard} from "@/components/CarCard";
import {Car} from "@/components/Car";
import {useRouter} from "next/router";
import Link from "next/link";


const CarSelection: FC = () => {
  const router = useRouter();
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [sortingMethod, setSortingMethod] = useState("Price");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("/CarData.json");
        const carsData = await response.json();
        setCars(carsData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    const selectedFilterFromQuery = router.query.filter as string;
    setSelectedFilter(selectedFilterFromQuery || "");
  }, [router.query.filter]);

  const handleClick = (filterOption: string) => {
    const query = filterOption ? {filter: filterOption} : {};
    router.push({
      pathname: router.pathname,
      query: query,
    });
  };

  const sortCars = (a: Car, b: Car) => {
    if (sortingMethod === "Price") {
      return a.price - b.price;
    } else if (sortingMethod === "Popularity") {
      return b.popularity - a.popularity;
    } else if (sortingMethod === "Brand A-Z") {
      return a.make.localeCompare(b.make);
    }
    return 0;
  };

  const filteredCars = cars
    .filter((car) => {
      const makeAndModel = `${car.make} ${car.model}`.toLowerCase();
    switch (selectedFilter) {
      case "":
        return true;
      case "100":
        return car.price <= 100;
      case "200":
        return car.price > 100 && car.price <= 200;
      case "300":
        return car.price > 201 && car.price <= 300;
      case "400":
        return car.price > 301 && car.price <= 400;
      case "500":
        return car.price > 401 && car.price >= 500;
      case "porsche":
        return car.make === "Porsche";
      case "audi":
        return car.make === "Audi";
      case "bmw":
        return car.make === "BMW";
      case "ferrari":
        return car.make === "Ferrari";
      case "1":
        return car.seats === 1;
      case "2":
        return car.seats === 2;
      case "3":
        return car.seats === 3;
      case "4":
        return car.seats === 4;
      case "300hp":
        return car.power <= 300;
      case "350hp":
        return car.power > 300 && car.power <= 350;
      case "400hp":
        return car.power > 350 && car.power <= 400;
      case "450hp":
        return car.power > 400 && car.power <= 450;
      case "500hp":
        return car.power > 450 && car.power <= 500;
      case "550hp":
        return car.power > 500 && car.power <= 550;
      case "600+hps":
        return car.power > 550 && car.power >= 600;
      default:
        return makeAndModel.includes(selectedFilter.toLowerCase());
    }
    })
    .sort(sortCars);

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/svg/logo.svg"/>
        <title>Select Car</title>
      </Head>
      <div className={`${styles.header} ${styles.border}`}>
        <p><Link href="/">...</Link>/Car Selection</p>
        <div className={styles.header}>
          <h2>Choose your car:</h2>
          <InputField
            setValue={setSelectedFilter}
            placeholder={"Your make/model"}
            className={styles.search__input}
            testId="search-input"
          />
        </div>
        <div className={styles.sort__object}>
          <p>Sort by:</p>
          <select
            data-testid="sort-dropdown"
            className={styles.sort__select}
            defaultValue="Price"
            onChange={(event) => setSortingMethod(event.target.value)}
          >
            <option value="Price">Price</option>
            <option value="Popularity">Popularity</option>
            <option value="Brand A-Z">Brand A-Z</option>
          </select>
        </div>
      </div>
      <div className={styles.car__container}>
        <div className={styles.filter}>
          <p>Filter by:</p>
          <p className={styles.filter__header}><strong>Price</strong></p>
          <div className={styles.filter__content}>
            <a href="#" onClick={() => handleClick("100")}>£0-£100</a>
            <a href="#" onClick={() => handleClick("200")}>£101-£200</a>
            <a href="#" onClick={() => handleClick("300")}>£201-300</a>
            <a href="#" onClick={() => handleClick("400")}>£301-£400</a>
            <a href="#" onClick={() => handleClick("500")}>£401-£500+</a>
          </div>

          <p className={styles.filter__header}><strong>Make</strong></p>
          <div className={styles.filter__content}>
            <a href="#" onClick={() => handleClick("porsche")}>Porsche</a>
            <a href="#" onClick={() => handleClick("audi")}>Audi</a>
            <a href="#" onClick={() => handleClick("bmw")}>BMW</a>
            <a href="#" onClick={() => handleClick("ferrari")}>Ferrari</a>
          </div>

          <p className={styles.filter__header}><strong>Seats</strong></p>
          <div className={styles.filter__content}>
            <a href="#" onClick={() => handleClick("1")}>1</a>
            <a href="#" onClick={() => handleClick("2")}>2</a>
            <a href="#" onClick={() => handleClick("3")}>3</a>
            <a href="#" onClick={() => handleClick("4")}>4</a>
          </div>

            <p className={styles.filter__header}><strong>Horsepower</strong></p>
            <div className={styles.filter__content}>
              <a href="#" onClick={() => handleClick("300hp")}>0-300hp</a>
              <a href="#" onClick={() => handleClick("350hp")}>301-350hp</a>
              <a href="#" onClick={() => handleClick("400hp")}>351-400hp</a>
              <a href="#" onClick={() => handleClick("450hp")}>401-450hp</a>
              <a href="#" onClick={() => handleClick("500hp")}>451-500hp</a>
              <a href="#" onClick={() => handleClick("550hp")}>501-550hp</a>
              <a href="#" onClick={() => handleClick("600+hps")}>551-600+hps</a>
            </div>
          </div>
          <div className={styles.car__card}>
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car}/>
            ))}
          </div>
        </div>
      </div>
      );
      };

      export default CarSelection;