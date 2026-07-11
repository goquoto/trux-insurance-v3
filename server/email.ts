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

// Lightweight API key validation
export async function validateResendKey(): Promise<boolean> {
  try {
    const res = await resend.apiKeys.list();
    return !!(res.data);
  } catch {
    return false;
  }
}
