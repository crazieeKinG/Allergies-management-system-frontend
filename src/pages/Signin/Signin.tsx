import Divider from "antd/lib/divider";
import { Col } from "antd/lib/grid";
import Space from "antd/lib/space";
import Typography from "antd/lib/typography";
import { Link } from "react-router-dom";
import SigninForm from "../../components/Signin/SigninForm";
import { SIGN_UP } from "../../constants/routes.constants";

const Signin = () => {
    return (
        <Space direction="vertical" size={20} className="d-flex">
            <Col span={24}>
                <Typography.Title>Sign in to continue</Typography.Title>
                <Divider />
                <Col span={12}>
                    <SigninForm />
                </Col>
            </Col>

            <Divider />

            <Typography.Text>
                Do not have account? <Link to={SIGN_UP}>Sign up</Link>
            </Typography.Text>
        </Space>
    );
};

export default Signin;
