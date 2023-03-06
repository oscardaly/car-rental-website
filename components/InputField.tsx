import {ChangeEvent, FC} from "react";
import styles from "./InputField.module.css";
interface Props {
  value?: string
  setValue: (value: string) => void;
  className?: string;
  placeholder?: string;
  isHoneyPot?: boolean;
  name?: string;
  id?: string;
}
export const InputField: FC<Props> = (
  {
    className,
    setValue,
    value,
    placeholder,
    isHoneyPot = false,
    name,
    id
  }
) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  return (
    <input
      value={value}
      onChange={onChange}
      className={`${className} ${styles.inputField} ${isHoneyPot ? styles.honeypot : ""}`}
      placeholder={placeholder}
      name={name}
      id={id}
    />
  );
};

export const TextArea: FC<Props> = (
  {
    className,
    setValue,
    value,
    placeholder,
    id
  }
) => {
  const onChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setValue(event.target.value);
  };

  return (
    <textarea
      value={value}
      onChange={onChange}
      className={`${className} ${styles.inputField} ${styles.inputField__textArea}`}
      placeholder={placeholder}
      id={id}
    />
  );
};