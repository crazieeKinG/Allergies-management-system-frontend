import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Alert, Form } from "antd";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin } from "../../api/User/user.api";
import { DEFAULT_ALERT_VALUE } from "../../constants/alert.constants";
import { LIST_ALLERGY } from "../../constants/routes.constants";
import { AuthenticationContext } from "../../contexts/AuthenticationProvider";
import AlertMessageInterface from "../../interfaces/alert.interfaces";
import AuthenticationContextInterface from "../../interfaces/authentication.interfaces";

const SigninForm = () => {
    const { setAuthentication } = useContext(
        AuthenticationContext
    ) as AuthenticationContextInterface;

    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] =
        useState<AlertMessageInterface>(DEFAULT_ALERT_VALUE);
    const navigate = useNavigate();

    const handleSubmit = (values: any) => {
        setLoading(true);

        signin(values)
            .then((response) => {
                const authenticationData: string = response.data.accessToken;

                setAuthentication(authenticationData);
                setLoading(false);

                navigate(LIST_ALLERGY);
            })
            .catch((error) => {
                setLoading(false);

                if (!error)
                    setAlertMessage({
                        type: "error",
                        message:
                            "Cannot connect to the server. Please try again later.",
                    });
                else
                    setAlertMessage({
                        type: "error",
                        message: error.message,
                    });
            });
    };

    return (
        <Form onFinish={handleSubmit}>
            {alertMessage.message && (
                <Alert
                    type={alertMessage.type}
                    message={alertMessage.message}
                    className="my-2"
                />
            )}
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
