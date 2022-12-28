import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignupForm from "../../components/Signup/SignupForm";
import AuthenticationProvider from "../../contexts/AuthenticationProvider";
import Signup from "../../pages/Signup/Signup";
import "../mocks/matchMedia";

describe("Sign up", () => {
    beforeEach(() => {
        Date.now = jest.fn().mockReturnValue(new Date("2022-12-26").getTime());
    });

    it("should generate signup form component", () => {
        const view = render(
            <AuthenticationProvider>
                <BrowserRouter>
                    <SignupForm />
                </BrowserRouter>
            </AuthenticationProvider>
        );
        expect(view.asFragment()).toMatchSnapshot();
    });

    it("should generate signup page", () => {
        const view = render(
            <AuthenticationProvider>
                <BrowserRouter>
                    <Signup />
                </BrowserRouter>
            </AuthenticationProvider>
        );
        expect(view.asFragment()).toMatchSnapshot();
    });
});
