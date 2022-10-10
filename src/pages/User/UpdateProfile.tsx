import { Alert, Col, Divider, Skeleton, Space, Typography } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { getUserData } from "../../api/User/user.api";
import SignupForm from "../../components/Signup/SignupForm";
import { DEFAULT_ALERT_VALUE } from "../../constants/alert.constants";
import AlertMessageInterface from "../../interfaces/alert.interfaces";
import UserInterface from "../../interfaces/user.interfaces";

const UpdateProfile = () => {
    const [defaultValue, setDefaultValue] = useState<UserInterface | undefined>(
        undefined
    );

    const [alertMessage, setAlertMessage] =
        useState<AlertMessageInterface>(DEFAULT_ALERT_VALUE);

    useEffect(() => {
        getUserData()
            .then((response) => {
                setDefaultValue({
                    ...response.data,
                    dateOfBirth: moment(response.data.dateOfBirth),
                });
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
                        type: "warning",
                        message: error.message,
                    });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {alertMessage.message && (
                <Alert
                    type={alertMessage.type}
                    message={alertMessage.message}
                />
            )}
            {!defaultValue ? (
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
            )}
        </>
    );
};

export default UpdateProfile;
