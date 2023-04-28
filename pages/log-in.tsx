import {FC, FormEvent, useState, useEffect} from "react";
import styles from "./log-in.module.css";
import {InputField} from "@/components/InputField";
import {Button} from "@/components/Button";
import {useFormField} from "../helpers/hooks/UseFormField";
import Head from "next/head";
import {useRouter} from "next/router";
import Cookies from "js-cookie";

const LogIn: FC = () => {
  const [username, setUsernameValue, setUsernameError] = useFormField("");
  const [passwordText, setPasswordText, setPasswordError] = useFormField("");
  const [honeypotValue, setHoneypotValue] = useState<string>();
  const router = useRouter();
  const [greeting, setGreeting] = useState<string>();

  useEffect(() => {
    const username = Cookies.get("username");
    if (username) {
      setGreeting(`Hi ${username}!`);
    }
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (honeypotValue) return;

    if (username.value !== "admin" || passwordText.value !== "admin") {
      setUsernameError("Username or password incorrect");
      setPasswordError(" ");
      return;
    }

    const email = username.value;
    Cookies.set("username", email);
    await router.push("/");
  };

  const onLogOut = async () => {
    if (honeypotValue) return;
    Cookies.remove("username");
    setGreeting(undefined);
  };

  if (greeting) {
    return (
      <div className={styles.logInArticle}>
        <p>{greeting}</p>
        <Button onClick={onLogOut}>
          Log Out
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.logInArticle}>
      <Head>
        <link rel="icon" href="/svg/logo.svg"/>
        <title>Log In </title>
        <meta name="description" content="Sign in to your account."/>
      </Head>
      <h2>Log In</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <label htmlFor="log-in-form-username">
          <h4>Username/Email</h4>
        </label>
        <InputField
          value={username.value}
          setValue={setUsernameValue}
          errorMessage={username.errorMessage}
          placeholder={"you@example.com"}
          className={styles.form__input}
          name="email"
          id="log-in-form-username"
        />
        <label htmlFor="log-in-form-password">
          <h4>Password</h4>
        </label>
        <InputField
          value={passwordText.value}
          setValue={setPasswordText}
          errorMessage={passwordText.errorMessage}
          placeholder={"Password"}
          className={styles.form__input}
          id="log-in-form-password"
        />
        <InputField value={honeypotValue} setValue={setHoneypotValue} isHoneyPot/>
        <Button type="submit">
          Log In
        </Button>
      </form>
    </div>
  );
};

export default LogIn;


