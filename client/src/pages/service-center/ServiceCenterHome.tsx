import ServiceCenterLayout from "@/components/ServiceCenterLayout";
import { Link } from "wouter";

const serviceCards = [
  {
    title: "Policy Change",
    description: "Change vehicles, drivers, addresses, coverages, and more.",
    buttonLabel: "Policy Change",
    path: "/service-center/policy-change",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
  {
    title: "Request Certificate",
    description: "Submit your Additional Insured's requests to us for review.",
    buttonLabel: "Request COI",
    path: "/service-center/certificate",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: "Submit a Claim",
    description: "Contact us or your insurance company to start a new claim.",
    buttonLabel: "Start Claim",
    path: "/service-center/claim",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
  {
    title: "Account Review",
    description: "Schedule an appointment for a review of your account.",
    buttonLabel: "Schedule",
    path: "/service-center/appointment",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    title: "Billing & Payments",
    description: "Find billing and payment info for your insurance company.",
    buttonLabel: "View Carriers",
    path: "/service-center/billing",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
  },
];

export default function ServiceCenterHome() {
  return (
    <ServiceCenterLayout>
      <div className="sc-home">
        <div className="sc-intro">
          <h1 className="sc-page-title">Customer Service Center</h1>
          <p className="sc-intro-text">
            Welcome to the Trux Insurance Services support center. Our agency provides high-level customer service, 
            and our online support center along with our dedicated team are here to assist you with any policy changes.
          </p>
          <p className="sc-intro-disclaimer">
            <strong>Please keep in mind</strong> that coverage cannot be bound by email, voicemail, or fax. 
            Coverage will only be bound with written notification from our office.
          </p>
        </div>

        <div className="sc-cards-grid">
          {serviceCards.map((card) => (
            <div key={card.title} className="sc-card">
              <div className="sc-card-icon">{card.icon}</div>
              <h3 className="sc-card-title">{card.title}</h3>
              <p className="sc-card-desc">{card.description}</p>
              <Link href={card.path} className="sc-card-btn">
                {card.buttonLabel}
              </Link>
            </div>
          ))}
        </div>

        <div className="sc-links-section">
          <h3 className="sc-links-title">Quick Links</h3>
          <div className="sc-links-grid">
            <Link href="/service-center" className="sc-quick-link">Client Center</Link>
            <Link href="/service-center/policy-change" className="sc-quick-link">Policy Service</Link>
            <Link href="/service-center/certificate" className="sc-quick-link">Request Certificate of Insurance</Link>
            <Link href="/service-center/claim" className="sc-quick-link">Report a Claim</Link>
            <Link href="/service-center/billing" className="sc-quick-link">Make a Payment</Link>
          </div>
        </div>
      </div>
    </ServiceCenterLayout>
  );
}
