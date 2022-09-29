import {
    UserCredentialsInterface,
    UserToInsert,
} from "../../interfaces/user.interfaces";
import axios from "../axiosConfig";
import setHeader from "../setHeader";

export const signin = async (userCredentials: UserCredentialsInterface) => {
    try {
        const response = await axios.post("/user/signin", userCredentials);

        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

export const signup = async (userData: UserToInsert) => {
    try {
        const response = await axios.post("/user/signup", userData);

        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

export const getUserData = async (token: string) => {
    try {
        const response = await axios.get("/user/profile", setHeader(token));

        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

export const updateProfile = async (
    userData: UserToInsert,
    userId: string,
    token: string
) => {
    try {
        const response = await axios.put(
            `/user/${userId}`,
            userData,
            setHeader(token)
        );

        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

export const changePassword = async (
    password: string,
    token: string
) => {
    try {
        const response = await axios.put(
            `/user/reset/password`,
            { password },
            setHeader(token)
        );

        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};
