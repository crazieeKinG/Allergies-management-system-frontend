import { Alert } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../contexts/AuthenticationProvider";
import AuthenticationContextInterface from "../interfaces/authentication.interfaces";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

interface Props {
    children: React.ReactNode;
}

export const AxiosInterceptor = ({ children }: Props) => {
    const [alertMessage, setAlertMessage] = useState("");
    const [refresh, setRefresh] = useState(false);
    const { setAuthentication } = useContext(
        AuthenticationContext
    ) as AuthenticationContextInterface;

    const refreshToken = async (previousRequest: any) => {
        const response = await axios.post(
            "/user/refresh",
            {},
            { withCredentials: true }
        );

        if (response.status === 200) {
            const accessToken = response.data.data.accessToken;
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + accessToken;
            if (previousRequest)
                previousRequest.headers["Authorization"] =
                    "Bearer " + accessToken;

            console.log(accessToken);
            setAuthentication(accessToken);

            setRefresh(false);
            if (previousRequest) return axios(previousRequest);
        }
    };

    useEffect(() => {
        axios.interceptors.response.use(
            (response) => {
                setAlertMessage("");
                return response;
            },
            async (error) => {
                if (error.response.status === 401 && !refresh) {
                    setRefresh(true);

                    return refreshToken(error.config);
                }

                if (error.response.status === 403) {
                    setAuthentication("");

                    console.log(error.response.data.message);
                    setAlertMessage(error.response.data.message);
                }

                throw error;
            }
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {alertMessage && (
                <Alert
                    type="error"
                    message={alertMessage}
                    className="my-2"
                    closable
                />
            )}
            {children}
        </>
    );
};

export default axios;
