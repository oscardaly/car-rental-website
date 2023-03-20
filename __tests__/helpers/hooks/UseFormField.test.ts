import {renderHook} from "@testing-library/react";
import {useFormField} from "../../../helpers/hooks/UseFormField";
import {act} from "react-dom/test-utils";

describe("Use form field", () => {
  it("should return the value and error message", () => {
    const {result} = renderHook(() => useFormField("Start Value"));

    expect(result.current[0]).toEqual({
      value: "Start Value",
      errorMessage: undefined
    });
  });

  it("should return a function which can be used to set the error", () => {
    const {result} = renderHook(() => useFormField("Start value"));

    act(() => {
      result.current[2]("Please enter a valid value");
    });

    expect(result.current[0]).toEqual({
      value: "Start value",
      errorMessage: "Please enter a valid value"
    });
  });

  it("should return a function which can be used to change the value and remove the error", () => {
    const {result} = renderHook(() => useFormField("Start Value"));

    act(() => {
      result.current[2]("This error should be removed");
      result.current[1]("New value");
    });

    expect(result.current[0]).toEqual({
      value: "New value",
      errorMessage: undefined
    });
  });

  it("should return a function which can be used to reset the form field", () => {
    const {result} = renderHook(() => useFormField("Start value"));
    act(() => {
      result.current[2]("This error should be removed");
      result.current[1]("New value should be reset");
    });

    act(() => {
      result.current[3]();
    });

    expect(result.current[0]).toEqual({
      value: "Start value",
      errorMessage: undefined
    });
  });
});