import { LockOutlined } from "@ant-design/icons";
import { Form } from "antd";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../api/User/user.api";
import { LIST_ALLERGY } from "../../constants/routes.constants";
import { AuthenticationContext } from "../../contexts/AuthenticationProvider";
import { AuthenticationContextDataInterface } from "../../interfaces/authentication.interfaces";

const UpdatePasswordForm = () => {
    const { accessToken } = useContext(AuthenticationContext)
        ?.authentication as AuthenticationContextDataInterface;

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (values: any) => {
        setLoading(true);

        changePassword(values.password, accessToken)
            .then((response) => {
                setLoading(false);
                navigate(LIST_ALLERGY);
            })
            .catch((error) => {
                setLoading(false);
            });
    };

    return (
        <Form
            labelCol={{ span: 10 }}
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

            <Form.Item wrapperCol={{ offset: 10 }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Update
                </Button>
            </Form.Item>
        </Form>
    );
};

export default UpdatePasswordForm;
