import {
    FileAddOutlined,
    HomeOutlined,
    ReadOutlined,
    UserAddOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Col, Divider, Menu, Row, Typography } from "antd";
import { Link, Outlet } from "react-router-dom";
import {
    ADD_ALLERGY,
    HOME,
    LIST_ALLERGY,
    SIGN_IN,
    SIGN_UP,
} from "../../constants/routes.constants";

const Navbar = () => {
    const NavItems = [
        {
            key: "Home",
            label: <Link to={HOME}>Home</Link>,
            icon: <HomeOutlined />,
        },
        {
            key: "Signin",
            label: <Link to={SIGN_IN}>Sign in</Link>,
            icon: <UserOutlined />,
        },
        {
            key: "Signup",
            label: <Link to={SIGN_UP}>Sign up</Link>,
            icon: <UserAddOutlined />,
        },
    ];

    const AuthenticatedNavItems = [
        {
            key: "Home2",
            label: <Link to={HOME}>Home</Link>,
            icon: <HomeOutlined />,
        },
        {
            key: "Allergy",
            label: <Link to={LIST_ALLERGY}>Allergies</Link>,
            icon: <ReadOutlined />,
        },
        {
            key: "newAllergy",
            label: <Link to={ADD_ALLERGY}>New Allergy</Link>,
            icon: <FileAddOutlined />,
        },
    ];

    return (
        <div>
            <Row justify="space-between">
                <Col span={6}>
                    <Link className="text-decoration-none" to={HOME}>
                        <Typography.Title level={4}>
                            Allergy Management System
                        </Typography.Title>
                    </Link>
                </Col>
                <Col span={18}>
                    <Menu
                        mode="horizontal"
                        className="border-0 justify-content-end"
                        items={[...NavItems, ...AuthenticatedNavItems]}
                    />
                </Col>
            </Row>
            <Divider />
            <Outlet />
        </div>
    );
};

export default Navbar;
