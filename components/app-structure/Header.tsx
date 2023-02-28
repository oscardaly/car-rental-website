import Link from "next/link";
import React from "react";
import s from "./Header.module.css";
import {useAppContext} from "../../context/state";

const Header = () => {
  const context = useAppContext();

  return (
    <div className={s.header}>
      <Link href="/">
        <img
          src="/svg/logo.svg"
          height="100%"
          alt="NOS Rentals Logo"
        />
      </Link>

      <div className={s.header__items}>
        <h2 className={s.options}>{context.currency} | EN</h2>
        <div className={s.header__items}>
          <Link className={s.header__button} href="/">Log In </Link>
          <h2>|</h2>
          <Link className={s.header__button} href="/"> Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;