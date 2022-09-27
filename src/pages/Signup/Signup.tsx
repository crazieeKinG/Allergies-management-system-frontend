import Divider from "antd/lib/divider";
import { Col } from "antd/lib/grid";
import Space from "antd/lib/space";
import Typography from "antd/lib/typography";
import { Link } from "react-router-dom";
import SignupForm from "../../components/Signup/SignupForm";
import { SIGN_IN } from "../../constants/routes.constants";

const Signup = () => {
    return (
        <Space direction="vertical" size={20} className="d-flex">
            <Col span={24}>
                <Typography.Title>Sign up for new user</Typography.Title>
                <Divider />
                <Col span={12}>
                    <SignupForm />
                </Col>
            </Col>
            
            <Divider />

            <Typography.Text>
                Already have an account? <Link to={SIGN_IN}>Sign in</Link>
            </Typography.Text>
        </Space>
    );
};

export default Signup;
