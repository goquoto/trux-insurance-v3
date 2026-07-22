import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADDRESS = "Trux Insurance <noreply@truxins.net>";
const TO_ADDRESSES = ["info@truxins.com", "milen@truxins.com"];

interface QuoteEmailData {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  dotNumber?: string;
  state?: string;
  vehicleCount?: string;
  driverCount?: string;
  currentCoverages?: string;
  notes?: string;
  submittedAt: string;
}

interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  submittedAt: string;
}

export async function sendQuoteNotification(data: QuoteEmailData): Promise<boolean> {
  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: TO_ADDRESSES,
      subject: `New Quote Request — ${data.businessName || data.contactName}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h1 style="font-size: 22px; color: #1A1A1A; margin-bottom: 4px;">New Quote Request</h1>
          <p style="font-size: 13px; color: #8A8783; margin-bottom: 24px;">Submitted ${data.submittedAt}</p>
          
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr style="border-bottom: 1px solid #CEC9BF;">
              <td style="padding: 10px 0; color: #8A8783; width: 140px;">Business Name</td>
              <td style="padding: 10px 0; color: #1A1A1A; font-weight: 500;">${data.businessName || "—"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #CEC9BF;">
              <td style="padding: 10px 0; color: #8A8783;">Contact Name</td>
              <td style="padding: 10px 0; color: #1A1A1A; font-weight: 500;">${data.contactName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #CEC9BF;">
              <td style="padding: 10px 0; color: #8A8783;">Email</td>
              <td style="padding: 10px 0; color: #1A1A1A;"><a href="mailto:${data.email}" style="color: #1A1A1A;">${data.email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #CEC9BF;">
              <td style="padding: 10px 0; color: #8A8783;">Phone</td>
              <td style="padding: 10px 0; color: #1A1A1A;"><a href="tel:${data.phone}" style="color: #1A1A1A;">${data.phone}</a></td>
            </tr>
            ${data.dotNumber ? `<tr style="border-bottom: 1px solid #CEC9BF;">
              <td style="padding: 10px 0; color: #8A8783;">DOT / MC #</td>
              <td style="padding: 10px 0; color: #1A1A1A;">${data.dotNumber}</td>
            </tr>` : ""}
            ${data.state ? `<tr style="border-bottom: 1px solid #CEC9BF;">
              <td style="padding: 10px 0; color: #8A8783;">State</td>
              <td style="padding: 10px 0; color: #1A1A1A;">${data.state}</td>
            </tr>` : ""}
            ${data.vehicleCount ? `<tr style="border-bottom: 1px solid #CEC9BF;">
              <td style="padding: 10px 0; color: #8A8783;">Vehicles</td>
              <td style="padding: 10px 0; color: #1A1A1A;">${data.vehicleCount}</td>
            </tr>` : ""}
            ${data.driverCount ? `<tr style="border-bottom: 1px solid #CEC9BF;">
              <td style="padding: 10px 0; color: #8A8783;">Drivers</td>
              <td style="padding: 10px 0; color: #1A1A1A;">${data.driverCount}</td>
            </tr>` : ""}
            ${data.currentCoverages ? `<tr style="border-bottom: 1px solid #CEC9BF;">
              <td style="padding: 10px 0; color: #8A8783;">Current Coverages</td>
              <td style="padding: 10px 0; color: #1A1A1A;">${data.currentCoverages}</td>
            </tr>` : ""}
          </table>

          ${data.notes ? `
          <div style="margin-top: 20px; padding: 16px; background: #F2EEE6; border-left: 4px solid #1A1A1A;">
            <p style="font-size: 12px; color: #8A8783; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 0.1em;">Notes</p>
            <p style="font-size: 14px; color: #1A1A1A; margin: 0; white-space: pre-wrap;">${data.notes}</p>
          </div>` : ""}

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #CEC9BF;">
            <p style="font-size: 12px; color: #8A8783; margin: 0;">This notification was sent by the Trux Insurance website quote form.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("[Email] Quote notification failed:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[Email] Quote notification error:", err);
    return false;
  }
}

export async function sendContactNotification(data: ContactEmailData): Promise<boolean> {
  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: TO_ADDRESSES,
      subject: `Contact Form — ${data.name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h1 style="font-size: 22px; color: #1A1A1A; margin-bottom: 4px;">New Contact Message</h1>
          <p style="font-size: 13px; color: #8A8783; margin-bottom: 24px;">Received ${data.submittedAt}</p>
          
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr style="border-bottom: 1px solid #CEC9BF;">
              <td style="padding: 10px 0; color: #8A8783; width: 120px;">Name</td>
              <td style="padding: 10px 0; color: #1A1A1A; font-weight: 500;">${data.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #CEC9BF;">
              <td style="padding: 10px 0; color: #8A8783;">Email</td>
              <td style="padding: 10px 0; color: #1A1A1A;"><a href="mailto:${data.email}" style="color: #1A1A1A;">${data.email}</a></td>
            </tr>
            ${data.phone ? `<tr style="border-bottom: 1px solid #CEC9BF;">
              <td style="padding: 10px 0; color: #8A8783;">Phone</td>
              <td style="padding: 10px 0; color: #1A1A1A;"><a href="tel:${data.phone}" style="color: #1A1A1A;">${data.phone}</a></td>
            </tr>` : ""}
            ${data.company ? `<tr style="border-bottom: 1px solid #CEC9BF;">
              <td style="padding: 10px 0; color: #8A8783;">Company</td>
              <td style="padding: 10px 0; color: #1A1A1A;">${data.company}</td>
            </tr>` : ""}
          </table>

          <div style="margin-top: 20px; padding: 16px; background: #F2EEE6; border-left: 4px solid #1A1A1A;">
            <p style="font-size: 12px; color: #8A8783; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 0.1em;">Message</p>
            <p style="font-size: 14px; color: #1A1A1A; margin: 0; white-space: pre-wrap;">${data.message}</p>
          </div>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #CEC9BF;">
            <p style="font-size: 12px; color: #8A8783; margin: 0;">This notification was sent by the Trux Insurance website contact form.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("[Email] Contact notification failed:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[Email] Contact notification error:", err);
    return false;
  }
}

export async function sendNewsletterWelcome(email: string): Promise<boolean> {
  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [email],
      subject: "Welcome to Trux Insurance Insights",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h1 style="font-size: 22px; color: #1A1A1A; margin-bottom: 16px;">Welcome to Trux Insurance Insights</h1>
          
          <p style="font-size: 15px; color: #6E6B66; line-height: 1.7; margin-bottom: 16px;">
            Thank you for subscribing. You'll receive periodic updates on trucking insurance trends, regulatory changes, risk management tips, and industry news — written by people who work exclusively with motor carriers.
          </p>

          <div style="margin: 24px 0; padding: 16px; background: #F2EEE6; border-left: 4px solid #1A1A1A;">
            <p style="font-size: 14px; color: #2E2E2E; margin: 0; font-style: italic;">
              "Every mile covered — by people who only do trucking."
            </p>
          </div>

          <p style="font-size: 14px; color: #6E6B66; line-height: 1.7; margin-bottom: 24px;">
            In the meantime, explore our <a href="https://truxins.net/resources" style="color: #1A1A1A; text-decoration: underline;">Resources hub</a> for tools, guides, and insurance education tailored to trucking operations.
          </p>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #CEC9BF;">
            <p style="font-size: 12px; color: #8A8783; margin: 0;">Trux Insurance Services &middot; 1 Tiffany Point, Bloomington, IL 61704 &middot; (331) 240-1101</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("[Email] Newsletter welcome failed:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[Email] Newsletter welcome error:", err);
    return false;
  }
}

// Lightweight API key validation
export async function validateResendKey(): Promise<boolean> {
  try {
    const res = await resend.apiKeys.list();
    return !!(res.data);
  } catch {
    return false;
  }
}


// Send notification to managers/admins when a new account is created
export async function sendNewAccountNotification(data: {
  userName: string | null;
  userEmail: string | null;
  authProvider: string | null;
  createdAt: string;
}): Promise<boolean> {
  try {
    const { data: result, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: TO_ADDRESSES,
      subject: `New Account Signup: ${data.userName || data.userEmail || 'Unknown User'}`,
      html: `
        <div style="font-family: 'Poppins', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #FBFAF8; border: 1px solid #CEC9BF;">
          <h2 style="font-family: 'Lora', Georgia, serif; color: #2E2E2E; font-size: 22px; margin-bottom: 8px;">New Account Pending Approval</h2>
          <p style="color: #6E6B66; font-size: 14px; margin-bottom: 24px;">A new user has signed up and is waiting for account approval.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr style="border-bottom: 1px solid #CEC9BF;">
              <td style="padding: 10px 0; color: #8A8783; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; width: 120px;">Name</td>
              <td style="padding: 10px 0; color: #1A1A1A; font-size: 14px;">${data.userName || '—'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #CEC9BF;">
              <td style="padding: 10px 0; color: #8A8783; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Email</td>
              <td style="padding: 10px 0; color: #1A1A1A; font-size: 14px;">${data.userEmail || '—'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #CEC9BF;">
              <td style="padding: 10px 0; color: #8A8783; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Provider</td>
              <td style="padding: 10px 0; color: #1A1A1A; font-size: 14px;">${data.authProvider || 'Manus OAuth'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #8A8783; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Signed Up</td>
              <td style="padding: 10px 0; color: #1A1A1A; font-size: 14px;">${data.createdAt}</td>
            </tr>
          </table>
          
          <p style="color: #6E6B66; font-size: 13px;">Log in to the Agency Hub to approve or reject this account.</p>
        </div>
      `,
    });

    if (error) {
      console.error('[Email] New account notification failed:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[Email] New account notification error:', err);
    return false;
  }
}


// Send notification when a service center form is submitted
export async function sendSubmissionNotification(data: {
  ref: string;
  type: string;
  customerEmail: string | null;
  customerName?: string;
  agentName?: string;
  fields: { label: string; value: string }[];
}): Promise<boolean> {
  const TYPE_LABELS: Record<string, string> = {
    policy_change: 'Policy Change Request',
    certificate: 'Certificate Request',
    claim: 'Claim Submission',
    account_review: 'Account Review Request',
    contact: 'Contact Form',
    fast_quote: 'Fast Quote',
    full_quote: 'Full Quote',
  };

  const typeLabel = TYPE_LABELS[data.type] || data.type;
  const submittedAt = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });

  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: TO_ADDRESSES,
      subject: `${typeLabel} — ${data.customerName || data.customerEmail || data.ref}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h1 style="font-size: 22px; color: #1A1A1A; margin-bottom: 4px;">${typeLabel}</h1>
          <p style="font-size: 13px; color: #8A8783; margin-bottom: 4px;">Ref: ${data.ref} &middot; ${submittedAt}</p>
          ${data.agentName ? `<p style="font-size: 13px; color: #8A8783; margin-bottom: 24px;">Filed by agent: ${data.agentName}</p>` : '<div style="margin-bottom: 24px;"></div>'}
          
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            ${data.fields.slice(0, 20).map(f => `
            <tr style="border-bottom: 1px solid #CEC9BF;">
              <td style="padding: 10px 0; color: #8A8783; width: 160px; vertical-align: top;">${f.label}</td>
              <td style="padding: 10px 0; color: #1A1A1A; font-weight: 400;">${f.value || '—'}</td>
            </tr>`).join('')}
          </table>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #CEC9BF;">
            <p style="font-size: 12px; color: #8A8783; margin: 0;">This notification was sent by the Trux Insurance Service Center.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("[Email] Submission notification failed:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[Email] Submission notification error:", err);
    return false;
  }
}
