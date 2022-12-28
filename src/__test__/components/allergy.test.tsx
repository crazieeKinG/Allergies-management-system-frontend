import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AllergyProvider, {
    AllergyContext,
} from "../../contexts/AllergyProvider";
import AuthenticationProvider from "../../contexts/AuthenticationProvider";
import AllergyInterface from "../../interfaces/allergy.interfaces";
import EditAllergy from "../../pages/Allergy/EditAllergy";
import ListAllergy from "../../pages/Allergy/ListAllergy";
import NewAllergy from "../../pages/Allergy/NewAllergy";
import SingleAllergy from "../../pages/Allergy/SingleAllergy";
import EditSymptom from "../../pages/Allergy/Symptom/EditSymptom";
import "../mocks/matchMedia";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => {
        return { id: "id" };
    },
}));

describe("Allergy pages", () => {
    const allergyList = [
        {
            id: "id",
            allergyName: "allergy-name",
            description: "allergy-description",
            referredName: "allergy-referred-name",
            photoUrl: "allergy-photoUrl",
            riskLevel: "risk-level",
            symptoms: [],
        },
    ] as AllergyInterface[];

    beforeEach(() => {
        Date.now = jest.fn().mockReturnValue(new Date("2022-12-26").getTime());
    });

    it("should generate allergy list page", () => {
        const view = render(
            <AuthenticationProvider>
                <AllergyProvider>
                    <BrowserRouter>
                        <ListAllergy />
                    </BrowserRouter>
                </AllergyProvider>
            </AuthenticationProvider>
        );
        expect(view.asFragment()).toMatchSnapshot();
    });
    it("should generate new allergy page", () => {
        const view = render(
            <AuthenticationProvider>
                <AllergyProvider>
                    <BrowserRouter>
                        <NewAllergy />
                    </BrowserRouter>
                </AllergyProvider>
            </AuthenticationProvider>
        );
        expect(view.asFragment()).toMatchSnapshot();
    });
    it("should generate edit allergy page", () => {
        const view = render(
            <AuthenticationProvider>
                <AllergyContext.Provider
                    value={{
                        allergy: allergyList,
                        setAllergy: jest.fn(),
                    }}
                >
                    <BrowserRouter>
                        <EditAllergy />
                    </BrowserRouter>
                </AllergyContext.Provider>
            </AuthenticationProvider>
        );
        expect(view.asFragment()).toMatchSnapshot();
    });
    it("should generate single allergy page", () => {
        const view = render(
            <AuthenticationProvider>
                <AllergyContext.Provider
                    value={{
                        allergy: allergyList,
                        setAllergy: jest.fn(),
                    }}
                >
                    <BrowserRouter>
                        <SingleAllergy />
                    </BrowserRouter>
                </AllergyContext.Provider>
            </AuthenticationProvider>
        );
        expect(view.asFragment()).toMatchSnapshot();
    });
    it("should generate edit symptom page", () => {
        const view = render(
            <AuthenticationProvider>
                <AllergyProvider>
                    <BrowserRouter>
                        <EditSymptom />
                    </BrowserRouter>
                </AllergyProvider>
            </AuthenticationProvider>
        );
        expect(view.asFragment()).toMatchSnapshot();
    });
});
