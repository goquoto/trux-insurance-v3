export interface KBArticle {
  slug: string;
  title: string;
  categories: string[];
  status: "verified" | "draft";
  author: string;
  updatedAt: string;
  excerpt: string;
  body: string;
}

export const kbArticles: KBArticle[] = [
  {
    slug: "payment-options",
    title: "Payment Options",
    categories: ["Agency Standards", "Billing"],
    status: "verified",
    author: "Milen Milev",
    updatedAt: "2025-01-15",
    excerpt: "All accepted payment methods for Trux Insurance Services — mail, ACH, credit card, wire, and Zelle.",
    body: `## Payment Methods

### Mail (FedEx, UPS, USPS, etc.)
**Trux Insurance Services**
1 Tiffany Pointe #7-G2, Bloomingdale, IL 60108
Phone: 331-240-1101 · Fax: 331-240-1055

### ACH or Credit Card
Pay securely online at [https://truxins.com/pay](https://truxins.com/pay)

### Wire or Direct ACH
- **Payee:** Trux Insurance Services
- **Bank:** JP Morgan Chase Bank, N.A.
- **Routing/ABA #:** 071000013
- **Account #:** 915856905

### Zelle
Send to: **ap@truxins.com**

---

> **Important:** Coverage begins once the down payment is received; this condition cannot be waived. Please include your account or invoice number with all payments.`
  },
  {
    slug: "code-of-ethics",
    title: "Code of Ethics",
    categories: ["Agency Standards"],
    status: "draft",
    author: "Boryana Mileva",
    updatedAt: "2025-03-10",
    excerpt: "Client-best-interest principles, truthfulness with carriers, confidentiality, licensing/CE requirements, and escalation procedures.",
    body: `## Core Principles

### Client Best Interest
Every recommendation and action must prioritize the client's coverage needs and financial interests. Never recommend unnecessary coverage for commission purposes.

### Truthfulness with Carriers
All information submitted to carriers must be accurate and complete. Misrepresentation — even by omission — is grounds for immediate termination and may result in E&O claims.

### Confidentiality
Client personal and business information is strictly confidential. Share only what is necessary for underwriting, claims, or compliance purposes. Never discuss client details outside of business necessity.

### Licensing & Continuing Education
All licensed staff must maintain active licenses and complete CE requirements before deadlines. Track your renewal dates — the agency will not cover fines for lapsed licenses.

### Same-Day Documentation
If it isn't logged, it didn't happen. Document every client interaction, carrier communication, and policy change the same day it occurs.

### No Verbal Binding
Never verbally bind coverage. All binding must follow the written Binding Procedures SOP with proper carrier authorization.

## Escalation
- **HR & Compliance issues:** Boryana Mileva (boryana@truxins.com)
- **All other concerns:** Milen Milev (milen@truxins.com)`
  },
  {
    slug: "claim-intake",
    title: "Claim Intake Questions & Procedures",
    categories: ["Claims", "Scripts"],
    status: "draft",
    author: "Elena Dimitrova",
    updatedAt: "2025-02-20",
    excerpt: "Complete call-handling steps and intake question set for first notice of loss (FNOL) reporting.",
    body: `## Call Handling Steps

1. **Identify yourself** — "Thank you for calling Trux Insurance Services, this is [Name], how can I help you?"
2. **Confirm this is a claim** — Listen for keywords: accident, damage, theft, injury, loss
3. **Express empathy** — "I'm sorry to hear that. Let me get the details so we can get this reported right away."
4. **Gather information** — Use the intake questions below
5. **Set expectations** — Explain next steps and timeline
6. **Report to carrier** — Same-day, no exceptions

## Intake Questions

### Insured Information
- Insured name (as it appears on the policy)
- Policy number
- Contact phone and email for follow-up

### Loss Details
- Date and time of loss
- Location of loss (address, intersection, mile marker)
- Description of what happened (facts only — never interpret or assign fault)

### Vehicles & Drivers
- Unit(s) involved (year, make, model, VIN)
- Driver name, CDL number, and state
- Was the driver on duty? Within radius?

### Injuries & Authorities
- Any injuries? (Do not ask for medical details — just yes/no and how many)
- Police report filed? Report number?
- Fire department or EMS called?

### Other Parties
- Other vehicles/parties involved?
- Other party insurance information if available
- Witnesses?

### Cargo & Property
- Cargo damage? Type and estimated value?
- Property damage (buildings, fences, signs)?
- Photos taken? Dashcam footage?
- Tow location if applicable

## Critical Rules

> **Never promise coverage.** Say: "I'll get this reported to the carrier and they'll review the claim under your policy terms."

- Report to carrier **same day** — no exceptions
- Create a 48-hour follow-up task to confirm adjuster contact
- Log everything in AgencyZoom immediately after the call`
  },
  {
    slug: "change-request-pipeline",
    title: "Change Request Pipeline Overview",
    categories: ["Workflow", "Endorsements"],
    status: "draft",
    author: "Snezhina Georgieva",
    updatedAt: "2025-03-01",
    excerpt: "AgencyZoom pipeline stages for processing policy change requests — from intake through carrier endorsement to client notification.",
    body: `## Pipeline Stages (AgencyZoom)

### 1. New Request
Client submits change request (phone, email, or form). Create pipeline card immediately.

### 2. Submitted to Carrier
Request sent to carrier via portal or email. Log submission date/time and method.

### 3. Pending Carrier
Awaiting carrier processing. Follow up if no response within 5 business days.

### 4. Endorsement Received
Carrier issues endorsement. **Verify the endorsement matches the original request exactly** — check effective dates, coverages, limits, and premium.

### 5. Client Notified / Closed
Send endorsement confirmation to client. Update AMS. Close pipeline card.

## Standards

- **Same-day submission** for requests received before 3:00 PM CT
- Requests after 3:00 PM → submitted first thing next business day
- Document every step with timestamps

## Mandatory Client Disclaimer

> "A change request does not alter the policy until the carrier confirms and endorses it."

Include this disclaimer in every change request acknowledgment email to the client.`
  },
  {
    slug: "claims-pipeline-az",
    title: "Claims Pipeline in AgencyZoom",
    categories: ["Workflow", "Claims"],
    status: "draft",
    author: "Elena Dimitrova",
    updatedAt: "2025-02-25",
    excerpt: "Pipeline stages for tracking claims from FNOL through resolution in AgencyZoom.",
    body: `## Pipeline Stages

### 1. FNOL Received
First Notice of Loss documented. Intake questions completed. Card created.

### 2. Reported to Carrier
Claim reported to carrier (same day as FNOL). Log claim number assigned by carrier.

### 3. Adjuster Assigned
Carrier assigns adjuster. Log adjuster name, phone, and email. Notify insured of adjuster contact info.

### 4. In Progress
Claim is being investigated/processed. Monitor for movement.

**Escalation rule:** If no movement for 2+ weeks, escalate — call adjuster, document the call, and notify the insured of status.

### 5. Settled / Denied / Closed
Final resolution. Document outcome. If denied, explain reason to insured and document their acknowledgment.

## Card Naming Convention

\`Insured Name — Carrier — Claim #\`

Example: \`ABC Trucking — Progressive — CLM-2025-001234\`

## Why We Track Claims

1. **Client retention** — Proactive communication during claims builds trust
2. **Renewal underwriting** — Loss history directly impacts renewal terms and pricing
3. **E&O protection** — Documentation proves we acted in the client's interest`
  },
  {
    slug: "past-due-payments",
    title: "Past Due Payments in AgencyZoom",
    categories: ["Workflow", "Billing"],
    status: "draft",
    author: "Valeriya Karaivanova",
    updatedAt: "2025-03-05",
    excerpt: "Payment follow-up cadence, documentation requirements, and reinstatement tracking for past-due accounts.",
    body: `## Follow-Up Cadence

### Same Day — First Contact
When a past-due notice is received, contact the insured immediately. Phone call + email.

### 3 Days Before Cancellation
Second reminder. Emphasize the cancellation date and consequences (lapse in coverage, authority issues for trucking).

### Day Before Cancellation
Final call. Document the attempt regardless of whether you reach them.

### After Cancellation
If payment is received after cancellation, move to reinstatement track (see Processing Reinstatements SOP).

## Documentation Rules

> **Document every attempt.** If it isn't logged, it didn't happen. This is critical for E&O protection.

- Log date, time, method (phone/email/text), and outcome
- Note if you left a voicemail or got no answer
- Save copies of all written communications

## Important Warnings

- **Never confirm a cancellation is stopped** until the carrier confirms in writing
- **Verify Zelle/wire payments** with ap@truxins.com before telling the client it's received
- **Trucking accounts:** A lapse triggers filing issues — flag these for immediate priority`
  },
  {
    slug: "renewals-workflow",
    title: "Renewals Workflow",
    categories: ["Workflow", "New Business"],
    status: "draft",
    author: "Petya Vasilev",
    updatedAt: "2025-03-08",
    excerpt: "60/45/30/15-day renewal timeline with required actions at each milestone — from initial review through binding.",
    body: `## Renewal Timeline

### 60 Days Out — Initial Review
- Pull current policy details and loss history
- Check for any open claims or pending changes
- Note any rate increases or coverage changes from carrier

### 45 Days Out — Client Contact
- Reach out to client to discuss renewal
- Review current coverages and limits
- Ask about any changes to operations (new trucks, drivers, routes)
- If increase >10% or new losses → prepare alternative market proposals

### 30 Days Out — Decision Point
- Present renewal terms and any alternative quotes
- Get client decision on coverage/carrier
- Collect updated information if needed (driver list, unit schedule)

### 15 Days Out — Bind & Confirm
- Collect down payment (coverage cannot begin without it)
- Process binding per Binding Procedures SOP
- Confirm effective date
- Issue filings and COIs as needed

## Hard Rule

> No renewal should pass 30 days out without logged client contact. If you cannot reach the client, escalate to your manager.`
  },
  {
    slug: "add-delete-vehicle",
    title: "Adding or Deleting a Vehicle — Workflow",
    categories: ["Workflow", "Endorsements", "How Tos"],
    status: "draft",
    author: "Snezhina Georgieva",
    updatedAt: "2025-02-28",
    excerpt: "Required data, submission process, and verification steps for adding or removing vehicles from a commercial auto/trucking policy.",
    body: `## Required Data for Adding a Vehicle

- **Full 17-character VIN** (copy-paste only — never retype)
- **Year, Make, Model** (verify against VIN decode)
- **Stated/Actual Cash Value** for physical damage
- **Garaging address** (if different from policy address)
- **Lienholder information** (name, address, loan number)
- **Desired coverages** (liability only, or liability + physical damage)

## Process

1. Collect all required data from client (in writing)
2. Verify VIN decodes correctly (use NHTSA VIN decoder)
3. Submit via Change Request Pipeline
4. Once endorsement received — verify:
   - Correct VIN on endorsement
   - Correct coverages and limits
   - Correct effective date
   - Premium matches expectations
5. Issue updated ID cards
6. Notify lienholder if applicable
7. Update COIs if vehicle is listed on any certificates

## Stated Value Sanity Check

For physical damage coverage, verify the stated value is reasonable:
- Compare to NADA/KBB for the year/make/model
- If value seems too high or too low, discuss with client
- Document the client's stated value acknowledgment

## Deleting a Vehicle

- Get written confirmation from client
- Verify no open claims on the unit
- Submit deletion via Change Request Pipeline
- Confirm pro-rata return premium with client
- Cancel lienholder interest letter if applicable`
  },
  {
    slug: "garaging-mailing-address",
    title: "Change to Garaging or Mailing Address",
    categories: ["Workflow", "Endorsements"],
    status: "draft",
    author: "Snezhina Georgieva",
    updatedAt: "2025-02-15",
    excerpt: "Distinction between mailing and garaging addresses, re-rating implications, and downstream updates required.",
    body: `## Mailing vs. Garaging — Key Distinction

- **Mailing address:** Where correspondence is sent. Changing this usually does NOT affect premium.
- **Garaging address:** Where vehicles are primarily kept overnight. Changing this **may trigger re-rating** based on the new territory.

## Process

1. Confirm which address is changing (mailing, garaging, or both)
2. Get new address in writing from client
3. Submit via Change Request Pipeline
4. **If garaging address changes:**
   - Warn client about potential re-rating
   - For trucking: check if state filings need to be updated
   - Verify the new state is within carrier's appetite

## Downstream Updates

After endorsement is confirmed:
- Update all active COI holders with new address
- Notify lienholders of address change
- Update filings if state changed (trucking)
- Update AMS/system of record`
  },
  {
    slug: "reinstatements",
    title: "Processing Reinstatements",
    categories: ["Workflow", "Reinstatements"],
    status: "draft",
    author: "Valeriya Karaivanova",
    updatedAt: "2025-03-02",
    excerpt: "Steps for reinstating a cancelled policy — payment collection, no-loss statements, lapse considerations, and trucking-specific filing checks.",
    body: `## Before You Start

1. **Confirm cancellation facts** — Why was it cancelled? (non-payment, underwriting, insured request?)
2. **Check eligibility** — Not all carriers reinstate. Check carrier guidelines for reinstatement window.

## Reinstatement Steps

### 1. Collect Full Amount Due
- All past-due premium must be paid in full
- Down payment for next term if applicable
- Verify payment received (check with ap@truxins.com for wire/Zelle)

### 2. Signed No-Loss Statement
- Client must sign a statement confirming no losses occurred during the lapse period
- Use carrier-specific form if required

### 3. With or Without Lapse?
- **Without lapse:** Carrier backdates coverage — no gap. Preferred outcome.
- **With lapse:** Gap in coverage exists on record. May affect future underwriting.

### 4. Written Confirmation
> **Never tell the client they're reinstated until you have written confirmation from the carrier.**

## Trucking-Specific Considerations

If a trucking policy lapsed:
- Check SAFER for authority status
- Verify filings are still active
- If authority was revoked, reinstatement alone won't fix it — carrier must refile
- Flag for immediate priority — client cannot legally operate without active authority`
  },
  {
    slug: "voicemail-scripts",
    title: "Voicemail Scripts & Out-of-Office Email Scripts",
    categories: ["Scripts", "Emails"],
    status: "draft",
    author: "Nadya Bangova",
    updatedAt: "2025-01-20",
    excerpt: "Standard voicemail greetings, client callback scripts, and out-of-office email templates for the agency.",
    body: `## Personal Voicemail Greeting

"Hi, you've reached [Name] at Trux Insurance Services. I'm currently away from my desk or on another call. Please leave your name, phone number, and a brief message, and I'll return your call as soon as possible. For immediate assistance, please call our main line at 331-240-1101. Thank you."

## Client Callback Script

When leaving a voicemail for a client:

"Hi [Client Name], this is [Your Name] calling from Trux Insurance Services. I'm calling regarding [general topic — e.g., 'your upcoming renewal' or 'a question about your account']. Please give me a call back at [your direct line or 331-240-1101]. Thank you."

> **Never leave policy details, claim information, or payment amounts in a voicemail.** Keep it general.

## Out-of-Office Email Template

Subject: Out of Office — [Your Name]

"Thank you for your email. I am currently out of the office and will return on [date]. During my absence, I will have limited access to email.

For immediate assistance, please contact our office at 331-240-1101 or email info@truxins.com.

I will respond to your message upon my return.

Thank you,
[Name]
Trux Insurance Services
331-240-1101"

## Office Main Line
- Phone: 331-240-1101
- Fax: 331-240-1055
- Check voicemail 3× daily minimum
- Return all calls same business day`
  },
  {
    slug: "carrier-websites",
    title: "Carrier Websites",
    categories: ["Carriers", "Links"],
    status: "draft",
    author: "Silviya Borisova",
    updatedAt: "2025-02-10",
    excerpt: "Credential management rules and portal access guidelines for carrier websites — see the Carrier Directory for the full list.",
    body: `## Carrier Portal Access

For the complete list of carriers and their details, see the **Carrier Directory** in this hub.

## Credential Rules

### No Shared Logins
Every team member must have their own login credentials for each carrier portal. Never share login credentials with colleagues.

### Password Manager Required
All carrier portal passwords must be stored in the agency-approved password manager. Do not store passwords in browsers, sticky notes, spreadsheets, or email drafts.

### MFA Required
Enable multi-factor authentication on every carrier portal that supports it. This is mandatory, not optional.

### When Portals Are Down
If a carrier portal is unavailable:
1. Try again in 30 minutes
2. If still down, email the submission/request to your carrier contact
3. Include a timestamp in your email noting the portal was unavailable
4. Document the portal outage in your activity log

## New Carrier Setup
When you receive appointment with a new carrier:
1. Complete registration immediately (same day)
2. Store credentials in password manager
3. Enable MFA
4. Confirm access with your manager`
  },
  {
    slug: "coi-issuance",
    title: "Issuing Certificates of Insurance (COIs)",
    categories: ["COIs", "How Tos"],
    status: "draft",
    author: "Elena Dimitrova",
    updatedAt: "2025-02-18",
    excerpt: "Verification steps, holder naming rules, and logging requirements for issuing certificates of insurance.",
    body: `## Before Issuing a COI

### 1. Verify Policy is Active & Paid
Never issue a COI on a cancelled, expired, or past-due policy. Check payment status first.

### 2. Get Holder Information in Writing
- Exact legal name of certificate holder
- Full mailing address
- Any specific requirements (additional insured, waiver of subrogation, etc.)

### 3. Check for Required Endorsements
If the request includes:
- **Additional Insured** — Verify the AI endorsement actually exists on the policy
- **Waiver of Subrogation** — Verify the WOS endorsement exists
- **Primary & Non-Contributory** — Verify this language is endorsed

> **A COI cannot grant coverage that doesn't exist on the policy.** If the endorsement isn't there, it must be added first via the Change Request Pipeline.

## Issuing the COI

1. Generate in AMS/NowCerts
2. Verify all information is accurate
3. Send to requestor
4. Log the COI in the system (holder, date issued, what was shown)

## Important Reminder

> A Certificate of Insurance is **informational only**. It does not amend, extend, or alter the coverage afforded by the policy.`
  },
  {
    slug: "aor-processing",
    title: "Processing AOR (Agent of Record) Changes",
    categories: ["AORs", "How Tos"],
    status: "draft",
    author: "Petya Vasilev",
    updatedAt: "2025-03-12",
    excerpt: "Procedures for both incoming and outgoing Agent of Record changes — letterhead requirements, setup steps, and professional handling.",
    body: `## Incoming AOR (New Client Coming to Us)

### Requirements
- Signed AOR letter on the insured's letterhead (not ours)
- Letter must include: insured name, policy number, effective date of change, new agent information
- Some carriers have specific AOR forms — check carrier requirements

### Processing Steps
1. Submit AOR letter to carrier
2. Note the rescind window (usually 10-15 days — client can change their mind)
3. Once confirmed by carrier:
   - Full policy setup in AMS
   - Complete coverage review with client
   - Issue updated COIs if needed
   - Set up renewal reminder

## Outgoing AOR (Client Leaving Us)

### When Notified
1. Immediately notify the producer assigned to the account
2. Process professionally — never delay or obstruct
3. Log the reason for departure (for internal analysis)
4. Complete any pending work (open claims, pending endorsements)

### Professional Standards
- Never badmouth the new agent
- Never withhold information or delay processing
- Provide loss runs promptly when requested
- Wish the client well — they may come back`
  },
  {
    slug: "new-business-checklist",
    title: "New Business Submission Checklist (Trucking)",
    categories: ["New Business", "Commercial Resources"],
    status: "draft",
    author: "Petya Vasilev",
    updatedAt: "2025-03-15",
    excerpt: "Complete intake and submission requirements for new trucking/commercial auto accounts — from SAFER verification to underwriter submission.",
    body: `## Required Before Submission

### Basic Information
- [ ] Completed intake form (all sections)
- [ ] SAFER-verified DOT# and MC# (print the SAFER snapshot)
- [ ] Business entity verification (SOS lookup)
- [ ] Tax ID / EIN confirmed

### Equipment
- [ ] Complete unit schedule with:
  - Full 17-character VINs (copy-paste, never retype)
  - Year, make, model for each unit
  - Stated values for physical damage
  - Garaging addresses
- [ ] Trailer schedule (if applicable)

### Drivers
- [ ] Complete driver list with:
  - Full legal names and DOB
  - CDL numbers and states
  - Years of CDL experience
  - MVR consent forms signed
- [ ] MVRs pulled and reviewed

### Operations
- [ ] Commodities hauled (with percentages)
- [ ] Operating radius
- [ ] IFTA mileage breakdown by state (if available)
- [ ] Number of years in business

### History
- [ ] 3-5 year loss runs from prior carrier(s)
- [ ] Prior insurance declarations pages
- [ ] Any prior cancellations or non-renewals explained

### Coverages & Limits
- [ ] Desired coverages identified
- [ ] Limits discussed and documented
- [ ] Deductible preferences noted

## Submission to Underwriter
- Submit within 48 hours of receiving complete information
- Include a brief narrative: what the client does, how long, clean/dirty history
- Flag any concerns upfront (new venture, losses, violations)`
  },
  {
    slug: "company-guidelines",
    title: "Company Guidelines",
    categories: ["Agency Standards"],
    status: "draft",
    author: "Milen Milev",
    updatedAt: "2025-01-10",
    excerpt: "Core operational expectations — hours, communication standards, documentation rules, and professional conduct requirements.",
    body: `## Office Hours
Monday through Friday, 9:00 AM – 5:00 PM Central Time

## Communication Standards

### Response Times
- **Phone calls:** Return same business day
- **Emails:** Respond within 1 business day
- **Urgent matters (claims, cancellations):** Immediate priority

### Documentation Rule
> **If it isn't logged, it didn't happen.**

Document every client interaction, carrier communication, and policy action the same day it occurs. This protects you, the client, and the agency.

### Email
- Use @truxins.com email only for all business communications
- Never use personal email for agency business
- Follow the Client Email Standards SOP for formatting

## Professional Conduct
- Represent the agency professionally in all interactions
- Dress code: business casual (client meetings: business professional)
- Maintain a clean, organized workspace
- Remote team members: maintain calendar visibility for availability

## Calendar & Availability
- Keep your calendar updated with meetings, out-of-office, and focus time
- Respond to internal messages within 2 hours during business hours
- If you'll be unavailable, set up OOO and notify your team`
  },
  {
    slug: "quality-standards",
    title: "Quality Standards",
    categories: ["Agency Standards"],
    status: "draft",
    author: "Milen Milev",
    updatedAt: "2025-01-12",
    excerpt: "Turnaround time commitments, accuracy requirements, and peer review protocols for all agency work.",
    body: `## Turnaround Time Standards

| Task | Standard |
|---|---|
| Certificate of Insurance (COI) | Same day, within 2 hours |
| Change requests | Same day (before 3 PM CT) |
| Claims (FNOL reporting) | Same day |
| Trucking submission to underwriter | Within 48 hours of complete info |
| Client callbacks | Same business day |
| Email responses | Within 1 business day |
| Renewal outreach | 60 days before expiration |

## Accuracy Standards

### VINs — Copy, Never Retype
Always copy-paste VINs from source documents. Manual transcription errors cause coverage gaps and claims denials.

### Endorsement Verification
When an endorsement is received, verify it matches the original request:
- Correct effective date
- Correct coverages/limits
- Correct vehicles/drivers
- Premium is reasonable

### Peer Review Requirements
The following require a second set of eyes before processing:
- New business binds
- Finance agreements
- Any transaction over $10,000 in premium
- Reinstatements after lapse`
  },
  {
    slug: "data-security",
    title: "Data Security Practices",
    categories: ["Agency Standards"],
    status: "draft",
    author: "Boryana Mileva",
    updatedAt: "2025-02-01",
    excerpt: "Password management, PII handling, device security, and breach reporting requirements for all team members.",
    body: `## Password & Access Security

### Requirements
- **Unique passwords** for every system — never reuse
- **Password manager** — mandatory for all agency credentials
- **Multi-factor authentication (MFA)** — enable on every system that supports it
- **Never share credentials** — each person has their own login

## Handling Sensitive Information (PII)

### Secure Transmission
- Never send SSNs, driver's license numbers, or financial info via unencrypted email
- Use secure portals or encrypted file sharing
- If a client sends sensitive info via email, save it to the secure system and delete the email

### Credit Card Numbers
> **Never store credit card numbers** — not in email, not in notes, not in AMS, nowhere.

Direct clients to the secure payment portal at truxins.com/pay.

## Device Security
- Lock your computer when stepping away (Win+L or Cmd+L)
- Enable full-disk encryption
- Keep operating system and software updated
- Never use public WiFi without VPN for agency work

## Phishing & Wire Fraud
- Verify any payment instruction changes by phone (call a known number, not one from the email)
- Never click suspicious links — when in doubt, ask
- Report suspicious emails to Milen immediately

## Departure Protocol
- Access revoked same day as departure
- Return all agency devices and materials
- Password manager access removed immediately

## Breach Reporting
> **If you suspect any security breach, report immediately to Milen Milev and Boryana Mileva.** Do not attempt to investigate or fix it yourself. Time is critical.`
  },
  {
    slug: "binding-procedures",
    title: "Binding Procedures",
    categories: ["Binding", "New Business"],
    status: "draft",
    author: "Petya Vasilev",
    updatedAt: "2025-03-18",
    excerpt: "Pre-bind checklist and at-bind steps — signed application, down payment verification, carrier authorization, and post-bind documentation.",
    body: `## Pre-Bind Checklist

Before binding any policy, ALL of the following must be completed:

- [ ] **Signed application** — Client has signed the application/proposal
- [ ] **Signed proposal** — If applicable, client has acknowledged terms
- [ ] **Verified down payment** — Payment received and confirmed (cannot be waived)
- [ ] **Finance agreement** — If premium financed, agreement is signed
- [ ] **Written carrier bind authorization** — Carrier has confirmed they will bind

> **The down payment requirement cannot be waived.** No exceptions. Coverage does not begin until payment is received.

## At-Bind Steps

Once all pre-bind items are confirmed:

1. **Issue binder** — Include exact date and time of binding
2. **Process filings** — For trucking: BMC-91, BMC-34, state filings as required
3. **Issue ID cards** — Send to insured immediately
4. **Issue COIs** — If certificate holders are already identified
5. **AMS setup** — Complete policy setup in system of record
6. **Welcome communication** — Send client their policy documents and payment schedule

## Documentation
- Save all signed documents
- Log the bind date/time
- Note the carrier representative who authorized the bind
- Set up renewal reminder (60 days before expiration)`
  },
  {
    slug: "email-standards",
    title: "Client Email Standards & Templates",
    categories: ["Emails", "Scripts"],
    status: "draft",
    author: "Nadya Bangova",
    updatedAt: "2025-02-05",
    excerpt: "Subject line conventions, formatting rules, standard signature, and templates for common client communications.",
    body: `## Subject Line Convention

**Format:** \`Business Name — Topic\`

Examples:
- "ABC Trucking — Renewal Quote Options"
- "Smith Transport — Vehicle Addition Confirmation"
- "Jones Logistics — Claim #12345 Update"

## Email Rules

### One Topic Per Email
Each email should address one subject only. If you need to discuss multiple items, send separate emails. This makes it easier to track and reference later.

### Same-Day Written Confirmation
Any verbal agreement or instruction from a client must be confirmed in writing the same day:
- "Per our conversation today, you've requested..."
- "This email confirms that..."

### Standard Signature

\`\`\`
[Your Name]
[Your Title]
Trux Insurance Services
331-240-1101
[your email]@truxins.com
\`\`\`

## Templates

### Payment Reminder
Subject: [Business Name] — Payment Reminder

"Hi [Name],

This is a friendly reminder that your payment of [amount] is due by [date]. You can pay online at truxins.com/pay or by any of the methods listed on your invoice.

Please don't hesitate to reach out if you have any questions.

Thank you,
[Signature]"

### Endorsement Confirmation
Subject: [Business Name] — [Change Type] Confirmed

"Hi [Name],

This email confirms that your [change type] has been processed and is effective [date]. Please find the updated [documents] attached.

If anything looks incorrect, please let us know right away.

Thank you,
[Signature]"`
  },
];

// Derive all categories
export function getAllCategories(): string[] {
  const set = new Set<string>();
  kbArticles.forEach(a => a.categories.forEach(c => set.add(c)));
  return Array.from(set).sort();
}
