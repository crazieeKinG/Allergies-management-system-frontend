import { Col, Divider, Space, Typography } from "antd";
import moment from "moment";
import SignupForm from "../../components/Signup/SignupForm";
import UserInterface from "../../interfaces/user.interfaces";

const UpdateProfile = () => {
    const defaultValue: UserInterface = {
        id: "adsad",
        fullName: "Saajan",
        dateOfBirth: moment("2000-01-01"),
        gender: "Female",
        email: "test@test.com",
        address: "Basundhare",
    };
    return (
        <Space direction="vertical" size={20} className="d-flex">
            <Col span={24}>
                <Typography.Title>Update user profile</Typography.Title>
                <Divider />
                <Col span={12}>
                    <SignupForm initialValue={defaultValue} />
                </Col>
            </Col>
        </Space>
    );
};

export default UpdateProfile;
