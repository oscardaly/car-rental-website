import styles from "@/pages/index.module.css";
import Head from "next/head";
import ImageCarousel from "@/components/ImageCarousel";
import {InputField} from "@/components/InputField";
import {useFormField} from "../helpers/hooks/UseFormField";
import {isBefore, isFuture} from "date-fns";
import {Button} from "@/components/Button";
import {FormEvent} from "react";
import {useAppContext} from "../context/state";
import {useRouter} from "next/router";
import {useGetHomescreenImages} from "../helpers/hooks/UseGetHomescreenImages";


export default function Home() {
  const context = useAppContext();
  const router = useRouter();
  const images = useGetHomescreenImages();

  const [location, setLocationValue, setLocationErrorMessage] = useFormField(context.location);
  const [startDate, setStartDateValue, setStartDateErrorMessage] = useFormField(context.startDate);
  const [endDate, setEndDateValue, setEndDateErrorMessage] = useFormField(context.endDate);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isFormValid = true;

    if (!startDate.value) {
      isFormValid = false;
      setStartDateErrorMessage("Please enter a start date.");
    }

    if (!endDate.value) {
      isFormValid = false;
      setEndDateErrorMessage("Please enter an end date.");
    }

    if (!location.value) {
      isFormValid = false;
      setLocationErrorMessage("Please enter a location.");
    }

    if (!isFormValid) return;

    const startDateParsed = new Date(startDate.value);
    const endDateParsed = new Date(endDate.value);

    if (!isFuture(startDateParsed)) {
      isFormValid = false;
      setStartDateErrorMessage("The start date must be in the future.");
    }

    if (isBefore(endDateParsed, startDateParsed)) {
      isFormValid = false;
      setEndDateErrorMessage("The end date must be after the start date.");
    }

    if (isFormValid) {
      context.setStartDate(startDate.value);
      context.setEndDate(endDate.value);
      context.setLocation(location.value);

      await router.push("/car-selection");
    }
  };

  return (
    <div className={styles.index}>
      <Head>
        <link rel="icon" href="/svg/logo.svg"/>
        <title>Home</title>
      </Head>
      <div className={styles.carouselWrapper}>
        <ImageCarousel images={images}/>

        <div className={styles.callsToAction}>
          <form onSubmit={onSubmit}>
            <h3>Rent Your Dream Car</h3>
            <label htmlFor="location-field">
              <h5>Location</h5>
            </label>
            <InputField
              value={location.value}
              setValue={setLocationValue}
              errorMessage={location.errorMessage}
              placeholder="Location"
              id="location-field"
            />
            <label htmlFor="start-date-field">
              <h5>Rental Start Date</h5>
            </label>
            <InputField
              value={startDate.value}
              setValue={setStartDateValue}
              errorMessage={startDate.errorMessage}
              type="date"
              id="start-date-field"
              testId="start-date"
            />
            <label htmlFor="end-date-field">
              <h5>Rental End Date</h5>
            </label>
            <InputField
              value={endDate.value}
              setValue={setEndDateValue}
              errorMessage={endDate.errorMessage}
              type="date"
              id="end-date-field"
              testId="end-date"
            />
            <Button type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

//TODO
// - deselect filters
// - pipeline
// - Euros for prices
// - fix sample car data
// - change location to select
// - Highlight active filter
