import { LockOutlined } from "@ant-design/icons";
import { Form } from "antd";
import Button from "antd/lib/button";
import Input from "antd/lib/input";

const UpdatePasswordForm = () => {
    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <Form
            labelCol={{ span: 6 }}
            labelAlign="left"
            onFinish={handleSubmit}
            requiredMark={false}
        >
            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: "Please provide password!",
                    },
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(
                                new Error("Password do not match")
                            );
                        },
                    }),
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Confirm password"
                />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6 }}>
                <Button type="primary" htmlType="submit">
                    Update
                </Button>
            </Form.Item>
        </Form>
    );
};

export default UpdatePasswordForm;
