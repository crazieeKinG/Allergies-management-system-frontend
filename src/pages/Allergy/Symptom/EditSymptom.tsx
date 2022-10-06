import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Divider, Form, List, Popconfirm, Typography } from "antd";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import {
    addSymptom,
    deleteSymptom,
    updateSymptom,
} from "../../../api/Allergy/symptom.api";
import SymptomForm from "../../../components/Allergy/SymptomForm";
import { AllergyContext } from "../../../contexts/AllergyProvider";
import { AuthenticationContext } from "../../../contexts/AuthenticationProvider";
import {
    AllergyContextInterface,
    SymptomInterface,
} from "../../../interfaces/allergy.interfaces";
import { AuthenticationContextDataInterface } from "../../../interfaces/authentication.interfaces";

const EditSymptom = () => {
    const allergyId = useParams().id;
    const { accessToken } = useContext(AuthenticationContext)
        ?.authentication as AuthenticationContextDataInterface;
    const { allergy } = useContext(AllergyContext) as AllergyContextInterface;

    const initialValue = allergy.filter(
        (eachAllergy) => eachAllergy.id === allergyId
    )[0];

    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [updatedIndex, setUpdatedIndex] = useState(-1);

    const updateSymptomHandler = (index: number, value: string) => {
        setLoading(true);
        if (initialValue.symptoms[index].symptom !== value) {
            console.log("updating");
            setUpdatedIndex(index);

            const updatedSymptom: SymptomInterface = {
                id: initialValue.symptoms[index].id,
                symptom: value,
                allergyId: allergyId as string,
            };

            updateSymptom(updatedSymptom, accessToken)
                .then((response) => {
                    setLoading(false);
                    setUpdatedIndex(-1);
                })
                .catch((error) => {
                    setLoading(false);
                    setUpdatedIndex(-1);
                });
        } else {
            console.log("No changes");
        }
    };

    const confirmDelete = (symptomId: string) => {
        deleteSymptom(symptomId, accessToken)
            .then((response) => {
                setDeleteLoading(false);
            })
            .catch((error) => {
                setDeleteLoading(false);
            });
    };

    const addNewSymptoms = (values: any) => {
        if (values.symptoms.length > 0) {
            const symptoms: SymptomInterface[] = [];

            values.symptoms.forEach((symptom: string) => {
                symptoms.push({
                    symptom: symptom,
                    allergyId: allergyId as string,
                });
            });

            const formattedData = {
                symptoms: JSON.stringify(symptoms),
            };

            addSymptom(formattedData, accessToken)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <div>
            <Typography.Title level={3}>
                Edit symptom: {initialValue.allergyName}
            </Typography.Title>

            <Divider />

            <Typography.Title level={5}>Symptoms</Typography.Title>
            <List
                dataSource={initialValue.symptoms}
                renderItem={(item, index) => (
                    <List.Item
                        actions={[
                            <Popconfirm
                                title="Are you sure?"
                                onConfirm={() =>
                                    confirmDelete(item.id as string)
                                }
                                okText="Yes"
                                cancelText="No"
                                okButtonProps={{
                                    danger: true,
                                    loading: deleteLoading,
                                }}
                            >
                                <Button
                                    danger
                                    type="primary"
                                    icon={<DeleteOutlined />}
                                    loading={deleteLoading}
                                >
                                    Delete
                                </Button>
                            </Popconfirm>,
                        ]}
                    >
                        <Typography.Paragraph
                            editable={{
                                tooltip: "Click to edit symptom",
                                onChange: (updatedValue) =>
                                    updateSymptomHandler(index, updatedValue),
                            }}
                            style={{ width: "100%" }}
                        >
                            {item.symptom}
                        </Typography.Paragraph>
                        {loading && index === updatedIndex && (
                            <LoadingOutlined />
                        )}
                    </List.Item>
                )}
            />

            <Divider />

            <Form
                labelCol={{ span: 4 }}
                labelAlign="left"
                onFinish={addNewSymptoms}
            >
                <SymptomForm />

                <Form.Item wrapperCol={{ offset: 4 }}>
                    <Button type="primary" htmlType="submit">
                        Add
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditSymptom;
