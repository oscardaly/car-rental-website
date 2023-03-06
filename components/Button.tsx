import {ButtonHTMLAttributes, FC, ReactNode} from "react";
import styles from "./Button.module.css";

interface Props {
  onClick?: () => void
  children?: ReactNode | string
  type?: ButtonHTMLAttributes<any>["type"]
}

export const Button: FC<Props> = ({onClick, children, type}) => (
  <button onClick={onClick} className={styles.button} type={type}>
    {children}
  </button>
);