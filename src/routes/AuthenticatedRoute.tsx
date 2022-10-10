import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { SIGN_IN } from "../constants/routes.constants";
import AllergyProvider from "../contexts/AllergyProvider";
import { AuthenticationContext } from "../contexts/AuthenticationProvider";
import AuthenticationContextInterface from "../interfaces/authentication.interfaces";

const AuthenticatedRoute = () => {
    const { authentication } = useContext(
        AuthenticationContext
    ) as AuthenticationContextInterface;

    return authentication ? (
        <AllergyProvider>
            <Navbar />
        </AllergyProvider>
    ) : (
        <Navigate to={SIGN_IN} />
    );
};

export default AuthenticatedRoute;
