import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import {
    ADD_ALLERGY,
    EDIT_ALLERGY,
    EDIT_SYMPTOM,
    HOME,
    LIST_ALLERGY,
    SIGN_IN,
    SIGN_OUT,
    SIGN_UP,
    SINGLE_ALLERGY,
    UPDATE_PASSWORD,
    UPDATE_PROFILE,
} from "../constants/routes.constants";
import EditAllergy from "../pages/Allergy/EditAllergy";
import ListAllergy from "../pages/Allergy/ListAllergy";
import NewAllergy from "../pages/Allergy/NewAllergy";
import SingleAllergy from "../pages/Allergy/SingleAllergy";
import EditSymptom from "../pages/Allergy/Symptom/EditSymptom";
import Home from "../pages/Home/Home";
import Signin from "../pages/Signin/Signin";
import Signout from "../pages/Signout/Signout";
import Signup from "../pages/Signup/Signup";
import ChangePassword from "../pages/User/ChangePassword";
import UpdateProfile from "../pages/User/UpdateProfile";
import AuthenticatedRoute from "./AuthenticatedRoute";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={HOME} element={<Navbar />}>
                    <Route index element={<Home />} />
                    <Route path={SIGN_IN} element={<Signin />} />
                    <Route path={SIGN_UP} element={<Signup />} />
                </Route>
                <Route path={HOME} element={<AuthenticatedRoute />}>
                    <Route index element={<Home />} />
                    <Route path={LIST_ALLERGY} element={<ListAllergy />} />
                    <Route path={SINGLE_ALLERGY} element={<SingleAllergy />} />
                    <Route path={ADD_ALLERGY} element={<NewAllergy />} />
                    <Route path={EDIT_ALLERGY} element={<EditAllergy />} />
                    <Route path={EDIT_SYMPTOM} element={<EditSymptom />} />

                    <Route path={UPDATE_PROFILE} element={<UpdateProfile />} />
                    <Route
                        path={UPDATE_PASSWORD}
                        element={<ChangePassword />}
                    />
                    <Route path={SIGN_OUT} element={<Signout />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
