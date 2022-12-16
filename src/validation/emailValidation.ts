import { emailFormatValidation } from "./regularExpressions";

const emailValidation = (email: string) => {
    if (!emailFormatValidation.test(email))
        return "Please enter a valid email.";
};

export default emailValidation;
