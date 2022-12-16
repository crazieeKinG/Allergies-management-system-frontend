import {
    capitalCheck,
    lowercaseCheck,
    numberCheck,
    passwordValidCharacters,
    symbolCheck,
} from "./regularExpressions";

const passwordValidation = (password: string) => {
    if (password.length < 8) return "Password must be at least 8 characters";

    const passwordCheckForValidCharacters = password.replace(
        passwordValidCharacters,
        ""
    );

    if (passwordCheckForValidCharacters.length > 0)
        return "Please include only letters (A-Z, a-z), numbers (0-9), and special symbols (@, #, $, %, _)";

    if (
        !capitalCheck.test(password) ||
        !lowercaseCheck.test(password) ||
        !symbolCheck.test(password) ||
        !numberCheck.test(password)
    )
        return "Please include atleast 1 capital letter (A-Z), 1 lowercase letter (a-z) 1 number (0-9), and 1 special symbol (@, #, $, %, _)";
};

export default passwordValidation;
