import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form } from "antd";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import { useContext, useState } from "react";
import { signin } from "../../api/User/user.api";
import { AuthenticationContext } from "../../contexts/AuthenticationProvider";
import AuthenticationContextInterface, {
    AuthenticationContextDataInterface,
} from "../../interfaces/authentication.interfaces";

const SigninForm = () => {
    const { setAuthentication } = useContext(
        AuthenticationContext
    ) as AuthenticationContextInterface;

    const [loading, setLoading] = useState(false);

    const handleSubmit = (values: any) => {
        setLoading(true);

        signin(values)
            .then((response) => {
                console.log(response);
                const authenticationData: AuthenticationContextDataInterface = {
                    username: response.data.user,
                    accessToken: response.data.accessToken,
                };
                setAuthentication(authenticationData);
                setLoading(false);
            })
            .catch((response) => {
                console.log(response);
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
