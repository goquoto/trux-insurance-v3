import { useState } from 'react';
import { trpc } from '../../lib/trpc';
import { useAuth } from '../../_core/hooks/useAuth';

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN',
  'IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH',
  'NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT',
  'VT','VA','WA','WV','WI','WY'
];

export default function ClaimSubmission() {
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const [form, setForm] = useState({
    // Insured info
    insuredName: user?.name || '',
    businessName: (user as any)?.title || '',
    email: user?.email || '',
    phone: '',
    policyNumber: '',
    // Claim type
    claimType: '' as '' | 'auto' | 'workers_comp' | 'cargo' | 'general_liability' | 'property',
    // Incident details
    dateOfLoss: '',
    timeOfLoss: '',
    locationStreet: '',
    locationCity: '',
    locationState: '',
    locationZip: '',
    description: '',
    policeReportFiled: false,
    policeReportNumber: '',
    // Auto-specific
    driverName: '',
    driverLicense: '',
    vehicleYear: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleVin: '',
    otherPartyInvolved: false,
    otherPartyName: '',
    otherPartyPhone: '',
    otherPartyInsurance: '',
    otherPartyVehicle: '',
    otherPartyPlate: '',
    injuries: false,
    injuryDescription: '',
    // Workers Comp-specific
    injuredWorkerName: '',
    injuredWorkerDob: '',
    injuredWorkerTitle: '',
    injuryDate: '',
    injuryTime: '',
    injuryLocation: '',
    injuryNature: '',
    bodyPartAffected: '',
    treatedAtHospital: false,
    hospitalName: '',
    missedWork: false,
    returnToWorkDate: '',
    witnessName: '',
    witnessPhone: '',
    // Submission
    agreeDisclaimer: false,
  });

  const createSubmission = trpc.submissions.create.useMutation();

  const handleSubmit = async () => {
    if (!form.agreeDisclaimer || !form.claimType) return;
    setSubmitting(true);

    try {
      const data = [
        {
          section: 'Insured Information',
          fields: [
            { label: 'Named Insured', value: form.insuredName },
            { label: 'Business Name', value: form.businessName },
            { label: 'Email', value: form.email },
            { label: 'Phone', value: form.phone },
            { label: 'Policy Number', value: form.policyNumber },
          ],
        },
        {
          section: 'Claim Type',
          fields: [{ label: 'Type', value: form.claimType.replace('_', ' ').toUpperCase() }],
        },
        {
          section: 'Incident Details',
          fields: [
            { label: 'Date of Loss', value: form.dateOfLoss },
            { label: 'Time of Loss', value: form.timeOfLoss },
            { label: 'Location', value: `${form.locationStreet}, ${form.locationCity}, ${form.locationState} ${form.locationZip}` },
            { label: 'Description', value: form.description },
            { label: 'Police Report Filed', value: form.policeReportFiled ? `Yes — #${form.policeReportNumber}` : 'No' },
          ],
        },
      ];

      if (form.claimType === 'auto') {
        data.push({
          section: 'Auto Claim Details',
          fields: [
            { label: 'Driver Name', value: form.driverName },
            { label: 'Driver License', value: form.driverLicense },
            { label: 'Vehicle', value: `${form.vehicleYear} ${form.vehicleMake} ${form.vehicleModel}` },
            { label: 'VIN', value: form.vehicleVin },
            { label: 'Other Party Involved', value: form.otherPartyInvolved ? 'Yes' : 'No' },
            ...(form.otherPartyInvolved ? [
              { label: 'Other Party Name', value: form.otherPartyName },
              { label: 'Other Party Phone', value: form.otherPartyPhone },
              { label: 'Other Party Insurance', value: form.otherPartyInsurance },
              { label: 'Other Party Vehicle', value: form.otherPartyVehicle },
              { label: 'Other Party Plate', value: form.otherPartyPlate },
            ] : []),
            { label: 'Injuries', value: form.injuries ? 'Yes' : 'No' },
            ...(form.injuries ? [{ label: 'Injury Description', value: form.injuryDescription }] : []),
          ],
        });
      }

      if (form.claimType === 'workers_comp') {
        data.push({
          section: 'Workers Compensation Details',
          fields: [
            { label: 'Injured Worker Name', value: form.injuredWorkerName },
            { label: 'Worker DOB', value: form.injuredWorkerDob },
            { label: 'Worker Title/Position', value: form.injuredWorkerTitle },
            { label: 'Injury Date', value: form.injuryDate },
            { label: 'Injury Time', value: form.injuryTime },
            { label: 'Injury Location', value: form.injuryLocation },
            { label: 'Nature of Injury', value: form.injuryNature },
            { label: 'Body Part Affected', value: form.bodyPartAffected },
            { label: 'Treated at Hospital', value: form.treatedAtHospital ? `Yes — ${form.hospitalName}` : 'No' },
            { label: 'Missed Work', value: form.missedWork ? `Yes — Return: ${form.returnToWorkDate}` : 'No' },
            { label: 'Witness', value: form.witnessName ? `${form.witnessName} (${form.witnessPhone})` : 'None' },
          ],
        });
      }

      const result = await createSubmission.mutateAsync({
        type: 'claim',
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
          <h2 className="sc-success-title" style={{ fontFamily: 'Lora, serif' }}>Claim Submitted</h2>
          <p className="sc-success-ref">Reference: <strong>{submittedRef}</strong></p>
          <p className="sc-success-message">
            Your claim has been received and assigned to a claims specialist. You'll receive a confirmation email shortly.
          </p>
          <div className="sc-disclaimer-box">
            <strong>Important:</strong> If this is an emergency or involves injuries requiring immediate medical attention,
            please call 911 first. For after-hours claims emergencies, contact your carrier directly.
          </div>
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
        <div className="sc-eyebrow">CLAIMS</div>
        <div className="sc-tick" />
        <h1 className="sc-form-title">Submit a <em>Claim</em></h1>
      </div>

      <div className="sc-disclaimer-box" style={{ marginBottom: '2rem', borderLeftColor: '#9C5A4F' }}>
        <strong>Emergency?</strong> If anyone is injured or in danger, call 911 immediately. This form is for
        reporting claims to your insurance carrier — not for emergency response.
      </div>

      {/* Insured Info */}
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
        <div className="form-group"><label className="form-label">Policy Number</label><input className="form-input" value={form.policyNumber} onChange={e => setForm(p => ({ ...p, policyNumber: e.target.value }))} /></div>
      </div>

      {/* Claim Type */}
      <div className="wizard-section">
        <h3 className="wizard-section-title">Claim Type *</h3>
        <div className="service-type-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
          {[
            { id: 'auto', label: 'Auto / Trucking', desc: 'Vehicle accident or damage' },
            { id: 'workers_comp', label: 'Workers Comp', desc: 'Employee injury on the job' },
            { id: 'cargo', label: 'Cargo', desc: 'Freight loss or damage' },
            { id: 'general_liability', label: 'General Liability', desc: 'Third-party bodily injury or property damage' },
            { id: 'property', label: 'Property', desc: 'Building, equipment, or contents' },
          ].map(ct => (
            <button
              key={ct.id}
              type="button"
              className={`service-type-card ${form.claimType === ct.id ? 'selected' : ''}`}
              onClick={() => setForm(p => ({ ...p, claimType: ct.id as any }))}
            >
              <span className="service-type-label">{ct.label}</span>
              <span className="service-type-desc">{ct.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Incident Details */}
      {form.claimType && (
        <>
          <div className="wizard-section">
            <h3 className="wizard-section-title">Incident Details</h3>
            <div className="form-row">
              <div className="form-group"><label className="form-label">Date of Loss *</label><input type="date" className="form-input" value={form.dateOfLoss} onChange={e => setForm(p => ({ ...p, dateOfLoss: e.target.value }))} required /></div>
              <div className="form-group"><label className="form-label">Time of Loss</label><input type="time" className="form-input" value={form.timeOfLoss} onChange={e => setForm(p => ({ ...p, timeOfLoss: e.target.value }))} /></div>
            </div>
            <div className="form-group"><label className="form-label">Location — Street *</label><input className="form-input" value={form.locationStreet} onChange={e => setForm(p => ({ ...p, locationStreet: e.target.value }))} required /></div>
            <div className="form-row">
              <div className="form-group"><label className="form-label">City *</label><input className="form-input" value={form.locationCity} onChange={e => setForm(p => ({ ...p, locationCity: e.target.value }))} required /></div>
              <div className="form-group">
                <label className="form-label">State *</label>
                <select className="form-input" value={form.locationState} onChange={e => setForm(p => ({ ...p, locationState: e.target.value }))} required>
                  <option value="">Select...</option>
                  {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group"><label className="form-label">ZIP</label><input className="form-input" value={form.locationZip} onChange={e => setForm(p => ({ ...p, locationZip: e.target.value }))} /></div>
            </div>
            <div className="form-group">
              <label className="form-label">Description of Incident *</label>
              <textarea className="form-input form-textarea" rows={5} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} required placeholder="Describe what happened in detail..." />
            </div>
            <div className="form-group">
              <label className="form-checkbox-label"><input type="checkbox" checked={form.policeReportFiled} onChange={e => setForm(p => ({ ...p, policeReportFiled: e.target.checked }))} /> Police report filed</label>
            </div>
            {form.policeReportFiled && (
              <div className="form-group"><label className="form-label">Report Number</label><input className="form-input" value={form.policeReportNumber} onChange={e => setForm(p => ({ ...p, policeReportNumber: e.target.value }))} /></div>
            )}
          </div>

          {/* Auto-specific fields */}
          {form.claimType === 'auto' && (
            <div className="wizard-section">
              <h3 className="wizard-section-title">Vehicle & Driver Information</h3>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Driver Name *</label><input className="form-input" value={form.driverName} onChange={e => setForm(p => ({ ...p, driverName: e.target.value }))} required /></div>
                <div className="form-group"><label className="form-label">Driver License #</label><input className="form-input" value={form.driverLicense} onChange={e => setForm(p => ({ ...p, driverLicense: e.target.value }))} /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Year</label><input className="form-input" value={form.vehicleYear} onChange={e => setForm(p => ({ ...p, vehicleYear: e.target.value }))} /></div>
                <div className="form-group"><label className="form-label">Make</label><input className="form-input" value={form.vehicleMake} onChange={e => setForm(p => ({ ...p, vehicleMake: e.target.value }))} /></div>
                <div className="form-group"><label className="form-label">Model</label><input className="form-input" value={form.vehicleModel} onChange={e => setForm(p => ({ ...p, vehicleModel: e.target.value }))} /></div>
              </div>
              <div className="form-group"><label className="form-label">VIN</label><input className="form-input" value={form.vehicleVin} onChange={e => setForm(p => ({ ...p, vehicleVin: e.target.value }))} style={{ fontFamily: 'monospace', textTransform: 'uppercase' }} /></div>

              <div className="form-group" style={{ marginTop: '1.5rem' }}>
                <label className="form-checkbox-label"><input type="checkbox" checked={form.otherPartyInvolved} onChange={e => setForm(p => ({ ...p, otherPartyInvolved: e.target.checked }))} /> Other party involved</label>
              </div>
              {form.otherPartyInvolved && (
                <>
                  <div className="form-row">
                    <div className="form-group"><label className="form-label">Other Party Name</label><input className="form-input" value={form.otherPartyName} onChange={e => setForm(p => ({ ...p, otherPartyName: e.target.value }))} /></div>
                    <div className="form-group"><label className="form-label">Other Party Phone</label><input type="tel" className="form-input" value={form.otherPartyPhone} onChange={e => setForm(p => ({ ...p, otherPartyPhone: e.target.value }))} /></div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label className="form-label">Their Insurance Company</label><input className="form-input" value={form.otherPartyInsurance} onChange={e => setForm(p => ({ ...p, otherPartyInsurance: e.target.value }))} /></div>
                    <div className="form-group"><label className="form-label">Their Vehicle</label><input className="form-input" value={form.otherPartyVehicle} onChange={e => setForm(p => ({ ...p, otherPartyVehicle: e.target.value }))} /></div>
                    <div className="form-group"><label className="form-label">Their Plate #</label><input className="form-input" value={form.otherPartyPlate} onChange={e => setForm(p => ({ ...p, otherPartyPlate: e.target.value }))} /></div>
                  </div>
                </>
              )}

              <div className="form-group" style={{ marginTop: '1.5rem' }}>
                <label className="form-checkbox-label"><input type="checkbox" checked={form.injuries} onChange={e => setForm(p => ({ ...p, injuries: e.target.checked }))} /> Injuries reported</label>
              </div>
              {form.injuries && (
                <div className="form-group"><label className="form-label">Describe injuries</label><textarea className="form-input form-textarea" value={form.injuryDescription} onChange={e => setForm(p => ({ ...p, injuryDescription: e.target.value }))} /></div>
              )}
            </div>
          )}

          {/* Workers Comp-specific fields */}
          {form.claimType === 'workers_comp' && (
            <div className="wizard-section">
              <h3 className="wizard-section-title">Injured Worker Information</h3>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Worker Name *</label><input className="form-input" value={form.injuredWorkerName} onChange={e => setForm(p => ({ ...p, injuredWorkerName: e.target.value }))} required /></div>
                <div className="form-group"><label className="form-label">Date of Birth</label><input type="date" className="form-input" value={form.injuredWorkerDob} onChange={e => setForm(p => ({ ...p, injuredWorkerDob: e.target.value }))} /></div>
              </div>
              <div className="form-group"><label className="form-label">Job Title / Position</label><input className="form-input" value={form.injuredWorkerTitle} onChange={e => setForm(p => ({ ...p, injuredWorkerTitle: e.target.value }))} /></div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Injury Date *</label><input type="date" className="form-input" value={form.injuryDate} onChange={e => setForm(p => ({ ...p, injuryDate: e.target.value }))} required /></div>
                <div className="form-group"><label className="form-label">Injury Time</label><input type="time" className="form-input" value={form.injuryTime} onChange={e => setForm(p => ({ ...p, injuryTime: e.target.value }))} /></div>
              </div>
              <div className="form-group"><label className="form-label">Where did the injury occur? *</label><input className="form-input" value={form.injuryLocation} onChange={e => setForm(p => ({ ...p, injuryLocation: e.target.value }))} required /></div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Nature of Injury *</label><input className="form-input" value={form.injuryNature} onChange={e => setForm(p => ({ ...p, injuryNature: e.target.value }))} required placeholder="e.g., Sprain, fracture, laceration..." /></div>
                <div className="form-group"><label className="form-label">Body Part Affected *</label><input className="form-input" value={form.bodyPartAffected} onChange={e => setForm(p => ({ ...p, bodyPartAffected: e.target.value }))} required placeholder="e.g., Lower back, right knee..." /></div>
              </div>
              <div className="form-group">
                <label className="form-checkbox-label"><input type="checkbox" checked={form.treatedAtHospital} onChange={e => setForm(p => ({ ...p, treatedAtHospital: e.target.checked }))} /> Treated at hospital/clinic</label>
              </div>
              {form.treatedAtHospital && (
                <div className="form-group"><label className="form-label">Hospital/Clinic Name</label><input className="form-input" value={form.hospitalName} onChange={e => setForm(p => ({ ...p, hospitalName: e.target.value }))} /></div>
              )}
              <div className="form-group">
                <label className="form-checkbox-label"><input type="checkbox" checked={form.missedWork} onChange={e => setForm(p => ({ ...p, missedWork: e.target.checked }))} /> Worker has missed work</label>
              </div>
              {form.missedWork && (
                <div className="form-group"><label className="form-label">Expected Return Date</label><input type="date" className="form-input" value={form.returnToWorkDate} onChange={e => setForm(p => ({ ...p, returnToWorkDate: e.target.value }))} /></div>
              )}
              <div className="form-row">
                <div className="form-group"><label className="form-label">Witness Name</label><input className="form-input" value={form.witnessName} onChange={e => setForm(p => ({ ...p, witnessName: e.target.value }))} /></div>
                <div className="form-group"><label className="form-label">Witness Phone</label><input type="tel" className="form-input" value={form.witnessPhone} onChange={e => setForm(p => ({ ...p, witnessPhone: e.target.value }))} /></div>
              </div>
            </div>
          )}

          {/* Disclaimer & Submit */}
          <div className="wizard-section">
            <div className="sc-disclaimer-box">
              By submitting this claim, I certify that the information provided is true and accurate to the best of my knowledge.
              I understand that submitting false information may result in denial of the claim and potential legal consequences.
              This submission initiates the claims process — a claims adjuster will contact you within 1–2 business days.
            </div>
            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label className="form-checkbox-label">
                <input type="checkbox" checked={form.agreeDisclaimer} onChange={e => setForm(p => ({ ...p, agreeDisclaimer: e.target.checked }))} />
                I certify the above information is true and accurate *
              </label>
            </div>
            <div className="wizard-actions">
              <a href="/service-center" className="sc-btn-ghost">Cancel</a>
              <button
                type="button"
                className="sc-btn-primary"
                disabled={!form.agreeDisclaimer || !form.claimType || !form.dateOfLoss || submitting}
                onClick={handleSubmit}
              >
                {submitting ? 'Submitting...' : 'Submit Claim'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
