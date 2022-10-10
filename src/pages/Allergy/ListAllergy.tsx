import { Alert, Col, Divider, Input, List, Row, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllergys } from "../../api/Allergy/allergy.api";
import AllergyListItem from "../../components/Allergy/AllergyListItem";
import { DEFAULT_ALERT_VALUE } from "../../constants/alert.constants";
import { SIGN_IN } from "../../constants/routes.constants";
import { AllergyContext } from "../../contexts/AllergyProvider";
import { AuthenticationContext } from "../../contexts/AuthenticationProvider";
import AlertMessageInterface from "../../interfaces/alert.interfaces";
import { AllergyContextInterface } from "../../interfaces/allergy.interfaces";
import AuthenticationContextInterface from "../../interfaces/authentication.interfaces";

const ListAllergy = () => {
    const { authentication } = useContext(
        AuthenticationContext
    ) as AuthenticationContextInterface;

    const { allergy, setAllergy } = useContext(
        AllergyContext
    ) as AllergyContextInterface;

    const [alertMessage, setAlertMessage] =
        useState<AlertMessageInterface>(DEFAULT_ALERT_VALUE);
    const [data, setData] = useState([...allergy]);

    const navigate = useNavigate();

    const onSearch = (searchContent: string) => {
        searchContent = searchContent.toLowerCase();
        const filteredData = allergy.filter(
            (each) =>
                each.allergyName.toLowerCase().includes(searchContent) ||
                each.referredName.toLowerCase().includes(searchContent)
        );
        setData(filteredData);
    };

    useEffect(() => {
        if (authentication) {
            getAllergys()
                .then((response) => {
                    setAllergy(response.data);
                    setData(response.data);

                    setAlertMessage(DEFAULT_ALERT_VALUE);
                })
                .catch((error) => {
                    if (!error)
                        setAlertMessage({
                            type: "error",
                            message:
                                "Cannot connect to the server. Please try again later.",
                        });
                    else {
                        if (error.status === 400) navigate(SIGN_IN);
                        setAlertMessage({
                            type: "warning",
                            message: error.data.message,
                        });
                    }
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Row justify="space-between">
            <Col span={16}>
                <Typography.Title level={4}>Allergy List</Typography.Title>

                <Divider />
                {alertMessage.message && (
                    <Alert
                        type={alertMessage.type}
                        message={alertMessage.message}
                    />
                )}
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        pageSize: 2,
                    }}
                    dataSource={data}
                    renderItem={(item) => <AllergyListItem listItem={item} />}
                />
            </Col>
            <Divider type="vertical" />
            <Col span={5}>
                <Typography.Title level={5}>Filters</Typography.Title>
                <Input.Search placeholder="Search..." onSearch={onSearch} />
            </Col>
        </Row>
    );
};

export default ListAllergy;
