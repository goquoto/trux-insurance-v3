import { useState } from 'react';
import { trpc } from '../../lib/trpc';
import { useAuth } from '../../_core/hooks/useAuth';
import AgentIntakeBar from '../../components/AgentIntakeBar';
import ServiceCenterLayout from '../../components/ServiceCenterLayout';

export default function LossRuns() {
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const [form, setForm] = useState({
    insuredName: user?.name || '',
    businessName: (user as any)?.title || '',
    email: user?.email || '',
    policyNumber: '',
    priorCarrier: '',
    priorPolicyNumber: '',
    yearsRequested: '3',
    reason: 'renewal',
    deliveryEmails: '',
    notes: '',
    agreeDisclaimer: false,
  });

  const [intakeCustomer, setIntakeCustomer] = useState<{ id: number; name: string; email: string; title: string | null } | null>(null);
  const createSubmission = trpc.submissions.create.useMutation();

  const handleSubmit = async () => {
    if (!form.agreeDisclaimer || !form.insuredName || !form.businessName || !form.email) return;
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
          ],
        },
        {
          section: 'Loss Run Details',
          fields: [
            { label: 'Prior Carrier', value: form.priorCarrier },
            { label: 'Prior Policy Number', value: form.priorPolicyNumber },
            { label: 'Years of History Requested', value: `${form.yearsRequested} year(s)` },
            { label: 'Reason for Request', value: form.reason === 'renewal' ? 'Renewal' : form.reason === 'new_quote' ? 'New Quote' : form.reason === 'filing' ? 'Filing' : 'Other' },
            { label: 'Delivery Email(s)', value: form.deliveryEmails },
            { label: 'Additional Notes', value: form.notes },
          ],
        },
      ];

      const result = await createSubmission.mutateAsync({
        type: 'loss_runs',
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
      <ServiceCenterLayout>
      <div className="sc-form-page">
        <div className="sc-success-screen">
          <div className="sc-success-icon">✓</div>
          <h2 className="sc-success-title" style={{ fontFamily: 'Lora, serif' }}>Loss Runs Requested</h2>
          <p className="sc-success-ref">Reference: <strong>{submittedRef}</strong></p>
          <p className="sc-success-message">
            Your loss runs request has been received. We'll send the documents to the specified delivery email(s) once obtained from the carrier.
          </p>
          <a href="/service-center" className="sc-btn-primary" style={{ display: 'inline-block', marginTop: '1.5rem', textDecoration: 'none' }}>
            Back to Service Center
          </a>
        </div>
      </div>
      </ServiceCenterLayout>
    );
  }

  return (
    <ServiceCenterLayout>
    <div className="sc-form-page">
      <div className="sc-form-header">
        <div className="sc-eyebrow">LOSS RUNS</div>
        <div className="sc-tick" />
        <h1 className="sc-form-title">Request <em>Loss Runs</em></h1>
      </div>

      {/* Agent Intake Mode */}
      <AgentIntakeBar onCustomerSelect={setIntakeCustomer} selectedCustomer={intakeCustomer} />

      {/* Insured Info */}
      <div className="wizard-section">
        <h3 className="wizard-section-title">Your Information</h3>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Named Insured <span className="form-required">*</span></label>
            <input className="form-input" value={form.insuredName} onChange={e => setForm(p => ({ ...p, insuredName: e.target.value }))} required />
          </div>
          <div className="form-group">
            <label className="form-label">Business Name <span className="form-required">*</span></label>
            <input className="form-input" value={form.businessName} onChange={e => setForm(p => ({ ...p, businessName: e.target.value }))} required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Email <span className="form-required">*</span></label>
            <input type="email" className="form-input" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required />
          </div>
          <div className="form-group">
            <label className="form-label">Policy Number</label>
            <input className="form-input" value={form.policyNumber} onChange={e => setForm(p => ({ ...p, policyNumber: e.target.value }))} placeholder="Current policy number (if known)" />
          </div>
        </div>
      </div>

      {/* Loss Run Details */}
      <div className="wizard-section">
        <h3 className="wizard-section-title">Loss Run Details</h3>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Prior Carrier</label>
            <input className="form-input" value={form.priorCarrier} onChange={e => setForm(p => ({ ...p, priorCarrier: e.target.value }))} placeholder="Name of prior insurance carrier" />
          </div>
          <div className="form-group">
            <label className="form-label">Prior Policy Number</label>
            <input className="form-input" value={form.priorPolicyNumber} onChange={e => setForm(p => ({ ...p, priorPolicyNumber: e.target.value }))} placeholder="Prior carrier's policy number" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Years of Loss History Requested</label>
            <select className="form-input" value={form.yearsRequested} onChange={e => setForm(p => ({ ...p, yearsRequested: e.target.value }))}>
              <option value="1">1 year</option>
              <option value="3">3 years</option>
              <option value="5">5 years</option>
              <option value="all">All available</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Reason for Request</label>
            <select className="form-input" value={form.reason} onChange={e => setForm(p => ({ ...p, reason: e.target.value }))}>
              <option value="renewal">Renewal</option>
              <option value="new_quote">New Quote</option>
              <option value="filing">Filing</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Delivery Email(s)</label>
          <input className="form-input" value={form.deliveryEmails} onChange={e => setForm(p => ({ ...p, deliveryEmails: e.target.value }))} placeholder="Email addresses to send loss runs to (comma-separated)" />
          <span className="form-hint">If different from your email above. Separate multiple with commas.</span>
        </div>
        <div className="form-group">
          <label className="form-label">Additional Notes</label>
          <textarea className="form-input form-textarea" value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} placeholder="Any additional details or special instructions..." />
        </div>
      </div>

      {/* Disclaimer & Submit */}
      <div className="wizard-section">
        <div className="sc-disclaimer-box">
          Loss runs are obtained from the carrier and may take 5–10 business days to process.
          We will deliver them to the specified email address(es) once received.
        </div>
        <div className="form-group" style={{ marginTop: '1rem' }}>
          <label className="form-checkbox-label">
            <input type="checkbox" checked={form.agreeDisclaimer} onChange={e => setForm(p => ({ ...p, agreeDisclaimer: e.target.checked }))} />
            I understand and agree <span className="form-required">*</span>
          </label>
        </div>
        <div className="wizard-actions">
          <a href="/service-center" className="sc-btn-ghost">Cancel</a>
          <button
            type="button"
            className="sc-btn-primary"
            disabled={!form.agreeDisclaimer || !form.insuredName || !form.businessName || !form.email || submitting}
            onClick={handleSubmit}
          >
            {submitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </div>
    </div>
    </ServiceCenterLayout>
  );
}
