import { useContext, useState } from "react";
import {
    UserOutlined,
    LockOutlined,
    EnvironmentOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import { Checkbox, DatePicker, Form, Radio, Upload } from "antd";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import UserInterface from "../../interfaces/user.interfaces";
import { signup, updateProfile } from "../../api/User/user.api";
import { LIST_ALLERGY, SIGN_IN } from "../../constants/routes.constants";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../contexts/AuthenticationProvider";
import { AuthenticationContextDataInterface } from "../../interfaces/authentication.interfaces";
import createFormData from "../../utils/createFormData";
import { useCookies } from "react-cookie";

interface Props {
    initialValue?: UserInterface;
}

const SignupForm = ({ initialValue }: Props) => {
    const [, setCookie, removeCookie] = useCookies();
    const { accessToken } = useContext(AuthenticationContext)
        ?.authentication as AuthenticationContextDataInterface;

    const [aggrement, setAggrement] = useState(!!initialValue);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (values: any) => {
        setLoading(true);

        const formattedData = createFormData(values);

        if (!initialValue) {
            signup(formattedData)
                .then((response) => {
                    setLoading(false);
                    navigate(SIGN_IN);
                })
                .catch((error) => {
                    setLoading(false);
                });
        } else {
            updateProfile(formattedData, initialValue.id, accessToken)
                .then((response) => {
                    removeCookie("username");
                    removeCookie("photoUrl");
                    setCookie("username", response.data[0].fullName);
                    setCookie("photoUrl", response.data[0].photoUrl);

                    setLoading(false);
                    navigate(LIST_ALLERGY);
                })
                .catch((error) => {
                    setLoading(false);
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
