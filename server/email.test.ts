import { describe, it, expect } from "vitest";
import { validateResendKey } from "./email";

describe("Resend Email Integration", () => {
  it("should validate the Resend API key", async () => {
    const isValid = await validateResendKey();
    expect(isValid).toBe(true);
  }, 15000);
});
