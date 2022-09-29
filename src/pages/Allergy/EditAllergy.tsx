import { Divider, Typography } from "antd";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import AllergyForm from "../../components/Allergy/AllergyForm";
import { AllergyContext } from "../../contexts/AllergyProvider";
import { AllergyContextInterface } from "../../interfaces/allergy.interfaces";

const EditAllergy = () => {
    const { id } = useParams();
    const { allergy } = useContext(AllergyContext) as AllergyContextInterface;

    const data = allergy.filter((eachAllergy) => eachAllergy.id === id)[0];
    return (
        <div>
            <Typography.Title level={3}>Edit allergy</Typography.Title>

            <Divider />

            <AllergyForm initialValue={data} />
        </div>
    );
};

export default EditAllergy;
