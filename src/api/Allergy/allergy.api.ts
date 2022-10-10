import axios from "../axiosConfig";

export const insertAllergy = async (allergyData: FormData) => {
    try {
        const response = await axios.post("/allergy", allergyData);
        return response.data;
    } catch (error: any) {
        throw error.response;
    }
};

export const getAllergys = async () => {
    try {
        const response = await axios.get("/allergy");

        return response.data;
    } catch (error: any) {
        throw error.response;
    }
};

export const updateAllergy = async (
    allergyData: FormData,
    allergyId: string
) => {
    try {
        const response = await axios.put(`/allergy/${allergyId}`, allergyData);

        return response.data;
    } catch (error: any) {
        throw error.response;
    }
};

export const deleteAllergy = async (allergyId: string) => {
    try {
        const response = await axios.delete(`/allergy/${allergyId}`);

        return response.data;
    } catch (error: any) {
        throw error.response;
    }
};
