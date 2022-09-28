import { Divider, Typography } from "antd";
import AllergyForm from "../../components/Allergy/AllergyForm";
import AllergyInterface from "../../interfaces/allergy.interfaces";

const EditAllergy = () => {
    const data: AllergyInterface = {
        id: "asd",
        allergyName: "namr",
        referredName: "s",
        riskLevel: "Mild",
    };

    return (
        <div>
            <Typography.Title level={3}>Edit allergy</Typography.Title>

            <Divider />

            <AllergyForm initialValue={data} />
        </div>
    );
};

export default EditAllergy;
