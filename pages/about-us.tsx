import {FC, useState} from "react";
import styles from "./AboutUs.module.css";
import {InputField, TextArea} from "@/components/InputField";
import {Button} from "@/components/Button";

const AboutUs: FC = () => {
  const [email, setEmail] = useState("");
  const [enquiryText, setEnquiryText] = useState("");

  return (
    <article className={styles.aboutUsArticle}>
      <h2>About Us</h2>


      <form className={styles.form}>
        <h4 className={styles.form__heading}>Email</h4>
        <InputField
          value={email}
          setValue={setEmail}
          placeholder={"you@example.com"}
          className={styles.form__input}
        />
        <h4 className={styles.form__heading}>Enquiry</h4>
        <TextArea
          value={enquiryText}
          setValue={setEnquiryText}
          placeholder={"Your enquiry description"}
          className={styles.form__input}
        />
        <Button type="submit">
          Submit
        </Button>
      </form>
    </article>
  );
};

export default AboutUs;
