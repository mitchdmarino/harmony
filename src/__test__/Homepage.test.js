import { render, fireEvent, cleanup } from "@testing-library/react";
import Homepage from "../components/home/Homepage";

test("homepage renders", () => {
    render(<Homepage />)
})