import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

const SymptomForm = () => {
    return (
        <Form.List name="symptoms">
            {(fields, { add, remove }, { errors }) => (
                <>
                    {fields.map((field, index) => (
                        <Form.Item
                            wrapperCol={{ offset: index === 0 ? 0 : 4 }}
                            label={index === 0 ? "Symptoms" : ""}
                            required={false}
                            key={field.key}
                        >
                            <Form.Item
                                {...field}
                                validateTrigger={["onChange", "onBlur"]}
                                rules={[
                                    {
                                        required: true,
                                        whitespace: true,
                                        message:
                                            "Please input symptom or delete this field.",
                                    },
                                ]}
                                noStyle
                            >
                                <Input
                                    placeholder="Symptom"
                                    style={{ width: "60%" }}
                                />
                            </Form.Item>
                            {fields.length > 1 ? (
                                <MinusCircleOutlined
                                    className="mx-2"
                                    onClick={() => remove(field.name)}
                                />
                            ) : null}
                        </Form.Item>
                    ))}
                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Button
                            type="dashed"
                            onClick={() => add()}
                            style={{ width: "60%" }}
                            icon={<PlusOutlined />}
                        >
                            Add Symptom
                        </Button>
                        <Form.ErrorList errors={errors} />
                    </Form.Item>
                </>
            )}
        </Form.List>
    );
};

export default SymptomForm;
