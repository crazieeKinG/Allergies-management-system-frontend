import {
    EditOutlined,
    FileAddOutlined,
    HomeOutlined,
    LogoutOutlined,
    ReadOutlined,
    UserAddOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Col, Divider, Menu, Row, Typography } from "antd";
import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import {
    ADD_ALLERGY,
    HOME,
    LIST_ALLERGY,
    SIGN_IN,
    SIGN_UP,
    UPDATE_PROFILE,
} from "../../constants/routes.constants";
import { AuthenticationContext } from "../../contexts/AuthenticationProvider";
import { AuthenticationContextDataInterface } from "../../interfaces/authentication.interfaces";

const Navbar = () => {
    const { username, accessToken } = useContext(AuthenticationContext)
        ?.authentication as AuthenticationContextDataInterface;
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
            key: "Home",
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
        {
            key: "Profile",
            label: username,
            icon: <UserOutlined />,
            children: [
                {
                    key: "UpdateProfile",
                    label: <Link to={UPDATE_PROFILE}>Update profile</Link>,
                    icon: <EditOutlined />,
                },
                {
                    key: "Signout",
                    label: "Sign out",
                    icon: <LogoutOutlined />,
                },
            ],
        },
    ];

    return (
        <div>
            <Row justify="space-between">
                <Col sm={14} md={10} lg={7}>
                    <Link className="text-decoration-none" to={HOME}>
                        <Typography.Title level={4}>
                            Allergy Management System
                        </Typography.Title>
                    </Link>
                </Col>
                <Col sm={6} md={8} lg={17}>
                    <Menu
                        mode="horizontal"
                        className="border-0 justify-content-end"
                        items={accessToken ? AuthenticatedNavItems : NavItems}
                    />
                </Col>
            </Row>
            <Divider />
            <Outlet />
        </div>
    );
};

export default Navbar;
