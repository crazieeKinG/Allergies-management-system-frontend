import { useState } from "react";
import {
    UserOutlined,
    LockOutlined,
    EnvironmentOutlined,
} from "@ant-design/icons";
import { Checkbox, DatePicker, Form, Radio } from "antd";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import UserInterface from "../../interfaces/user.interfaces";
import { signup } from "../../api/User/user.api";

interface Props {
    initialValue?: UserInterface;
}

const SignupForm = ({ initialValue }: Props) => {
    const [aggrement, setAggrement] = useState(!!initialValue);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (values: any) => {
        setLoading(true);

        signup(values)
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
        <Form
            labelCol={{ span: 6 }}
            labelAlign="left"
            onFinish={handleSubmit}
            requiredMark={false}
            initialValues={initialValue}
        >
            <Form.Item
                name="fullName"
                label="Name"
                rules={[
                    { required: true, message: "Please provide full name" },
                ]}
            >
                <Input
                    prefix={<UserOutlined />}
                    placeholder="Full name, eg: John Doe"
                />
            </Form.Item>

            <Form.Item
                name="dateOfBirth"
                label="Date of birth"
                rules={[
                    { required: true, message: "Please provide date of birth" },
                ]}
            >
                <DatePicker placeholder="Date of birth" />
            </Form.Item>

            <Form.Item
                name="gender"
                label="Gender"
                rules={[
                    { required: true, message: "Please select one option" },
                ]}
            >
                <Radio.Group optionType="button">
                    <Radio value="Male">Male</Radio>
                    <Radio value="Female">Female</Radio>
                    <Radio value="Others">Others</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true, message: "Please provide address!" }]}
            >
                <Input prefix={<EnvironmentOutlined />} placeholder="Address" />
            </Form.Item>

            <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Please provide email" }]}
            >
                <Input
                    prefix={<UserOutlined />}
                    type="email"
                    placeholder="Email address"
                />
            </Form.Item>

            {!initialValue && (
                <>
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
                                    if (
                                        !value ||
                                        getFieldValue("password") === value
                                    ) {
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
                        <Checkbox
                            checked={aggrement}
                            onChange={() => setAggrement(!aggrement)}
                        >
                            I agree to terms and conditions.
                        </Checkbox>
                    </Form.Item>
                </>
            )}

            <Form.Item wrapperCol={{ offset: 6 }}>
                <Button
                    type="primary"
                    htmlType="submit"
                    disabled={!aggrement}
                    loading={loading}
                >
                    {initialValue ? "Update" : "Sign up"}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default SignupForm;
