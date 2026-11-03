import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BriefSkeleton } from "@/components/brief-skeleton";

describe("BriefSkeleton Component", () => {
  it("renders with appropriate accessibility attributes for loading state", () => {
    render(<BriefSkeleton />);
    const skeleton = screen.getByLabelText(/Generating content brief…/i);
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveAttribute("aria-busy", "true");
  });
});
