export interface AllergyContextInterface {
    allergy: AllergyInterface[];
    setAllergy: React.Dispatch<React.SetStateAction<AllergyInterface[]>>;
}

interface AllergyInterface {
    id: string;
    allergyName: string;
    referredName: string;
    riskLevel: string;
}

export default AllergyInterface;
