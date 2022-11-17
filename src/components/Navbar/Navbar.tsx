import {
    EditOutlined,
    FileAddOutlined,
    HomeOutlined,
    LockOutlined,
    LogoutOutlined,
    ReadOutlined,
    UserAddOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Alert, Avatar, Col, Divider, Menu, Row, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getUserData, signout } from "../../api/User/user.api";
import { DEFAULT_ALERT_VALUE } from "../../constants/alert.constants";
import {
    ADD_ALLERGY,
    HOME,
    LIST_ALLERGY,
    SIGN_IN,
    SIGN_UP,
    UPDATE_PASSWORD,
    UPDATE_PROFILE,
} from "../../constants/routes.constants";
import { AuthenticationContext } from "../../contexts/AuthenticationProvider";
import AlertMessageInterface from "../../interfaces/alert.interfaces";
import AuthenticationContextInterface from "../../interfaces/authentication.interfaces";

const Navbar = () => {
    const { authentication, setAuthentication, user, setUser } = useContext(
        AuthenticationContext
    ) as AuthenticationContextInterface;
    const [alertMessage, setAlertMessage] =
        useState<AlertMessageInterface>(DEFAULT_ALERT_VALUE);

    const navigate = useNavigate();

    const signoutUser = () => {
        signout()
            .then(() => {
                setAuthentication("");
                setUser(undefined);
                navigate(SIGN_IN);
            })
            .catch((error) => {
                if (!error)
                    setAlertMessage({
                        type: "error",
                        message:
                            "Cannot connect to the server. Please try again later.",
                    });
                else
                    setAlertMessage({
                        type: "error",
                        message: error.message,
                    });
            });
    };

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
            label: user ? user.fullName : "Unknown",
            icon: <Avatar src={user ? user?.photoUrl : "Unknown"} />,
            children: [
                {
                    key: "UpdateProfile",
                    label: <Link to={UPDATE_PROFILE}>Update profile</Link>,
                    icon: <EditOutlined />,
                },
                {
                    key: "ChangePassword",
                    label: <Link to={UPDATE_PASSWORD}>Change password</Link>,
                    icon: <LockOutlined />,
                },
                {
                    key: "Signout",
                    label: "Sign out",
                    icon: <LogoutOutlined />,
                    onClick: signoutUser,
                },
            ],
        },
    ];

    useEffect(() => {
        if (!user) {
            getUserData()
                .then((response) => {
                    setUser(response.data);
                    setAlertMessage(DEFAULT_ALERT_VALUE);
                })
                .catch((error) => {
                    if (!error)
                        setAlertMessage({
                            type: "error",
                            message:
                                "Cannot connect to the server. Please try again later.",
                        });
                    else if (!!authentication)
                        setAlertMessage({
                            type: "error",
                            message: error.message,
                        });
                });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                        items={
                            authentication ? AuthenticatedNavItems : NavItems
                        }
                    />
                </Col>
            </Row>
            <Divider />
            {alertMessage.message && (
                <Alert
                    type={alertMessage.type}
                    message={alertMessage.message}
                />
            )}
            <Outlet />
        </div>
    );
};

export default Navbar;
