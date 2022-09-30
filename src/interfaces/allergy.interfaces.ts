export interface AllergyContextInterface {
    allergy: AllergyInterface[];
    setAllergy: React.Dispatch<React.SetStateAction<AllergyInterface[]>>;
}

interface AllergyInterface {
    id: string;
    allergyName: string;
    description: string;
    referredName: string;
    photoUrl: string;
    riskLevel: string;
}

export default AllergyInterface;
