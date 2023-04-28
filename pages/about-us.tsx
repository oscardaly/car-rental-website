import {FC, FormEvent, useState} from "react";
import styles from "./about-us.module.css";
import {InputField, TextArea} from "@/components/InputField";
import {Button} from "@/components/Button";
import {useFormField} from "../helpers/hooks/UseFormField";
import {isValidEmail} from "../helpers/validation/IsValidEmail";
import Head from "next/head";
import {toast} from "react-toastify";

const AboutUs: FC = () => {
  const [email, setEmailValue, setEmailError, resetEmail] = useFormField("");
  const [enquiryText, setEnquiryText, setEnquiryError, resetEnquiry] = useFormField("");
  const [honeypotValue, setHoneypotValue] = useState<string>();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (honeypotValue) return;

    let isValid = true;

    if (enquiryText.value === "") {
      setEnquiryError("The enquiry must not be empty.");
      isValid = false;
    }

    if (!isValidEmail(email.value)) {
      setEmailError("Please enter a valid email.");
      isValid = false;
    }

    if (isValid) {
      resetEmail();
      resetEnquiry();
      toast("Successfully sent the form!", {type: "success"});
    }
  };

  return (
    <div className={styles.aboutUsArticle}>
      <Head>
        <title>About NOS Rentals</title>
        <meta name="description" content="Welcome to NOS rentals! Learn all about us."/>
      </Head>
      <h2>About Us</h2>
      <div className={styles.aboutUsArticle__content}>
        <p>
          Welcome to NOS rentals!
          We are a premier luxury car rental service that prides ourselves on delivering exceptional customer service and high-quality vehicles.
        </p>
        <p>
          Our team is composed of experienced professionals dedicated to ensuring our customers have the best possible rental experience from start to finish.
          Our mission is to provide an extensive range of luxury and exotic cars, including sports cars, SUVs, and convertibles, all at competitive prices
        </p>
        <p>
          We believe our customers deserve nothing but the very best, and we strive to make sure every rental meets or exceeds their expectations.
          We take pride in offering personalized recommendations to understand the unique needs and preferences of our clients. That being said, feel free to contact us using the form below
        </p>
      </div>
      <h2 className={styles.contactUs__header}>Contact Us</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <label htmlFor="contact-us-form-email">
         <h4>Email</h4>
        </label>
        <InputField
          value={email.value}
          setValue={setEmailValue}
          errorMessage={email.errorMessage}
          placeholder={"you@example.com"}
          className={styles.form__input}
          name="email"
          id="contact-us-form-email"
        />
        <label htmlFor="contact-us-form-enquiry">
          <h4>Enquiry</h4>
        </label>
        <TextArea
          value={enquiryText.value}
          setValue={setEnquiryText}
          errorMessage={enquiryText.errorMessage}
          placeholder={"Your enquiry description"}
          className={styles.form__input}
          id="contact-us-form-enquiry"
        />
        <InputField
          testId={"honeypot-field"}
          value={honeypotValue}
          setValue={setHoneypotValue}
          isHoneyPot
        />
        <Button type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AboutUs;
