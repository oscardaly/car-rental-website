import {isValidEmail} from "../../../helpers/validation/IsValidEmail";

const invalidEmails: string[] = [
  "notanemail",
  "notanemail@",
  "notanemail@.com",
  "notanemail.com",
  "@notanemail.com",
  "notanemail@com",
  "notanemail@.",
  "notanemail@@example.com",
  "notanemail@exa@mple.com",
  "notanemail@example..com",
  "notanemail@.example.com",
  "notanemail@example.com.",
  "notanemail@-example.com",
  "notanemail@example.-com",
  "notanemail@e^xample.com",
  "notanemail@example.c^om",
  "notanemail@[example.com",
  "notanemail@example].com",
  ""
];

const validEmails: string[] = [
  "user@example.com",
  "user.name@example.com",
  "user123@example.com",
  "user@example-domain.com",
  "user@example.co.uk",
  "user@example.travel",
  "user@example.museum",
  "user@example.pro",
  "user@example.info",
  "user@example.jobs",
  "user@example.me",
  "user@[IPv6:2001:db8::1]",
  "user@[192.168.0.1]",
  "user+alias@example.com",
  "user.name+alias@example.com",
  "user123+alias@example.com",
  "user+alias@example-domain.com",
  "user+alias@example.co.uk",
  "user+alias@example.travel",
  "user+alias@example.museum",
  "user+alias@example.pro",
  "user+alias@example.info",
  "user+alias@example.jobs",
  "user+alias@example.me",
];


describe("Is valid email", () => {
  it.each(invalidEmails)("should return false for %s", invalidEmail => {
    const result = isValidEmail(invalidEmail);

    expect(result).toBe(false);
  });

  it.each(validEmails)("should return true for %s", invalidEmail => {
    const result = isValidEmail(invalidEmail);

    expect(result).toBe(true);
  });
});
