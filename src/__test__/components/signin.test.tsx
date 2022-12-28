import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SigninForm from "../../components/Signin/SigninForm";
import AuthenticationProvider from "../../contexts/AuthenticationProvider";
import Signin from "../../pages/Signin/Signin";
import "../mocks/matchMedia";

describe("Signin", () => {
    it("should generate signin form component", () => {
        const view = render(
            <AuthenticationProvider>
                <BrowserRouter>
                    <SigninForm />
                </BrowserRouter>
            </AuthenticationProvider>
        );
        expect(view.asFragment()).toMatchSnapshot();
    });

    it("should generate signin page", () => {
        const view = render(
            <AuthenticationProvider>
                <BrowserRouter>
                    <Signin />
                </BrowserRouter>
            </AuthenticationProvider>
        );
        expect(view.asFragment()).toMatchSnapshot();
    });
});
