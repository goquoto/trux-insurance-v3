import { Express, Request, Response } from "express";
import { getDb, createQuote } from "./db";
import { sendQuoteNotification, sendContactNotification } from "./email";
import { notifyOwner } from "./_core/notification";

/**
 * Jotform Webhook Handler
 * 
 * Receives form submissions from Jotform via webhook.
 * Maps Jotform field data to our internal database schema.
 * 
 * Webhook URL: POST /api/webhooks/jotform
 * 
 * Jotform sends data as application/x-www-form-urlencoded with:
 * - rawRequest: JSON string of all form fields
 * - formID: The Jotform form ID
 * - submissionID: Unique submission ID
 * - formTitle: Title of the form
 * 
 * To configure in Jotform:
 * 1. Go to Form Settings → Integrations → Webhooks
 * 2. Add webhook URL: https://truxins.net/api/webhooks/jotform
 * 3. Select "Send all fields"
 */

interface JotformSubmission {
  rawRequest: string;
  formID: string;
  submissionID: string;
  formTitle: string;
  [key: string]: any;
}

// Field mapping configuration — live Jotform form IDs
const FORM_TYPE_MAP: Record<string, "quote" | "fast-quote" | "contact"> = {
  "261982064993066": "quote",
  "261982089328065": "fast-quote",
  "261981423817059": "contact",
};

export function registerJotformWebhook(app: Express) {
  app.post("/api/webhooks/jotform", async (req: Request, res: Response) => {
    try {
      const submission = req.body as JotformSubmission;
      
      // Parse the raw request data
      let fields: Record<string, any> = {};
      try {
        if (submission.rawRequest) {
          fields = JSON.parse(submission.rawRequest);
        }
      } catch {
        // If rawRequest isn't valid JSON, use the body directly
        fields = submission;
      }

      const formId = submission.formID || "unknown";
      const formTitle = submission.formTitle || "Unknown Form";
      const submissionId = submission.submissionID || "unknown";

      console.log(`[Jotform Webhook] Received submission ${submissionId} from form "${formTitle}" (${formId})`);

      // Determine form type based on form ID or title
      let formType: "quote" | "fast-quote" | "contact" = "contact";
      
      if (FORM_TYPE_MAP[formId]) {
        formType = FORM_TYPE_MAP[formId];
      } else if (formTitle.toLowerCase().includes("quote")) {
        formType = formTitle.toLowerCase().includes("fast") ? "fast-quote" : "quote";
      } else if (formTitle.toLowerCase().includes("contact")) {
        formType = "contact";
      }

      // Process based on form type
      switch (formType) {
        case "quote":
        case "fast-quote":
          await handleQuoteSubmission(fields, formType, submissionId);
          break;
        case "contact":
          await handleContactSubmission(fields, submissionId);
          break;
      }

      // Notify owner
      await notifyOwner({
        title: `New ${formType} submission via Jotform`,
        content: `Form: ${formTitle}\nSubmission ID: ${submissionId}\nFields: ${JSON.stringify(fields, null, 2).slice(0, 500)}`,
      });

      res.status(200).json({ success: true, submissionId });
    } catch (error) {
      console.error("[Jotform Webhook] Error processing submission:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  // Health check endpoint for Jotform webhook verification
  app.get("/api/webhooks/jotform", (_req: Request, res: Response) => {
    res.status(200).json({ status: "ok", service: "jotform-webhook" });
  });
}

/**
 * Handle quote/fast-quote form submissions
 * Maps Jotform fields to our quote schema
 */
async function handleQuoteSubmission(
  fields: Record<string, any>,
  formType: string,
  submissionId: string
) {
  // Map Jotform fields to our schema
  // Field names match the Jotform form field labels
  // Fast Quote fields: First Name, Last Name, Email, Phone, Company Name, DOT Number, State, Notes, File
  // Full Quote Page 1: Full Name, Company Name, Email, Phone, DOT/MC Number, Primary State, # Power Units, Vehicle Type
  // Full Quote Page 2: FMCSA Authority Type, EIN, Years in Business, Target Effective Date, Est. Annual Mileage,
  //   Radius of Operation, Est. Annual Revenue, Primary Commodities, Avg/Max Load Value, Coverages Needed, Desired Limits, Deductible
  // Full Quote Page 3: Equipment Details, Driver Details, document upload
  const firstName = extractField(fields, ["firstName", "first_name", "First Name"]);
  const lastName = extractField(fields, ["lastName", "last_name", "Last Name"]);
  const fullName = extractField(fields, ["fullName", "full_name", "Full Name", "name", "Name"]);
  const contactName = fullName || (firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName || "");

  // Extract all fields from the submission
  const email = extractField(fields, ["email", "Email", "email_address"]) || "";
  const phone = extractField(fields, ["phone", "Phone", "phone_number", "telephone"]) || "";
  const dotNumber = extractField(fields, ["dotNumber", "dot_number", "DOT Number", "DOT/MC Number", "usdot", "dot"]) || "";
  const mcNumber = extractField(fields, ["mcNumber", "mc_number", "MC Number"]) || "";
  const state = extractField(fields, ["state", "State", "Primary State", "primaryState", "operating_state"]) || "";
  const ein = extractField(fields, ["ein", "EIN"]) || "";
  const effectiveDateStr = extractField(fields, ["effectiveDate", "Target Effective Date", "effective_date"]) || "";
  const yearsInBusiness = extractField(fields, ["yearsInBusiness", "Years in Business", "years_in_business"]) || "";
  const coveragesNeeded = extractField(fields, ["coveragesNeeded", "Coverages Needed", "coverages_needed", "coverage_types"]) || "";
  const vehicleType = extractField(fields, ["vehicleType", "Vehicle Type", "vehicleTypes", "vehicle_types"]) || "";
  const operationRadius = extractField(fields, ["operationRadius", "Radius of Operation", "operation_radius"]) || "";
  const commoditiesStr = extractField(fields, ["commodities", "Primary Commodities", "cargo_types"]) || "";
  const numTrucks = extractField(fields, ["powerUnits", "# Power Units", "numTrucks", "num_trucks", "fleet_size"]) || "1";
  const authorityType = extractField(fields, ["authorityType", "FMCSA Authority Type", "authority_type"]) || "";
  const annualMileage = extractField(fields, ["annualMileage", "Est. Annual Mileage", "annual_mileage"]) || "";
  const annualRevenue = extractField(fields, ["annualRevenue", "Est. Annual Revenue", "annual_revenue"]) || "";
  const avgLoadValue = extractField(fields, ["avgLoadValue", "Avg/Max Load Value", "avg_load_value"]) || "";
  const desiredLimits = extractField(fields, ["desiredLimits", "Desired Limits", "desired_limits"]) || "";
  const deductible = extractField(fields, ["deductible", "Deductible"]) || "";
  const equipmentDetails = extractField(fields, ["equipmentDetails", "Equipment Details", "equipment"]) || "";
  const driverDetails = extractField(fields, ["driverDetails", "Driver Details", "drivers"]) || "";
  const userNotes = extractField(fields, ["notes", "Notes", "message", "comments", "additional_info"]) || "";

  // Build a comprehensive notes field with all extra info
  const notesParts = [`Jotform ${formType} submission #${submissionId}`];
  if (userNotes) notesParts.push(`Notes: ${userNotes}`);
  if (authorityType) notesParts.push(`Authority Type: ${authorityType}`);
  if (annualMileage) notesParts.push(`Annual Mileage: ${annualMileage}`);
  if (annualRevenue) notesParts.push(`Annual Revenue: ${annualRevenue}`);
  if (avgLoadValue) notesParts.push(`Avg/Max Load Value: ${avgLoadValue}`);
  if (desiredLimits) notesParts.push(`Desired Limits: ${desiredLimits}`);
  if (deductible) notesParts.push(`Deductible: ${deductible}`);
  if (operationRadius) notesParts.push(`Radius of Operation: ${operationRadius}`);
  if (vehicleType) notesParts.push(`Vehicle Type: ${vehicleType}`);
  if (numTrucks) notesParts.push(`Power Units: ${numTrucks}`);
  if (equipmentDetails) notesParts.push(`Equipment: ${equipmentDetails}`);
  if (driverDetails) notesParts.push(`Drivers: ${driverDetails}`);

  // Map to the actual database schema columns
  const quoteData = {
    businessName: extractField(fields, ["companyName", "company_name", "Company Name", "businessName", "business_name", "company"]) || "Via Jotform",
    contactFirstName: firstName || contactName.split(" ")[0] || "Jotform",
    contactLastName: lastName || contactName.split(" ").slice(1).join(" ") || "Submission",
    contactEmail: email,
    contactPhone: phone,
    dotNumber: dotNumber || undefined,
    mcNumber: mcNumber || undefined,
    ein: ein || undefined,
    policyState: state || "IL",
    effectiveDate: effectiveDateStr ? new Date(effectiveDateStr) : new Date(),
    currentlyInsured: 0,
    hasDba: 0,
    businessStructure: "Other",
    yearEstablished: yearsInBusiness ? new Date().getFullYear() - parseInt(yearsInBusiness) : new Date().getFullYear(),
    mailingAddress: "",
    mailingCity: "",
    mailingState: state || "",
    mailingZip: "",
    sameAsMailingAddress: 1,
    allVehiclesSameLocation: 1,
    selectedCoverages: coveragesNeeded ? coveragesNeeded.split(",").map((c: string) => c.trim()) : [],
    trucks: [],
    trailers: [],
    drivers: [],
    commodities: commoditiesStr ? commoditiesStr.split(",").map((c: string) => c.trim()) : [],
    status: "pending" as const,
    notes: notesParts.join("\n"),
  };

  try {
    const quote = await createQuote(quoteData as any);
    
    // Send email notification
    await sendQuoteNotification({
      businessName: quoteData.businessName,
      contactName: contactName || `${quoteData.contactFirstName} ${quoteData.contactLastName}`,
      email: quoteData.contactEmail,
      phone: quoteData.contactPhone,
      dotNumber: quoteData.dotNumber || "",
      state: quoteData.policyState,
      notes: quoteData.notes,
      submittedAt: new Date().toISOString(),
    });

    console.log(`[Jotform Webhook] Quote created: ${quote?.id || "unknown"}`);
  } catch (err) {
    console.error("[Jotform Webhook] Failed to create quote:", err);
  }
}

/**
 * Handle contact form submissions
 */
async function handleContactSubmission(
  fields: Record<string, any>,
  submissionId: string
) {
  // Contact form fields: Name, Email, Phone, Message
  const contactData = {
    name: extractField(fields, ["name", "Name", "full_name", "contact_name", "Full Name"]) || "",
    email: extractField(fields, ["email", "Email", "email_address"]) || "",
    phone: extractField(fields, ["phone", "Phone", "phone_number", "telephone"]) || "",
    subject: extractField(fields, ["subject", "Subject", "topic", "reason"]) || "Jotform Contact Submission",
    message: extractField(fields, ["message", "Message", "comments", "body", "details"]) || "",
  };

  try {
    await sendContactNotification({ ...contactData, submittedAt: new Date().toISOString() });
    console.log(`[Jotform Webhook] Contact notification sent for submission ${submissionId}`);
  } catch (err) {
    console.error("[Jotform Webhook] Failed to send contact notification:", err);
  }
}

/**
 * Extract a field value from the submission data
 * Tries multiple possible field names (Jotform field names can vary)
 */
function extractField(fields: Record<string, any>, possibleNames: string[]): string {
  for (const name of possibleNames) {
    // Check direct match
    if (fields[name] !== undefined && fields[name] !== "") {
      const val = fields[name];
      // Jotform sometimes sends objects for name fields (first, last)
      if (typeof val === "object" && val !== null) {
        if (val.first && val.last) return `${val.first} ${val.last}`;
        if (val.answer) return val.answer;
        return JSON.stringify(val);
      }
      return String(val);
    }
    // Check case-insensitive
    const lowerName = name.toLowerCase();
    for (const key of Object.keys(fields)) {
      if (key.toLowerCase() === lowerName || key.toLowerCase().replace(/[_\s]/g, "") === lowerName.replace(/[_\s]/g, "")) {
        const val = fields[key];
        if (val !== undefined && val !== "") {
          if (typeof val === "object" && val !== null) {
            if (val.first && val.last) return `${val.first} ${val.last}`;
            if (val.answer) return val.answer;
            return JSON.stringify(val);
          }
          return String(val);
        }
      }
    }
  }
  return "";
}
