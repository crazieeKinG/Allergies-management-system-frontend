import axios from "../../api/axiosConfig";
import * as UserApi from "../../api/User/user.api";
import {
    CHANGE_PASSWORD,
    CHANGE_PASSWORD_RESPONSE,
    GET_USER_RESPONSE,
    SIGN_IN_CREDENTIALS,
    SIGN_IN_RESPONSE,
    SIGN_OUT_RESPONSE,
    SIGN_UP_RESPONSE,
    UPDATE_USER_DATA,
    UPDATE_USER_RESPONSE,
    USER_DATA,
    USER_ID,
} from "../constants/userConstants";

jest.mock("../../api/axiosConfig");

describe("User API", () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    describe("Sign in api", () => {
        it("should return access token", async () => {
            mockedAxios.post.mockResolvedValueOnce(SIGN_IN_RESPONSE);
            const { data } = await UserApi.signin(SIGN_IN_CREDENTIALS);

            expect(data).toBe(SIGN_IN_RESPONSE.data.data);
            expect(data.accessToken).toBe(
                SIGN_IN_RESPONSE.data.data.accessToken
            );
        });
    });

    describe("Sign out api", () => {
        it("should sign out user account", async () => {
            mockedAxios.post.mockResolvedValueOnce(SIGN_OUT_RESPONSE);
            const data = await UserApi.signout();

            expect(data).toBe(SIGN_OUT_RESPONSE.data);
        });
    });

    describe("Sign up api", () => {
        it("should sign up user and return data with new id", async () => {
            mockedAxios.post.mockResolvedValueOnce(SIGN_UP_RESPONSE);
            const data = await UserApi.signup(USER_DATA as any);

            expect(data).toBe(SIGN_UP_RESPONSE.data);
        });
    });

    describe("Get user api", () => {
        it("should return user data", async () => {
            mockedAxios.get.mockResolvedValueOnce(GET_USER_RESPONSE);
            const data = await UserApi.getUserData();

            expect(data).toBe(GET_USER_RESPONSE.data);
        });
    });

    describe("Update user api", () => {
        it("should update user data and return updated data", async () => {
            mockedAxios.put.mockResolvedValueOnce(UPDATE_USER_RESPONSE);
            const data = await UserApi.updateProfile(
                UPDATE_USER_DATA as any,
                USER_ID
            );

            expect(data).toBe(UPDATE_USER_RESPONSE.data);
        });
    });

    describe("Change password api", () => {
        it("should change the password to the new one", async () => {
            mockedAxios.put.mockResolvedValueOnce(CHANGE_PASSWORD_RESPONSE);
            const data = await UserApi.changePassword(CHANGE_PASSWORD);

            expect(data).toBe(CHANGE_PASSWORD_RESPONSE.data);
        });
    });
});
