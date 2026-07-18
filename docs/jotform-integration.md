# Jotform Integration Guide

## Overview

Trux Insurance uses Jotform to power its web forms (Quote, Fast Quote, Contact). This integration provides:

- **Embedded forms** via Jotform's JavaScript embed method (auto-resizing, responsive)
- **Dual data flow** — submissions are captured in Jotform AND pushed to our database via webhook
- **Inline success messages** — no page reload after submission
- **Meta Pixel hook point** — ready to fire conversion events (uncomment when pixel ID is available)
- **Fallback** — native forms remain in the codebase; toggle `USE_JOTFORM = false` to revert

---

## Architecture

```
User submits form → Jotform captures submission
                  → Jotform fires webhook → POST /api/webhooks/jotform
                  → Webhook handler maps fields → Creates quote/contact in database
                  → Sends email notification via Resend
                  → Notifies owner via Manus notification
```

---

## Setup Steps

### 1. Create Your Jotform Forms

1. Go to [jotform.com](https://www.jotform.com) and create three forms:
   - **Full Quote Form** — mirrors the 3-step quote (name, company, DOT, state, coverages, etc.)
   - **Fast Quote Form** — simplified (name, email, phone, company, DOT, state, notes)
   - **Contact Form** — basic (name, email, phone, message)

2. Note the form IDs from each form's URL: `jotform.com/build/FORM_ID`

### 2. Update Form IDs in Code

Replace the placeholder IDs in these files:

| File | Constant | Purpose |
|------|----------|---------|
| `client/src/pages/Quote.tsx` | `JOTFORM_QUOTE_FORM_ID` | Full quote form |
| `client/src/pages/QuickQuote.tsx` | `JOTFORM_FAST_QUOTE_FORM_ID` | Fast quote form |
| `client/src/pages/Contact.tsx` | `JOTFORM_CONTACT_FORM_ID` | Contact form |

### 3. Configure Webhooks in Jotform

For each form in Jotform:

1. Go to **Form Settings → Integrations → Webhooks**
2. Add webhook URL: `https://truxins.net/api/webhooks/jotform`
3. Select **"Send all fields"**
4. Save

### 4. Field Mapping

The webhook handler (`server/jotform-webhook.ts`) automatically maps common field names. When creating your Jotform forms, use these field names for best compatibility:

**Quote Form Fields:**
| Jotform Field Name | Maps To |
|---|---|
| `businessName` or `company_name` | Business Name |
| `contactName` or `full_name` | Contact Name |
| `email` | Email |
| `phone` | Phone |
| `dotNumber` or `dot_number` | DOT Number |
| `state` | State |
| `notes` or `message` | Notes |
| `numTrucks` or `fleet_size` | Number of Trucks |
| `coveragesNeeded` | Coverages |

**Contact Form Fields:**
| Jotform Field Name | Maps To |
|---|---|
| `name` or `full_name` | Name |
| `email` | Email |
| `phone` | Phone |
| `message` or `comments` | Message |

### 5. Styling Your Jotform Forms

To match the Trux design system, apply these settings in the Jotform form designer:

- **Font:** Poppins (available in Jotform's font picker)
- **Colors:** Background `#FFFFFF`, Labels `#1A1A1A`, Borders `#CEC9BF`
- **Border radius:** 0px (square corners)
- **Button:** Background `#1A1A1A`, Text `#FFFFFF`, no border radius

### 6. Enable CAPTCHA

In each form's settings:
1. Go to **Form Settings → Show More Options → Form Protection**
2. Enable **reCAPTCHA** or **hCaptcha**

---

## Toggling Between Jotform and Native Forms

Each page has a `USE_JOTFORM` constant at the top:

```tsx
const USE_JOTFORM = true;  // Set to false to use native form
```

Set to `false` to instantly revert to the original built-in forms without any other code changes.

---

## Meta Pixel Integration

The `JotformEmbed` component has a hook point for Meta Pixel. When you have your Pixel ID:

1. Add the Meta Pixel base code to `client/index.html`
2. Uncomment the `fbq` call in `client/src/components/JotformEmbed.tsx` (around line 75)

---

## Where Submissions Are Stored

- **Jotform Dashboard:** All submissions are viewable at jotform.com under each form
- **Trux Database:** Quotes are stored in the `quotes` table; contact submissions trigger email only
- **Email:** Both `info@truxins.com` and `milen@truxins.com` receive notifications

---

## Editing Forms

To edit a form's fields, layout, or logic:
1. Log in to [jotform.com](https://www.jotform.com)
2. Open the form in the Form Builder
3. Make changes and save — they appear live immediately (no code deploy needed)

---

## Troubleshooting

| Issue | Solution |
|---|---|
| Form not loading | Check that the form ID is correct and the form is published |
| Submissions not reaching database | Verify webhook URL is correct in Jotform settings |
| Webhook returning 500 | Check server logs: `tail -f .manus-logs/devserver.log` |
| Form too tall/short | Adjust `minHeight` prop on the `JotformEmbed` component |

---

## Data Compliance

- Jotform is **GDPR** and **CCPA** compliant
- Data is stored on Jotform's servers (US or EU depending on account settings)
- Webhook pushes data to your own database for redundancy
- Add consent checkbox in Jotform if required by your privacy policy

---

## Paid Plan Considerations

| Feature | Required Plan |
|---|---|
| 5 forms, 100 submissions/month | Free |
| 25 forms, 1,000 submissions/month | Bronze ($39/mo) |
| HIPAA compliance | Gold ($129/mo) |
| Custom subdomain | Silver ($49/mo) |
| Remove Jotform branding | Bronze+ |

For a production insurance site, **Bronze** is the minimum recommended plan.
