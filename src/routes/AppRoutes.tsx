import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HOME, SIGN_IN, SIGN_UP } from "../constants/routes.constants";
import Signin from "../pages/Signin/Signin";
import Signup from "../pages/Signup/Signup";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={HOME} element={<div>Home</div>} />
                <Route path={SIGN_IN} element={<Signin />} />
                <Route path={SIGN_UP} element={<Signup />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
