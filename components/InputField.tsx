import {ChangeEvent, FC} from "react";
import styles from "./InputField.module.css";

interface Props {
  value?: string;
  setValue: (value: string) => void;
  className?: string;
  placeholder?: string;
  isHoneyPot?: boolean;
  name?: string;
  id?: string;
  errorMessage?: string;
}

export const InputField: FC<Props> = (
  {
    className,
    setValue,
    value,
    placeholder,
    isHoneyPot = false,
    name,
    id,
    errorMessage
  }
) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  return (
    <>
      <input
        value={value}
        onChange={onChange}
        className={`
        ${className} 
        ${styles.inputField} 
        ${isHoneyPot ? styles.honeypot : ""} 
        ${errorMessage ? styles.errorInputField : ""}`
        }
        placeholder={placeholder}
        name={name}
        id={id}
      />
      <ErrorOutput errorMessage={errorMessage}/>
    </>
  );
};

export const TextArea: FC<Props> = (
  {
    className,
    setValue,
    value,
    placeholder,
    name,
    id,
    errorMessage
  }
) => {
  const onChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setValue(event.target.value);
  };

  return (
    <>
      <textarea
        value={value}
        onChange={onChange}
        name={name}
        className={`
          ${className} 
          ${styles.inputField} 
          ${styles.inputField__textArea}
          ${errorMessage ? styles.errorInputField : ""}
        `}
        placeholder={placeholder}
        id={id}
      />

      <ErrorOutput errorMessage={errorMessage}/>
    </>
  );
};

function ErrorOutput(props: { errorMessage: string | undefined }) {
  return <output className={styles.errorMessage}>
    <h5>
      {props.errorMessage}
    </h5>
  </output>;
}