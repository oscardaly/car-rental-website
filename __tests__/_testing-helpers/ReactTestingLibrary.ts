import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export const fillInFormField = async (placeholderText: string, text: string) => {
  const field = await screen.findByPlaceholderText(placeholderText);
  await userEvent.type(field, text);
  return field;
};

export const enterDate = async (testId: string, dateString: string): Promise<void> => {
  const dateField = screen.getByTestId(testId);
  await userEvent.type(dateField, dateString);
};

export const setSystemDate = (date: Date) => {
  jest
    .useFakeTimers({
      doNotFake: [
        "nextTick",
        "setImmediate",
        "clearImmediate",
        "setInterval",
        "clearInterval",
        "setTimeout",
        "clearTimeout",
      ],
    })
    .setSystemTime(date);
};

export const clickSubmitButton = async () => userEvent.click(await screen.findByText("Submit"));