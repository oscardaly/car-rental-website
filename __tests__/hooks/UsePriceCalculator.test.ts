import {useAppContext} from "../../context/state";
import {usePriceCalculator} from "../../hooks/UsePriceCalculator";

jest.mock("../../context/state");

const mockAppContext = jest.mocked(useAppContext);

describe("Use price calculator", () => {
  it("should return the correct price when the currency is GBP", () => {
    // @ts-ignore
    mockAppContext.mockReturnValue({currency: "GBP"});

    const target = usePriceCalculator();
    const result = target(250);

    expect(result).toEqual(250);
  });

  it("should return the correct price when the currency is EUR", () => {
    // @ts-ignore
    mockAppContext.mockReturnValue({currency: "EUR"});

    const target = usePriceCalculator();
    const result = target(250);

    expect(result).toEqual(282.50);
  });
});