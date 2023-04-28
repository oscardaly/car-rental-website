import styles from "./checkout.module.css";
import Head from "next/head";
import React, {FC, FormEvent} from "react";
import {InputField} from "@/components/InputField";
import {useFormField} from "../helpers/hooks/UseFormField";
import {useAppContext} from "../context/state";
import {Button} from "@/components/Button";
import {useRouter} from "next/router";
import Link from "next/link";

const Checkout: FC = () => {
  const context = useAppContext();
  const router = useRouter();
  const [forename, setForenameValue, setForenameErrorMessage] = useFormField("");
  const [surname, setSurnameValue, setSurnameErrorMessage] = useFormField("");
  const [address, setAddressValue, setAddressErrorMessage] = useFormField("");
  const [city, setCityValue, setCityErrorMessage] = useFormField("");
  const [county, setCountyValue, setCountyErrorMessage] = useFormField("");
  const [postcode, setPostcodeValue, setPostcodeErrorMessage] = useFormField("");
  const [email, setEmailValue, setEmailErrorMessage] = useFormField("");

  const [nameOnCard, setNameOnCardValue, setNameOnCardErrorMessage] = useFormField("");
  const [cardNumber, setCardNumberValue, setCardNumberErrorMessage] = useFormField("");
  const [expiryDate, setExpiryDateValue, setExpiryDateErrorMessage] = useFormField("");
  const [CVC, setCVCValue, setCVCErrorMessage] = useFormField("");
  const isEmail: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isNum: RegExp = /\d/;
  const isValidDate: RegExp = /^(0[1-9]|1[0-2])[\/]([0-9]{2})$/;

  const isBookingSuccessful = () => {
    return "success";
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isFormValid = true;

    if (!forename.value || isNum.test(forename.value)) {
      isFormValid = false;
      setForenameErrorMessage("Please enter a valid forename.");
    }

    if (!surname.value || isNum.test(surname.value)) {
      isFormValid = false;
      setSurnameErrorMessage("Please enter a valid surname.");
    }

    if (!address.value) {
      isFormValid = false;
      setAddressErrorMessage("Please enter an valid address.");
    }

    if (!city.value || isNum.test(city.value)) {
      isFormValid = false;
      setCityErrorMessage("Please enter a valid city.");
    }

    if (!county.value || isNum.test(county.value)) {
      isFormValid = false;
      setCountyErrorMessage("Please enter a valid county.");
    }

    if (!postcode.value) {
      isFormValid = false;
      setPostcodeErrorMessage("Please enter a postcode.");
    } else if (postcode.value.replace(/\s+/g, "").length !== 6 &&
      postcode.value.replace(/\s+/g, "").length !== 7) {
      isFormValid = false;
      setPostcodeErrorMessage("Please enter a valid postcode.");
    }

    if (!email.value) {
      isFormValid = false;
      setEmailErrorMessage("Please enter an email address.");
    } else if (!isEmail.test(email.value)) {
      isFormValid = false;
      setEmailErrorMessage("Please enter a valid email address.");
    }

    if (!nameOnCard.value || isNum.test(nameOnCard.value)) {
      isFormValid = false;
      setNameOnCardErrorMessage("Please enter the name on your card.");
    }

    if (!cardNumber.value ||
      !isNum.test(cardNumber.value) ||
      cardNumber.value.trim().length < 15 ||
      cardNumber.value.trim().length > 19) {
      isFormValid = false;
      setCardNumberErrorMessage("Please enter your card number.");
    }

    if (!expiryDate.value || !isValidDate.test(expiryDate.value)) {
      isFormValid = false;
      setExpiryDateErrorMessage("Please enter your card's expiry date.");
    }

    if (!CVC.value ||
      !isNum.test(CVC.value) ||
      (CVC.value.trim().length !== 3 &&
        CVC.value.trim().length !== 4)) {
      isFormValid = false;
      setCVCErrorMessage("Please enter your card's CVC.");
    }

    if (!isFormValid) return;

    if (isFormValid) {
      await router.push("/booking-confirmation/" + isBookingSuccessful());
    }
  };

  const getDaysBetweenDates = (date1: Date, date2: Date): number => {
    // Calculate the difference in milliseconds between the two dates
    const diffInMs = date2.getTime() - date1.getTime();

    // Convert the milliseconds to days
    const days = diffInMs / (1000 * 60 * 60 * 24);

    // Round the result to the nearest whole number and return it
    return Math.round(days);
  };

  const costPerDay = context.car?.price ?? 0;
  const VAT: number = ((15 + (costPerDay ?? 0)) / 100 * 10);
  const daysBooked = getDaysBetweenDates(new Date(context.startDate), new Date(context.endDate));
  const Total: number = (costPerDay * daysBooked) + (15 * daysBooked) + VAT;

  return (
    <>
      <Head>
        <link rel="icon" href="/svg/logo.svg"/>
        <title>Checkout</title>
      </Head>
      <p className={styles.breadcrumbs}><Link href="/car-selection">...</Link>/Checkout</p>
      <h1 className={styles.subheader}>Checkout</h1>
      <div className={styles.form}>
        <form onSubmit={onSubmit}>
          <div className={styles.section}>
            <h2 className={styles.header}>Personal Details</h2>
            <div className={styles.inline__input}>
              <InputField
                value={forename.value}
                setValue={setForenameValue}
                placeholder={"Forename"}
                errorMessage={forename.errorMessage}
                className={styles.small__input}
                id="forename-field"
              />
              <InputField
                value={surname.value}
                setValue={setSurnameValue}
                placeholder={"Surname"}
                errorMessage={surname.errorMessage}
                className={styles.small__input}
                id="surname-field"
              />
            </div>
            <InputField
              value={address.value}
              setValue={setAddressValue}
              placeholder={"Address"}
              errorMessage={address.errorMessage}
              className={styles.big__input}
              id="address-field"
            />
              <InputField
                value={city.value}
                setValue={setCityValue}
                placeholder={"City"}
                errorMessage={city.errorMessage}
                className={styles.big__input}
                id="city-field"
              />
            <div className={styles.inline__input}>
            <InputField
                value={county.value}
                setValue={setCountyValue}
                placeholder={"County"}
                errorMessage={county.errorMessage}
                className={styles.small__input}
                id="county-field"
              />
            <InputField
              value={postcode.value}
              setValue={setPostcodeValue}
              placeholder={"Postcode"}
              errorMessage={postcode.errorMessage}
              className={styles.small__input}
              id="postcode-field"
            />
            </div>
            <InputField
              value={email.value}
              setValue={setEmailValue}
              placeholder={"Email"}
              errorMessage={email.errorMessage}
              className={styles.big__input}
              id="email-field"
            />
          </div>
          <div className={styles.section}>
            <h2 className={styles.header}>Card Details</h2>
            <InputField
              value={nameOnCard.value}
              setValue={setNameOnCardValue}
              placeholder={"Name On Card"}
              errorMessage={nameOnCard.errorMessage}
              className={styles.big__input}
              id="nameOnCard-field"
            />
            <InputField
              value={cardNumber.value}
              setValue={setCardNumberValue}
              placeholder={"Card Number"}
              errorMessage={cardNumber.errorMessage}
              className={styles.big__input}
              id="cardNumber-field"
            />
            <div className={styles.inline__input}>
            <InputField
              value={expiryDate.value}
              setValue={setExpiryDateValue}
              placeholder={"Expiry Date - (MM/YY)"}
              errorMessage={expiryDate.errorMessage}
              className={styles.small__input}
              id="expiryDate-field"
            />
            <InputField
              value={CVC.value}
              setValue={setCVCValue}
              placeholder={"CVC"}
              errorMessage={CVC.errorMessage}
              className={styles.small__input}
              id="CVC-field"
            />
            </div>
          </div>
          <div className={styles.button__style}>
          <Button type="submit">
            Confirm & Pay
          </Button>
          </div>
        </form>
        <div className={styles.summary__box}>
          <h1>Booking Summary</h1>
          <h3>Car:</h3>
          <p>{context.car?.make} {context.car?.model}</p>
          <h3>Date of booking:</h3>
          <p>{new Date(context.startDate).toDateString()} -{">"} {new Date(context.endDate).toDateString()}</p>
          <h3>Pickup Location:</h3>
          <p>{context.location}</p>
          <h3>Total cost:</h3>
          <p>Cost per day: £{costPerDay}</p>
          <p>Insurance per day: £15</p>
          <p>VAT of 10%: £{VAT.toFixed(2)}</p>
          <p><strong>Total: £{Total.toFixed(2)}</strong></p>
        </div>
      </div>
    </>
  );
};

export default Checkout;