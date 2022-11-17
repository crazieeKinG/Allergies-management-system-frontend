import { UploadOutlined } from "@ant-design/icons";
import {
    Alert,
    Button,
    Form,
    Input,
    Popconfirm,
    Select,
    Space,
    Upload,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    deleteAllergy,
    insertAllergy,
    updateAllergy,
} from "../../api/Allergy/allergy.api";
import { DEFAULT_ALERT_VALUE } from "../../constants/alert.constants";
import { LIST_ALLERGY, HOME } from "../../constants/routes.constants";
import AlertMessageInterface from "../../interfaces/alert.interfaces";
import AllergyInterface from "../../interfaces/allergy.interfaces";
import createFormData from "../../utils/createFormData";
import SymptomForm from "./SymptomForm";

interface Props {
    initialValue?: AllergyInterface;
}

const AllergyForm = ({ initialValue }: Props) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [alertMessage, setAlertMessage] =
        useState<AlertMessageInterface>(DEFAULT_ALERT_VALUE);

    const handleSubmit = (values: any) => {
        setLoading(true);

        const formattedData = {
            ...values,
            symptoms: "",
        };

        const symptoms: { symptom: string }[] = [];

        if (values.symptoms) {
            values.symptoms.forEach((eachSymptom: any) =>
                symptoms.push({
                    symptom: eachSymptom,
                })
            );

            formattedData.symptoms = JSON.stringify(symptoms);
        } else {
            delete formattedData.symptoms;
        }

        const formattedFormData = createFormData(formattedData);

        if (!initialValue) {
            insertAllergy(formattedFormData)
                .then((response) => {
                    setLoading(false);
                    navigate(LIST_ALLERGY);
                })
                .catch((error) => {
                    if (error.status === 401) navigate(HOME);
                    setLoading(false);

                    handleAlertMessage(error);
                });
        } else {
            updateAllergy(formattedFormData, initialValue.id)
                .then((response) => {
                    setLoading(false);
                    navigate(LIST_ALLERGY);
                })
                .catch((error) => {
                    if (error.status === 401) navigate(HOME);
                    setLoading(false);

                    handleAlertMessage(error);
                });
        }
    };

    const confirmDelete = () => {
        deleteAllergy(initialValue?.id as string)
            .then((response) => {
                setDeleteLoading(false);
                navigate(LIST_ALLERGY);
            })
            .catch((error) => {
                if (error.status === 401) navigate(HOME);
                setDeleteLoading(false);

                handleAlertMessage(error);
            });
    };

    const handleAlertMessage = (error: any) => {
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
    };

    return (
        <Form
            labelCol={{ span: 4 }}
            labelAlign="left"
            onFinish={handleSubmit}
            initialValues={initialValue}
            requiredMark={false}
        >
            {alertMessage.message && (
                <Alert
                    type={alertMessage.type}
                    message={alertMessage.message}
                />
            )}
            <Form.Item
                name="allergyName"
                label="Name"
                rules={[{ required: true, message: "Please provide a name" }]}
            >
                <Input placeholder="Allergy name" />
            </Form.Item>

            <Form.Item name="referredName" label="Referred Name">
                <Input placeholder="Allergy secondary name" />
            </Form.Item>
            <Form.Item label="Allergy picture" name="photo">
                <Upload
                    beforeUpload={() => false}
                    listType="picture"
                    maxCount={1}
                    fileList={undefined}
                >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Form.Item>

            <Form.Item name="description" label="Description">
                <TextArea
                    placeholder="Description of allergy"
                    autoSize
                    showCount
                    maxLength={1000}
                />
            </Form.Item>

            <Form.Item
                name="riskLevel"
                label="Risk Level"
                rules={[
                    { required: true, message: "Please select at least one" },
                ]}
            >
                <Select placeholder="Select risk level">
                    <Select.Option value="Mild">Mild</Select.Option>
                    <Select.Option value="Moderate">Moderate</Select.Option>
                    <Select.Option value="Severe">Severe</Select.Option>
                </Select>
            </Form.Item>

            {!initialValue && <SymptomForm />}

            <Form.Item wrapperCol={{ offset: 4 }}>
                <Space>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        {!initialValue ? "Save" : "Update"}
                    </Button>
                    {!!initialValue && (
                        <Popconfirm
                            title="Are you sure?"
                            onConfirm={confirmDelete}
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
                                loading={deleteLoading}
                            >
                                Delete
                            </Button>
                        </Popconfirm>
                    )}
                </Space>
            </Form.Item>
        </Form>
    );
};

export default AllergyForm;
