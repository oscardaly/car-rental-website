import {FormField} from "../model/FormField";
import {useState} from "react";


type Response<T> = [
  FormField<T>,
  (value: T) => void,
  (error: string) => void,
  () => void
]
export const useFormField = <T>(initial: T): Response<T> => {
  const initialFormField = {value: initial, errorMessage: undefined};
  const [value, setValue] = useState<FormField<T>>(initialFormField);

  return [
    value,
    (newValue) => setValue({value: newValue, errorMessage: undefined}),
    (error) => setValue({value: value.value, errorMessage: error}),
    () => setValue(initialFormField)
  ];
};