import React, { createContext, useState } from "react";
import AuthenticationContextInterface, {
    AuthenticationContextDataInterface,
} from "../interfaces/authentication.interfaces";

interface Props {
    children: React.ReactNode;
}

export const AuthenticationContext = createContext<
    AuthenticationContextInterface | undefined
>(undefined);

const AuthenticationProvider = ({ children }: Props) => {
    const initialAuthenticationData: AuthenticationContextDataInterface = {
        username: "Saajan Shrestha",
        accessToken:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiMDVlYWE3YS1iYThiLTQxYzItYmViZC00N2I0ODRmMTUwYmIiLCJpYXQiOjE2NjQ0MjI5Nzh9.QZZc2h3noQYWnvrTRDHjj_fvhKw3Ri-vApTz6E1KIuw",
    };
    const [authentication, setAuthentication] = useState(
        initialAuthenticationData
    );

    return (
        <AuthenticationContext.Provider
            value={{ authentication, setAuthentication }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationProvider;
