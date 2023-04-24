import s from "@/pages/BookingConfirmation.module.css";
import Head from "next/head";
import React, {FC} from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

interface BookingConfirmationProps {
  success: boolean,
  imagePath?: string,
  leftDescription?: string,
}

const BookingConfirmation: FC<BookingConfirmationProps> = ({success, imagePath, leftDescription}) => {
  const title: string = success ? "Thank you for booking!" : "Booking Failed";
  leftDescription = success ? leftDescription : "Unfortunately, your booking could not be processed, please try again or contact us " +
    "if this is an issue that frequently persists.";
  const rightDescription: string = "If you have any questions, concerns or feedback, please email us at: info@nosrentals.com or " +
    "contact us on one of our social channels and we'll be more than happy to help. Thank you!";
  const {width, height} = useWindowSize();


  return (
    <div className={s.container}>
      <Head>
        <title>Booking Confirmation</title>
      </Head>
      <div className={s.header}>
        <h1>{title}</h1>
        {success &&
          <div>
            <Confetti
              width={width}
              height={height}
            />
            <img src={imagePath}
                 alt="Image of cars booked"
                 className={`${s.footer__image} ${s.gradient}`}
            />
          </div>
        }
        <table className={s.table}>
          <tbody>
          <tr>
            <td className={s.row__left}>
              <p>{leftDescription}</p>
            </td>
            <td>
              <img src="/line.png"
                   alt="Line to separate table"
              />
            </td>
            <td className={s.row__right}>
              <p>{rightDescription}</p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingConfirmation;