import {
    SymptomInsertInterface,
    SymptomInterface,
} from "../../interfaces/allergy.interfaces";
import axios from "../axiosConfig";

export const addSymptom = async (symptoms: SymptomInsertInterface) => {
    try {
        const response = await axios.post(`/symptom/`, symptoms);

        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

export const updateSymptom = async (symptom: SymptomInterface) => {
    try {
        const response = await axios.put(`/symptom/${symptom.id}`, symptom);

        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

export const deleteSymptom = async (symptomId: string) => {
    try {
        const response = await axios.delete(`/symptom/${symptomId}`);

        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};
