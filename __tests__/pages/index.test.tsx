import {render, screen} from "@testing-library/react";
import React from "react";
import Home from "@/pages/index";
import {clickSubmitButton, enterDate, fillInFormField, setSystemDate} from "../_testing-helpers/ReactTestingLibrary";
import {useGetHomescreenImages} from "../../helpers/hooks/UseGetHomescreenImages";
import {useAppContext} from "../../context/state";

jest.mock( "../../helpers/hooks/UseGetHomescreenImages");
jest.mock("../../context/state");

const mockUseRouter = jest.spyOn(require("next/router"), "useRouter");
const mockUseAppContext = jest.mocked(useAppContext);
const mockUseGetHomescreenImages = jest.mocked(useGetHomescreenImages);
const mockPushLocation = jest.fn();
const mockSetLocation = jest.fn();
const mockSetEndDate = jest.fn();
const mockSetStartDate = jest.fn();

describe("Home page call to action form", () => {
  beforeEach( () => {
    jest.clearAllMocks();
    setSystemDate(new Date(2022, 10, 10));

    mockUseGetHomescreenImages.mockReturnValue([]);
    mockUseRouter.mockImplementation(() => ({
      pathname: "/",
      push: mockPushLocation
    }));
    // @ts-ignore
    mockUseAppContext.mockReturnValue({
      setLocation: mockSetLocation,
      setEndDate: mockSetEndDate,
      setStartDate: mockSetStartDate,
    });
  });

  it("should show an error if there is no location", async () => {
    render(<Home/>);
    await clickSubmitButton();

    const error = await screen.findByText("Please enter a location.");
    expect(error).toBeDefined();
  });

  it("should show an error if the start date is today", async () => {
    render(<Home/>);
    await clickSubmitButton();

    await fillInFormField("Location", "Belfast");
    await enterDate("end-date", "2023-11-10");
    await enterDate("start-date", "2022-11-10");

    await clickSubmitButton();

    const error = await screen.findByText("The start date must be in the future.");
    expect(error).toBeDefined();
  });

  it("should show an error if the start date is in the past", async () => {
    render(<Home/>);
    await clickSubmitButton();

    await fillInFormField("Location", "Belfast");
    await enterDate("end-date", "2023-11-10");
    await enterDate("start-date", "2022-10-10");

    await clickSubmitButton();

    const error = await screen.findByText("The start date must be in the future.");
    expect(error).toBeDefined();
  });

  it("should show an error if there is no start date", async () => {
    render(<Home/>);
    await clickSubmitButton();

    const error = await screen.findByText("Please enter a start date.");
    expect(error).toBeDefined();
  });

  it("should an error if there is no end date", async () => {
    render(<Home/>);
    await clickSubmitButton();

    const error = await screen.findByText("Please enter an end date.");
    expect(error).toBeDefined();
  });

  it("should show an error if the end date is before the start date", async() => {
    render(<Home/>);
    await clickSubmitButton();

    await fillInFormField("Location", "Belfast");
    await enterDate("end-date", "2023-11-10");
    await enterDate("start-date", "2023-11-11");

    await clickSubmitButton();

    const error = await screen.findByText("The end date must be after the start date.");
    expect(error).toBeDefined();
  });

  it("should populate the global state and navigate to the car selection page", async () => {
    render(<Home/>);
    await clickSubmitButton();

    await fillInFormField("Location", "Belfast");
    await enterDate("start-date", "2023-10-11");
    await enterDate("end-date", "2023-11-10");

    await clickSubmitButton();

    expect(mockPushLocation).toHaveBeenCalledWith("/car-selection");
    expect(mockSetLocation).toHaveBeenCalledWith("Belfast");
    expect(mockSetEndDate).toHaveBeenCalledWith("2023-11-10");
    expect(mockSetStartDate).toHaveBeenCalledWith("2023-10-11");
  });

  it("should populate the global state and navigate to the car selection page when the end date is the same as the start date", async () => {
    render(<Home/>);
    await clickSubmitButton();

    await fillInFormField("Location", "Belfast");
    await enterDate("start-date", "2023-10-11");
    await enterDate("end-date", "2023-10-11");

    await clickSubmitButton();

    expect(mockPushLocation).toHaveBeenCalledWith("/car-selection");
    expect(mockSetLocation).toHaveBeenCalledWith("Belfast");
    expect(mockSetEndDate).toHaveBeenCalledWith("2023-10-11");
    expect(mockSetStartDate).toHaveBeenCalledWith("2023-10-11");
  });
});