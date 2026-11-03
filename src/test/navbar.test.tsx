import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Navbar } from "@/components/navbar";

describe("Navbar Component", () => {
  it("renders branding and status indicators", () => {
    render(<Navbar />);
    expect(screen.getByText("Brief")).toBeInTheDocument();
    expect(screen.getByText("Craft")).toBeInTheDocument();
    expect(screen.getByText("Claude 3.5 Haiku")).toBeInTheDocument();
    expect(screen.getByLabelText(/View source code on GitHub/i)).toBeInTheDocument();
  });
});
