import {render, fireEvent, screen} from "@testing-library/react";
import CarSelection from "@/pages/car-selection";
import {Car} from "@/components/Car";
import {useRouter} from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const mockRouter = {
  push: jest.fn(),
};

describe("Car Selection Page", () => {
  let cars: Car[];

  beforeEach(() => {
    cars = [
      {
        id: 1,
        make: "Honda",
        model: "Civic",
        price: 20000,
        power: 150,
        zeroToSixtyTime: 8.2,
        seats: 5,
        transmission: "Manual",
        popularity: 3,
        imageUrl: "https://example.com/civic.jpg",
      },
      {
        id: 2,
        make: "Toyota",
        model: "Corolla",
        price: 22000,
        power: 140,
        zeroToSixtyTime: 8.9,
        seats: 5,
        transmission: "Automatic",
        popularity: 4,
        imageUrl: "https://example.com/corolla.jpg",
      },
      {
        id: 3,
        make: "Ford",
        model: "Mustang",
        price: 35000,
        power: 450,
        zeroToSixtyTime: 4.5,
        seats: 4,
        transmission: "Manual",
        popularity: 5,
        imageUrl: "https://example.com/mustang.jpg",
      },
    ];
  });

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it("should display all cars when no search term is entered", async () => {
    render(<CarSelection/>);

    const carElements = await screen.findAllByTestId("car-card");
    expect(carElements.length).toBe(cars.length);
  });

  it("should display the filtered cars when a search term is entered", async () => {
    const searchTerm = "Civic";

    render(<CarSelection/>);

    const searchInput = await screen.findByTestId("search-input");
    fireEvent.change(searchInput, {target: {value: searchTerm}});

    const carElements = await screen.findAllByTestId("car-card");
    expect(carElements.length).toBe(1);
    expect(carElements[0]).toHaveTextContent(searchTerm);
  });

  it("should display the sorted cars when the sort dropdown is changed", async () => {
    render(<CarSelection/>);

    const sortDropdown = await screen.findByTestId("sort-dropdown");
    fireEvent.change(sortDropdown, {target: {value: "price-low-to-high"}});

    const carElements = await screen.findAllByTestId("car-card");
    const sortedCars = [...cars].sort((a, b) => a.price - b.price);

    expect(carElements.length).toBe(cars.length);
    carElements.forEach((car, index) => {
      expect(car).toHaveTextContent(sortedCars[index].brand);
    });
  });

  it("should display the filtered and sorted cars when a search term and sort dropdown are used", async () => {
    const searchTerm = "Toyota";

    render(<CarSelection/>);

    const searchInput = await screen.findByTestId("search-input");
    fireEvent.change(searchInput, {target: {value: searchTerm}});

    const sortDropdown = await screen.findByTestId("sort-dropdown");
    fireEvent.change(sortDropdown, {target: {value: "power-high-to-low"}});

    // const carElements = await screen.findAllByTestId("
  });
});