import { Divider, Typography } from "antd";
import AllergyForm from "../../components/Allergy/AllergyForm";

const NewAllergy = () => {
    return (
        <div>
            <Typography.Title level={3}>Add new allergy</Typography.Title>
            
            <Divider />

            <AllergyForm />
        </div>
    );
};

export default NewAllergy;
