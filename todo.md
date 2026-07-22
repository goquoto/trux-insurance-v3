# Trux Insurance Portal — Rebuild TODO

## Phase 1: Database Schema
- [x] Add `title` column to users table (company/business name for customers)
- [x] Create `submissions` table (id, ref, type, userId, customerEmail, takenByUserId, workStatus, data JSON, createdAt)
- [x] Create `submission_files` table (id, submissionId, s3Key, fileName, size, mime)
- [x] Create `vin_cache` table (vin PK, decodedJson JSON, status, createdAt)
- [x] Generate and apply migrations

## Phase 2: VIN Verification System
- [x] VIN validator: normalize, reject I/O/Q, length check, ISO 3779 check digit
- [x] VIN decoder tRPC procedure: NHTSA vPIC single + batch decode
- [x] VIN cache: store decoded results in vin_cache table
- [ ] VIN UI component: monospaced input, 17-cell strip with colored borders, verify button
- [ ] VIN result card: Year/Make/Model title, adaptive grid of decoded fields
- [ ] VIN suggestions: "Did you mean?" flow with swap + re-verify
- [ ] Trailer detection: tag row as Trailer, hide Primary Use/Annual Miles
- [x] Unit tests for VIN validator (check digit, I/O/Q rejection, test VINs)

## Phase 3: Policy Change Wizard (3-step)
- [ ] Step 1: Date picker (min today), Service Type multi-select cards, Insured info, Business Name, Email
- [ ] Step 2 — Drivers section: repeatable rows, Action dropdown (Add/Update/Delete), conditional fields
- [ ] Step 2 — Vehicles & Trailers section: repeatable rows, VIN verification mandatory, trailer detection
- [ ] Step 2 — Addresses section: Mailing/Physical/Garaging checkboxes with address forms
- [ ] Step 2 — Lien Holders section: Vehicle and/or Business/Property with full address fields
- [ ] Step 2 — Certificate of Insurance section: email, holder info, checkboxes
- [ ] Step 2 — Coverage Change / General Request section: textarea + upload
- [ ] Step 3: Grouped summary, disclaimer, I Agree checkbox, signature + date, Turnstile, submit
- [ ] MCS-90 Termination Letter memo on Delete action
- [ ] Progress bar component (3 steps)

## Phase 4: Other Service Forms
- [ ] Request Certificate: date needed, business info, repeatable Certificate Holder blocks
- [ ] Submit a Claim: claim type, conditional Auto/Workers Comp/Property blocks
- [ ] Account Review: current client, contact info, agent dropdown, SMS consent, comparison table

## Phase 5: Billing & Payments
- [x] Payment Options cards (4 payment method cards: Pay Online, Phone, Mail, Premium Finance)
- [x] Warning notice / help section about contacting office
- [x] 58-carrier searchable/filterable directory table with phone, portal links, pay-online badge

## Phase 6: Submissions Inbox
- [x] List all submissions with search (ref/customer/content)
- [x] Type filter and work-status filter
- [x] Expandable full detail view (all label/value pairs from JSON data)
- [x] Per-row status select (new/in_progress/done) persisted to DB
- [x] Show customer email and agent attribution
- [ ] S3 download links for attachments (pending file upload integration)

## Phase 7: Agent Intake Mode
- [x] "Agent intake" bar component on service forms when staff/admin opens them
- [x] Customer picker with search to prefill form
- [x] Record takenByUserId on submission
- [ ] Confirmation email goes to selected customer (Phase 8)
- [ ] Hub Dashboard: role-differentiated stats (admin vs staff) (Future)
- [ ] Quick links to Submissions Inbox, Intake, Service Center

## Phase 8: Universal Form Behavior
- [ ] Ref number generation (TRX-YYMMDD-XXXX)
- [ ] File upload component (jpg/png/gif/pdf/doc/docx, max 20MB, max 10 files, S3)
- [ ] Confirmation email to customer via Resend (with ref, submission echo, disclaimer)
- [ ] Agency notification email to service@truxins.com
- [ ] JotForm push for each submission type
- [ ] Success screen with serif ref number + no-binding reminder
- [ ] Disclaimer on every form

## Phase 9: Integrations & Polish
- [ ] Cloudflare Turnstile on all public/customer forms
- [ ] Self-host Lora + Poppins fonts (woff2)
- [ ] FMCSA USDOT lookup (QCMobile API) for Fast/Full Quote
- [ ] JotForm inbound webhook (/api/jotform/webhook) to upsert submissions
- [ ] Approval email via Resend when admin approves a user
- [ ] Dark mode tokens match spec exactly
- [ ] All tests passing
