import { describe, it, expect } from "vitest";

describe("JotForm API Key Validation", () => {
  it("should validate the JotForm API key by fetching user info", async () => {
    const apiKey = process.env.JOTFORM_API_KEY;
    expect(apiKey).toBeTruthy();

    const res = await fetch(`https://api.jotform.com/user?apiKey=${apiKey}`);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.responseCode).toBe(200);
    expect(data.content).toBeDefined();
  });
});
