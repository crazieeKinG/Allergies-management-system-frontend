import axios from "../../api/axiosConfig";
import * as SymptomApi from "../../api/Allergy/symptom.api";
import {
    ADD_SYMPTOM_RESPONSE,
    DELETE_SYMPTOM_RESPONSE,
    SYMPTOM_DATA,
    SYMPTOM_ID,
    UPDATE_SYMPTOM_RESPONSE,
} from "../constants/symptomConstants";

jest.mock("../../api/axiosConfig");

describe("Symptom API", () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    describe("Insert symptom api", () => {
        it("should insert new symptom", async () => {
            mockedAxios.post.mockResolvedValueOnce(ADD_SYMPTOM_RESPONSE);

            const data = await SymptomApi.addSymptom(
                ADD_SYMPTOM_RESPONSE as any
            );

            expect(data).toBe(ADD_SYMPTOM_RESPONSE.data);
        });
    });

    describe("Update symptom api", () => {
        it("should update symptom and return updated data", async () => {
            mockedAxios.put.mockResolvedValueOnce(UPDATE_SYMPTOM_RESPONSE);

            const data = await SymptomApi.updateSymptom(SYMPTOM_DATA as any);

            expect(data).toBe(UPDATE_SYMPTOM_RESPONSE.data);
        });
    });

    describe("Delete symptom api", () => {
        it("should delete symptom and return deleted data", async () => {
            mockedAxios.delete.mockResolvedValueOnce(DELETE_SYMPTOM_RESPONSE);

            const data = await SymptomApi.deleteSymptom(SYMPTOM_ID);

            expect(data).toBe(DELETE_SYMPTOM_RESPONSE.data);
        });
    });
});
