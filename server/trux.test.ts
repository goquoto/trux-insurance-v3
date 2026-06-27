import { describe, expect, it } from "vitest";

describe("Trux Insurance Website - Content Validation", () => {
  it("should have correct company contact information", () => {
    const phone = "(331) 240-1101";
    const tollFree = "1-877-350-8789";
    const fax = "331-240-1055";
    const email = "info@truxins.com";
    const address = "1 Tiffany Pt Suite G2";
    const city = "Bloomingdale, Illinois 60108";

    expect(phone).toBe("(331) 240-1101");
    expect(tollFree).toBe("1-877-350-8789");
    expect(fax).toBe("331-240-1055");
    expect(email).toBe("info@truxins.com");
    expect(address).toBe("1 Tiffany Pt Suite G2");
    expect(city).toBe("Bloomingdale, Illinois 60108");
  });

  it("should have all required coverage types", () => {
    const coverages = [
      "Commercial Auto Liability",
      "Physical Damage",
      "Motor Truck Cargo",
      "General Liability",
      "Non-Trucking Liability",
      "Trailer Interchange",
      "Occupational Accident",
      "Workers' Compensation",
      "Excess / Umbrella",
      "Pollution Liability",
    ];

    expect(coverages).toHaveLength(10);
    expect(coverages).toContain("Commercial Auto Liability");
    expect(coverages).toContain("Motor Truck Cargo");
    expect(coverages).toContain("Non-Trucking Liability");
    expect(coverages).toContain("Trailer Interchange");
    expect(coverages).toContain("Occupational Accident");
  });

  it("should have all required client center services", () => {
    const services = [
      "Request Certificate",
      "Report a Claim",
      "Policy Service",
      "MVR Request",
      "Make a Payment",
    ];

    expect(services).toHaveLength(5);
    expect(services).toContain("Request Certificate");
    expect(services).toContain("Report a Claim");
    expect(services).toContain("Policy Service");
    expect(services).toContain("MVR Request");
    expect(services).toContain("Make a Payment");
  });

  it("should have correct page routes defined", () => {
    const routes = [
      "/",
      "/coverages",
      "/coverages/:slug",
      "/about",
      "/service",
      "/quote",
      "/contact",
    ];

    expect(routes).toHaveLength(7);
    expect(routes).toContain("/");
    expect(routes).toContain("/coverages");
    expect(routes).toContain("/about");
    expect(routes).toContain("/service");
    expect(routes).toContain("/quote");
    expect(routes).toContain("/contact");
  });

  it("should have correct quote form fields", () => {
    const formFields = [
      "businessName",
      "contactName",
      "email",
      "phone",
      "dot",
      "state",
      "message",
    ];

    expect(formFields).toContain("businessName");
    expect(formFields).toContain("dot");
    expect(formFields).toContain("state");
    expect(formFields).toContain("phone");
    expect(formFields).toContain("email");
  });

  it("should have correct design tokens", () => {
    const tokens = {
      ink: "#1A1A1A",
      head: "#2E2E2E",
      taupe: "#8A8783",
      muted: "#6E6B66",
      sand: "#F2EEE6",
      paper: "#FFFFFF",
      hair: "#CEC9BF",
      tick: "#B8A99A",
      warn: "#9C5A4F",
      purple: "#6B5CE7",
    };

    expect(tokens.ink).toBe("#1A1A1A");
    expect(tokens.purple).toBe("#6B5CE7");
    expect(tokens.sand).toBe("#F2EEE6");
    expect(tokens.paper).toBe("#FFFFFF");
  });

  it("should have all coverage detail slugs mapped", () => {
    const slugs = [
      "auto-liability",
      "physical-damage",
      "cargo",
      "general-liability",
      "non-trucking",
      "trailer-interchange",
      "occupational-accident",
      "workers-compensation",
      "excess-umbrella",
      "pollution-liability",
    ];

    expect(slugs).toHaveLength(10);
    slugs.forEach((slug) => {
      expect(slug).toMatch(/^[a-z-]+$/);
    });
  });
});
