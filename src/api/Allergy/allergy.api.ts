import AllergyInterface from "../../interfaces/allergy.interfaces";
import axios from "../axiosConfig";
import setHeader from "../setHeader";

export const insertAllergy = async (
    allergyData: AllergyInterface,
    token: string
) => {
    try {
        const response = await axios.post(
            "/allergy",
            allergyData,
            setHeader(token)
        );
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

export const getAllergys = async (token: string) => {
    try {
        const response = await axios.get("/allergy", setHeader(token));

        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

export const updateAllergy = async (
    allergyData: AllergyInterface,
    allergyId: string,
    token: string
) => {
    try {
        const response = await axios.put(
            `/allergy/${allergyId}`,
            allergyData,
            setHeader(token)
        );

        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

export const deleteAllergy = async (allergyId: string, token: string) => {
    try {
        const response = await axios.delete(
            `/allergy/${allergyId}`,
            setHeader(token)
        );

        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};
