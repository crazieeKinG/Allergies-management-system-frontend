import {
    SymptomInsertInterface,
    SymptomInterface,
} from "../../interfaces/allergy.interfaces";
import axios from "../axiosConfig";
import setHeader from "../setHeader";

export const addSymptom = async (
    symptoms: SymptomInsertInterface,
    token: string
) => {
    try {
        const response = await axios.post(
            `/symptom/`,
            symptoms,
            setHeader(token)
        );

        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

export const updateSymptom = async (
    symptom: SymptomInterface,
    token: string
) => {
    try {
        const response = await axios.put(
            `/symptom/${symptom.id}`,
            symptom,
            setHeader(token)
        );

        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

export const deleteSymptom = async (symptomId: string, token: string) => {
    try {
        const response = await axios.delete(
            `/symptom/${symptomId}`,
            setHeader(token)
        );

        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};
