import { Button, Form, Input, Select } from "antd";
import AllergyInterface from "../../interfaces/allergy.interfaces";
import SymptomForm from "./SymptomForm";

interface Props {
    initialValue?: AllergyInterface;
}

const AllergyForm = ({ initialValue }: Props) => {
    const handleSubmit = (values: any) => {
        const formattedData = {
            ...values,
            symptoms: [],
        };

        values.symptoms.forEach((eachSymptom: any) =>
            formattedData.symptoms.push({
                symptom: eachSymptom,
            })
        );
        console.log(values);
        console.log(formattedData);
    };

    return (
        <Form
            labelCol={{ span: 4 }}
            labelAlign="left"
            onFinish={handleSubmit}
            initialValues={initialValue}
            requiredMark={false}
        >
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
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AllergyForm;
