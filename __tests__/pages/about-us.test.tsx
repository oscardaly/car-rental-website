import {fireEvent, render, screen} from "@testing-library/react";
import AboutUs from "@/pages/about-us";
import {toast} from "react-toastify";
import {clickSubmitButton, fillInFormField} from "../_testing-helpers/ReactTestingLibrary";

jest.mock("react-toastify");

const mockToast = jest.mocked(toast);

describe("Contact us form", () => {
  beforeEach( () => {
    jest.clearAllMocks();
  });

  it("should log and reset form when filled in properly", async () => {
    render(<AboutUs/>);
    const emailField = await fillInFormField("you@example.com", "test@test.com");
    const enquiryField = await fillInFormField("Your enquiry description", "Dummy description");

    await clickSubmitButton();

    expect(emailField).toHaveValue("");
    expect(enquiryField).toHaveValue("");
    expect(mockToast).toHaveBeenCalledWith("Successfully sent the form!", {"type": "success"});
  });

  it("should display an error if the email is invalid", async () => {
    render(<AboutUs/>);
    await fillInFormField("you@example.com", "test");

    await clickSubmitButton();

    const error = await screen.findByText("Please enter a valid email.");
    expect(error).toBeDefined();
  });

  it("should display an error if the enquiry is empty", async () => {
    render(<AboutUs/>);

    await clickSubmitButton();

    const error = await screen.findByText("The enquiry must not be empty.");
    expect(error).toBeDefined();
  });

  it("should not log form values if the honeypot has been filled", async () => {
    render(<AboutUs/>);
    const honeypot = await screen.findByTestId("honeypot-field");

    fireEvent.change(honeypot, {target: {value: "Any value"}});

    expect(mockToast).not.toHaveBeenCalledWith("Successfully sent the form!", {"type": "success"});
  });
});