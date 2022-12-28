import { render, screen } from "@testing-library/react";
import Home from "../../pages/Home/Home";

describe("Home page", () => {
    it("should have 'OVERVIEW' heading", () => {
        render(<Home />);

        expect(screen.getByText("OVERVIEW")).toBeInTheDocument();
    });

    it("should have 'Allergic Reaction' heading", () => {
        render(<Home />);

        expect(screen.getByText("Allergic Reaction")).toBeInTheDocument();
    });
});
