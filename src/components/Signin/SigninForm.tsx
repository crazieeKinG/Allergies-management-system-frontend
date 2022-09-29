import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form } from "antd";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { signin } from "../../api/User/user.api";
import { LIST_ALLERGY } from "../../constants/routes.constants";
import { AuthenticationContext } from "../../contexts/AuthenticationProvider";
import AuthenticationContextInterface, {
    AuthenticationContextDataInterface,
} from "../../interfaces/authentication.interfaces";
import cookieExpirationTime from "../../utils/cookieExpirationTime";

const SigninForm = () => {
    const { setAuthentication } = useContext(
        AuthenticationContext
    ) as AuthenticationContextInterface;
    const [, setCookie] = useCookies();

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (values: any) => {
        setLoading(true);

        signin(values)
            .then((response) => {
                const authenticationData: AuthenticationContextDataInterface = {
                    username: response.data.user,
                    accessToken: response.data.accessToken,
                };

                setCookie("username", response.data.user, {
                    ...cookieExpirationTime(),
                });

                setCookie("accessToken", response.data.accessToken);
                setAuthentication(authenticationData);
                setLoading(false);

                navigate(LIST_ALLERGY);
            })
            .catch((error) => {
                setLoading(false);
            });
    };

    return (
        <Form onFinish={handleSubmit}>
            <Form.Item name="email">
                <Input
                    prefix={<UserOutlined />}
                    type="email"
                    placeholder="Email address"
                    required
                />
            </Form.Item>

            <Form.Item name="password">
                <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Password"
                    required
                />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={loading}>
                Sign in
            </Button>
        </Form>
    );
};

export default SigninForm;
