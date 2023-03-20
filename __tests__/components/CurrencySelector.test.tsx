import {useAppContext} from "../../context/state";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import {CurrencySelector} from "@/components/app-structure/header/CurrencySelector";
import userEvent from "@testing-library/user-event";
import {currencies} from "../../context/model/Currency";

jest.mock("../../context/state");

const mockUseAppContext = jest.mocked(useAppContext);
const mockSetCurrency = jest.fn();

describe("Currency Selector", function () {
  beforeEach(() => {
    mockUseAppContext.mockReturnValue({
      currency: "GBP",
      setCurrency: mockSetCurrency
    });
  });

  it("should display the selected currency", async () => {
    render(<CurrencySelector/>);

    const selector = await screen.findByTestId("CurrencySelector");

    expect(selector).toHaveValue("GBP");
  });

  it("should set the currency value when it has been selected", async () => {
    render(<CurrencySelector/>);

    const selector = await screen.findByTestId("CurrencySelector");

    await Promise.all(
      currencies.map(async currency => {
        await userEvent.selectOptions(selector, currency);

        expect(mockSetCurrency).toHaveBeenCalledWith(currency);
      })
    );
  });
});