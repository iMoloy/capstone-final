import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BriefForm } from "@/components/brief-form";

describe("BriefForm Component", () => {
  it("renders form elements with proper accessibility attributes", () => {
    const onResult = vi.fn();
    const onError = vi.fn();
    const onStatusChange = vi.fn();

    render(
      <BriefForm
        onResult={onResult}
        onError={onError}
        onStatusChange={onStatusChange}
      />
    );

    expect(screen.getByRole("form", { name: /content brief generator/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Topic or content idea/i)).toBeInTheDocument();
    expect(screen.getByRole("radiogroup", { name: /content type/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Target audience/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /generate production brief/i })).toBeDisabled();
  });

  it("enables the submit button once topic reaches 10 characters", async () => {
    const user = userEvent.setup();
    const onResult = vi.fn();
    const onError = vi.fn();
    const onStatusChange = vi.fn();

    render(
      <BriefForm
        onResult={onResult}
        onError={onError}
        onStatusChange={onStatusChange}
      />
    );

    const textarea = screen.getByLabelText(/Topic or content idea/i);
    const submitBtn = screen.getByRole("button", { name: /generate production brief/i });

    expect(submitBtn).toBeDisabled();

    await user.type(textarea, "123456789");
    expect(submitBtn).toBeDisabled();

    await user.type(textarea, "0");
    expect(submitBtn).toBeEnabled();
  });
});
