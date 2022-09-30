import { List, Typography } from "antd";
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
            extra={
                listItem.photoUrl && (
                    <img
                        width={270}
                        src={listItem.photoUrl}
                        alt={listItem.allergyName}
                    />
                )
            }
        >
            <List.Item.Meta
                title={listItem.allergyName}
                description={listItem.referredName}
            />
            <Typography.Paragraph>{listItem.description}</Typography.Paragraph>
            <Typography.Paragraph type="secondary">
                Risk level: {listItem.riskLevel}
            </Typography.Paragraph>
        </List.Item>
    );
};

export default AllergyListItem;
