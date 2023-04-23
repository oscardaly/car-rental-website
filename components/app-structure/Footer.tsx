import React from "react";
import s from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={s.footer__component}>
      <div className={s.footer__div}>
        <table className={s.footer__table}>
          <tbody>
          <tr className={s.footer__row}>
            <td className={s.footer__column}>
              <p><b>Address</b></p>
              <p>Ulster University,</p>
              <p>York Street,</p>
              <p>Belfast,</p>
              <p>BT15 1ED</p>
            </td>
            <td className={s.footer__column}>
              <p><b>Contact Us</b></p>
              <p>Phone number</p>
              <p>Send enquiry</p>
              <p>Product Support</p>
            </td>
            <td className={s.footer__column}>
              <p><b>The Company</b></p>
              <p>Our Team</p>
              <p>About us</p>
              <p>Careers</p>
            </td>
          </tr>
          </tbody>
        </table>
        <p>© Copyright 2023 Nos Rentals - All Rights Reserved</p>
      </div>
      <img src="/footer-image.png"
           alt="Image of cars for footer"
           className={`${s.footer__image} ${s.gradient}`}
      />
    </footer>
  );
};

export default Footer;