import { createContext, useState } from "react";
import AllergyInterface, {
    AllergyContextInterface,
} from "../interfaces/allergy.interfaces";

interface Props {
    children: React.ReactNode;
}

export const AllergyContext = createContext<
    AllergyContextInterface | undefined
>(undefined);

const AllergyProvider = ({ children }: Props) => {
    const [allergy, setAllergy] = useState<AllergyInterface[]>([]);

    return (
        <AllergyContext.Provider value={{ allergy, setAllergy }}>
            {children}
        </AllergyContext.Provider>
    );
};

export default AllergyProvider;
