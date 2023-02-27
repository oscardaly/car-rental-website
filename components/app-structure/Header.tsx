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
          alt="NOS Rentals"
        />
      </Link>

      <div className={s.header__items}>
        <h2>{context.currency}</h2>
      </div>
    </div>
  );
};

export default Header;