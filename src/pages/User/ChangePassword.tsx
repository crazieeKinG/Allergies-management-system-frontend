import { Col, Divider, Space, Typography } from "antd";
import UpdatePasswordForm from "../../components/User/UpdatePasswordForm";

const ChangePassword = () => {
    return (
        <Space direction="vertical" size={20} className="d-flex">
            <Col span={24}>
                <Typography.Title>Change password</Typography.Title>
                <Divider />
                <Col span={12}>
                    <UpdatePasswordForm />
                </Col>
            </Col>
        </Space>
    );
};

export default ChangePassword;
