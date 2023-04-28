import {Car} from "@/components/Car";

describe("Car", () => {
  const car1: Car = {
    id: 1,
    make: "Tesla",
    model: "Model S",
    price: 75000,
    power: 1020,
    zeroToSixtyTime: 1.98,
    seats: 5,
    transmission: "Automatic",
    popularity: 9.2,
    imageUrl: "https://example.com/tesla-model-s.jpg",
  };

  const car2: Car = {
    id: 2,
    make: "Porsche",
    model: "911 Turbo S",
    price: 205500,
    power: 640,
    zeroToSixtyTime: 2.6,
    seats: 4,
    transmission: "Automatic",
    popularity: 8.9,
    imageUrl: "https://example.com/porsche-911-turbo-s.jpg",
  };

  it("should create a car object", () => {
    expect(car1).toBeDefined();
    expect(car1.id).toBe(1);
    expect(car1.make).toBe("Tesla");
    expect(car1.model).toBe("Model S");
    expect(car1.price).toBe(75000);
    expect(car1.power).toBe(1020);
    expect(car1.zeroToSixtyTime).toBe(1.98);
    expect(car1.seats).toBe(5);
    expect(car1.transmission).toBe("Automatic");
    expect(car1.popularity).toBe(9.2);
    expect(car1.imageUrl).toBe("https://example.com/tesla-model-s.jpg");
  });

  it("should return the correct car make and model", () => {
    expect(`${car1.make} ${car1.model}`).toBe("Tesla Model S");
    expect(`${car2.make} ${car2.model}`).toBe("Porsche 911 Turbo S");
  });

  it("should return the correct car price", () => {
    expect(car1.price).toBeLessThan(car2.price);
  });

  it("should return the correct car power", () => {
    expect(car1.power).toBeGreaterThan(car2.power);
  });

  it("should return the correct car 0-60 time", () => {
    expect(car1.zeroToSixtyTime).toBeLessThan(car2.zeroToSixtyTime);
  });

  it("should return the correct number of seats", () => {
    expect(car1.seats).toBeGreaterThan(car2.seats);
  });

  it("should return the correct car transmission", () => {
    expect(car1.transmission).toBe("Automatic");
    expect(car2.transmission).toBe("Automatic");
  });

  it("should return the correct car popularity rating", () => {
    expect(car1.popularity).toBeGreaterThan(car2.popularity);
  });

  it("should return the correct car image URL", () => {
    expect(car1.imageUrl).toMatch(/https?:\/\/\S+\.\S+/);
    expect(car2.imageUrl).toMatch(/https?:\/\/\S+\.\S+/);
  });
});