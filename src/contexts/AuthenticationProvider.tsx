import React, { createContext, useState } from "react";
import AuthenticationContextInterface from "../interfaces/authentication.interfaces";
import UserInterface from "../interfaces/user.interfaces";

interface Props {
    children: React.ReactNode;
}

export const AuthenticationContext = createContext<
    AuthenticationContextInterface | undefined
>(undefined);

const AuthenticationProvider = ({ children }: Props) => {
    const [authentication, setAuthentication] = useState("");
    const [user, setUser] = useState<UserInterface | undefined>(undefined);

    return (
        <AuthenticationContext.Provider
            value={{ authentication, setAuthentication, user, setUser }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationProvider;
