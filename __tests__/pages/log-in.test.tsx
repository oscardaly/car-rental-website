import {render, screen} from "@testing-library/react";
import LogIn from "@/pages/log-in";
import Cookies from "js-cookie";
import userEvent from "@testing-library/user-event";
import {fillInFormField} from "../_testing-helpers/ReactTestingLibrary";

jest.mock("js-cookie");

const mockUseRouter = jest.spyOn(require("next/router"), "useRouter");
const mockPushLocation = jest.fn();
const cookiesGetMock = jest.mocked(Cookies.get);
const cookiesRemoveMock = jest.mocked(Cookies.remove);
const cookiesSetMock = jest.mocked(Cookies.set);

describe("Log in page", () => {
  beforeEach( () => {
    mockUseRouter.mockImplementation(() => ({
      pathname: "/",
      push: mockPushLocation
    }));
  });

  describe("when there is already a user logged in", () => {
    beforeEach( () => {
      cookiesGetMock.mockReturnValue("The Username");
    });

    it("should display the greeting", async () => {
      render(<LogIn/>);

      const greeting = await screen.findByText("Hi The Username!");

      expect(greeting).toBeDefined();
    });

    it("should log out when the log out button is pressed", async () => {
      render(<LogIn/>);

      await userEvent.click(await screen.findByText("Log Out"));

      expect(await screen.findByText("Log In Now")).toBeDefined();
      expect(cookiesRemoveMock).toHaveBeenCalledWith("username");
    });
  });

  describe("when the user is not logged in", () => {
    beforeEach(function () {
      cookiesGetMock.mockReturnValue(undefined);
    });

    it("should show an error for an invalid user credentials", async () => {
      render(<LogIn/>);

      await userEvent.click(await screen.findByText("Log In Now"));
      const error = await screen.findByText("Username or password incorrect");

      expect(error).toBeDefined();
    });

    it("should log the user in for valid credentials and navigate to the homepage", async () => {
      render(<LogIn/>);

      await fillInFormField("you@example.com", "admin");
      await fillInFormField("Password", "admin");

      await userEvent.click(await screen.findByText("Log In Now"));

      expect(mockPushLocation).toHaveBeenCalledWith("/");
      expect(cookiesSetMock).toHaveBeenCalledWith("username", "admin");
    });
  });
});