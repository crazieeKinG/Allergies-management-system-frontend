import React, { createContext, useState } from "react";
import { useCookies } from "react-cookie";
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
    const [cookies] = useCookies();
    
    const initialAuthenticationData: AuthenticationContextDataInterface = {
        username: cookies.username,
        accessToken: cookies.accessToken,
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
