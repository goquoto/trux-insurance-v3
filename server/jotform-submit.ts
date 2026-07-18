/**
 * JotForm Submission Service
 * 
 * Pushes native form submissions to JotForm via their API so data appears
 * in the JotForm dashboard, exports, and triggers JotForm notification emails.
 * 
 * API Key is stored server-side only (JOTFORM_API_KEY env var).
 * File uploads are stored on our side and URLs passed as text.
 */

const JOTFORM_API_BASE = "https://api.jotform.com";

// Form IDs
export const JOTFORM_FORM_IDS = {
  contact: "261981423817059",
  fastQuote: "261982089328065",
  quote: "261982064993066",
} as const;

function getApiKey(): string {
  const key = process.env.JOTFORM_API_KEY;
  if (!key) {
    throw new Error("[JotForm] JOTFORM_API_KEY not configured");
  }
  return key;
}

/**
 * Submit data to a JotForm form via the API.
 * Uses PUT /form/{formId}/submissions with submission[QID]=value format.
 */
async function submitToJotform(
  formId: string,
  submissionData: Record<string, string>
): Promise<{ success: boolean; submissionId?: string; error?: string }> {
  const apiKey = getApiKey();

  // Build form-urlencoded body with submission[QID]=value pairs
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(submissionData)) {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, value);
    }
  }

  try {
    const res = await fetch(
      `${JOTFORM_API_BASE}/form/${formId}/submissions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "APIKEY": apiKey,
        },
        body: params.toString(),
      }
    );

    const data = await res.json();

    if (data.responseCode === 200) {
      console.log(`[JotForm] Submission created for form ${formId}: ${data.content?.submissionID}`);
      return { success: true, submissionId: data.content?.submissionID };
    } else {
      console.error(`[JotForm] API error for form ${formId}:`, data);
      return { success: false, error: data.message || "Unknown error" };
    }
  } catch (error) {
    console.error(`[JotForm] Network error submitting to form ${formId}:`, error);
    return { success: false, error: String(error) };
  }
}

// ─── Contact Form ──────────────────────────────────────────────────────────────
// QID 2: Name (textbox), QID 3: Email, QID 4: Phone (masked), QID 5: Message (textarea)

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export async function submitContactToJotform(data: ContactFormData) {
  const submissionData: Record<string, string> = {
    "submission[2]": data.name,
    "submission[3]": data.email,
    "submission[4_full]": data.phone || "",
    "submission[5]": data.message,
  };

  return submitToJotform(JOTFORM_FORM_IDS.contact, submissionData);
}

// ─── Fast Quote Form ───────────────────────────────────────────────────────────
// QID 2: First Name, QID 3: Last Name, QID 4: Email, QID 5: Phone,
// QID 6: Company Name, QID 7: DOT Number, QID 8: State, QID 9: Notes,
// QID 10: Upload documents (file - pass URL as text)

export interface FastQuoteFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  companyName: string;
  dotNumber?: string;
  state?: string;
  notes?: string;
  fileUrl?: string; // URL to uploaded file (stored on our side)
}

export async function submitFastQuoteToJotform(data: FastQuoteFormData) {
  const submissionData: Record<string, string> = {
    "submission[2]": data.firstName,
    "submission[3]": data.lastName,
    "submission[4]": data.email,
    "submission[5_full]": data.phone || "",
    "submission[6]": data.companyName,
    "submission[7]": data.dotNumber || "",
    "submission[8]": data.state || "",
    "submission[9]": data.notes || "",
  };

  // File uploads can't be sent via API submission endpoint directly.
  // If we have a file URL, include it in the notes field.
  if (data.fileUrl) {
    submissionData["submission[9]"] = 
      (data.notes ? data.notes + "\n\n" : "") + `Uploaded file: ${data.fileUrl}`;
  }

  return submitToJotform(JOTFORM_FORM_IDS.fastQuote, submissionData);
}

// ─── Full Quote Form ───────────────────────────────────────────────────────────
// QID 3: Full Name (fullname: first, last), QID 4: Company Name, QID 5: Email,
// QID 6: Phone (masked), QID 7: DOT/MC Number, QID 8: Primary State,
// QID 9: # Power Units, QID 10: Vehicle Type, QID 12: FMCSA Authority Type,
// QID 13: EIN, QID 14: Years in Business, QID 15: Target Effective Date (month/day/year),
// QID 16: Est. Annual Mileage, QID 17: Radius of Operation (checkbox),
// QID 18: Est. Annual Revenue, QID 19: Primary Commodities, QID 20: Avg Load Value,
// QID 21: Max Load Value, QID 22: Coverages Needed (checkbox),
// QID 23: Desired Limits, QID 24: Deductible, QID 26: Equipment Details,
// QID 27: Driver Details, QID 28: Upload files (pass URL as text)

export interface FullQuoteFormData {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone?: string;
  dotMcNumber?: string;
  primaryState?: string;
  powerUnits?: string | number;
  vehicleType?: string;
  authorityType?: string;
  ein?: string;
  yearsInBusiness?: string | number;
  effectiveDate?: string; // ISO date or MM/DD/YYYY
  annualMileage?: string | number;
  radiusOfOperation?: string; // newline-separated for checkbox
  annualRevenue?: string;
  commodities?: string;
  avgLoadValue?: string;
  maxLoadValue?: string;
  coveragesNeeded?: string; // newline-separated for checkbox
  desiredLimits?: string;
  deductible?: string;
  equipmentDetails?: string;
  driverDetails?: string;
  fileUrl?: string;
}

export async function submitFullQuoteToJotform(data: FullQuoteFormData) {
  // Parse effective date into month/day/year
  let month = "", day = "", year = "";
  if (data.effectiveDate) {
    try {
      const d = new Date(data.effectiveDate);
      if (!isNaN(d.getTime())) {
        month = String(d.getMonth() + 1).padStart(2, "0");
        day = String(d.getDate()).padStart(2, "0");
        year = String(d.getFullYear());
      }
    } catch {}
  }

  const submissionData: Record<string, string> = {
    "submission[3_first]": data.firstName,
    "submission[3_last]": data.lastName,
    "submission[4]": data.companyName,
    "submission[5]": data.email,
    "submission[6_full]": data.phone || "",
    "submission[7]": data.dotMcNumber || "",
    "submission[8]": data.primaryState || "",
    "submission[9]": String(data.powerUnits || ""),
    "submission[10]": data.vehicleType || "",
    "submission[12]": data.authorityType || "",
    "submission[13]": data.ein || "",
    "submission[14]": String(data.yearsInBusiness || ""),
    "submission[15_month]": month,
    "submission[15_day]": day,
    "submission[15_year]": year,
    "submission[16]": String(data.annualMileage || ""),
    "submission[17]": data.radiusOfOperation || "",
    "submission[18]": data.annualRevenue || "",
    "submission[19]": data.commodities || "",
    "submission[20]": data.avgLoadValue || "",
    "submission[21]": data.maxLoadValue || "",
    "submission[22]": data.coveragesNeeded || "",
    "submission[23]": data.desiredLimits || "",
    "submission[24]": data.deductible || "",
    "submission[26]": data.equipmentDetails || "",
    "submission[27]": data.driverDetails || "",
  };

  // Include file URL in equipment/driver details if present
  if (data.fileUrl) {
    submissionData["submission[27]"] = 
      (data.driverDetails ? data.driverDetails + "\n\n" : "") + `Uploaded documents: ${data.fileUrl}`;
  }

  return submitToJotform(JOTFORM_FORM_IDS.quote, submissionData);
}
