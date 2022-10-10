import { useState, useContext } from "react";
import {
    UserOutlined,
    LockOutlined,
    EnvironmentOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import { Alert, Checkbox, DatePicker, Form, Radio, Upload } from "antd";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import UserInterface from "../../interfaces/user.interfaces";
import { signup, updateProfile } from "../../api/User/user.api";
import { LIST_ALLERGY, SIGN_IN } from "../../constants/routes.constants";
import { useNavigate } from "react-router-dom";
import createFormData from "../../utils/createFormData";
import AlertMessageInterface from "../../interfaces/alert.interfaces";
import { DEFAULT_ALERT_VALUE } from "../../constants/alert.constants";
import { AuthenticationContext } from "../../contexts/AuthenticationProvider";
import AuthenticationContextInterface from "../../interfaces/authentication.interfaces";

interface Props {
    initialValue?: UserInterface;
}

const SignupForm = ({ initialValue }: Props) => {
    const { setUser } = useContext(
        AuthenticationContext
    ) as AuthenticationContextInterface;
    const [aggrement, setAggrement] = useState(!!initialValue);
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] =
        useState<AlertMessageInterface>(DEFAULT_ALERT_VALUE);
    const navigate = useNavigate();

    const handleSubmit = (values: any) => {
        setLoading(true);

        const formattedData = createFormData(values);

        if (!initialValue) {
            signup(formattedData)
                .then((response) => {
                    setLoading(false);

                    setTimeout(() => {
                        navigate(SIGN_IN);
                    }, 3000);

                    setAlertMessage({
                        type: "success",
                        message:
                            "User registered successfully. Redirecting to the sign in page...",
                    });
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
                            type: "warning",
                            message: error.message,
                        });
                });
        } else {
            updateProfile(formattedData, initialValue.id)
                .then((response) => {
                    setLoading(false);

                    setUser(undefined);
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
                            type: "warning",
                            message: error.message,
                        });
                });
        }
    };

    return (
        <Form
            labelCol={{ span: 6 }}
            labelAlign="left"
            onFinish={handleSubmit}
            requiredMark={false}
            initialValues={initialValue}
        >
            {alertMessage.message && (
                <Alert
                    type={alertMessage.type}
                    message={alertMessage.message}
                    className="my-2"
                />
            )}
            <Form.Item label="Profile picture" name="photo">
                <Upload
                    beforeUpload={() => false}
                    listType="picture"
                    maxCount={1}
                    fileList={undefined}
                >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Form.Item>

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
