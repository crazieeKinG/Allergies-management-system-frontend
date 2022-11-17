import { fullnameValidCharacters } from "./regularExpressions";

const fullNameValidation = (fullname: string) => {
    if (fullname.length > 30) return "Full name must be at most 30 characters";

    const fullNameCheckForValidCharacters = fullname.replaceAll(
        fullnameValidCharacters,
        ""
    );

    if (fullNameCheckForValidCharacters.length > 0)
        return "Full name can only contain letters (A-Z, a-z) and space";
};

export default fullNameValidation;
