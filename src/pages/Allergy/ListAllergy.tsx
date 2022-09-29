import { Col, Divider, Input, List, Row, Typography } from "antd";
import { useState } from "react";

const ListAllergy = () => {
    const allData = Array.from({ length: 23 }).map((_, i) => ({
        allergyName: `Allergy Name${i}`,
        referredName: `Referred Name ${i}`,
        riskLevel: "Moderate",
    }));

    const [data, setData] = useState([...allData]);

    const onSearch = (searchContent: string) => {
        console.log(searchContent);
        const filteredData = allData.filter((each) =>
            each.allergyName.includes(searchContent)
        );
        setData(filteredData);
    };

    return (
        <Row justify="space-between">
            <Col span={16}>
                <Typography.Title level={4}>Allergy List</Typography.Title>

                <Divider />
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        pageSize: 5,
                    }}
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item key={item.allergyName}>
                            <List.Item.Meta
                                title={item.allergyName}
                                description={item.referredName}
                            />
                            {item.riskLevel}
                        </List.Item>
                    )}
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
