import { useState, useMemo } from 'react';

const CARRIERS = [
  { name: "Acuity Insurance", phone: "(800) 242-7666", portal: "https://www.acuity.com/my-account", payOnline: true },
  { name: "Allied Trust Insurance Company", phone: "(855) 236-2284", portal: "https://www.alliedtrust.com", payOnline: true },
  { name: "American Access Casualty Company", phone: "(800) 876-1765", portal: "https://www.aacc.com/payments", payOnline: true },
  { name: "Aon / Coverwallet", phone: "(646) 844-9933", portal: "https://www.coverwallet.com", payOnline: true },
  { name: "Berkshire Hathaway GUARD", phone: "(800) 673-2465", portal: "https://www.guard.com/policyholders", payOnline: true },
  { name: "Canal Insurance Company", phone: "(800) 849-8284", portal: "https://www.canalinsurance.com", payOnline: true },
  { name: "Carolina Casualty Insurance Company", phone: "(800) 763-2225", portal: "https://www.carolinacas.com", payOnline: true },
  { name: "CNA Insurance", phone: "(877) 262-2727", portal: "https://www.cna.com/web/guest/cna/myaccount", payOnline: true },
  { name: "Continental Western Group", phone: "(800) 234-8840", portal: "https://www.cwgins.com", payOnline: true },
  { name: "Cottingham & Butler", phone: "(563) 587-8400", portal: "https://www.cottinghambutler.com", payOnline: false },
  { name: "Delos Insurance", phone: "(833) 335-6746", portal: "https://www.delosinsurance.com", payOnline: true },
  { name: "Donegal Insurance Group", phone: "(800) 877-0600", portal: "https://www.donegalgroup.com", payOnline: true },
  { name: "EMC Insurance", phone: "(800) 447-2295", portal: "https://www.emcins.com", payOnline: true },
  { name: "Employers Holdings / EICN", phone: "(888) 682-6671", portal: "https://www.employers.com", payOnline: true },
  { name: "Erie Insurance", phone: "(800) 458-0811", portal: "https://www.erieinsurance.com", payOnline: true },
  { name: "Everspan Financial Guarantee Corp", phone: "(212) 356-0505", portal: "https://www.everspan.com", payOnline: true },
  { name: "Falls Lake National Insurance", phone: "(866) 726-2890", portal: "https://www.fallslakeins.com", payOnline: true },
  { name: "Farmers Insurance", phone: "(888) 327-6335", portal: "https://www.farmers.com/my-account", payOnline: true },
  { name: "Foremost Insurance Group", phone: "(800) 527-3907", portal: "https://www.foremost.com", payOnline: true },
  { name: "Frankenmuth Insurance", phone: "(800) 234-1133", portal: "https://www.fmins.com", payOnline: true },
  { name: "Great American Insurance Group", phone: "(800) 545-4269", portal: "https://www.greatamericaninsurancegroup.com", payOnline: true },
  { name: "Great West Casualty Company", phone: "(800) 228-8602", portal: "https://www.gwccnet.com", payOnline: true },
  { name: "Hallmark Financial Services", phone: "(817) 348-1600", portal: "https://www.hallmarkgrp.com", payOnline: true },
  { name: "Hanover Insurance Group", phone: "(800) 922-8427", portal: "https://www.hanover.com", payOnline: true },
  { name: "Hartford Financial Services", phone: "(860) 547-5000", portal: "https://www.thehartford.com/my-account", payOnline: true },
  { name: "ICW Group", phone: "(858) 350-2400", portal: "https://www.icwgroup.com", payOnline: true },
  { name: "Intact Insurance Specialty Solutions", phone: "(800) 726-3379", portal: "https://www.intactspecialty.com", payOnline: true },
  { name: "Ironshore (Liberty Mutual)", phone: "(877) 694-2543", portal: "https://www.ironshore.com", payOnline: true },
  { name: "Kemper Corporation", phone: "(800) 833-0355", portal: "https://www.kemper.com/my-account", payOnline: true },
  { name: "Liberty Mutual Insurance", phone: "(800) 290-8711", portal: "https://www.libertymutual.com/my-account", payOnline: true },
  { name: "Lancer Insurance Company", phone: "(800) 782-8902", portal: "https://www.lancerinsurance.com", payOnline: true },
  { name: "Markel Insurance", phone: "(800) 431-1270", portal: "https://www.markel.com", payOnline: true },
  { name: "National Indemnity Company", phone: "(800) 356-5765", portal: "https://www.nationalindemnity.com", payOnline: true },
  { name: "National Interstate Insurance", phone: "(800) 929-1500", portal: "https://www.natl.com", payOnline: true },
  { name: "Nationwide Insurance", phone: "(877) 669-6877", portal: "https://www.nationwide.com/personal/member", payOnline: true },
  { name: "Northland Insurance Company", phone: "(800) 328-1693", portal: "https://www.northlandins.com", payOnline: true },
  { name: "Old Republic Insurance", phone: "(800) 543-7788", portal: "https://www.oldrepublicinsurance.com", payOnline: true },
  { name: "OOIDA (Owner-Operator Independent Drivers Association)", phone: "(800) 444-5791", portal: "https://www.ooida.com", payOnline: false },
  { name: "Philadelphia Insurance Companies (PHLY)", phone: "(800) 765-9749", portal: "https://www.phly.com/my-account", payOnline: true },
  { name: "Progressive Commercial", phone: "(800) 776-4737", portal: "https://www.progressivecommercial.com", payOnline: true },
  { name: "Protective Insurance Corporation", phone: "(800) 644-5501", portal: "https://www.protectiveinsurance.com", payOnline: true },
  { name: "RLI Corp", phone: "(800) 444-0406", portal: "https://www.rlicorp.com", payOnline: true },
  { name: "Sentry Insurance", phone: "(800) 739-3553", portal: "https://www.sentry.com", payOnline: true },
  { name: "State Auto Insurance", phone: "(800) 444-9950", portal: "https://www.stateauto.com", payOnline: true },
  { name: "Tokio Marine HCC", phone: "(800) 842-0380", portal: "https://www.tmhcc.com", payOnline: true },
  { name: "Travelers Insurance", phone: "(800) 842-5075", portal: "https://www.travelers.com/my-account", payOnline: true },
  { name: "Truck Insurance Exchange (Farmers)", phone: "(888) 327-6335", portal: "https://www.farmers.com", payOnline: true },
  { name: "United Fire Group", phone: "(800) 553-7937", portal: "https://www.ufginsurance.com", payOnline: true },
  { name: "US Specialty Insurance Company", phone: "(800) 872-4929", portal: "https://www.usspecialty.com", payOnline: true },
  { name: "Utica National Insurance Group", phone: "(800) 274-1914", portal: "https://www.uticanational.com", payOnline: true },
  { name: "Westfield Insurance", phone: "(800) 243-0210", portal: "https://www.westfieldinsurance.com", payOnline: true },
  { name: "Western National Insurance", phone: "(800) 862-8070", portal: "https://www.wnins.com", payOnline: true },
  { name: "Wesco Insurance Company", phone: "(800) 338-2680", portal: "https://www.wescoinsurance.com", payOnline: true },
  { name: "Zenith National Insurance", phone: "(800) 440-5020", portal: "https://www.thezenith.com", payOnline: true },
  { name: "Zurich Insurance Group", phone: "(800) 382-2150", portal: "https://www.zurichna.com/en/my-account", payOnline: true },
  { name: "AMERITAS Life Insurance Corp", phone: "(800) 487-5553", portal: "https://www.ameritas.com", payOnline: true },
  { name: "Applied Underwriters", phone: "(877) 234-4450", portal: "https://www.applieduw.com", payOnline: true },
  { name: "Biberk (Berkshire Hathaway Direct)", phone: "(844) 472-0967", portal: "https://www.biberk.com/my-account", payOnline: true },
];

export default function BillingPayments() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'options' | 'carriers'>('options');

  const filtered = useMemo(() => {
    if (!search.trim()) return CARRIERS;
    const q = search.toLowerCase();
    return CARRIERS.filter(c => c.name.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="sc-form-page">
      <div className="sc-form-header">
        <div className="sc-eyebrow">BILLING</div>
        <div className="sc-tick" />
        <h1 className="sc-form-title">Billing & <em>Payments</em></h1>
      </div>

      {/* Tab switcher */}
      <div className="sc-tabs" style={{ display: 'flex', gap: '0', borderBottom: '1px solid var(--hair)', marginBottom: '2rem' }}>
        <button
          className={`sc-tab-btn ${activeTab === 'options' ? 'active' : ''}`}
          onClick={() => setActiveTab('options')}
        >
          Payment Options
        </button>
        <button
          className={`sc-tab-btn ${activeTab === 'carriers' ? 'active' : ''}`}
          onClick={() => setActiveTab('carriers')}
        >
          Carrier Directory ({CARRIERS.length})
        </button>
      </div>

      {activeTab === 'options' && (
        <div className="wizard-section">
          <h3 className="wizard-section-title">How to Pay Your Premium</h3>
          <p style={{ color: 'var(--muted)', marginBottom: '2rem', lineHeight: '1.7' }}>
            Most carriers offer multiple ways to pay. Choose the method that works best for your business.
          </p>

          <div className="payment-options-grid">
            <div className="payment-option-card">
              <div className="payment-option-icon">🏦</div>
              <h4 className="payment-option-title">Pay Carrier Directly</h4>
              <p className="payment-option-desc">
                Log in to your carrier's online portal to make a payment, set up autopay, or view your billing history.
                Find your carrier in the directory below.
              </p>
            </div>
            <div className="payment-option-card">
              <div className="payment-option-icon">📞</div>
              <h4 className="payment-option-title">Pay by Phone</h4>
              <p className="payment-option-desc">
                Call your carrier's billing department directly. Have your policy number ready.
                Phone numbers are listed in the carrier directory.
              </p>
            </div>
            <div className="payment-option-card">
              <div className="payment-option-icon">✉️</div>
              <h4 className="payment-option-title">Pay by Mail</h4>
              <p className="payment-option-desc">
                Send a check or money order to the address on your billing statement.
                Include your policy number on the check memo line.
              </p>
            </div>
            <div className="payment-option-card">
              <div className="payment-option-icon">🔄</div>
              <h4 className="payment-option-title">Premium Finance</h4>
              <p className="payment-option-desc">
                If you financed your premium, payments go to your finance company — not the carrier.
                Contact us if you need your finance company details.
              </p>
            </div>
          </div>

          <div className="sc-disclaimer-box" style={{ marginTop: '2rem' }}>
            <strong>Need help?</strong> If you're unsure where to send your payment or have questions about your billing,
            call us at <a href="tel:+13312401101" style={{ color: 'var(--ink)', fontWeight: 500 }}>(331) 240-1101</a> and
            we'll help you sort it out.
          </div>
        </div>
      )}

      {activeTab === 'carriers' && (
        <div className="wizard-section">
          <div style={{ marginBottom: '1.5rem' }}>
            <input
              className="form-input"
              placeholder="Search carriers..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ maxWidth: '400px' }}
            />
          </div>

          <div className="carrier-table-wrapper">
            <table className="carrier-table">
              <thead>
                <tr>
                  <th>Carrier</th>
                  <th>Phone</th>
                  <th>Online Payment</th>
                  <th>Portal</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.name}>
                    <td className="carrier-name">{c.name}</td>
                    <td><a href={`tel:${c.phone.replace(/[^\d+]/g, '')}`} className="carrier-phone">{c.phone}</a></td>
                    <td>{c.payOnline ? <span className="badge-yes">Yes</span> : <span className="badge-no">No</span>}</td>
                    <td>
                      {c.portal && (
                        <a href={c.portal} target="_blank" rel="noopener noreferrer" className="carrier-portal-link">
                          Visit Portal →
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <p style={{ color: 'var(--taupe)', textAlign: 'center', padding: '2rem' }}>
              No carriers match "{search}". Try a different search term.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
