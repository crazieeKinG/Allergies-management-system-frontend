import { UserCredentialsInterface } from "../../interfaces/user.interfaces";
import axios from "../axiosConfig";

export const signin = async (userCredentials: UserCredentialsInterface) => {
    try {
        const response = await axios.post("/user/signin", userCredentials, {
            withCredentials: true,
        });
        console.log(response);
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.data.accessToken;

        return response.data;
    } catch (error: any) {
        console.log(error);
        throw error.response.data;
    }
};

export const signout = async () => {
    try {
        const response = await axios.post(
            "/user/signout",
            {},
            { withCredentials: true }
        );

        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

export const signup = async (userData: FormData) => {
    try {
        const response = await axios.post("/user/signup", userData);

        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

export const getUserData = async () => {
    try {
        const response = await axios.get("/user/profile");
        
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

export const updateProfile = async (userData: FormData, userId: string) => {
    try {
        const response = await axios.put(`/user/${userId}`, userData);

        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

export const changePassword = async (password: string) => {
    try {
        const response = await axios.put(`/user/reset/password`, { password });

        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};
