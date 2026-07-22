import { useState } from 'react';
import { trpc } from '../../lib/trpc';
import { useAuth } from '../../_core/hooks/useAuth';
import AgentIntakeBar from '../../components/AgentIntakeBar';

interface CertificateHolder {
  id: string;
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  additionalInsured: boolean;
  waiverOfSubrogation: boolean;
  primaryNonContributory: boolean;
}

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN',
  'IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH',
  'NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT',
  'VT','VA','WA','WV','WI','WY'
];

const INITIAL_HOLDER: CertificateHolder = {
  id: crypto.randomUUID(),
  name: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  email: '',
  additionalInsured: false,
  waiverOfSubrogation: false,
  primaryNonContributory: false,
};

export default function CertificateRequest() {
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const [form, setForm] = useState({
    insuredName: user?.name || '',
    businessName: (user as any)?.title || '',
    email: user?.email || '',
    policyNumber: '',
    urgency: 'standard',
    holders: [{ ...INITIAL_HOLDER, id: crypto.randomUUID() }],
    includeVehicleSchedule: false,
    includeDriverSchedule: false,
    specialInstructions: '',
    agreeDisclaimer: false,
  });

  const [intakeCustomer, setIntakeCustomer] = useState<{ id: number; name: string; email: string; title: string | null } | null>(null);
  const createSubmission = trpc.submissions.create.useMutation();

  const addHolder = () => {
    setForm(prev => ({ ...prev, holders: [...prev.holders, { ...INITIAL_HOLDER, id: crypto.randomUUID() }] }));
  };
  const removeHolder = (id: string) => {
    setForm(prev => ({ ...prev, holders: prev.holders.filter(h => h.id !== id) }));
  };
  const updateHolder = (id: string, field: keyof CertificateHolder, value: any) => {
    setForm(prev => ({
      ...prev,
      holders: prev.holders.map(h => h.id === id ? { ...h, [field]: value } : h),
    }));
  };

  const handleSubmit = async () => {
    if (!form.agreeDisclaimer) return;
    setSubmitting(true);

    try {
      const data = [
        {
          section: 'Request Information',
          fields: [
            { label: 'Named Insured', value: form.insuredName },
            { label: 'Business Name', value: form.businessName },
            { label: 'Email', value: form.email },
            { label: 'Policy Number', value: form.policyNumber },
            { label: 'Urgency', value: form.urgency },
          ],
        },
        ...form.holders.map((h, i) => ({
          section: `Certificate Holder ${i + 1}`,
          fields: [
            { label: 'Holder Name', value: h.name },
            { label: 'Address', value: `${h.address1} ${h.address2}, ${h.city}, ${h.state} ${h.zip}`.trim() },
            { label: 'Email to Send COI', value: h.email },
            { label: 'Additional Insured', value: h.additionalInsured ? 'Yes' : 'No' },
            { label: 'Waiver of Subrogation', value: h.waiverOfSubrogation ? 'Yes' : 'No' },
            { label: 'Primary & Non-Contributory', value: h.primaryNonContributory ? 'Yes' : 'No' },
          ],
        })),
        {
          section: 'Options',
          fields: [
            { label: 'Include Vehicle Schedule', value: form.includeVehicleSchedule ? 'Yes' : 'No' },
            { label: 'Include Driver Schedule', value: form.includeDriverSchedule ? 'Yes' : 'No' },
            { label: 'Special Instructions', value: form.specialInstructions },
          ],
        },
      ];

      const result = await createSubmission.mutateAsync({
        type: 'certificate',
        customerEmail: intakeCustomer?.email || form.email,
        userId: intakeCustomer?.id || user?.id,
        takenByUserId: intakeCustomer ? user?.id : undefined,
        data,
      });
      setSubmittedRef(result.ref);
    } catch (err) {
      console.error('Submission failed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedRef) {
    return (
      <div className="sc-form-page">
        <div className="sc-success-screen">
          <div className="sc-success-icon">✓</div>
          <h2 className="sc-success-title" style={{ fontFamily: 'Lora, serif' }}>Certificate Requested</h2>
          <p className="sc-success-ref">Reference: <strong>{submittedRef}</strong></p>
          <p className="sc-success-message">
            Your certificate of insurance request has been received. We'll send it to the specified email(s) once ready.
          </p>
          <a href="/service-center" className="sc-btn-primary" style={{ display: 'inline-block', marginTop: '1.5rem', textDecoration: 'none' }}>
            Back to Service Center
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="sc-form-page">
      <div className="sc-form-header">
        <div className="sc-eyebrow">CERTIFICATE OF INSURANCE</div>
        <div className="sc-tick" />
        <h1 className="sc-form-title">Request a <em>Certificate</em></h1>
      </div>

      {/* Agent Intake Mode */}
      <AgentIntakeBar onCustomerSelect={setIntakeCustomer} selectedCustomer={intakeCustomer} />

      {/* Insured Info */}
      <div className="wizard-section">
        <h3 className="wizard-section-title">Your Information</h3>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Named Insured *</label>
            <input className="form-input" value={form.insuredName} onChange={e => setForm(p => ({ ...p, insuredName: e.target.value }))} required />
          </div>
          <div className="form-group">
            <label className="form-label">Business Name *</label>
            <input className="form-input" value={form.businessName} onChange={e => setForm(p => ({ ...p, businessName: e.target.value }))} required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Email *</label>
            <input type="email" className="form-input" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required />
          </div>
          <div className="form-group">
            <label className="form-label">Policy Number</label>
            <input className="form-input" value={form.policyNumber} onChange={e => setForm(p => ({ ...p, policyNumber: e.target.value }))} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Urgency</label>
          <select className="form-input" value={form.urgency} onChange={e => setForm(p => ({ ...p, urgency: e.target.value }))}>
            <option value="standard">Standard (1–2 business days)</option>
            <option value="rush">Rush (same business day if before 2 PM CT)</option>
          </select>
        </div>
      </div>

      {/* Certificate Holders */}
      <div className="wizard-section">
        <h3 className="wizard-section-title">Certificate Holder(s)</h3>
        <p className="form-hint" style={{ marginBottom: '1rem' }}>Add one or more certificate holders. Each will receive a separate COI.</p>

        {form.holders.map((holder, idx) => (
          <div key={holder.id} className="repeatable-row">
            <div className="repeatable-row-header">
              <span className="repeatable-row-num">Holder {idx + 1}</span>
              {form.holders.length > 1 && (
                <button type="button" className="repeatable-remove-btn" onClick={() => removeHolder(holder.id)}>Remove</button>
              )}
            </div>
            <div className="form-row">
              <div className="form-group"><label className="form-label">Holder Name *</label><input className="form-input" value={holder.name} onChange={e => updateHolder(holder.id, 'name', e.target.value)} required /></div>
              <div className="form-group"><label className="form-label">Email to Send COI *</label><input type="email" className="form-input" value={holder.email} onChange={e => updateHolder(holder.id, 'email', e.target.value)} required /></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label className="form-label">Address 1</label><input className="form-input" value={holder.address1} onChange={e => updateHolder(holder.id, 'address1', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Address 2</label><input className="form-input" value={holder.address2} onChange={e => updateHolder(holder.id, 'address2', e.target.value)} /></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label className="form-label">City</label><input className="form-input" value={holder.city} onChange={e => updateHolder(holder.id, 'city', e.target.value)} /></div>
              <div className="form-group">
                <label className="form-label">State</label>
                <select className="form-input" value={holder.state} onChange={e => updateHolder(holder.id, 'state', e.target.value)}>
                  <option value="">Select...</option>
                  {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group"><label className="form-label">ZIP</label><input className="form-input" value={holder.zip} onChange={e => updateHolder(holder.id, 'zip', e.target.value)} /></div>
            </div>
            <div className="form-group">
              <label className="form-checkbox-label"><input type="checkbox" checked={holder.additionalInsured} onChange={e => updateHolder(holder.id, 'additionalInsured', e.target.checked)} /> Additional Insured</label>
            </div>
            <div className="form-group">
              <label className="form-checkbox-label"><input type="checkbox" checked={holder.waiverOfSubrogation} onChange={e => updateHolder(holder.id, 'waiverOfSubrogation', e.target.checked)} /> Waiver of Subrogation</label>
            </div>
            <div className="form-group">
              <label className="form-checkbox-label"><input type="checkbox" checked={holder.primaryNonContributory} onChange={e => updateHolder(holder.id, 'primaryNonContributory', e.target.checked)} /> Primary & Non-Contributory</label>
            </div>
          </div>
        ))}
        <button type="button" className="add-row-btn" onClick={addHolder}>+ Add another holder</button>
      </div>

      {/* Options */}
      <div className="wizard-section">
        <h3 className="wizard-section-title">Additional Options</h3>
        <div className="form-group">
          <label className="form-checkbox-label"><input type="checkbox" checked={form.includeVehicleSchedule} onChange={e => setForm(p => ({ ...p, includeVehicleSchedule: e.target.checked }))} /> Include Vehicle Schedule</label>
        </div>
        <div className="form-group">
          <label className="form-checkbox-label"><input type="checkbox" checked={form.includeDriverSchedule} onChange={e => setForm(p => ({ ...p, includeDriverSchedule: e.target.checked }))} /> Include Driver Schedule</label>
        </div>
        <div className="form-group">
          <label className="form-label">Special Instructions</label>
          <textarea className="form-input form-textarea" value={form.specialInstructions} onChange={e => setForm(p => ({ ...p, specialInstructions: e.target.value }))} placeholder="Additional details, specific requirements..." />
        </div>
      </div>

      {/* Disclaimer & Submit */}
      <div className="wizard-section">
        <div className="sc-disclaimer-box">
          This request does not guarantee coverage or endorsement changes. The certificate will reflect
          current policy coverage only. Additional insured status requires carrier approval and may incur
          additional premium.
        </div>
        <div className="form-group" style={{ marginTop: '1rem' }}>
          <label className="form-checkbox-label">
            <input type="checkbox" checked={form.agreeDisclaimer} onChange={e => setForm(p => ({ ...p, agreeDisclaimer: e.target.checked }))} />
            I understand and agree *
          </label>
        </div>
        <div className="wizard-actions">
          <a href="/service-center" className="sc-btn-ghost">Cancel</a>
          <button
            type="button"
            className="sc-btn-primary"
            disabled={!form.agreeDisclaimer || !form.holders[0]?.name || !form.email || submitting}
            onClick={handleSubmit}
          >
            {submitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </div>
    </div>
  );
}
