import { Divider, Typography } from "antd";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AllergyForm from "../../components/Allergy/AllergyForm";
import { LIST_ALLERGY } from "../../constants/routes.constants";
import { AllergyContext } from "../../contexts/AllergyProvider";
import { AllergyContextInterface } from "../../interfaces/allergy.interfaces";

const EditAllergy = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { allergy } = useContext(AllergyContext) as AllergyContextInterface;

    const data = allergy.filter((eachAllergy) => eachAllergy.id === id)[0];

    useEffect(() => {
        if (!data) navigate(LIST_ALLERGY);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Typography.Title level={3}>Edit allergy</Typography.Title>

            <Divider />

            <AllergyForm initialValue={data} />
        </div>
    );
};

export default EditAllergy;
