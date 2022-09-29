import { Col, Divider, Skeleton, Space, Typography } from "antd";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { getUserData } from "../../api/User/user.api";
import SignupForm from "../../components/Signup/SignupForm";
import { AuthenticationContext } from "../../contexts/AuthenticationProvider";
import { AuthenticationContextDataInterface } from "../../interfaces/authentication.interfaces";
import UserInterface from "../../interfaces/user.interfaces";

const UpdateProfile = () => {
    const { accessToken } = useContext(AuthenticationContext)
        ?.authentication as AuthenticationContextDataInterface;

    const [defaultValue, setDefaultValue] = useState<UserInterface | undefined>(
        undefined
    );

    useEffect(() => {
        getUserData(accessToken)
            .then((response) => {
                setDefaultValue({
                    ...response.data,
                    dateOfBirth: moment(response.data.dateOfBirth),
                });
            })
            .catch(console.log);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return !defaultValue ? (
        <Skeleton />
    ) : (
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
