import { useState, useMemo } from 'react';
import { trpc } from '../../lib/trpc';
import { useAuth } from '../../_core/hooks/useAuth';
import { VinVerifier, type VinDecodeResult } from '../../components/VinVerifier';
import AgentIntakeBar from '../../components/AgentIntakeBar';
import ServiceCenterLayout from '../../components/ServiceCenterLayout';

// Section types for the picker — merged "Vehicle Change" replaces Add/Delete Equipment
const SECTION_TYPES = [
  { id: 'vehicleChange', label: 'Vehicle Change', desc: 'Add or remove trucks, trailers, or units' },
  { id: 'driverChanges', label: 'Driver Change', desc: 'Add or delete drivers' },
  { id: 'addresses', label: 'Addresses', desc: 'Change mailing, physical, or garaging' },
  { id: 'lienholders', label: 'Lien Holders', desc: 'Add or update lien holder info' },
  { id: 'certificate', label: 'Certificate of Insurance', desc: 'Request a COI' },
  { id: 'coverage', label: 'Coverage Change / General Request', desc: 'Modify coverage or other needs' },
] as const;

type SectionType = typeof SECTION_TYPES[number]['id'];

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN',
  'IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH',
  'NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT',
  'VT','VA','WA','WV','WI','WY'
];

const POLICY_OPTIONS = ['Liability', 'Cargo', 'Physical Damage'] as const;

// --- Interfaces ---
interface VehicleChangeRow {
  id: string;
  action: 'add' | 'delete' | '';
  policies: string[]; // Liability, Cargo, Physical Damage
  year: string;
  make: string;
  model: string;
  vin: string;
  ownedBy: string;
  value: string;
  documentation: string; // for delete: Termination Letter, Bill of Sale, Police Report
  vinResult: VinDecodeResult | null;
  isTrailer: boolean;
}

interface DriverChangeRow {
  id: string;
  action: 'add' | 'delete' | '';
  policies: string[];
  mvrIncluded: string;
  firstName: string;
  lastName: string;
  dob: string;
  cdl: string;
  state: string;
  yearsExp: string;
}

interface FormData {
  // Step 1
  businessName: string;
  changeDate: string;
  insuredFirst: string;
  insuredLast: string;
  insuredEmail: string;
  phone: string;
  policyNumber: string;
  requestedBy: string;
  serviceTypes: SectionType[];
  // Step 2 — Vehicle Change
  vehicleChanges: VehicleChangeRow[];
  lossPayee: string;
  additionalInsured: string;
  contractProvided: string;
  // Step 2 — Driver Change
  driverChanges: DriverChangeRow[];
  // Step 2 — Addresses
  changeMailingAddress: boolean;
  mailingStreet: string; mailingCity: string; mailingState: string; mailingZip: string;
  changePhysicalAddress: boolean;
  physicalStreet: string; physicalCity: string; physicalState: string; physicalZip: string;
  changeGaragingAddress: boolean;
  garagingStreet: string; garagingCity: string; garagingState: string; garagingZip: string;
  // Step 2 — Lien Holders
  lienVehicle: boolean; lienBusiness: boolean;
  lienHolderName: string; lienNameLine2: string; lienAddress1: string; lienAddress2: string;
  lienCity: string; lienState: string; lienZip: string; lienLoanNumber: string; lienPosition: string; lienBillTo: string;
  vehicleLienVehicle: string; vehicleLienName: string; vehicleLienLoanNumber: string;
  // Step 2 — COI
  coiEmail: string; coiHolderName: string; coiAddress1: string; coiAddress2: string;
  coiCity: string; coiState: string; coiZip: string; coiDetails: string;
  coiIncludeVehicleSchedule: boolean; coiIncludeDriverSchedule: boolean; coiAdditionalInsured: boolean;
  // Step 2 — Coverage
  coverageDetails: string;
  // File uploads
  vehicleFiles: File[];
  driverFiles: File[];
  // Step 3
  agreeDisclaimer: boolean;
  signature: string;
  signatureDate: string;
}

const makeVehicleRow = (): VehicleChangeRow => ({
  id: crypto.randomUUID(), action: '', policies: [], year: '', make: '', model: '', vin: '', ownedBy: '', value: '', documentation: '', vinResult: null, isTrailer: false,
});
const makeDriverRow = (): DriverChangeRow => ({
  id: crypto.randomUUID(), action: '', policies: [], mvrIncluded: 'No', firstName: '', lastName: '', dob: '', cdl: '', state: '', yearsExp: '',
});

export default function PolicyChangeWizard() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [intakeCustomer, setIntakeCustomer] = useState<{ id: number; name: string; email: string; title: string | null } | null>(null);

  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState<FormData>({
    businessName: (user as any)?.title || '',
    changeDate: today,
    insuredFirst: user?.name?.split(' ')[0] || '',
    insuredLast: user?.name?.split(' ').slice(1).join(' ') || '',
    insuredEmail: user?.email || '',
    phone: '',
    policyNumber: '',
    requestedBy: user?.name || '',
    serviceTypes: [],
    vehicleChanges: [makeVehicleRow()],
    lossPayee: '',
    additionalInsured: '',
    contractProvided: '',
    driverChanges: [makeDriverRow()],
    changeMailingAddress: false, mailingStreet: '', mailingCity: '', mailingState: '', mailingZip: '',
    changePhysicalAddress: false, physicalStreet: '', physicalCity: '', physicalState: '', physicalZip: '',
    changeGaragingAddress: false, garagingStreet: '', garagingCity: '', garagingState: '', garagingZip: '',
    lienVehicle: false, lienBusiness: false,
    lienHolderName: '', lienNameLine2: '', lienAddress1: '', lienAddress2: '',
    lienCity: '', lienState: '', lienZip: '', lienLoanNumber: '', lienPosition: 'First Mortgagee', lienBillTo: 'Mortgagee',
    vehicleLienVehicle: '', vehicleLienName: '', vehicleLienLoanNumber: '',
    coiEmail: '', coiHolderName: '', coiAddress1: '', coiAddress2: '',
    coiCity: '', coiState: '', coiZip: '', coiDetails: '',
    coiIncludeVehicleSchedule: false, coiIncludeDriverSchedule: false, coiAdditionalInsured: false,
    coverageDetails: '',
    vehicleFiles: [],
    driverFiles: [],
    agreeDisclaimer: false,
    signature: '',
    signatureDate: today,
  });

  const createSubmission = trpc.submissions.create.useMutation();

  // Validation helpers
  const allVinsVerified = useMemo(() => {
    if (!form.serviceTypes.includes('vehicleChange')) return true;
    return form.vehicleChanges.every(r => {
      if (!r.vin) return true;
      return r.vinResult?.status === 'verified' || r.vinResult?.status === 'warning';
    });
  }, [form.vehicleChanges, form.serviceTypes]);

  const toggleSection = (type: SectionType) => {
    setForm(prev => ({
      ...prev,
      serviceTypes: prev.serviceTypes.includes(type)
        ? prev.serviceTypes.filter(t => t !== type)
        : [...prev.serviceTypes, type],
    }));
  };

  const togglePolicy = (rowId: string, section: 'vehicleChanges' | 'driverChanges', policy: string) => {
    setForm(prev => {
      const arr = [...prev[section]] as any[];
      const idx = arr.findIndex((r: any) => r.id === rowId);
      if (idx === -1) return prev;
      const current: string[] = arr[idx].policies;
      arr[idx] = { ...arr[idx], policies: current.includes(policy) ? current.filter(p => p !== policy) : [...current, policy] };
      return { ...prev, [section]: arr };
    });
  };

  const canAdvanceToStep2 = form.serviceTypes.length > 0 && form.businessName && form.insuredEmail && form.changeDate;
  const canAdvanceToStep3 = allVinsVerified;

  const handleSubmit = async () => {
    if (!form.agreeDisclaimer || !form.signature) return;
    setSubmitting(true);

    try {
      const data: Array<{ section: string; fields: Array<{ label: string; value: any }> }> = [];

      // Request Info
      data.push({
        section: 'Request Information',
        fields: [
          { label: 'Business Name', value: form.businessName },
          { label: 'Effective Date', value: form.changeDate },
          { label: 'Primary Insured', value: `${form.insuredFirst} ${form.insuredLast}` },
          { label: 'Email', value: form.insuredEmail },
          { label: 'Phone', value: form.phone },
          { label: 'Policy Number(s)', value: form.policyNumber },
          { label: 'Requested By', value: form.requestedBy },
          { label: 'Sections', value: form.serviceTypes.join(', ') },
        ],
      });

      // Vehicle Changes
      if (form.serviceTypes.includes('vehicleChange')) {
        const rows = form.vehicleChanges.filter(r => r.action);
        const fields: Array<{ label: string; value: any }> = [];
        rows.forEach((r, i) => {
          fields.push({ label: `Unit ${i + 1} Action`, value: r.action === 'add' ? 'Add' : 'Delete' });
          fields.push({ label: `Unit ${i + 1} Policies`, value: r.policies.join(', ') });
          fields.push({ label: `Unit ${i + 1} Year`, value: r.year });
          fields.push({ label: `Unit ${i + 1} Make`, value: r.make });
          fields.push({ label: `Unit ${i + 1} VIN`, value: r.vin });
          if (r.action === 'add') {
            fields.push({ label: `Unit ${i + 1} Owned By`, value: r.ownedBy });
            fields.push({ label: `Unit ${i + 1} Value`, value: r.value });
          }
          if (r.action === 'delete') {
            fields.push({ label: `Unit ${i + 1} Documentation`, value: r.documentation });
          }
        });
        if (form.lossPayee) fields.push({ label: 'Loss Payee', value: form.lossPayee });
        if (form.additionalInsured) fields.push({ label: 'Additional Insured', value: form.additionalInsured });
        if (form.contractProvided) fields.push({ label: 'Contract Provided', value: form.contractProvided });
        if (form.vehicleFiles.length > 0) fields.push({ label: 'Files Attached', value: form.vehicleFiles.map(f => f.name).join(', ') });
        data.push({ section: 'Vehicle Changes', fields });
      }

      // Driver Changes
      if (form.serviceTypes.includes('driverChanges')) {
        const rows = form.driverChanges.filter(r => r.action);
        const fields: Array<{ label: string; value: any }> = [];
        rows.forEach((r, i) => {
          fields.push({ label: `Driver ${i + 1} Action`, value: r.action });
          fields.push({ label: `Driver ${i + 1} Policies`, value: r.policies.join(', ') });
          fields.push({ label: `Driver ${i + 1} MVR Included`, value: r.mvrIncluded });
          fields.push({ label: `Driver ${i + 1} Name`, value: `${r.firstName} ${r.lastName}` });
          fields.push({ label: `Driver ${i + 1} DOB`, value: r.dob });
          fields.push({ label: `Driver ${i + 1} CDL`, value: r.cdl });
          fields.push({ label: `Driver ${i + 1} State`, value: r.state });
          fields.push({ label: `Driver ${i + 1} Years Exp`, value: r.yearsExp });
        });
        if (form.driverFiles.length > 0) fields.push({ label: 'Files Attached', value: form.driverFiles.map(f => f.name).join(', ') });
        data.push({ section: 'Driver Changes', fields });
      }

      // Addresses
      if (form.serviceTypes.includes('addresses')) {
        const fields: Array<{ label: string; value: any }> = [];
        if (form.changeMailingAddress) fields.push({ label: 'Mailing Address', value: `${form.mailingStreet}, ${form.mailingCity}, ${form.mailingState} ${form.mailingZip}` });
        if (form.changePhysicalAddress) fields.push({ label: 'Physical Address', value: `${form.physicalStreet}, ${form.physicalCity}, ${form.physicalState} ${form.physicalZip}` });
        if (form.changeGaragingAddress) fields.push({ label: 'Garaging Address', value: `${form.garagingStreet}, ${form.garagingCity}, ${form.garagingState} ${form.garagingZip}` });
        data.push({ section: 'Addresses', fields });
      }

      // Lien Holders
      if (form.serviceTypes.includes('lienholders')) {
        const fields: Array<{ label: string; value: any }> = [];
        if (form.lienBusiness) {
          fields.push({ label: 'Lien Holder Name', value: form.lienHolderName });
          fields.push({ label: 'Address', value: `${form.lienAddress1} ${form.lienAddress2}, ${form.lienCity}, ${form.lienState} ${form.lienZip}` });
          fields.push({ label: 'Loan Number', value: form.lienLoanNumber });
          fields.push({ label: 'Position', value: form.lienPosition });
          fields.push({ label: 'Bill To', value: form.lienBillTo });
        }
        if (form.lienVehicle) {
          fields.push({ label: 'Vehicle Lien - Vehicle', value: form.vehicleLienVehicle });
          fields.push({ label: 'Vehicle Lien - Holder', value: form.vehicleLienName });
          fields.push({ label: 'Vehicle Lien - Loan #', value: form.vehicleLienLoanNumber });
        }
        data.push({ section: 'Lien Holders', fields });
      }

      // Certificate
      if (form.serviceTypes.includes('certificate')) {
        data.push({
          section: 'Certificate of Insurance',
          fields: [
            { label: 'Email to Send COI', value: form.coiEmail },
            { label: 'Certificate Holder', value: form.coiHolderName },
            { label: 'Address', value: `${form.coiAddress1} ${form.coiAddress2}, ${form.coiCity}, ${form.coiState} ${form.coiZip}` },
            { label: 'Details', value: form.coiDetails },
            { label: 'Include Vehicle Schedule', value: form.coiIncludeVehicleSchedule ? 'Yes' : 'No' },
            { label: 'Include Driver Schedule', value: form.coiIncludeDriverSchedule ? 'Yes' : 'No' },
            { label: 'Additional Insured', value: form.coiAdditionalInsured ? 'Yes' : 'No' },
          ],
        });
      }

      // Coverage / General
      if (form.serviceTypes.includes('coverage')) {
        data.push({ section: 'Coverage Change / General Request', fields: [{ label: 'Details', value: form.coverageDetails }] });
      }

      // Authorization
      data.push({
        section: 'Authorization',
        fields: [
          { label: 'Electronic Signature', value: form.signature },
          { label: 'Signature Date', value: form.signatureDate },
          { label: 'Disclaimer Agreed', value: 'Yes' },
        ],
      });

      const result = await createSubmission.mutateAsync({
        type: 'policy_change',
        customerEmail: intakeCustomer?.email || form.insuredEmail,
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

  // --- Success Screen ---
  if (submittedRef) {
    return (
      <ServiceCenterLayout>
      <div className="pcw">
        <div className="pcw-success">
          <div className="pcw-success-icon">✓</div>
          <h2 className="pcw-success-title">Request Submitted</h2>
          <p className="pcw-success-ref">Reference: <strong>{submittedRef}</strong></p>
          <p className="pcw-success-msg">Your policy change request has been received. A confirmation has been sent to {form.insuredEmail}.</p>
          <div className="pcw-disclaimer">
            Any change requested through this form is only a request for service and does not alter your policy
            until formal confirmation and endorsement is received from the carrier. Coverage cannot be bound by
            email, voicemail, or fax.
          </div>
          <a href="/service-center" className="pcw-btn-solid" style={{ display: 'inline-block', marginTop: '1.5rem', textDecoration: 'none' }}>
            Back to Service Center
          </a>
        </div>
      </div>
      </ServiceCenterLayout>
    );
  }

  return (
    <ServiceCenterLayout>
    <div className="pcw">
      {/* Header */}
      <div className="pcw-header">
        <span className="pcw-eyebrow">POLICY CHANGE</span>
        <div className="pcw-tick" />
        <h1 className="pcw-title">Request <em>Policy</em> Change</h1>
      </div>

      {/* Agent Intake */}
      <AgentIntakeBar onCustomerSelect={setIntakeCustomer} selectedCustomer={intakeCustomer} />

      {/* Progress Bar */}
      <div className="pcw-progress">
        <div className={`pcw-progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'done' : ''}`}>
          <span className="pcw-progress-num">1</span>
          <span className="pcw-progress-label">Request Info</span>
        </div>
        <div className="pcw-progress-line" />
        <div className={`pcw-progress-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'done' : ''}`}>
          <span className="pcw-progress-num">2</span>
          <span className="pcw-progress-label">Change Details</span>
        </div>
        <div className="pcw-progress-line" />
        <div className={`pcw-progress-step ${step >= 3 ? 'active' : ''}`}>
          <span className="pcw-progress-num">3</span>
          <span className="pcw-progress-label">Review & Submit</span>
        </div>
      </div>

      {/* ═══════════════ STEP 1 ═══════════════ */}
      {step === 1 && (
        <div className="pcw-step">
          <div className="pcw-field-grid">
            <div className="pcw-field pcw-field-full">
              <label className="pcw-label">Company Name (Named Insured) *</label>
              <input className="pcw-input" value={form.businessName} onChange={e => setForm(p => ({ ...p, businessName: e.target.value }))} required />
            </div>
            <div className="pcw-field">
              <label className="pcw-label">Effective Date *</label>
              <input type="date" className="pcw-input" value={form.changeDate} min={today} onChange={e => setForm(p => ({ ...p, changeDate: e.target.value }))} />
              <span className="pcw-hint">Backdating is not permitted</span>
            </div>
            <div className="pcw-field">
              <label className="pcw-label">Policy Number(s)</label>
              <input className="pcw-input" value={form.policyNumber} onChange={e => setForm(p => ({ ...p, policyNumber: e.target.value }))} placeholder="May list several" />
            </div>
            <div className="pcw-field">
              <label className="pcw-label">Primary Insured First Name</label>
              <input className="pcw-input" value={form.insuredFirst} onChange={e => setForm(p => ({ ...p, insuredFirst: e.target.value }))} />
            </div>
            <div className="pcw-field">
              <label className="pcw-label">Primary Insured Last Name</label>
              <input className="pcw-input" value={form.insuredLast} onChange={e => setForm(p => ({ ...p, insuredLast: e.target.value }))} />
            </div>
            <div className="pcw-field">
              <label className="pcw-label">Email *</label>
              <input type="email" className="pcw-input" value={form.insuredEmail} onChange={e => setForm(p => ({ ...p, insuredEmail: e.target.value }))} required />
            </div>
            <div className="pcw-field">
              <label className="pcw-label">Phone</label>
              <input type="tel" className="pcw-input" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
            </div>
            <div className="pcw-field pcw-field-full">
              <label className="pcw-label">Requested By</label>
              <input className="pcw-input" value={form.requestedBy} onChange={e => setForm(p => ({ ...p, requestedBy: e.target.value }))} />
            </div>
          </div>

          {/* Section Picker */}
          <div className="pcw-section-picker">
            <label className="pcw-label">What do you need changed? *</label>
            <p className="pcw-hint">Select all that apply — one submission can combine multiple sections</p>
            <div className="pcw-card-grid">
              {SECTION_TYPES.map(st => (
                <button
                  key={st.id}
                  type="button"
                  className={`pcw-card ${form.serviceTypes.includes(st.id) ? 'selected' : ''}`}
                  onClick={() => toggleSection(st.id)}
                >
                  <span className="pcw-card-check">{form.serviceTypes.includes(st.id) ? '✓' : ''}</span>
                  <span className="pcw-card-label">{st.label}</span>
                  <span className="pcw-card-desc">{st.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pcw-actions">
            <a href="/service-center" className="pcw-btn-ghost">Cancel</a>
            <button type="button" className="pcw-btn-solid" disabled={!canAdvanceToStep2} onClick={() => setStep(2)}>Continue</button>
          </div>
        </div>
      )}

      {/* ═══════════════ STEP 2 ═══════════════ */}
      {step === 2 && (
        <div className="pcw-step">

          {/* VEHICLE CHANGE (merged Add + Delete) */}
          {form.serviceTypes.includes('vehicleChange') && (
            <div className="pcw-section">
              <h3 className="pcw-section-title">Vehicle Change</h3>
              <p className="pcw-hint" style={{ marginBottom: '1rem' }}>Select "Add" or "Delete" for each unit. You can mix actions in one submission.</p>

              {form.vehicleChanges.map((row, idx) => (
                <div key={row.id} className="pcw-row">
                  <div className="pcw-row-head">
                    <span className="pcw-row-num">Unit {idx + 1}{row.isTrailer ? ' · Trailer' : ''}</span>
                    {form.vehicleChanges.length > 1 && (
                      <button type="button" className="pcw-row-remove" onClick={() => setForm(p => ({ ...p, vehicleChanges: p.vehicleChanges.filter(r => r.id !== row.id) }))}>Remove</button>
                    )}
                  </div>
                  <div className="pcw-field-grid">
                    <div className="pcw-field">
                      <label className="pcw-label">Action *</label>
                      <select className="pcw-input" value={row.action} onChange={e => setForm(p => ({ ...p, vehicleChanges: p.vehicleChanges.map(r => r.id === row.id ? { ...r, action: e.target.value as any } : r) }))}>
                        <option value="">Select...</option>
                        <option value="add">Add to Policy</option>
                        <option value="delete">Delete from Policy</option>
                      </select>
                    </div>
                  </div>
                  <div className="pcw-policy-checks">
                    <span className="pcw-label">{row.action === 'delete' ? 'Delete from:' : 'Add to:'} *</span>
                    {POLICY_OPTIONS.map(p => (
                      <label key={p} className="pcw-check-label">
                        <input type="checkbox" checked={row.policies.includes(p)} onChange={() => togglePolicy(row.id, 'vehicleChanges', p)} />
                        {p}
                      </label>
                    ))}
                  </div>
                  <div className="pcw-field-grid">
                    <div className="pcw-field pcw-field-full">
                      <label className="pcw-label">Complete VIN *</label>
                      <VinVerifier
                        value={row.vin}
                        onChange={(vin) => {
                          setForm(p => ({ ...p, vehicleChanges: p.vehicleChanges.map(r => r.id === row.id ? { ...r, vin } : r) }));
                        }}
                        onVerified={(result) => {
                          setForm(p => ({
                            ...p,
                            vehicleChanges: p.vehicleChanges.map(r => r.id === row.id ? {
                              ...r,
                              vinResult: result,
                              isTrailer: result?.isTrailer || false,
                              year: result?.data?.ModelYear || r.year,
                              make: result?.data?.Make || r.make,
                              model: result?.data?.Model || r.model,
                            } : r),
                          }));
                        }}
                        required
                      />
                    </div>
                    <div className="pcw-field">
                      <label className="pcw-label">Year</label>
                      <input className="pcw-input" value={row.year} onChange={e => setForm(p => ({ ...p, vehicleChanges: p.vehicleChanges.map(r => r.id === row.id ? { ...r, year: e.target.value } : r) }))} />
                    </div>
                    <div className="pcw-field">
                      <label className="pcw-label">Make</label>
                      <input className="pcw-input" value={row.make} onChange={e => setForm(p => ({ ...p, vehicleChanges: p.vehicleChanges.map(r => r.id === row.id ? { ...r, make: e.target.value } : r) }))} />
                    </div>
                    {/* Add-only fields */}
                    {row.action === 'add' && (
                      <>
                        <div className="pcw-field">
                          <label className="pcw-label">Owned By</label>
                          <input className="pcw-input" value={row.ownedBy} onChange={e => setForm(p => ({ ...p, vehicleChanges: p.vehicleChanges.map(r => r.id === row.id ? { ...r, ownedBy: e.target.value } : r) }))} />
                        </div>
                        <div className="pcw-field">
                          <label className="pcw-label">Value</label>
                          <input className="pcw-input" value={row.value} onChange={e => setForm(p => ({ ...p, vehicleChanges: p.vehicleChanges.map(r => r.id === row.id ? { ...r, value: e.target.value } : r) }))} placeholder="$" />
                        </div>
                      </>
                    )}
                    {/* Delete-only fields */}
                    {row.action === 'delete' && (
                      <div className="pcw-field pcw-field-full">
                        <label className="pcw-label">Documentation provided *</label>
                        <select className="pcw-input" value={row.documentation} onChange={e => setForm(p => ({ ...p, vehicleChanges: p.vehicleChanges.map(r => r.id === row.id ? { ...r, documentation: e.target.value } : r) }))}>
                          <option value="">Select documentation type...</option>
                          <option value="Termination Letter">Termination Letter</option>
                          <option value="Bill of Sale">Bill of Sale</option>
                          <option value="Police Report (stolen vehicle)">Police Report (stolen vehicle)</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <button type="button" className="pcw-add-btn" onClick={() => setForm(p => ({ ...p, vehicleChanges: [...p.vehicleChanges, makeVehicleRow()] }))}>+ Add another unit</button>

              {/* Delete warning */}
              {form.vehicleChanges.some(r => r.action === 'delete') && (
                <div className="pcw-notice pcw-notice-warn" style={{ marginTop: '1rem' }}>
                  <strong>MUST accompany delete request:</strong> Termination Letter OR Bill of Sale OR Police Report indicating stolen vehicle.<br /><br />
                  <em>*Termination Letter — signed by Company and Owner Operator. For many policies the insurance carrier will not allow for you to remove liability and maintain only physical damage or cargo. This is due to the 1980 MCS-90 provision passed by Congress.</em>
                </div>
              )}

              {/* Section-level fields (for adds) */}
              {form.vehicleChanges.some(r => r.action === 'add') && (
                <div className="pcw-subsection">
                  <p className="pcw-subsection-title">If applicable: Loss Payee and Additional Insured Information</p>
                  <div className="pcw-field">
                    <label className="pcw-label">Loss Payee Name and Address</label>
                    <textarea className="pcw-textarea" value={form.lossPayee} onChange={e => setForm(p => ({ ...p, lossPayee: e.target.value }))} rows={3} />
                  </div>
                  <div className="pcw-field">
                    <label className="pcw-label">Additional Insured Name and Address</label>
                    <textarea className="pcw-textarea" value={form.additionalInsured} onChange={e => setForm(p => ({ ...p, additionalInsured: e.target.value }))} rows={3} />
                  </div>
                  <div className="pcw-field">
                    <label className="pcw-label">Contract provided? *</label>
                    <div className="pcw-radio-group">
                      <label className="pcw-radio-label"><input type="radio" name="contractProvided" value="Yes" checked={form.contractProvided === 'Yes'} onChange={e => setForm(p => ({ ...p, contractProvided: e.target.value }))} /> Yes</label>
                      <label className="pcw-radio-label"><input type="radio" name="contractProvided" value="No" checked={form.contractProvided === 'No'} onChange={e => setForm(p => ({ ...p, contractProvided: e.target.value }))} /> No</label>
                    </div>
                    {form.contractProvided === 'No' && (
                      <div className="pcw-warning">If not, coverage might be denied in the event of a claim.</div>
                    )}
                  </div>
                </div>
              )}

              {/* File upload for vehicle docs */}
              <div className="pcw-file-upload">
                <label className="pcw-label">Supporting Documents</label>
                <p className="pcw-hint">Upload titles, bills of sale, termination letters, or other supporting docs (PDF, JPG, PNG — max 20MB each)</p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx"
                  className="pcw-file-input"
                  onChange={e => {
                    const files = Array.from(e.target.files || []);
                    setForm(p => ({ ...p, vehicleFiles: [...p.vehicleFiles, ...files] }));
                  }}
                />
                {form.vehicleFiles.length > 0 && (
                  <div className="pcw-file-list">
                    {form.vehicleFiles.map((f, i) => (
                      <div key={i} className="pcw-file-item">
                        <span>{f.name}</span>
                        <button type="button" className="pcw-file-remove" onClick={() => setForm(p => ({ ...p, vehicleFiles: p.vehicleFiles.filter((_, j) => j !== i) }))}>×</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* DRIVER CHANGE */}
          {form.serviceTypes.includes('driverChanges') && (
            <div className="pcw-section">
              <h3 className="pcw-section-title">Driver Change</h3>
              <p className="pcw-hint" style={{ marginBottom: '1rem' }}>If an MVR is needed, it will delay processing of the request.</p>
              {form.driverChanges.map((row, idx) => (
                <div key={row.id} className="pcw-row">
                  <div className="pcw-row-head">
                    <span className="pcw-row-num">Driver {idx + 1}</span>
                    {form.driverChanges.length > 1 && (
                      <button type="button" className="pcw-row-remove" onClick={() => setForm(p => ({ ...p, driverChanges: p.driverChanges.filter(r => r.id !== row.id) }))}>Remove</button>
                    )}
                  </div>
                  <div className="pcw-field-grid">
                    <div className="pcw-field">
                      <label className="pcw-label">Action *</label>
                      <select className="pcw-input" value={row.action} onChange={e => setForm(p => ({ ...p, driverChanges: p.driverChanges.map(r => r.id === row.id ? { ...r, action: e.target.value as any } : r) }))}>
                        <option value="">Select...</option>
                        <option value="add">Add</option>
                        <option value="delete">Delete</option>
                      </select>
                    </div>
                    <div className="pcw-field">
                      <label className="pcw-label">Request Includes MVR</label>
                      <select className="pcw-input" value={row.mvrIncluded} onChange={e => setForm(p => ({ ...p, driverChanges: p.driverChanges.map(r => r.id === row.id ? { ...r, mvrIncluded: e.target.value } : r) }))}>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </div>
                  </div>
                  <div className="pcw-policy-checks">
                    <span className="pcw-label">Policies: *</span>
                    {POLICY_OPTIONS.map(p => (
                      <label key={p} className="pcw-check-label">
                        <input type="checkbox" checked={row.policies.includes(p)} onChange={() => togglePolicy(row.id, 'driverChanges', p)} />
                        {p}
                      </label>
                    ))}
                  </div>
                  <div className="pcw-field-grid">
                    <div className="pcw-field">
                      <label className="pcw-label">First Name *</label>
                      <input className="pcw-input" value={row.firstName} onChange={e => setForm(p => ({ ...p, driverChanges: p.driverChanges.map(r => r.id === row.id ? { ...r, firstName: e.target.value } : r) }))} />
                    </div>
                    <div className="pcw-field">
                      <label className="pcw-label">Last Name *</label>
                      <input className="pcw-input" value={row.lastName} onChange={e => setForm(p => ({ ...p, driverChanges: p.driverChanges.map(r => r.id === row.id ? { ...r, lastName: e.target.value } : r) }))} />
                    </div>
                    <div className="pcw-field">
                      <label className="pcw-label">Date of Birth</label>
                      <input type="date" className="pcw-input" max={today} value={row.dob} onChange={e => setForm(p => ({ ...p, driverChanges: p.driverChanges.map(r => r.id === row.id ? { ...r, dob: e.target.value } : r) }))} />
                    </div>
                    <div className="pcw-field">
                      <label className="pcw-label">CDL # *</label>
                      <input className="pcw-input" value={row.cdl} onChange={e => setForm(p => ({ ...p, driverChanges: p.driverChanges.map(r => r.id === row.id ? { ...r, cdl: e.target.value } : r) }))} />
                    </div>
                    <div className="pcw-field">
                      <label className="pcw-label">State *</label>
                      <select className="pcw-input" value={row.state} onChange={e => setForm(p => ({ ...p, driverChanges: p.driverChanges.map(r => r.id === row.id ? { ...r, state: e.target.value } : r) }))}>
                        <option value="">Select...</option>
                        {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="pcw-field">
                      <label className="pcw-label">Years Exp.</label>
                      <input className="pcw-input" value={row.yearsExp} onChange={e => setForm(p => ({ ...p, driverChanges: p.driverChanges.map(r => r.id === row.id ? { ...r, yearsExp: e.target.value } : r) }))} />
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" className="pcw-add-btn" onClick={() => setForm(p => ({ ...p, driverChanges: [...p.driverChanges, makeDriverRow()] }))}>+ Add another driver</button>

              {/* File upload for driver docs */}
              <div className="pcw-file-upload">
                <label className="pcw-label">Supporting Documents (MVRs, CDLs)</label>
                <p className="pcw-hint">Upload MVR reports, CDL copies, or other driver documentation (PDF, JPG, PNG — max 20MB each)</p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx"
                  className="pcw-file-input"
                  onChange={e => {
                    const files = Array.from(e.target.files || []);
                    setForm(p => ({ ...p, driverFiles: [...p.driverFiles, ...files] }));
                  }}
                />
                {form.driverFiles.length > 0 && (
                  <div className="pcw-file-list">
                    {form.driverFiles.map((f, i) => (
                      <div key={i} className="pcw-file-item">
                        <span>{f.name}</span>
                        <button type="button" className="pcw-file-remove" onClick={() => setForm(p => ({ ...p, driverFiles: p.driverFiles.filter((_, j) => j !== i) }))}>×</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ADDRESSES */}
          {form.serviceTypes.includes('addresses') && (
            <div className="pcw-section">
              <h3 className="pcw-section-title">Addresses</h3>
              <label className="pcw-check-label"><input type="checkbox" checked={form.changeMailingAddress} onChange={e => setForm(p => ({ ...p, changeMailingAddress: e.target.checked }))} /> Change Mailing Address</label>
              {form.changeMailingAddress && (
                <div className="pcw-address-block">
                  <div className="pcw-field pcw-field-full"><label className="pcw-label">Street</label><input className="pcw-input" value={form.mailingStreet} onChange={e => setForm(p => ({ ...p, mailingStreet: e.target.value }))} /></div>
                  <div className="pcw-field"><label className="pcw-label">City</label><input className="pcw-input" value={form.mailingCity} onChange={e => setForm(p => ({ ...p, mailingCity: e.target.value }))} /></div>
                  <div className="pcw-field"><label className="pcw-label">State</label><select className="pcw-input" value={form.mailingState} onChange={e => setForm(p => ({ ...p, mailingState: e.target.value }))}><option value="">Select...</option>{US_STATES.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                  <div className="pcw-field"><label className="pcw-label">ZIP</label><input className="pcw-input" value={form.mailingZip} onChange={e => setForm(p => ({ ...p, mailingZip: e.target.value }))} /></div>
                </div>
              )}
              <label className="pcw-check-label"><input type="checkbox" checked={form.changePhysicalAddress} onChange={e => setForm(p => ({ ...p, changePhysicalAddress: e.target.checked }))} /> Change Physical Address</label>
              {form.changePhysicalAddress && (
                <div className="pcw-address-block">
                  <div className="pcw-field pcw-field-full"><label className="pcw-label">Street</label><input className="pcw-input" value={form.physicalStreet} onChange={e => setForm(p => ({ ...p, physicalStreet: e.target.value }))} /></div>
                  <div className="pcw-field"><label className="pcw-label">City</label><input className="pcw-input" value={form.physicalCity} onChange={e => setForm(p => ({ ...p, physicalCity: e.target.value }))} /></div>
                  <div className="pcw-field"><label className="pcw-label">State</label><select className="pcw-input" value={form.physicalState} onChange={e => setForm(p => ({ ...p, physicalState: e.target.value }))}><option value="">Select...</option>{US_STATES.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                  <div className="pcw-field"><label className="pcw-label">ZIP</label><input className="pcw-input" value={form.physicalZip} onChange={e => setForm(p => ({ ...p, physicalZip: e.target.value }))} /></div>
                </div>
              )}
              <label className="pcw-check-label"><input type="checkbox" checked={form.changeGaragingAddress} onChange={e => setForm(p => ({ ...p, changeGaragingAddress: e.target.checked }))} /> Change Garaging Address</label>
              {form.changeGaragingAddress && (
                <div className="pcw-address-block">
                  <div className="pcw-field pcw-field-full"><label className="pcw-label">Street</label><input className="pcw-input" value={form.garagingStreet} onChange={e => setForm(p => ({ ...p, garagingStreet: e.target.value }))} /></div>
                  <div className="pcw-field"><label className="pcw-label">City</label><input className="pcw-input" value={form.garagingCity} onChange={e => setForm(p => ({ ...p, garagingCity: e.target.value }))} /></div>
                  <div className="pcw-field"><label className="pcw-label">State</label><select className="pcw-input" value={form.garagingState} onChange={e => setForm(p => ({ ...p, garagingState: e.target.value }))}><option value="">Select...</option>{US_STATES.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                  <div className="pcw-field"><label className="pcw-label">ZIP</label><input className="pcw-input" value={form.garagingZip} onChange={e => setForm(p => ({ ...p, garagingZip: e.target.value }))} /></div>
                </div>
              )}
            </div>
          )}

          {/* LIEN HOLDERS */}
          {form.serviceTypes.includes('lienholders') && (
            <div className="pcw-section">
              <h3 className="pcw-section-title">Lien Holders</h3>
              <label className="pcw-check-label"><input type="checkbox" checked={form.lienBusiness} onChange={e => setForm(p => ({ ...p, lienBusiness: e.target.checked }))} /> Add to Business / Property</label>
              {form.lienBusiness && (
                <div className="pcw-address-block">
                  <div className="pcw-field pcw-field-full"><label className="pcw-label">Lien Holder Name *</label><input className="pcw-input" value={form.lienHolderName} onChange={e => setForm(p => ({ ...p, lienHolderName: e.target.value }))} /></div>
                  <div className="pcw-field pcw-field-full"><label className="pcw-label">Name Line 2</label><input className="pcw-input" value={form.lienNameLine2} onChange={e => setForm(p => ({ ...p, lienNameLine2: e.target.value }))} /></div>
                  <div className="pcw-field"><label className="pcw-label">Address 1</label><input className="pcw-input" value={form.lienAddress1} onChange={e => setForm(p => ({ ...p, lienAddress1: e.target.value }))} /></div>
                  <div className="pcw-field"><label className="pcw-label">Address 2</label><input className="pcw-input" value={form.lienAddress2} onChange={e => setForm(p => ({ ...p, lienAddress2: e.target.value }))} /></div>
                  <div className="pcw-field"><label className="pcw-label">City</label><input className="pcw-input" value={form.lienCity} onChange={e => setForm(p => ({ ...p, lienCity: e.target.value }))} /></div>
                  <div className="pcw-field"><label className="pcw-label">State</label><input className="pcw-input" value={form.lienState} onChange={e => setForm(p => ({ ...p, lienState: e.target.value }))} /></div>
                  <div className="pcw-field"><label className="pcw-label">ZIP</label><input className="pcw-input" value={form.lienZip} onChange={e => setForm(p => ({ ...p, lienZip: e.target.value }))} /></div>
                  <div className="pcw-field"><label className="pcw-label">Loan Number *</label><input className="pcw-input" value={form.lienLoanNumber} onChange={e => setForm(p => ({ ...p, lienLoanNumber: e.target.value }))} /></div>
                  <div className="pcw-field"><label className="pcw-label">Position</label><select className="pcw-input" value={form.lienPosition} onChange={e => setForm(p => ({ ...p, lienPosition: e.target.value }))}><option value="First Mortgagee">First Mortgagee</option><option value="Second Mortgagee">Second Mortgagee</option></select></div>
                  <div className="pcw-field"><label className="pcw-label">Bill To</label><select className="pcw-input" value={form.lienBillTo} onChange={e => setForm(p => ({ ...p, lienBillTo: e.target.value }))}><option value="Mortgagee">Mortgagee</option><option value="Insured">Insured</option></select></div>
                </div>
              )}
              <label className="pcw-check-label"><input type="checkbox" checked={form.lienVehicle} onChange={e => setForm(p => ({ ...p, lienVehicle: e.target.checked }))} /> Add to Vehicle</label>
              {form.lienVehicle && (
                <div className="pcw-address-block">
                  <div className="pcw-field pcw-field-full"><label className="pcw-label">Vehicle *</label><input className="pcw-input" value={form.vehicleLienVehicle} onChange={e => setForm(p => ({ ...p, vehicleLienVehicle: e.target.value }))} /></div>
                  <div className="pcw-field"><label className="pcw-label">Lien Holder Name *</label><input className="pcw-input" value={form.vehicleLienName} onChange={e => setForm(p => ({ ...p, vehicleLienName: e.target.value }))} /></div>
                  <div className="pcw-field"><label className="pcw-label">Loan Number</label><input className="pcw-input" value={form.vehicleLienLoanNumber} onChange={e => setForm(p => ({ ...p, vehicleLienLoanNumber: e.target.value }))} /></div>
                </div>
              )}
            </div>
          )}

          {/* CERTIFICATE */}
          {form.serviceTypes.includes('certificate') && (
            <div className="pcw-section">
              <h3 className="pcw-section-title">Certificate of Insurance</h3>
              <div className="pcw-field-grid">
                <div className="pcw-field"><label className="pcw-label">Email to send COI *</label><input type="email" className="pcw-input" value={form.coiEmail} onChange={e => setForm(p => ({ ...p, coiEmail: e.target.value }))} /></div>
                <div className="pcw-field"><label className="pcw-label">Certificate Holder Name *</label><input className="pcw-input" value={form.coiHolderName} onChange={e => setForm(p => ({ ...p, coiHolderName: e.target.value }))} /></div>
                <div className="pcw-field"><label className="pcw-label">Address 1</label><input className="pcw-input" value={form.coiAddress1} onChange={e => setForm(p => ({ ...p, coiAddress1: e.target.value }))} /></div>
                <div className="pcw-field"><label className="pcw-label">Address 2</label><input className="pcw-input" value={form.coiAddress2} onChange={e => setForm(p => ({ ...p, coiAddress2: e.target.value }))} /></div>
                <div className="pcw-field"><label className="pcw-label">City</label><input className="pcw-input" value={form.coiCity} onChange={e => setForm(p => ({ ...p, coiCity: e.target.value }))} /></div>
                <div className="pcw-field"><label className="pcw-label">State</label><select className="pcw-input" value={form.coiState} onChange={e => setForm(p => ({ ...p, coiState: e.target.value }))}><option value="">Select...</option>{US_STATES.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                <div className="pcw-field"><label className="pcw-label">ZIP</label><input className="pcw-input" value={form.coiZip} onChange={e => setForm(p => ({ ...p, coiZip: e.target.value }))} /></div>
              </div>
              <div className="pcw-field pcw-field-full"><label className="pcw-label">Request Details</label><textarea className="pcw-textarea" value={form.coiDetails} onChange={e => setForm(p => ({ ...p, coiDetails: e.target.value }))} rows={3} /></div>
              <div className="pcw-checks-group">
                <label className="pcw-check-label"><input type="checkbox" checked={form.coiIncludeVehicleSchedule} onChange={e => setForm(p => ({ ...p, coiIncludeVehicleSchedule: e.target.checked }))} /> Include Vehicle Schedule</label>
                <label className="pcw-check-label"><input type="checkbox" checked={form.coiIncludeDriverSchedule} onChange={e => setForm(p => ({ ...p, coiIncludeDriverSchedule: e.target.checked }))} /> Include Driver Schedule</label>
                <label className="pcw-check-label"><input type="checkbox" checked={form.coiAdditionalInsured} onChange={e => setForm(p => ({ ...p, coiAdditionalInsured: e.target.checked }))} /> Make Certificate Holder an Additional Insured</label>
              </div>
            </div>
          )}

          {/* COVERAGE / GENERAL */}
          {form.serviceTypes.includes('coverage') && (
            <div className="pcw-section">
              <h3 className="pcw-section-title">Coverage Change / General Request</h3>
              <div className="pcw-field pcw-field-full">
                <label className="pcw-label">Request Details *</label>
                <textarea className="pcw-textarea" rows={5} value={form.coverageDetails} onChange={e => setForm(p => ({ ...p, coverageDetails: e.target.value }))} />
              </div>
            </div>
          )}

          {/* VIN warning */}
          {!allVinsVerified && (
            <div className="pcw-notice pcw-notice-warn">
              Verification required — click Verify VIN on each unit before continuing.
            </div>
          )}

          <div className="pcw-actions">
            <button type="button" className="pcw-btn-ghost" onClick={() => setStep(1)}>Back</button>
            <button type="button" className="pcw-btn-solid" disabled={!canAdvanceToStep3} onClick={() => setStep(3)}>Continue to Review</button>
          </div>
        </div>
      )}

      {/* ═══════════════ STEP 3 ═══════════════ */}
      {step === 3 && (
        <div className="pcw-step">
          <h3 className="pcw-section-title">Request Summary</h3>

          <div className="pcw-review">
            <div className="pcw-review-block">
              <h4>Request Information</h4>
              <div className="pcw-review-row"><span>Company:</span> {form.businessName}</div>
              <div className="pcw-review-row"><span>Effective Date:</span> {form.changeDate}</div>
              <div className="pcw-review-row"><span>Insured:</span> {form.insuredFirst} {form.insuredLast}</div>
              <div className="pcw-review-row"><span>Email:</span> {form.insuredEmail}</div>
              {form.phone && <div className="pcw-review-row"><span>Phone:</span> {form.phone}</div>}
              {form.policyNumber && <div className="pcw-review-row"><span>Policy #:</span> {form.policyNumber}</div>}
              <div className="pcw-review-row"><span>Sections:</span> {form.serviceTypes.map(t => SECTION_TYPES.find(s => s.id === t)?.label).join(', ')}</div>
            </div>

            {/* Vehicle Changes review */}
            {form.serviceTypes.includes('vehicleChange') && form.vehicleChanges.some(r => r.action) && (
              <div className="pcw-review-block">
                <h4>Vehicle Changes</h4>
                {form.vehicleChanges.filter(r => r.action).map((r, i) => (
                  <div key={r.id} className="pcw-review-row">
                    <span>Unit {i + 1} ({r.action === 'add' ? 'ADD' : 'DELETE'}):</span> {r.policies.join(', ')} · VIN: {r.vin} ({r.year} {r.make}{r.model ? ` ${r.model}` : ''})
                    {r.action === 'add' && r.value && ` · Value: ${r.value}`}
                    {r.action === 'delete' && r.documentation && ` · Doc: ${r.documentation}`}
                  </div>
                ))}
                {form.lossPayee && <div className="pcw-review-row"><span>Loss Payee:</span> {form.lossPayee}</div>}
                {form.additionalInsured && <div className="pcw-review-row"><span>Additional Insured:</span> {form.additionalInsured}</div>}
                {form.contractProvided && <div className="pcw-review-row"><span>Contract Provided:</span> {form.contractProvided}</div>}
                {form.vehicleFiles.length > 0 && <div className="pcw-review-row"><span>Files:</span> {form.vehicleFiles.map(f => f.name).join(', ')}</div>}
              </div>
            )}

            {/* Driver Changes review */}
            {form.serviceTypes.includes('driverChanges') && form.driverChanges.some(r => r.action) && (
              <div className="pcw-review-block">
                <h4>Driver Changes</h4>
                {form.driverChanges.filter(r => r.action).map((r, i) => (
                  <div key={r.id} className="pcw-review-row">
                    <span>Driver {i + 1} ({r.action}):</span> {r.firstName} {r.lastName} · CDL: {r.cdl} · {r.state} · Policies: {r.policies.join(', ')} · MVR: {r.mvrIncluded}
                  </div>
                ))}
                {form.driverFiles.length > 0 && <div className="pcw-review-row"><span>Files:</span> {form.driverFiles.map(f => f.name).join(', ')}</div>}
              </div>
            )}

            {/* Addresses review */}
            {form.serviceTypes.includes('addresses') && (
              <div className="pcw-review-block">
                <h4>Addresses</h4>
                {form.changeMailingAddress && <div className="pcw-review-row"><span>Mailing:</span> {form.mailingStreet}, {form.mailingCity}, {form.mailingState} {form.mailingZip}</div>}
                {form.changePhysicalAddress && <div className="pcw-review-row"><span>Physical:</span> {form.physicalStreet}, {form.physicalCity}, {form.physicalState} {form.physicalZip}</div>}
                {form.changeGaragingAddress && <div className="pcw-review-row"><span>Garaging:</span> {form.garagingStreet}, {form.garagingCity}, {form.garagingState} {form.garagingZip}</div>}
              </div>
            )}

            {/* Lien Holders review */}
            {form.serviceTypes.includes('lienholders') && (
              <div className="pcw-review-block">
                <h4>Lien Holders</h4>
                {form.lienBusiness && <div className="pcw-review-row"><span>Business/Property:</span> {form.lienHolderName} · Loan #{form.lienLoanNumber}</div>}
                {form.lienVehicle && <div className="pcw-review-row"><span>Vehicle:</span> {form.vehicleLienVehicle} · {form.vehicleLienName}</div>}
              </div>
            )}

            {/* COI review */}
            {form.serviceTypes.includes('certificate') && (
              <div className="pcw-review-block">
                <h4>Certificate of Insurance</h4>
                <div className="pcw-review-row"><span>Holder:</span> {form.coiHolderName}</div>
                <div className="pcw-review-row"><span>Send to:</span> {form.coiEmail}</div>
                {form.coiAdditionalInsured && <div className="pcw-review-row"><span>Additional Insured:</span> Yes</div>}
              </div>
            )}

            {/* Coverage review */}
            {form.serviceTypes.includes('coverage') && (
              <div className="pcw-review-block">
                <h4>Coverage Change / General Request</h4>
                <div className="pcw-review-row"><span>Details:</span> {form.coverageDetails}</div>
              </div>
            )}
          </div>

          {/* Disclaimer & Signature */}
          <div className="pcw-disclaimer">
            <strong>IMPORTANT:</strong> Any change requested through this form is only a request for service and does not alter your policy
            until formal confirmation and endorsement is received from the carrier. Coverage cannot be bound by
            email, voicemail, or fax. The policy, not this form, governs all terms and conditions.
          </div>

          <div className="pcw-field-grid" style={{ marginTop: '1.5rem' }}>
            <div className="pcw-field pcw-field-full">
              <label className="pcw-check-label">
                <input type="checkbox" checked={form.agreeDisclaimer} onChange={e => setForm(p => ({ ...p, agreeDisclaimer: e.target.checked }))} />
                I understand and agree to the above disclaimer *
              </label>
            </div>
            <div className="pcw-field">
              <label className="pcw-label">Electronic Signature *</label>
              <input className="pcw-input" value={form.signature} onChange={e => setForm(p => ({ ...p, signature: e.target.value }))} placeholder="Type your full name" />
            </div>
            <div className="pcw-field">
              <label className="pcw-label">Date</label>
              <input type="date" className="pcw-input" value={form.signatureDate} onChange={e => setForm(p => ({ ...p, signatureDate: e.target.value }))} />
            </div>
          </div>

          <div className="pcw-actions">
            <button type="button" className="pcw-btn-ghost" onClick={() => setStep(2)}>Back</button>
            <button
              type="button"
              className="pcw-btn-solid pcw-btn-submit"
              disabled={!form.agreeDisclaimer || !form.signature || submitting}
              onClick={handleSubmit}
            >
              {submitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </div>
      )}
    </div>
    </ServiceCenterLayout>
  );
}
