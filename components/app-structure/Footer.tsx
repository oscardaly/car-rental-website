import React from "react";
import s from "./Footer.module.css";

const Footer = () => {

  return (
    <footer className={s.footer__component}>
      <table className={s.footer__table}>
        <tbody>
        <tr>
          <td>
            <p>Ulster University,</p>
            <p>York Street,</p>
            <p>Belfast,</p>
            <p>BT15 1ED</p>
          </td>
          <td>
            <p>Phone number</p>
            <p>Send enquiry</p>
            <p>Product Support</p>
          </td>
          <td>
            <p>Our Team</p>
            <p>About us</p>
            <p>Careers</p>
          </td>
        </tr>
        <tr>
          <td>
            <p>© Copyright 2023 Nos Rentals - All Rights Reserved</p>
          </td>
        </tr>
        </tbody>
      </table>
      <img src="/footer-image.jpg"
           alt="Image of cars for footer"
           className={s.footer__image}
      />
    </footer>
  );
};


export default Footer;