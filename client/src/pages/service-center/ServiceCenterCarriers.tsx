import ServiceCenterLayout from "@/components/ServiceCenterLayout";
import { useState, useMemo } from "react";

type CarrierInfo = {
  phone?: string;
  label?: string;
  url?: string;
};

type Carrier = {
  name: string;
  websiteUrl?: string;
  service?: CarrierInfo;
  billing?: CarrierInfo;
  claims?: CarrierInfo;
};

const carriers: Carrier[] = [
  { name: "Aflac", service: { phone: "800-992-3522", label: "Customer Service" }, claims: { phone: "800-992-3522", label: "Submit Claim" } },
  { name: "Allied Insurance", service: { label: "Visit Website", url: "#" }, billing: { phone: "1-888-891-0267", label: "Make Payment" }, claims: { phone: "1-800-421-3535", label: "Submit Claim" } },
  { name: "American Modern", service: { phone: "866-880-8651", label: "Customer Service" }, billing: { phone: "800-543-2644", label: "Make Payment" }, claims: { phone: "800-375-2075", label: "Submit Claim" } },
  { name: "AmWINS Insurance", service: { phone: "704-749-2700", label: "Customer Service" }, billing: { label: "Make Payment" }, claims: { label: "Submit Claim" } },
  { name: "Appalachian Underwriters", service: { label: "Visit Website", url: "#" }, billing: { phone: "888-376-9633" }, claims: { phone: "888-376-9633" } },
  { name: "Applied Underwriters", service: { label: "Visit Website", url: "#" } },
  { name: "Atlantic Casualty", service: { phone: "919-759-3200", label: "Visit Website", url: "#" }, claims: { label: "Submit Claim" } },
  { name: "Bass Underwriters", service: { label: "Visit Website", url: "#" }, billing: { phone: "954-473-4488" }, claims: { phone: "844-388-5677" } },
  { name: "Berkshire Hathaway Homestate Companies", service: { phone: "888-495-8949", label: "Visit Website", url: "#" }, billing: { phone: "877-680-2442", label: "Make Payment" }, claims: { phone: "800-356-5750", label: "Submit Claim" } },
  { name: "BiBerk", service: { phone: "844-472-0967", label: "Visit Website", url: "#" }, billing: { phone: "844-472-0967", label: "Make Payment" }, claims: { phone: "877-234-4401", label: "Submit Claim" } },
  { name: "Canal Insurance", service: { phone: "800-452-6911", label: "Customer Service" }, billing: { label: "Make Payment" }, claims: { label: "Submit Claim" } },
  { name: "Chubb", service: { label: "Visit Website", url: "#" }, claims: { phone: "800-252-4670", label: "Submit Claim" } },
  { name: "CIBA", service: { label: "Visit Website", url: "#" } },
  { name: "CNA Surety", service: { phone: "800-331-6053", label: "Visit Website", url: "#" }, billing: { phone: "800-331-6053", label: "Make Payment" }, claims: { phone: "800-331-6053", label: "Submit Claim" } },
  { name: "Columbia Insurance Group", service: { label: "Visit Website", url: "#" } },
  { name: "Coterie", service: { phone: "1-855-566-1011", label: "Customer Service" }, claims: { phone: "1-855-680-2440", label: "Submit Claim" } },
  { name: "Cowbell Cyber", service: { phone: "1-833-633-8666", label: "Customer Service" }, claims: { phone: "1-833-633-8666", label: "Submit Claim" } },
  { name: "Crum & Forster", service: { phone: "973-490-6600", label: "Visit Website", url: "#" }, billing: { phone: "844-217-7388", label: "Make Payment" }, claims: { phone: "800-690-5520", label: "Submit Claim" } },
  { name: "Cypress Insurance Group", service: { label: "Visit Website", url: "#" } },
  { name: "Cypress Point", service: { label: "Visit Website", url: "#" } },
  { name: "Cypress Property", service: { label: "Visit Website", url: "#" }, billing: { phone: "877-560-5224" }, claims: { phone: "888-352-9773" } },
  { name: "Cypress Property Casualty", service: { label: "Visit Website", url: "#" } },
  { name: "Farmers Alliance", service: { label: "Visit Website", url: "#" } },
  { name: "First Comp (Markel)", service: { phone: "888-500-3344", label: "Customer Service" }, billing: { phone: "888-500-3344", label: "Make Payment" }, claims: { phone: "888-500-3344" } },
  { name: "Foremost", service: { phone: "800-527-3905", label: "Visit Website", url: "#" }, billing: { phone: "888-383-4244", label: "Make Payment" }, claims: { phone: "800-527-3907", label: "Submit Claim" } },
  { name: "General Star", service: { label: "Visit Website", url: "#" } },
  { name: "GNY Insurance Companies", service: { label: "Visit Website", url: "#" } },
  { name: "Great American Insurance Group", service: { phone: "800-221-7274", label: "Visit Website", url: "#" }, claims: { phone: "Please contact our office for assistance in reporting a claim." } },
  { name: "Guard Insurance Group", service: { phone: "800-673-2465", label: "Customer Service" }, billing: { phone: "800-673-2465", label: "Make Payment" }, claims: { phone: "888-639-2567", label: "Submit Claim" } },
  { name: "GuideOne Insurance", service: { label: "Visit Website", url: "#" } },
  { name: "Hartford Steam Boiler", service: { phone: "800-472-1866", label: "Visit Website", url: "#" }, billing: { phone: "888-472-5677" } },
  { name: "Hiscox", service: { label: "Customer Service" }, billing: { phone: "800-591-9391" }, claims: { phone: "866-424-8508", label: "Submit Claim" } },
  { name: "Hudson Insurance Group", service: { label: "Visit Website", url: "#" } },
  { name: "Hull & Company", service: { label: "Visit Website", url: "#" }, billing: { phone: "954-903-4263" }, claims: { phone: "954-527-4855" } },
  { name: "Lloyd's", service: { label: "Visit Website", url: "#" } },
  { name: "Markel", service: { label: "Customer Service" }, billing: { label: "Make Payment" }, claims: { phone: "800-362-7535", label: "Submit Claim" } },
  { name: "Midwest Family Mutual", service: { label: "Visit Website", url: "#" } },
  { name: "National Indemnity Company", service: { label: "Visit Website", url: "#" } },
  { name: "Next Insurance", service: { label: "Customer Service" }, claims: { label: "Submit Claim" } },
  { name: "Northland Insurance", service: { phone: "800-328-5972", label: "Customer Service" }, claims: { phone: "800-328-5972", label: "Submit Claim" } },
  { name: "Philadelphia Insurance Company", service: { phone: "877-438-7459", label: "Visit Website", url: "#" }, billing: { phone: "866-608-5898" }, claims: { phone: "1-800-765-9749 ext 3", label: "Submit Claim" } },
  { name: "Pie Insurance", service: { phone: "855-705-2716", label: "Visit Website", url: "#" }, billing: { label: "Make Payment" }, claims: { phone: "844-581-0828", label: "Submit Claim" } },
  { name: "Progressive", service: { phone: "866-407-4844", label: "Visit Website", url: "#" }, billing: { phone: "866-407-4844", label: "Make Payment" }, claims: { phone: "866-407-4844" } },
  { name: "RLI", service: { phone: "800-331-4929", label: "Customer Service" }, claims: { phone: "800-444-0406", label: "Submit Claim" } },
  { name: "RPS - Risk Placement Services Inc.", service: { label: "Visit Website", url: "#" }, billing: { phone: "866-595-8413" }, claims: { phone: "844-777-8323" } },
  { name: "RT Specialty", service: { label: "Visit Website", url: "#" } },
  { name: "Seneca", service: { phone: "212-344-3000", label: "Customer Service" }, billing: { phone: "212-344-3000", label: "Make Payment" }, claims: { phone: "212-277-3490", label: "Submit Claim" } },
  { name: "Sentry", service: { label: "Visit Website", url: "#" }, billing: { label: "Make Payment" }, claims: { phone: "800-473-6879", label: "Submit Claim" } },
  { name: "St Paul Travelers", service: { label: "Visit Website", url: "#" } },
  { name: "Texas Mutual Insurance Co", service: { label: "Visit Website", url: "#" } },
  { name: "The Harford Mutual", service: { label: "Visit Website", url: "#" } },
  { name: "The Hartford", service: { phone: "860-547-5000", label: "Customer Service" }, billing: { phone: "860-547-5000" }, claims: { phone: "1-800-243-5860", label: "Submit Claim" } },
  { name: "Thimble", service: { label: "Customer Service" }, claims: { label: "Submit Claim" } },
  { name: "Travelers", service: { label: "Visit Website", url: "#" }, billing: { phone: "800-252-2268", label: "Make Payment" }, claims: { phone: "800-238-6225", label: "Submit Claim" } },
  { name: "UFG Insurance (United Fire Group)", service: { label: "Customer Service" }, billing: { phone: "800-450-9239", label: "Make Payment" }, claims: { phone: "1-800-343-9131", label: "Submit Claim" } },
  { name: "US Assure", service: { label: "Visit Website", url: "#" }, billing: { phone: "855-872-7787" }, claims: { phone: "800-987-3373" } },
  { name: "United States Liability Insurance Group (USLI)", service: { phone: "888-523-5545", label: "Visit Website", url: "#" }, billing: { phone: "866-632-2003", label: "Make Payment" }, claims: { phone: "866-712-6232", label: "Submit Claim" } },
  { name: "Zurich", service: { label: "Visit Website", url: "#" }, billing: { label: "Make Payment" } },
];

function InfoCell({ info }: { info?: CarrierInfo }) {
  if (!info) return <td className="sc-table-cell sc-table-empty">—</td>;
  return (
    <td className="sc-table-cell">
      {info.phone && <span className="sc-carrier-phone">{info.phone}</span>}
      {info.label && (
        info.url
          ? <a href={info.url} target="_blank" rel="noopener noreferrer" className="sc-carrier-link">{info.label}</a>
          : <span className="sc-carrier-action">{info.label}</span>
      )}
    </td>
  );
}

export default function ServiceCenterCarriers() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return carriers;
    const q = search.toLowerCase();
    return carriers.filter(c => c.name.toLowerCase().includes(q));
  }, [search]);

  return (
    <ServiceCenterLayout>
      <div className="sc-carriers">
        <h1 className="sc-page-title">Carrier Listings</h1>
        <p className="sc-intro-text">
          Below is a list of some of the insurance companies we represent. If you need to contact them, 
          make a payment, need customer support, or something else, please use their information listed. 
          If you don't see your carrier listed here, please reach out to us at{" "}
          <a href="tel:3312401101" className="sc-inline-link">(331) 240-1101</a>.
        </p>

        <div className="sc-search-bar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search by Company Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="sc-search-input"
          />
          {search && (
            <button onClick={() => setSearch("")} className="sc-search-clear" aria-label="Clear search">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>

        <div className="sc-table-wrap">
          <table className="sc-table">
            <thead>
              <tr>
                <th className="sc-table-th">Carrier Name</th>
                <th className="sc-table-th">Service Information</th>
                <th className="sc-table-th">Billing Information</th>
                <th className="sc-table-th">Claims Information</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((carrier) => (
                <tr key={carrier.name} className="sc-table-row">
                  <td className="sc-table-cell sc-carrier-name">
                    {carrier.websiteUrl
                      ? <a href={carrier.websiteUrl} target="_blank" rel="noopener noreferrer">{carrier.name}</a>
                      : carrier.name
                    }
                  </td>
                  <InfoCell info={carrier.service} />
                  <InfoCell info={carrier.billing} />
                  <InfoCell info={carrier.claims} />
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="sc-table-empty-state">
              <p>No carriers found matching "{search}"</p>
            </div>
          )}
        </div>
        <p className="sc-table-count">{filtered.length} of {carriers.length} carriers shown</p>
      </div>
    </ServiceCenterLayout>
  );
}
