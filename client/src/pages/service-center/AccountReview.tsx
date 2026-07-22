import { useState } from 'react';
import { trpc } from '../../lib/trpc';
import { useAuth } from '../../_core/hooks/useAuth';

export default function AccountReview() {
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const [form, setForm] = useState({
    insuredName: user?.name || '',
    businessName: (user as any)?.title || '',
    email: user?.email || '',
    phone: '',
    preferredAgent: '',
    preferredDate: '',
    preferredTime: '',
    alternateDate: '',
    alternateTime: '',
    contactMethod: 'phone' as 'phone' | 'email' | 'video',
    smsConsent: false,
    topics: [] as string[],
    notes: '',
    agreeDisclaimer: false,
  });

  const createSubmission = trpc.submissions.create.useMutation();

  const TOPICS = [
    'Policy renewal review',
    'Coverage adequacy check',
    'Premium reduction options',
    'Fleet expansion planning',
    'Claims history review',
    'Compliance & filings',
    'Payment plan options',
    'General questions',
  ];

  const toggleTopic = (topic: string) => {
    setForm(prev => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter(t => t !== topic)
        : [...prev.topics, topic],
    }));
  };

  const handleSubmit = async () => {
    if (!form.agreeDisclaimer) return;
    setSubmitting(true);

    try {
      const data = [
        {
          section: 'Contact Information',
          fields: [
            { label: 'Named Insured', value: form.insuredName },
            { label: 'Business Name', value: form.businessName },
            { label: 'Email', value: form.email },
            { label: 'Phone', value: form.phone },
            { label: 'SMS Consent', value: form.smsConsent ? 'Yes' : 'No' },
          ],
        },
        {
          section: 'Appointment Preferences',
          fields: [
            { label: 'Preferred Agent', value: form.preferredAgent || 'No preference' },
            { label: 'Preferred Date/Time', value: `${form.preferredDate} at ${form.preferredTime}` },
            { label: 'Alternate Date/Time', value: form.alternateDate ? `${form.alternateDate} at ${form.alternateTime}` : 'None' },
            { label: 'Contact Method', value: form.contactMethod },
          ],
        },
        {
          section: 'Discussion Topics',
          fields: [
            { label: 'Topics', value: form.topics.join(', ') || 'Not specified' },
            { label: 'Additional Notes', value: form.notes || 'None' },
          ],
        },
      ];

      const result = await createSubmission.mutateAsync({
        type: 'account_review',
        customerEmail: form.email,
        userId: user?.id,
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
          <h2 className="sc-success-title" style={{ fontFamily: 'Lora, serif' }}>Appointment Requested</h2>
          <p className="sc-success-ref">Reference: <strong>{submittedRef}</strong></p>
          <p className="sc-success-message">
            Your account review request has been received. An agent will confirm your appointment within 1 business day.
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
        <div className="sc-eyebrow">ACCOUNT REVIEW</div>
        <div className="sc-tick" />
        <h1 className="sc-form-title">Schedule an <em>Account Review</em></h1>
      </div>

      {/* Contact Info */}
      <div className="wizard-section">
        <h3 className="wizard-section-title">Your Information</h3>
        <div className="form-row">
          <div className="form-group"><label className="form-label">Named Insured *</label><input className="form-input" value={form.insuredName} onChange={e => setForm(p => ({ ...p, insuredName: e.target.value }))} required /></div>
          <div className="form-group"><label className="form-label">Business Name *</label><input className="form-input" value={form.businessName} onChange={e => setForm(p => ({ ...p, businessName: e.target.value }))} required /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label className="form-label">Email *</label><input type="email" className="form-input" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required /></div>
          <div className="form-group"><label className="form-label">Phone *</label><input type="tel" className="form-input" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} required /></div>
        </div>
        <div className="form-group">
          <label className="form-checkbox-label">
            <input type="checkbox" checked={form.smsConsent} onChange={e => setForm(p => ({ ...p, smsConsent: e.target.checked }))} />
            I consent to receive SMS text messages regarding my account
          </label>
          <span className="form-hint">Standard message and data rates may apply. You can opt out at any time.</span>
        </div>
      </div>

      {/* Appointment Preferences */}
      <div className="wizard-section">
        <h3 className="wizard-section-title">Appointment Preferences</h3>
        <div className="form-group">
          <label className="form-label">Preferred Agent</label>
          <select className="form-input" value={form.preferredAgent} onChange={e => setForm(p => ({ ...p, preferredAgent: e.target.value }))}>
            <option value="">No preference</option>
            <option value="Milen Milev">Milen Milev</option>
            <option value="Trux Team">Trux Team</option>
          </select>
        </div>
        <div className="form-row">
          <div className="form-group"><label className="form-label">Preferred Date *</label><input type="date" className="form-input" value={form.preferredDate} onChange={e => setForm(p => ({ ...p, preferredDate: e.target.value }))} required /></div>
          <div className="form-group"><label className="form-label">Preferred Time *</label><input type="time" className="form-input" value={form.preferredTime} onChange={e => setForm(p => ({ ...p, preferredTime: e.target.value }))} required /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label className="form-label">Alternate Date</label><input type="date" className="form-input" value={form.alternateDate} onChange={e => setForm(p => ({ ...p, alternateDate: e.target.value }))} /></div>
          <div className="form-group"><label className="form-label">Alternate Time</label><input type="time" className="form-input" value={form.alternateTime} onChange={e => setForm(p => ({ ...p, alternateTime: e.target.value }))} /></div>
        </div>
        <div className="form-group">
          <label className="form-label">How would you like to meet?</label>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            {(['phone', 'email', 'video'] as const).map(m => (
              <label key={m} className="form-checkbox-label" style={{ cursor: 'pointer' }}>
                <input type="radio" name="contactMethod" value={m} checked={form.contactMethod === m} onChange={() => setForm(p => ({ ...p, contactMethod: m }))} />
                {m === 'phone' ? 'Phone Call' : m === 'email' ? 'Email' : 'Video Call'}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Topics */}
      <div className="wizard-section">
        <h3 className="wizard-section-title">What would you like to discuss?</h3>
        <div className="service-type-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          {TOPICS.map(topic => (
            <button
              key={topic}
              type="button"
              className={`service-type-card ${form.topics.includes(topic) ? 'selected' : ''}`}
              onClick={() => toggleTopic(topic)}
            >
              <span className="service-type-label">{topic}</span>
            </button>
          ))}
        </div>
        <div className="form-group" style={{ marginTop: '1.5rem' }}>
          <label className="form-label">Additional Notes</label>
          <textarea className="form-input form-textarea" value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} placeholder="Anything else you'd like us to prepare for..." />
        </div>
      </div>

      {/* Submit */}
      <div className="wizard-section">
        <div className="form-group">
          <label className="form-checkbox-label">
            <input type="checkbox" checked={form.agreeDisclaimer} onChange={e => setForm(p => ({ ...p, agreeDisclaimer: e.target.checked }))} />
            I understand this is a request and my appointment will be confirmed by an agent *
          </label>
        </div>
        <div className="wizard-actions">
          <a href="/service-center" className="sc-btn-ghost">Cancel</a>
          <button
            type="button"
            className="sc-btn-primary"
            disabled={!form.agreeDisclaimer || !form.preferredDate || !form.email || submitting}
            onClick={handleSubmit}
          >
            {submitting ? 'Submitting...' : 'Request Appointment'}
          </button>
        </div>
      </div>
    </div>
  );
}
