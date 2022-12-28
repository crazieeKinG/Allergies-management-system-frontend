import emailValidation from "../validation/emailValidation";

const properEmail = "abc@test.com";
const emailWithoutAt = "abctest.com";
const emailStartingWithAl = "@test.com";
const emailStartingWithSpecialCharacter = "#abc@test.com";
const emailWithlongSuffix = "abc@test.testing.np";

const errorOutput = "Please enter a valid email.";

describe("Email Validation", () => {
    it("should return undefined if email is valid", () => {
        const result = emailValidation(properEmail);

        expect(result).toBe(undefined);
    });

    it(`should return '${errorOutput}' if email does not have @`, () => {
        const result = emailValidation(emailWithoutAt);

        expect(result).toBe(errorOutput);
    });
    
    it(`should return '${errorOutput}' if email starts with @`, () => {
        const result = emailValidation(emailStartingWithAl);

        expect(result).toBe(errorOutput);
    });
    
    it(`should return '${errorOutput}' if email starts with special character (not allowed in email)`, () => {
        const result = emailValidation(emailStartingWithSpecialCharacter);

        expect(result).toBe(errorOutput);
    });
    
    it(`should return '${errorOutput}' if email have longer suffix than 4`, () => {
        const result = emailValidation(emailWithlongSuffix);

        expect(result).toBe(errorOutput);
    });
});
