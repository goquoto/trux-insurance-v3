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

// Field mapping configuration
// Update these when you create your actual Jotform forms
const FORM_TYPE_MAP: Record<string, "quote" | "fast-quote" | "contact"> = {
  // Replace these placeholder IDs with your actual Jotform form IDs
  "QUOTE_FORM_ID": "quote",
  "FAST_QUOTE_FORM_ID": "fast-quote",
  "CONTACT_FORM_ID": "contact",
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
  // These field names should match your Jotform form field names
  const quoteData = {
    businessName: extractField(fields, ["businessName", "company_name", "business_name", "company"]) || "Via Jotform",
    contactName: extractField(fields, ["contactName", "full_name", "name", "contact_name"]) || "",
    email: extractField(fields, ["email", "email_address"]) || "",
    phone: extractField(fields, ["phone", "phone_number", "telephone"]) || "",
    dotNumber: extractField(fields, ["dotNumber", "dot_number", "usdot", "dot"]) || "",
    state: extractField(fields, ["state", "operating_state"]) || "",
    notes: extractField(fields, ["notes", "message", "comments", "additional_info"]) || `Jotform submission #${submissionId} (${formType})`,
    // Default values for required fields
    numTrucks: extractField(fields, ["numTrucks", "num_trucks", "fleet_size"]) || "1",
    numDrivers: extractField(fields, ["numDrivers", "num_drivers"]) || "1",
    yearsInBusiness: extractField(fields, ["yearsInBusiness", "years_in_business"]) || "",
    currentCarrier: extractField(fields, ["currentCarrier", "current_carrier"]) || "",
    coveragesNeeded: extractField(fields, ["coveragesNeeded", "coverages_needed", "coverage_types"]) || "",
    vehicleTypes: extractField(fields, ["vehicleTypes", "vehicle_types"]) || "",
    operationRadius: extractField(fields, ["operationRadius", "operation_radius"]) || "",
    commodities: extractField(fields, ["commodities", "cargo_types"]) || "",
    status: "new" as const,
  };

  try {
    const quote = await createQuote(quoteData as any);
    
    // Send email notification
    await sendQuoteNotification({
      businessName: quoteData.businessName,
      contactName: quoteData.contactName,
      email: quoteData.email,
      phone: quoteData.phone,
      dotNumber: quoteData.dotNumber,
      state: quoteData.state,
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
  const contactData = {
    name: extractField(fields, ["name", "full_name", "contact_name"]) || "",
    email: extractField(fields, ["email", "email_address"]) || "",
    phone: extractField(fields, ["phone", "phone_number"]) || "",
    subject: extractField(fields, ["subject", "topic", "reason"]) || "Jotform Contact Submission",
    message: extractField(fields, ["message", "comments", "body", "details"]) || "",
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
