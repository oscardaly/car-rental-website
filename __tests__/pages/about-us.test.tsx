import {fireEvent, render, screen} from "@testing-library/react";
import AboutUs from "@/pages/about-us";
import userEvent from "@testing-library/user-event";

describe("Contact us form", () => {
  const logSpy = jest.spyOn(global.console, "log");

  beforeEach( () => {
    jest.clearAllMocks();
  });

  it("should log and reset form when filled in properly", async () => {
    render(<AboutUs/>);
    const emailField = await fillInFormField("you@example.com", "test@test.com");
    const enquiryField = await fillInFormField("Your enquiry description", "Dummy description");

    await userEvent.click(await screen.findByText("Submit"));

    expect(emailField).toHaveValue("");
    expect(enquiryField).toHaveValue("");
    expect(logSpy).toHaveBeenCalledWith("Send form values to backend");
  });

  it("should display an error if the email is invalid", async () => {
    render(<AboutUs/>);
    await fillInFormField("you@example.com", "test");

    await userEvent.click(await screen.findByText("Submit"));

    const error = await screen.findByText("Please enter a valid email.");
    expect(error).toBeDefined();
  });

  it("should display an error if the enquiry is empty", async () => {
    render(<AboutUs/>);
    await userEvent.click(await screen.findByText("Submit"));

    const error = await screen.findByText("The enquiry must not be empty.");
    expect(error).toBeDefined();
  });

  it("should not log form values if the honeypot has been filled", async () => {
    render(<AboutUs/>);
    const honeypot = await screen.findByTestId("honeypot-field");

    fireEvent.change(honeypot, {target: {value: "Any value"}});

    expect(logSpy).not.toHaveBeenCalledWith("Send form values to backend");
  });

  const fillInFormField = async (placeholderText: string, text: string) => {
    const field = await screen.findByPlaceholderText(placeholderText);
    await userEvent.type(field, text);
    return field;
  };
});