import UserInterface from "./user.interfaces";

interface AuthenticationContextInterface {
    authentication: string;
    setAuthentication: React.Dispatch<React.SetStateAction<string>>;
    user: UserInterface | undefined;
    setUser: React.Dispatch<React.SetStateAction<UserInterface | undefined>>;
}

export default AuthenticationContextInterface;
