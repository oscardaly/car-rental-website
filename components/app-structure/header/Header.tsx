import Link from "next/link";
import React, {FC} from "react";
import s from "./Header.module.css";
import {CurrencySelector} from "@/components/app-structure/header/CurrencySelector";
import {LanguageSelector} from "@/components/app-structure/header/LanguageSelector";

const Header: FC = () => (
  <div className={s.header}>
    <Link href="/">
      <img
        src="/svg/logo.svg"
        height="100%"
        alt="NOS Rentals Logo"
      />
    </Link>

    <div className={s.header__items}>
      <CurrencySelector/>
      <h2 className={s.separator}>|</h2>
      <LanguageSelector/>

      <Link className={s.header__button} href="/log-in">Log In </Link>
      <h2 className={s.separator}>|</h2>
      <Link className={s.header__button} href="/log-in"> Sign Up</Link>
    </div>
  </div>
);

export default Header;