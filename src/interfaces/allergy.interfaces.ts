export interface AllergyContextInterface {
    allergy: AllergyInterface[];
    setAllergy: React.Dispatch<React.SetStateAction<AllergyInterface[]>>;
}

export interface SymptomInterface {
    id?: string;
    symptom: string;
    allergyId: string;
}

export interface SymptomInsertInterface {
    symptoms: string;
}

interface AllergyInterface {
    id: string;
    allergyName: string;
    description: string;
    referredName: string;
    photoUrl: string;
    riskLevel: string;
    symptoms: SymptomInterface[];
}

export default AllergyInterface;
