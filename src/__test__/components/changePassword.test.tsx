import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UpdatePasswordForm from "../../components/User/UpdatePasswordForm";
import ChangePassword from "../../pages/User/ChangePassword";
import "../mocks/matchMedia";

describe("Change password", () => {
    it("should generate update password form component", () => {
        const view = render(
            <BrowserRouter>
                <UpdatePasswordForm />
            </BrowserRouter>
        );
        expect(view.asFragment()).toMatchSnapshot();
    });

    it("should generate change password page", () => {
        const view = render(
            <BrowserRouter>
                <ChangePassword />
            </BrowserRouter>
        );
        expect(view.asFragment()).toMatchSnapshot();
    });
});
