export interface AuthenticationContextDataInterface {
    username: string;
    accessToken: string;
}

interface AuthenticationContextInterface {
    authentication: AuthenticationContextDataInterface;
    setAuthentication: React.Dispatch<
        React.SetStateAction<AuthenticationContextDataInterface>
    >;
}

export default AuthenticationContextInterface;
