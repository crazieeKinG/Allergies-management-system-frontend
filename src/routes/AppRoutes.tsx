import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
    HOME,
    SIGN_IN,
    SIGN_UP,
    UPDATE_PASSWORD,
    UPDATE_PROFILE,
} from "../constants/routes.constants";
import Signin from "../pages/Signin/Signin";
import Signup from "../pages/Signup/Signup";
import ChangePassword from "../pages/User/ChangePassword";
import UpdateProfile from "../pages/User/UpdateProfile";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={HOME} element={<div>Home</div>} />
                <Route path={SIGN_IN} element={<Signin />} />
                <Route path={SIGN_UP} element={<Signup />} />
                <Route path={UPDATE_PROFILE} element={<UpdateProfile />} />
                <Route path={UPDATE_PASSWORD} element={<ChangePassword />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
