import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AuthenticationProvider from "../../contexts/AuthenticationProvider";
import UpdateProfile from "../../pages/User/UpdateProfile";
import "../mocks/matchMedia";

describe("Update Profile", () => {    
    it("should generate update profile page", () => {
        const view = render(
            <AuthenticationProvider>
                <BrowserRouter>
                    <UpdateProfile />
                </BrowserRouter>
            </AuthenticationProvider>
        );
        expect(view.asFragment()).toMatchSnapshot();
    });
});
