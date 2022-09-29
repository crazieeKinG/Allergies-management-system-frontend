import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { SIGN_IN } from "../constants/routes.constants";
import AllergyProvider from "../contexts/AllergyProvider";
import { AuthenticationContext } from "../contexts/AuthenticationProvider";
import { AuthenticationContextDataInterface } from "../interfaces/authentication.interfaces";

const AuthenticatedRoute = () => {
    const { accessToken } = useContext(AuthenticationContext)
        ?.authentication as AuthenticationContextDataInterface;

    return accessToken ? (
        <AllergyProvider>
            <Navbar />
        </AllergyProvider>
    ) : (
        <Navigate to={SIGN_IN} />
    );
};

export default AuthenticatedRoute;
