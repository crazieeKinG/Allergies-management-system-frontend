import { List } from "antd";
import { Link } from "react-router-dom";
import { EDIT_ALLERGY } from "../../constants/routes.constants";
import AllergyInterface from "../../interfaces/allergy.interfaces";
import updateURLGenerate from "../../utils/updateURLGenerate";

interface Props {
    listItem: AllergyInterface;
}

const AllergyListItem = ({ listItem }: Props) => {
    return (
        <List.Item
            key={listItem.allergyName}
            actions={[
                <Link to={updateURLGenerate(EDIT_ALLERGY, listItem.id)}>
                    Edit
                </Link>,
                <Link to={"#"}>View All</Link>,
            ]}
        >
            <List.Item.Meta
                title={listItem.allergyName}
                description={listItem.referredName}
            />
            {listItem.id} <br />
            {listItem.riskLevel}
        </List.Item>
    );
};

export default AllergyListItem;
