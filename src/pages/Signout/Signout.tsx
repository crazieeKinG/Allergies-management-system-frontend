import { Typography } from "antd";
import { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { HOME } from "../../constants/routes.constants";
import { AuthenticationContext } from "../../contexts/AuthenticationProvider";
import AuthenticationContextInterface from "../../interfaces/authentication.interfaces";

const Signout = () => {
    const { setAuthentication } = useContext(
        AuthenticationContext
    ) as AuthenticationContextInterface;

    const [, , removeCookie] = useCookies();

    const navigate = useNavigate();

    useEffect(() => {
        removeCookie("username");
        removeCookie("photoUrl");
        removeCookie("accessToken");

        setAuthentication({
            username: "",
            photoUrl: "",
            accessToken: "",
        });
        navigate(HOME);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Typography.Title>Signing out</Typography.Title>;
};

export default Signout;
