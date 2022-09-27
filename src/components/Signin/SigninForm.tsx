import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form } from "antd";
import Button from "antd/lib/button";
import Input from "antd/lib/input";

const SigninForm = () => {
    const handleSubmit = (values: any) => {
        console.log(values);
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

            <Button type="primary" htmlType="submit">
                Sign in
            </Button>
        </Form>
    );
};

export default SigninForm;
