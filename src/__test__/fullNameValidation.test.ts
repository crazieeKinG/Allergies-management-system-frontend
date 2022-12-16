import fullNameValidation from "../validation/fullNameValidation";

const fullNameContainingMoreThan30Character =
    "ashdhhvjjenf asd aosjdjaofo jajdjoiass hasoo adslj djhajdh jhajd jahsjhassjsdhjh hahd hdoahdhfh hohsa";
const fullNameContainingSpecialCharacters = "abc @test";
const fullNameContainingNumbers = "abc t012";
const properFullName = "Saajan Shrestha";

const fullNameErrorMessageForMoreThan30Character =
    "Full name must be at most 30 characters";
const fullNameErrorMessageForInvalidCharacter =
    "Full name can only contain letters (A-Z, a-z) and space";

describe("Full name validation", () => {
    it("should return undefined if proper full name provided", () => {
        const result = fullNameValidation(properFullName);

        expect(result).toBe(undefined);
    });

    it(`should return '${fullNameErrorMessageForMoreThan30Character}' if full name length is greater than 30`, () => {
        const result = fullNameValidation(
            fullNameContainingMoreThan30Character
        );

        expect(result).toBe(fullNameErrorMessageForMoreThan30Character);
    });

    it(`should return '${fullNameErrorMessageForInvalidCharacter}' if full name contains numbers`, () => {
        const result = fullNameValidation(fullNameContainingNumbers);

        expect(result).toBe(fullNameErrorMessageForInvalidCharacter);
    });

    it(`should return '${fullNameErrorMessageForInvalidCharacter}' if full name contains special characters`, () => {
        const result = fullNameValidation(fullNameContainingSpecialCharacters);

        expect(result).toBe(fullNameErrorMessageForInvalidCharacter);
    });
});
