import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form } from "antd";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import { useState } from "react";
import { signin } from "../../api/User/user.api";

const SigninForm = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = (values: any) => {
        setLoading(true);

        signin(values)
            .then((response) => {
                console.log(response);
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
