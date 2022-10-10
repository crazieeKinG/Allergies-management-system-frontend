import { EditOutlined } from "@ant-design/icons";
import { Col, Divider, List, Row, Typography } from "antd";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { EDIT_ALLERGY, EDIT_SYMPTOM } from "../../constants/routes.constants";
import { AllergyContext } from "../../contexts/AllergyProvider";
import { AllergyContextInterface } from "../../interfaces/allergy.interfaces";
import updateURLGenerate from "../../utils/updateURLGenerate";

const SingleAllergy = () => {
    const allergyId = useParams().id;

    const { allergy } = useContext(AllergyContext) as AllergyContextInterface;

    const initialValue = allergy.filter(
        (eachAllergy) => eachAllergy.id === allergyId
    )[0];

    return (
        <div>
            <Row align="middle">
                <Col>
                    <Typography.Title level={2}>
                        {initialValue.allergyName}
                    </Typography.Title>
                </Col>
                <Col>
                    <Typography.Title type="secondary" level={4}>
                        &nbsp; {initialValue.referredName}
                        &nbsp;
                        <Link
                            to={updateURLGenerate(
                                EDIT_ALLERGY,
                                initialValue.id
                            )}
                        >
                            <EditOutlined />
                        </Link>
                    </Typography.Title>
                </Col>
            </Row>
            <Divider />
            {initialValue.photoUrl && (
                <img
                    width={300}
                    src={initialValue.photoUrl}
                    alt={initialValue.allergyName}
                />
            )}
            <Typography.Title level={5}>Description</Typography.Title>
            <Typography.Paragraph>
                {initialValue.description}
            </Typography.Paragraph>
            <Typography.Title level={5}>
                Symptoms &nbsp;
                <Link to={updateURLGenerate(EDIT_SYMPTOM, initialValue.id)}>
                    <EditOutlined />
                </Link>
            </Typography.Title>
            <List
                dataSource={initialValue.symptoms}
                renderItem={(item, index) => (
                    <List.Item>
                        {index + 1}. {item.symptom}
                    </List.Item>
                )}
            />
        </div>
    );
};

export default SingleAllergy;
