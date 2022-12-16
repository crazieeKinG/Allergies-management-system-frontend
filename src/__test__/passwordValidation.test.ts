import passwordValidation from "../validation/passwordValidation";

const passwordWithLengthLessThan8 = "S@133";
const passwordWithInvalidSpecialCharacter = "!Hello123#";
const passwordWithoutCapitalLetter = "saajan@123";
const passwordWithoutSpecialCharacter = "Saajan12435";
const passwordWithoutLowercase = "SAAJAN@12345";
const passwordWithoutNumber = "Saajan@@@@";

const properPassword = "Saajan@12345";

const errorOutputLessThan8Character = "Password must be at least 8 characters";
const errorOutputHaveInvalidCharacter =
    "Please include only letters (A-Z, a-z), numbers (0-9), and special symbols (@, #, $, %, _)";
const errorOutpuDoesHaveRequiredCharacters =
    "Please include atleast 1 capital letter (A-Z), 1 lowercase letter (a-z) 1 number (0-9), and 1 special symbol (@, #, $, %, _)";

describe("Password validation", () => {
    it("should return undefined if password is valid", () => {
        const result = passwordValidation(properPassword);

        expect(result).toBe(undefined);
    });

    it(`should return '${errorOutputLessThan8Character}' if password length is less than 8 characters`, () => {
        const result = passwordValidation(passwordWithLengthLessThan8);

        expect(result).toBe(errorOutputLessThan8Character);
    });

    it(`should return '${errorOutputHaveInvalidCharacter}' if password invalid characters`, () => {
        const result = passwordValidation(passwordWithInvalidSpecialCharacter);

        expect(result).toBe(errorOutputHaveInvalidCharacter);
    });

    it(`should return '${errorOutpuDoesHaveRequiredCharacters}' if password does not required characters`, () => {
        const result = passwordValidation(passwordWithoutCapitalLetter);

        expect(result).toBe(errorOutpuDoesHaveRequiredCharacters);
    });

    it(`should return '${errorOutpuDoesHaveRequiredCharacters}' if password does not required characters`, () => {
        const result = passwordValidation(passwordWithoutLowercase);

        expect(result).toBe(errorOutpuDoesHaveRequiredCharacters);
    });

    it(`should return '${errorOutpuDoesHaveRequiredCharacters}' if password does not required characters`, () => {
        const result = passwordValidation(passwordWithoutNumber);

        expect(result).toBe(errorOutpuDoesHaveRequiredCharacters);
    });

    it(`should return '${errorOutpuDoesHaveRequiredCharacters}' if password does not required characters`, () => {
        const result = passwordValidation(passwordWithoutSpecialCharacter);

        expect(result).toBe(errorOutpuDoesHaveRequiredCharacters);
    });
});
