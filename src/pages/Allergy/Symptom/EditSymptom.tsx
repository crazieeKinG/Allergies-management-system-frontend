import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import {
    Alert,
    Button,
    Divider,
    Form,
    List,
    Popconfirm,
    Skeleton,
    Typography,
} from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllergys } from "../../../api/Allergy/allergy.api";
import {
    addSymptom,
    deleteSymptom,
    updateSymptom,
} from "../../../api/Allergy/symptom.api";
import SymptomForm from "../../../components/Allergy/SymptomForm";
import { DEFAULT_ALERT_VALUE } from "../../../constants/alert.constants";
import { LIST_ALLERGY, SIGN_OUT } from "../../../constants/routes.constants";
import { AllergyContext } from "../../../contexts/AllergyProvider";
import { AuthenticationContext } from "../../../contexts/AuthenticationProvider";
import AlertMessageInterface from "../../../interfaces/alert.interfaces";
import AllergyInterface, {
    AllergyContextInterface,
    SymptomInterface,
} from "../../../interfaces/allergy.interfaces";
import { AuthenticationContextDataInterface } from "../../../interfaces/authentication.interfaces";

const EditSymptom = () => {
    const allergyId = useParams().id;
    const { accessToken } = useContext(AuthenticationContext)
        ?.authentication as AuthenticationContextDataInterface;
    const { setAllergy } = useContext(
        AllergyContext
    ) as AllergyContextInterface;

    const [initialValue, setInitialValue] = useState<AllergyInterface>();

    const [form] = Form.useForm();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [updatedIndex, setUpdatedIndex] = useState(-1);
    const [alertMessage, setAlertMessage] =
        useState<AlertMessageInterface>(DEFAULT_ALERT_VALUE);

    const refreshData = () => {
        setRefresh(true);
        getAllergys(accessToken)
            .then((response) => {
                setRefresh(false);
                setAllergy(response.data);

                const selectedData = (
                    response.data as AllergyInterface[]
                ).filter((data) => data.id === allergyId)[0];

                if (!selectedData) navigate(LIST_ALLERGY);

                setInitialValue(selectedData);
            })
            .catch((error) => {
                if (error.status === 401) navigate(SIGN_OUT);
                setRefresh(false);
                handleAlertMessage(error);
            });
    };

    const updateSymptomHandler = (index: number, value: string) => {
        setLoading(true);
        if (
            (initialValue as AllergyInterface).symptoms[index].symptom !== value
        ) {
            setUpdatedIndex(index);

            const updatedSymptom: SymptomInterface = {
                id: (initialValue as AllergyInterface).symptoms[index].id,
                symptom: value,
                allergyId: allergyId as string,
            };

            updateSymptom(updatedSymptom, accessToken)
                .then((response) => {
                    setLoading(false);
                    setUpdatedIndex(-1);

                    setAlertMessage({
                        type: "success",
                        message: "Symptom updated successfully.",
                    });

                    refreshData();
                })
                .catch((error) => {
                    setLoading(false);
                    setUpdatedIndex(-1);
                    if (error.status === 401) navigate(SIGN_OUT);

                    handleAlertMessage(error);
                });
        }
    };

    const confirmDelete = (symptomId: string) => {
        deleteSymptom(symptomId, accessToken)
            .then((response) => {
                setDeleteLoading(false);

                refreshData();
            })
            .catch((error) => {
                setDeleteLoading(false);
                if (error.status === 401) navigate(SIGN_OUT);

                handleAlertMessage(error);
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
                    form.resetFields();
                    refreshData();
                })
                .catch((error) => {
                    if (error.status === 401) navigate(SIGN_OUT);
                    handleAlertMessage(error);
                });
        }
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
                type: "warning",
                message: error.message,
            });
    };

    useEffect(() => {
        refreshData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return initialValue ? (
        <div>
            <Typography.Title level={3}>
                Edit symptom: {initialValue.allergyName}
            </Typography.Title>

            <Divider />

            <Typography.Title level={5}>Symptoms</Typography.Title>
            {alertMessage.message && (
                <Alert
                    type={alertMessage.type}
                    message={alertMessage.message}
                />
            )}
            {!refresh ? (
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
                                        updateSymptomHandler(
                                            index,
                                            updatedValue
                                        ),
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
            ) : (
                <Skeleton />
            )}

            <Divider />

            <Form
                form={form}
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
    ) : (
        <Skeleton />
    );
};

export default EditSymptom;
