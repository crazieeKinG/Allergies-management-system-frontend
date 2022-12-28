import axios from "../../api/axiosConfig";
import * as AllergyApi from "../../api/Allergy/allergy.api";
import {
    ALLERGY_ID,
    DELETE_ALLERGY_RESPONSE,
    GET_ALLERGY_RESPONSE,
    INSERT_ALLERGY_RESPONSE,
    NEW_ALLERGY_DATA,
    UPDATE_ALLERGY_RESPONSE,
} from "../constants/allergyConstants";

jest.mock("../../api/axiosConfig");

describe("Allergy API", () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    describe("Get allergy api", () => {
        it("should return the all allergy data", async () => {
            mockedAxios.get.mockResolvedValueOnce(GET_ALLERGY_RESPONSE);

            const data = await AllergyApi.getAllergys();

            expect(data).toBe(GET_ALLERGY_RESPONSE.data);
        });
    });

    describe("Insert allergy api", () => {
        it("should insert new allergy", async () => {
            mockedAxios.post.mockResolvedValueOnce(INSERT_ALLERGY_RESPONSE);

            const data = await AllergyApi.insertAllergy(
                NEW_ALLERGY_DATA as any
            );

            expect(data).toBe(INSERT_ALLERGY_RESPONSE.data);
        });
    });

    describe("Update allergy api", () => {
        it("should update allergy and return updated data", async () => {
            mockedAxios.put.mockResolvedValueOnce(UPDATE_ALLERGY_RESPONSE);

            const data = await AllergyApi.updateAllergy(
                NEW_ALLERGY_DATA as any,
                ALLERGY_ID
            );

            expect(data).toBe(UPDATE_ALLERGY_RESPONSE.data);
        });
    });

    describe("Delete allergy api", () => {
        it("should delete allergy and return deleted data", async () => {
            mockedAxios.delete.mockResolvedValueOnce(DELETE_ALLERGY_RESPONSE);

            const data = await AllergyApi.deleteAllergy(ALLERGY_ID);

            expect(data).toBe(DELETE_ALLERGY_RESPONSE.data);
        });
    });
});
