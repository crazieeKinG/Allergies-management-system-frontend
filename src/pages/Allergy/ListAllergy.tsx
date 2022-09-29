import { Col, Divider, Input, List, Row, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { getAllergys } from "../../api/Allergy/allergy.api";
import AllergyListItem from "../../components/Allergy/AllergyListItem";
import { AllergyContext } from "../../contexts/AllergyProvider";
import { AuthenticationContext } from "../../contexts/AuthenticationProvider";
import { AllergyContextInterface } from "../../interfaces/allergy.interfaces";
import { AuthenticationContextDataInterface } from "../../interfaces/authentication.interfaces";

const ListAllergy = () => {
    const { accessToken } = useContext(AuthenticationContext)
        ?.authentication as AuthenticationContextDataInterface;

    const { allergy, setAllergy } = useContext(
        AllergyContext
    ) as AllergyContextInterface;

    const [data, setData] = useState([...allergy]);

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
        getAllergys(accessToken)
            .then((response) => {
                setAllergy(response.data);
                setData(response.data);
            })
            .catch(console.log);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Row justify="space-between">
            <Col span={16}>
                <Typography.Title level={4}>Allergy List</Typography.Title>

                <Divider />
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
