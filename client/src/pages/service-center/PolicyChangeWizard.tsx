import { useState, useMemo } from 'react';
import { trpc } from '../../lib/trpc';
import { useAuth } from '../../_core/hooks/useAuth';
import { VinVerifier, type VinDecodeResult } from '../../components/VinVerifier';

// Service types available for selection
const SERVICE_TYPES = [
  { id: 'drivers', label: 'Drivers', desc: 'Add, update, or remove drivers' },
  { id: 'vehicles', label: 'Vehicles & Trailers', desc: 'Add, replace, or remove units' },
  { id: 'addresses', label: 'Addresses', desc: 'Change mailing, physical, or garaging' },
  { id: 'lienholders', label: 'Lien Holders', desc: 'Add or update lien holder info' },
  { id: 'certificate', label: 'Certificate of Insurance', desc: 'Request a COI' },
  { id: 'coverage', label: 'Coverage Change', desc: 'Modify coverage limits or types' },
  { id: 'general', label: 'General Request', desc: 'Other policy service needs' },
] as const;

type ServiceType = typeof SERVICE_TYPES[number]['id'];

// US States
const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN',
  'IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH',
  'NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT',
  'VT','VA','WA','WV','WI','WY','AA','AE','AP','AS','GU','MP','PR','VI'
];

// Driver row interface
interface DriverRow {
  id: string;
  action: 'add' | 'update' | 'delete' | '';
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  dob: string;
  dlNumber: string;
  dlState: string;
  sr22Required: string;
  yearLicensed: string;
  explanation: string;
  reason: string;
}

// Vehicle row interface
interface VehicleRow {
  id: string;
  action: 'add' | 'replace' | 'delete' | '';
  vin: string;
  year: string;
  make: string;
  model: string;
  value: string;
  primaryUse: string;
  annualMiles: string;
  replacingUnit: string;
  reason: string;
  vinResult: VinDecodeResult | null;
  isTrailer: boolean;
}

// Form data interface
interface PolicyChangeData {
  // Step 1
  changeDate: string;
  serviceTypes: ServiceType[];
  insuredFirst: string;
  insuredLast: string;
  businessName: string;
  email: string;
  policyNumber: string;
  requestedBy: string;
  // Step 2 sections
  drivers: DriverRow[];
  driverMessage: string;
  vehicles: VehicleRow[];
  vehicleMessage: string;
  // Addresses
  changeMailingAddress: boolean;
  mailingStreet: string;
  mailingCity: string;
  mailingState: string;
  mailingZip: string;
  mailingCountry: string;
  changePhysicalAddress: boolean;
  physicalStreet: string;
  physicalCity: string;
  physicalState: string;
  physicalZip: string;
  changeGaragingAddress: boolean;
  garagingStreet: string;
  garagingCity: string;
  garagingState: string;
  garagingZip: string;
  // Lien Holders
  lienVehicle: boolean;
  lienBusiness: boolean;
  lienHolderName: string;
  lienNameLine2: string;
  lienAddress1: string;
  lienAddress2: string;
  lienCity: string;
  lienState: string;
  lienZip: string;
  lienLoanNumber: string;
  lienPosition: string;
  lienBillTo: string;
  vehicleLienVehicle: string;
  vehicleLienName: string;
  vehicleLienLoanNumber: string;
  // Certificate
  coiEmail: string;
  coiHolderName: string;
  coiAddress1: string;
  coiAddress2: string;
  coiCity: string;
  coiState: string;
  coiZip: string;
  coiDetails: string;
  coiIncludeVehicleSchedule: boolean;
  coiIncludeDriverSchedule: boolean;
  coiAdditionalInsured: boolean;
  // Coverage / General
  coverageDetails: string;
  // Step 3
  agreeDisclaimer: boolean;
  signature: string;
  signatureDate: string;
}

const INITIAL_DRIVER: DriverRow = {
  id: crypto.randomUUID(),
  action: '',
  firstName: '',
  middleName: '',
  lastName: '',
  gender: '',
  dob: '',
  dlNumber: '',
  dlState: '',
  sr22Required: 'No',
  yearLicensed: '',
  explanation: '',
  reason: '',
};

const INITIAL_VEHICLE: VehicleRow = {
  id: crypto.randomUUID(),
  action: '',
  vin: '',
  year: '',
  make: '',
  model: '',
  value: '',
  primaryUse: '',
  annualMiles: '',
  replacingUnit: '',
  reason: '',
  vinResult: null,
  isTrailer: false,
};

export default function PolicyChangeWizard() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState<PolicyChangeData>({
    changeDate: today,
    serviceTypes: [],
    insuredFirst: user?.name?.split(' ')[0] || '',
    insuredLast: user?.name?.split(' ').slice(1).join(' ') || '',
    businessName: (user as any)?.title || '',
    email: user?.email || '',
    policyNumber: '',
    requestedBy: user?.name || '',
    drivers: [{ ...INITIAL_DRIVER, id: crypto.randomUUID() }],
    driverMessage: '',
    vehicles: [{ ...INITIAL_VEHICLE, id: crypto.randomUUID() }],
    vehicleMessage: '',
    changeMailingAddress: false,
    mailingStreet: '', mailingCity: '', mailingState: '', mailingZip: '', mailingCountry: 'United States',
    changePhysicalAddress: false,
    physicalStreet: '', physicalCity: '', physicalState: '', physicalZip: '',
    changeGaragingAddress: false,
    garagingStreet: '', garagingCity: '', garagingState: '', garagingZip: '',
    lienVehicle: false, lienBusiness: false,
    lienHolderName: '', lienNameLine2: '', lienAddress1: '', lienAddress2: '',
    lienCity: '', lienState: '', lienZip: '', lienLoanNumber: '', lienPosition: 'First Mortgagee', lienBillTo: 'Mortgagee',
    vehicleLienVehicle: '', vehicleLienName: '', vehicleLienLoanNumber: '',
    coiEmail: '', coiHolderName: '', coiAddress1: '', coiAddress2: '',
    coiCity: '', coiState: '', coiZip: '', coiDetails: '',
    coiIncludeVehicleSchedule: false, coiIncludeDriverSchedule: false, coiAdditionalInsured: false,
    coverageDetails: '',
    agreeDisclaimer: false,
    signature: '',
    signatureDate: today,
  });

  const createSubmission = trpc.submissions.create.useMutation();

  // Check if any vehicle has delete action (for MCS-90 memo)
  const hasVehicleDelete = form.vehicles.some(v => v.action === 'delete');

  // Check if all VINs are verified
  const allVinsVerified = useMemo(() => {
    return form.vehicles.every(v => {
      if (!v.vin) return true; // empty VIN is ok if not required
      if (v.action === '') return true;
      return v.vinResult?.status === 'verified' || v.vinResult?.status === 'warning';
    });
  }, [form.vehicles]);

  const toggleServiceType = (type: ServiceType) => {
    setForm(prev => ({
      ...prev,
      serviceTypes: prev.serviceTypes.includes(type)
        ? prev.serviceTypes.filter(t => t !== type)
        : [...prev.serviceTypes, type],
    }));
  };

  // Driver row management
  const addDriver = () => {
    setForm(prev => ({ ...prev, drivers: [...prev.drivers, { ...INITIAL_DRIVER, id: crypto.randomUUID() }] }));
  };
  const removeDriver = (id: string) => {
    setForm(prev => ({ ...prev, drivers: prev.drivers.filter(d => d.id !== id) }));
  };
  const updateDriver = (id: string, field: keyof DriverRow, value: string) => {
    setForm(prev => ({
      ...prev,
      drivers: prev.drivers.map(d => d.id === id ? { ...d, [field]: value } : d),
    }));
  };

  // Vehicle row management
  const addVehicle = () => {
    setForm(prev => ({ ...prev, vehicles: [...prev.vehicles, { ...INITIAL_VEHICLE, id: crypto.randomUUID() }] }));
  };
  const removeVehicle = (id: string) => {
    setForm(prev => ({ ...prev, vehicles: prev.vehicles.filter(v => v.id !== id) }));
  };
  const updateVehicle = (id: string, field: keyof VehicleRow, value: any) => {
    setForm(prev => ({
      ...prev,
      vehicles: prev.vehicles.map(v => v.id === id ? { ...v, [field]: value } : v),
    }));
  };

  const canAdvanceToStep2 = form.serviceTypes.length > 0 && form.businessName && form.email && form.changeDate;
  const canAdvanceToStep3 = allVinsVerified;

  const handleSubmit = async () => {
    if (!form.agreeDisclaimer || !form.signature) return;
    setSubmitting(true);

    try {
      // Build submission data
      const data: Array<{ section: string; fields: Array<{ label: string; value: any }> }> = [];

      // Request Info section
      data.push({
        section: 'Request Information',
        fields: [
          { label: 'Date to Make Change', value: form.changeDate },
          { label: 'Service Types', value: form.serviceTypes.join(', ') },
          { label: 'Primary Insured', value: `${form.insuredFirst} ${form.insuredLast}` },
          { label: 'Business Name', value: form.businessName },
          { label: 'Email', value: form.email },
          { label: 'Policy Number', value: form.policyNumber },
          { label: 'Requested By', value: form.requestedBy },
        ],
      });

      // Drivers section
      if (form.serviceTypes.includes('drivers')) {
        const driverFields: Array<{ label: string; value: any }> = [];
        form.drivers.forEach((d, i) => {
          if (!d.action) return;
          driverFields.push({ label: `Driver ${i + 1} Action`, value: d.action });
          driverFields.push({ label: `Driver ${i + 1} Name`, value: `${d.firstName} ${d.middleName} ${d.lastName}`.trim() });
          if (d.action === 'add') {
            driverFields.push({ label: `Driver ${i + 1} Gender`, value: d.gender });
            driverFields.push({ label: `Driver ${i + 1} DOB`, value: d.dob });
            driverFields.push({ label: `Driver ${i + 1} DL Number`, value: d.dlNumber });
            driverFields.push({ label: `Driver ${i + 1} DL State`, value: d.dlState });
            driverFields.push({ label: `Driver ${i + 1} SR-22 Required`, value: d.sr22Required });
            driverFields.push({ label: `Driver ${i + 1} Year Licensed`, value: d.yearLicensed });
          } else if (d.action === 'update') {
            driverFields.push({ label: `Driver ${i + 1} Update Details`, value: d.explanation });
          } else if (d.action === 'delete') {
            driverFields.push({ label: `Driver ${i + 1} Reason for Deletion`, value: d.reason });
          }
        });
        if (form.driverMessage) driverFields.push({ label: 'Message to Agent', value: form.driverMessage });
        data.push({ section: 'Drivers', fields: driverFields });
      }

      // Vehicles section
      if (form.serviceTypes.includes('vehicles')) {
        const vehicleFields: Array<{ label: string; value: any }> = [];
        form.vehicles.forEach((v, i) => {
          if (!v.action) return;
          vehicleFields.push({ label: `Unit ${i + 1} Action`, value: v.action });
          vehicleFields.push({ label: `Unit ${i + 1} VIN`, value: `${v.vin}${v.vinResult ? ` (Verified — ${v.year} ${v.make} ${v.model} · ${v.isTrailer ? 'TRAILER' : v.vinResult.data?.VehicleType || 'VEHICLE'})` : ''}` });
          vehicleFields.push({ label: `Unit ${i + 1} Year/Make/Model`, value: `${v.year} ${v.make} ${v.model}` });
          if (v.action === 'add' || v.action === 'replace') {
            vehicleFields.push({ label: `Unit ${i + 1} Value`, value: v.value });
            if (!v.isTrailer) {
              vehicleFields.push({ label: `Unit ${i + 1} Primary Use`, value: v.primaryUse });
              vehicleFields.push({ label: `Unit ${i + 1} Annual Miles`, value: v.annualMiles });
            }
          }
          if (v.action === 'replace') {
            vehicleFields.push({ label: `Unit ${i + 1} Replacing`, value: v.replacingUnit });
          }
          if (v.action === 'delete') {
            vehicleFields.push({ label: `Unit ${i + 1} Reason for Deletion`, value: v.reason });
          }
        });
        if (form.vehicleMessage) vehicleFields.push({ label: 'Message to Agent', value: form.vehicleMessage });
        data.push({ section: 'Vehicles & Trailers', fields: vehicleFields });
      }

      // Addresses section
      if (form.serviceTypes.includes('addresses')) {
        const addrFields: Array<{ label: string; value: any }> = [];
        if (form.changeMailingAddress) {
          addrFields.push({ label: 'Mailing Address', value: `${form.mailingStreet}, ${form.mailingCity}, ${form.mailingState} ${form.mailingZip}, ${form.mailingCountry}` });
        }
        if (form.changePhysicalAddress) {
          addrFields.push({ label: 'Physical Address', value: `${form.physicalStreet}, ${form.physicalCity}, ${form.physicalState} ${form.physicalZip}` });
        }
        if (form.changeGaragingAddress) {
          addrFields.push({ label: 'Garaging Address', value: `${form.garagingStreet}, ${form.garagingCity}, ${form.garagingState} ${form.garagingZip}` });
        }
        data.push({ section: 'Addresses', fields: addrFields });
      }

      // Lien Holders section
      if (form.serviceTypes.includes('lienholders')) {
        const lienFields: Array<{ label: string; value: any }> = [];
        if (form.lienBusiness) {
          lienFields.push({ label: 'Lien Holder Name', value: form.lienHolderName });
          lienFields.push({ label: 'Address', value: `${form.lienAddress1} ${form.lienAddress2}, ${form.lienCity}, ${form.lienState} ${form.lienZip}` });
          lienFields.push({ label: 'Loan Number', value: form.lienLoanNumber });
          lienFields.push({ label: 'Position', value: form.lienPosition });
          lienFields.push({ label: 'Bill To', value: form.lienBillTo });
        }
        if (form.lienVehicle) {
          lienFields.push({ label: 'Vehicle Lien - Vehicle', value: form.vehicleLienVehicle });
          lienFields.push({ label: 'Vehicle Lien - Holder Name', value: form.vehicleLienName });
          lienFields.push({ label: 'Vehicle Lien - Loan Number', value: form.vehicleLienLoanNumber });
        }
        data.push({ section: 'Lien Holders', fields: lienFields });
      }

      // Certificate section
      if (form.serviceTypes.includes('certificate')) {
        data.push({
          section: 'Certificate of Insurance',
          fields: [
            { label: 'Email to Send COI', value: form.coiEmail },
            { label: 'Certificate Holder Name', value: form.coiHolderName },
            { label: 'Address', value: `${form.coiAddress1} ${form.coiAddress2}, ${form.coiCity}, ${form.coiState} ${form.coiZip}` },
            { label: 'Request Details', value: form.coiDetails },
            { label: 'Include Vehicle Schedule', value: form.coiIncludeVehicleSchedule ? 'Yes' : 'No' },
            { label: 'Include Driver Schedule', value: form.coiIncludeDriverSchedule ? 'Yes' : 'No' },
            { label: 'Additional Insured', value: form.coiAdditionalInsured ? 'Yes' : 'No' },
          ],
        });
      }

      // Coverage / General section
      if (form.serviceTypes.includes('coverage') || form.serviceTypes.includes('general')) {
        data.push({
          section: 'Coverage Change / General Request',
          fields: [{ label: 'Request Details', value: form.coverageDetails }],
        });
      }

      // Signature section
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

  // Success screen
  if (submittedRef) {
    return (
      <div className="sc-form-page">
        <div className="sc-success-screen">
          <div className="sc-success-icon">✓</div>
          <h2 className="sc-success-title" style={{ fontFamily: 'Lora, serif' }}>Request Submitted</h2>
          <p className="sc-success-ref">Reference: <strong>{submittedRef}</strong></p>
          <p className="sc-success-message">
            Your policy change request has been received. A confirmation has been sent to {form.email}.
          </p>
          <div className="sc-disclaimer-box">
            Any change requested through this form is only a request for service and does not alter your policy
            until formal confirmation and endorsement is received from the carrier. Coverage cannot be bound by
            email, voicemail, or fax.
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
        <div className="sc-eyebrow">POLICY CHANGE</div>
        <div className="sc-tick" />
        <h1 className="sc-form-title">Request <em>Policy</em> Change</h1>
      </div>

      {/* Progress bar */}
      <div className="wizard-progress">
        <div className={`wizard-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
          <span className="wizard-step-num">1</span>
          <span className="wizard-step-label">Request Info</span>
        </div>
        <div className="wizard-step-line" />
        <div className={`wizard-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
          <span className="wizard-step-num">2</span>
          <span className="wizard-step-label">Change Details</span>
        </div>
        <div className="wizard-step-line" />
        <div className={`wizard-step ${step >= 3 ? 'active' : ''}`}>
          <span className="wizard-step-num">3</span>
          <span className="wizard-step-label">Review & Submit</span>
        </div>
      </div>

      {/* Step 1: Request Info */}
      {step === 1 && (
        <div className="wizard-step-content">
          <div className="form-group">
            <label className="form-label">Date to make this change *</label>
            <input
              type="date"
              className="form-input"
              value={form.changeDate}
              min={today}
              onChange={e => setForm(p => ({ ...p, changeDate: e.target.value }))}
              required
            />
            <span className="form-hint">Backdating is not permitted</span>
          </div>

          <div className="form-group">
            <label className="form-label">Service Type *</label>
            <p className="form-hint">Select all that apply — one submission can combine multiple service types</p>
            <div className="service-type-grid">
              {SERVICE_TYPES.map(st => (
                <button
                  key={st.id}
                  type="button"
                  className={`service-type-card ${form.serviceTypes.includes(st.id) ? 'selected' : ''}`}
                  onClick={() => toggleServiceType(st.id)}
                >
                  <span className="service-type-label">{st.label}</span>
                  <span className="service-type-desc">{st.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Primary Insured First Name *</label>
              <input className="form-input" value={form.insuredFirst} onChange={e => setForm(p => ({ ...p, insuredFirst: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label className="form-label">Primary Insured Last Name *</label>
              <input className="form-input" value={form.insuredLast} onChange={e => setForm(p => ({ ...p, insuredLast: e.target.value }))} required />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Business Name *</label>
            <input className="form-input" value={form.businessName} onChange={e => setForm(p => ({ ...p, businessName: e.target.value }))} required />
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
            <label className="form-label">Requested By</label>
            <input className="form-input" value={form.requestedBy} onChange={e => setForm(p => ({ ...p, requestedBy: e.target.value }))} />
          </div>

          <div className="wizard-actions">
            <a href="/service-center" className="sc-btn-ghost">Cancel</a>
            <button
              type="button"
              className="sc-btn-primary"
              disabled={!canAdvanceToStep2}
              onClick={() => setStep(2)}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Change Details */}
      {step === 2 && (
        <div className="wizard-step-content">
          {/* Drivers Section */}
          {form.serviceTypes.includes('drivers') && (
            <div className="wizard-section">
              <h3 className="wizard-section-title">Drivers</h3>
              {form.drivers.map((driver, idx) => (
                <div key={driver.id} className="repeatable-row">
                  <div className="repeatable-row-header">
                    <span className="repeatable-row-num">Driver {idx + 1}</span>
                    {form.drivers.length > 1 && (
                      <button type="button" className="repeatable-remove-btn" onClick={() => removeDriver(driver.id)}>Remove</button>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Action *</label>
                    <select className="form-input" value={driver.action} onChange={e => updateDriver(driver.id, 'action', e.target.value)}>
                      <option value="">Select action...</option>
                      <option value="add">Add</option>
                      <option value="update">Update</option>
                      <option value="delete">Delete</option>
                    </select>
                  </div>

                  {driver.action === 'add' && (
                    <>
                      <div className="form-row">
                        <div className="form-group"><label className="form-label">First Name *</label><input className="form-input" value={driver.firstName} onChange={e => updateDriver(driver.id, 'firstName', e.target.value)} /></div>
                        <div className="form-group"><label className="form-label">Middle Name</label><input className="form-input" value={driver.middleName} onChange={e => updateDriver(driver.id, 'middleName', e.target.value)} /></div>
                        <div className="form-group"><label className="form-label">Last Name *</label><input className="form-input" value={driver.lastName} onChange={e => updateDriver(driver.id, 'lastName', e.target.value)} /></div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Gender *</label>
                          <select className="form-input" value={driver.gender} onChange={e => updateDriver(driver.id, 'gender', e.target.value)}>
                            <option value="">Select...</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                            <option value="Not Specified">Not Specified</option>
                          </select>
                        </div>
                        <div className="form-group"><label className="form-label">Date of Birth *</label><input type="date" className="form-input" max={today} value={driver.dob} onChange={e => updateDriver(driver.id, 'dob', e.target.value)} /></div>
                      </div>
                      <div className="form-row">
                        <div className="form-group"><label className="form-label">DL Number *</label><input className="form-input" value={driver.dlNumber} onChange={e => updateDriver(driver.id, 'dlNumber', e.target.value)} /></div>
                        <div className="form-group">
                          <label className="form-label">DL State *</label>
                          <select className="form-input" value={driver.dlState} onChange={e => updateDriver(driver.id, 'dlState', e.target.value)}>
                            <option value="">Select...</option>
                            {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">SR-22 Required *</label>
                          <select className="form-input" value={driver.sr22Required} onChange={e => updateDriver(driver.id, 'sr22Required', e.target.value)}>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                          </select>
                        </div>
                        <div className="form-group"><label className="form-label">Year Licensed</label><input className="form-input" value={driver.yearLicensed} onChange={e => updateDriver(driver.id, 'yearLicensed', e.target.value)} /></div>
                      </div>
                    </>
                  )}

                  {driver.action === 'update' && (
                    <>
                      <div className="form-row">
                        <div className="form-group"><label className="form-label">First Name *</label><input className="form-input" value={driver.firstName} onChange={e => updateDriver(driver.id, 'firstName', e.target.value)} /></div>
                        <div className="form-group"><label className="form-label">Middle Name</label><input className="form-input" value={driver.middleName} onChange={e => updateDriver(driver.id, 'middleName', e.target.value)} /></div>
                        <div className="form-group"><label className="form-label">Last Name *</label><input className="form-input" value={driver.lastName} onChange={e => updateDriver(driver.id, 'lastName', e.target.value)} /></div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Explain the update needed *</label>
                        <textarea className="form-input form-textarea" value={driver.explanation} onChange={e => updateDriver(driver.id, 'explanation', e.target.value)} />
                      </div>
                    </>
                  )}

                  {driver.action === 'delete' && (
                    <>
                      <div className="form-row">
                        <div className="form-group"><label className="form-label">First Name *</label><input className="form-input" value={driver.firstName} onChange={e => updateDriver(driver.id, 'firstName', e.target.value)} /></div>
                        <div className="form-group"><label className="form-label">Last Name *</label><input className="form-input" value={driver.lastName} onChange={e => updateDriver(driver.id, 'lastName', e.target.value)} /></div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Reason for Deletion *</label>
                        <textarea className="form-input form-textarea" value={driver.reason} onChange={e => updateDriver(driver.id, 'reason', e.target.value)} />
                      </div>
                    </>
                  )}
                </div>
              ))}
              <button type="button" className="add-row-btn" onClick={addDriver}>+ Add another driver</button>
              <div className="form-group">
                <label className="form-label">Message to Agent</label>
                <textarea className="form-input form-textarea" value={form.driverMessage} onChange={e => setForm(p => ({ ...p, driverMessage: e.target.value }))} placeholder="MVRs, licenses, additional notes..." />
              </div>
            </div>
          )}

          {/* Vehicles & Trailers Section */}
          {form.serviceTypes.includes('vehicles') && (
            <div className="wizard-section">
              <h3 className="wizard-section-title">Vehicles & Trailers</h3>

              {hasVehicleDelete && (
                <div className="mcs90-memo">
                  <strong>Required filing for deletions</strong> — Termination Letter, signed by both the Company and the Owner Operator.
                  Please attach it below. Please note: for many policies the insurance carrier will not allow you to remove liability
                  and maintain only physical damage or cargo coverage. This is due to the 1980 MCS-90 provision passed by Congress.
                </div>
              )}

              {form.vehicles.map((vehicle, idx) => (
                <div key={vehicle.id} className="repeatable-row">
                  <div className="repeatable-row-header">
                    <span className="repeatable-row-num">
                      Unit {idx + 1}
                      {vehicle.isTrailer && <span className="trailer-tag"> · Trailer</span>}
                    </span>
                    {form.vehicles.length > 1 && (
                      <button type="button" className="repeatable-remove-btn" onClick={() => removeVehicle(vehicle.id)}>Remove</button>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Action *</label>
                    <select className="form-input" value={vehicle.action} onChange={e => updateVehicle(vehicle.id, 'action', e.target.value)}>
                      <option value="">Select action...</option>
                      <option value="add">Add</option>
                      <option value="replace">Replace an Existing Unit</option>
                      <option value="delete">Delete</option>
                    </select>
                  </div>

                  {vehicle.action && (
                    <>
                      <div className="form-group">
                        <label className="form-label">VIN *</label>
                        <VinVerifier
                          value={vehicle.vin}
                          onChange={(vin) => updateVehicle(vehicle.id, 'vin', vin)}
                          onVerified={(result) => {
                            updateVehicle(vehicle.id, 'vinResult', result);
                            if (result) {
                              updateVehicle(vehicle.id, 'isTrailer', result.isTrailer);
                              if (result.data.ModelYear && !vehicle.year) updateVehicle(vehicle.id, 'year', result.data.ModelYear);
                              if (result.data.Make && !vehicle.make) updateVehicle(vehicle.id, 'make', result.data.Make);
                              if (result.data.Model && !vehicle.model) updateVehicle(vehicle.id, 'model', result.data.Model);
                            }
                          }}
                          required
                        />
                      </div>
                      <div className="form-row">
                        <div className="form-group"><label className="form-label">Year</label><input className="form-input" value={vehicle.year} onChange={e => updateVehicle(vehicle.id, 'year', e.target.value)} /></div>
                        <div className="form-group"><label className="form-label">Make</label><input className="form-input" value={vehicle.make} onChange={e => updateVehicle(vehicle.id, 'make', e.target.value)} /></div>
                        <div className="form-group"><label className="form-label">Model</label><input className="form-input" value={vehicle.model} onChange={e => updateVehicle(vehicle.id, 'model', e.target.value)} /></div>
                      </div>

                      {(vehicle.action === 'add' || vehicle.action === 'replace') && (
                        <>
                          <div className="form-group"><label className="form-label">Value</label><input className="form-input" value={vehicle.value} onChange={e => updateVehicle(vehicle.id, 'value', e.target.value)} placeholder="$" /></div>
                          {!vehicle.isTrailer && (
                            <div className="form-row">
                              <div className="form-group">
                                <label className="form-label">Vehicle Primary Use *</label>
                                <select className="form-input" value={vehicle.primaryUse} onChange={e => updateVehicle(vehicle.id, 'primaryUse', e.target.value)}>
                                  <option value="">Select...</option>
                                  <option value="Local — under 50 mile radius">Local — under 50 mile radius</option>
                                  <option value="Intermediate — 51–200 mile radius">Intermediate — 51–200 mile radius</option>
                                  <option value="Long-Haul — over 200 mile radius">Long-Haul — over 200 mile radius</option>
                                  <option value="Farming">Farming</option>
                                  <option value="Other Business Use">Other Business Use</option>
                                </select>
                              </div>
                              <div className="form-group"><label className="form-label">Annual Miles *</label><input className="form-input" value={vehicle.annualMiles} onChange={e => updateVehicle(vehicle.id, 'annualMiles', e.target.value)} /></div>
                            </div>
                          )}
                        </>
                      )}

                      {vehicle.action === 'replace' && (
                        <div className="form-group">
                          <label className="form-label">Year, Make, Model, and VIN of the unit being replaced *</label>
                          <input className="form-input" value={vehicle.replacingUnit} onChange={e => updateVehicle(vehicle.id, 'replacingUnit', e.target.value)} />
                        </div>
                      )}

                      {vehicle.action === 'delete' && (
                        <div className="form-group">
                          <label className="form-label">Reason for Deletion *</label>
                          <textarea className="form-input form-textarea" value={vehicle.reason} onChange={e => updateVehicle(vehicle.id, 'reason', e.target.value)} />
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
              <button type="button" className="add-row-btn" onClick={addVehicle}>+ Add another unit</button>
              <div className="form-group">
                <label className="form-label">Message to Agent</label>
                <textarea className="form-input form-textarea" value={form.vehicleMessage} onChange={e => setForm(p => ({ ...p, vehicleMessage: e.target.value }))} placeholder="Termination Letter & Supporting Documents..." />
              </div>
            </div>
          )}

          {/* Addresses Section */}
          {form.serviceTypes.includes('addresses') && (
            <div className="wizard-section">
              <h3 className="wizard-section-title">Addresses</h3>
              <div className="form-group">
                <label className="form-checkbox-label">
                  <input type="checkbox" checked={form.changeMailingAddress} onChange={e => setForm(p => ({ ...p, changeMailingAddress: e.target.checked }))} />
                  Change Mailing Address
                </label>
              </div>
              {form.changeMailingAddress && (
                <div className="address-block">
                  <div className="form-group"><label className="form-label">Street</label><input className="form-input" value={form.mailingStreet} onChange={e => setForm(p => ({ ...p, mailingStreet: e.target.value }))} /></div>
                  <div className="form-row">
                    <div className="form-group"><label className="form-label">City</label><input className="form-input" value={form.mailingCity} onChange={e => setForm(p => ({ ...p, mailingCity: e.target.value }))} /></div>
                    <div className="form-group"><label className="form-label">State/Province</label><input className="form-input" value={form.mailingState} onChange={e => setForm(p => ({ ...p, mailingState: e.target.value }))} /></div>
                    <div className="form-group"><label className="form-label">ZIP/Postal</label><input className="form-input" value={form.mailingZip} onChange={e => setForm(p => ({ ...p, mailingZip: e.target.value }))} /></div>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label className="form-checkbox-label">
                  <input type="checkbox" checked={form.changePhysicalAddress} onChange={e => setForm(p => ({ ...p, changePhysicalAddress: e.target.checked }))} />
                  Change Physical Address
                </label>
              </div>
              {form.changePhysicalAddress && (
                <div className="address-block">
                  <div className="form-group"><label className="form-label">Street</label><input className="form-input" value={form.physicalStreet} onChange={e => setForm(p => ({ ...p, physicalStreet: e.target.value }))} /></div>
                  <div className="form-row">
                    <div className="form-group"><label className="form-label">City</label><input className="form-input" value={form.physicalCity} onChange={e => setForm(p => ({ ...p, physicalCity: e.target.value }))} /></div>
                    <div className="form-group">
                      <label className="form-label">State</label>
                      <select className="form-input" value={form.physicalState} onChange={e => setForm(p => ({ ...p, physicalState: e.target.value }))}>
                        <option value="">Select...</option>
                        {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="form-group"><label className="form-label">ZIP</label><input className="form-input" value={form.physicalZip} onChange={e => setForm(p => ({ ...p, physicalZip: e.target.value }))} /></div>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label className="form-checkbox-label">
                  <input type="checkbox" checked={form.changeGaragingAddress} onChange={e => setForm(p => ({ ...p, changeGaragingAddress: e.target.checked }))} />
                  Change Garaging Address
                </label>
              </div>
              {form.changeGaragingAddress && (
                <div className="address-block">
                  <div className="form-group"><label className="form-label">Street</label><input className="form-input" value={form.garagingStreet} onChange={e => setForm(p => ({ ...p, garagingStreet: e.target.value }))} /></div>
                  <div className="form-row">
                    <div className="form-group"><label className="form-label">City</label><input className="form-input" value={form.garagingCity} onChange={e => setForm(p => ({ ...p, garagingCity: e.target.value }))} /></div>
                    <div className="form-group">
                      <label className="form-label">State</label>
                      <select className="form-input" value={form.garagingState} onChange={e => setForm(p => ({ ...p, garagingState: e.target.value }))}>
                        <option value="">Select...</option>
                        {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="form-group"><label className="form-label">ZIP</label><input className="form-input" value={form.garagingZip} onChange={e => setForm(p => ({ ...p, garagingZip: e.target.value }))} /></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Lien Holders Section */}
          {form.serviceTypes.includes('lienholders') && (
            <div className="wizard-section">
              <h3 className="wizard-section-title">Lien Holders</h3>
              <div className="form-group">
                <label className="form-checkbox-label">
                  <input type="checkbox" checked={form.lienBusiness} onChange={e => setForm(p => ({ ...p, lienBusiness: e.target.checked }))} />
                  Add to Business / Property
                </label>
              </div>
              {form.lienBusiness && (
                <div className="address-block">
                  <div className="form-group"><label className="form-label">Lien Holder Name *</label><input className="form-input" value={form.lienHolderName} onChange={e => setForm(p => ({ ...p, lienHolderName: e.target.value }))} /></div>
                  <div className="form-group"><label className="form-label">Name Line 2</label><input className="form-input" value={form.lienNameLine2} onChange={e => setForm(p => ({ ...p, lienNameLine2: e.target.value }))} /></div>
                  <div className="form-row">
                    <div className="form-group"><label className="form-label">Address 1</label><input className="form-input" value={form.lienAddress1} onChange={e => setForm(p => ({ ...p, lienAddress1: e.target.value }))} /></div>
                    <div className="form-group"><label className="form-label">Address 2</label><input className="form-input" value={form.lienAddress2} onChange={e => setForm(p => ({ ...p, lienAddress2: e.target.value }))} /></div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label className="form-label">City</label><input className="form-input" value={form.lienCity} onChange={e => setForm(p => ({ ...p, lienCity: e.target.value }))} /></div>
                    <div className="form-group"><label className="form-label">State</label><input className="form-input" value={form.lienState} onChange={e => setForm(p => ({ ...p, lienState: e.target.value }))} /></div>
                    <div className="form-group"><label className="form-label">ZIP</label><input className="form-input" value={form.lienZip} onChange={e => setForm(p => ({ ...p, lienZip: e.target.value }))} /></div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label className="form-label">Loan Number *</label><input className="form-input" value={form.lienLoanNumber} onChange={e => setForm(p => ({ ...p, lienLoanNumber: e.target.value }))} /></div>
                    <div className="form-group">
                      <label className="form-label">Lender Position</label>
                      <select className="form-input" value={form.lienPosition} onChange={e => setForm(p => ({ ...p, lienPosition: e.target.value }))}>
                        <option value="First Mortgagee">First Mortgagee</option>
                        <option value="Second Mortgagee">Second Mortgagee</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Bill To *</label>
                      <select className="form-input" value={form.lienBillTo} onChange={e => setForm(p => ({ ...p, lienBillTo: e.target.value }))}>
                        <option value="Mortgagee">Mortgagee</option>
                        <option value="Insured">Insured</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label className="form-checkbox-label">
                  <input type="checkbox" checked={form.lienVehicle} onChange={e => setForm(p => ({ ...p, lienVehicle: e.target.checked }))} />
                  Add to Vehicle
                </label>
              </div>
              {form.lienVehicle && (
                <div className="address-block">
                  <div className="form-group"><label className="form-label">Vehicle to add lien holder to *</label><input className="form-input" value={form.vehicleLienVehicle} onChange={e => setForm(p => ({ ...p, vehicleLienVehicle: e.target.value }))} /></div>
                  <div className="form-group"><label className="form-label">Lien Holder Name *</label><input className="form-input" value={form.vehicleLienName} onChange={e => setForm(p => ({ ...p, vehicleLienName: e.target.value }))} /></div>
                  <div className="form-group"><label className="form-label">Loan Number</label><input className="form-input" value={form.vehicleLienLoanNumber} onChange={e => setForm(p => ({ ...p, vehicleLienLoanNumber: e.target.value }))} /></div>
                </div>
              )}
            </div>
          )}

          {/* Certificate of Insurance Section */}
          {form.serviceTypes.includes('certificate') && (
            <div className="wizard-section">
              <h3 className="wizard-section-title">Certificate of Insurance</h3>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Email to send COI *</label><input type="email" className="form-input" value={form.coiEmail} onChange={e => setForm(p => ({ ...p, coiEmail: e.target.value }))} /></div>
                <div className="form-group"><label className="form-label">Certificate Holder's Name *</label><input className="form-input" value={form.coiHolderName} onChange={e => setForm(p => ({ ...p, coiHolderName: e.target.value }))} /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Address 1</label><input className="form-input" value={form.coiAddress1} onChange={e => setForm(p => ({ ...p, coiAddress1: e.target.value }))} /></div>
                <div className="form-group"><label className="form-label">Address 2</label><input className="form-input" value={form.coiAddress2} onChange={e => setForm(p => ({ ...p, coiAddress2: e.target.value }))} /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">City</label><input className="form-input" value={form.coiCity} onChange={e => setForm(p => ({ ...p, coiCity: e.target.value }))} /></div>
                <div className="form-group"><label className="form-label">State</label><input className="form-input" value={form.coiState} onChange={e => setForm(p => ({ ...p, coiState: e.target.value }))} /></div>
                <div className="form-group"><label className="form-label">ZIP</label><input className="form-input" value={form.coiZip} onChange={e => setForm(p => ({ ...p, coiZip: e.target.value }))} /></div>
              </div>
              <div className="form-group"><label className="form-label">Certificate Request Details</label><textarea className="form-input form-textarea" value={form.coiDetails} onChange={e => setForm(p => ({ ...p, coiDetails: e.target.value }))} /></div>
              <div className="form-group">
                <label className="form-checkbox-label"><input type="checkbox" checked={form.coiIncludeVehicleSchedule} onChange={e => setForm(p => ({ ...p, coiIncludeVehicleSchedule: e.target.checked }))} /> Include Vehicle Schedule</label>
              </div>
              <div className="form-group">
                <label className="form-checkbox-label"><input type="checkbox" checked={form.coiIncludeDriverSchedule} onChange={e => setForm(p => ({ ...p, coiIncludeDriverSchedule: e.target.checked }))} /> Include Driver Schedule</label>
              </div>
              <div className="form-group">
                <label className="form-checkbox-label"><input type="checkbox" checked={form.coiAdditionalInsured} onChange={e => setForm(p => ({ ...p, coiAdditionalInsured: e.target.checked }))} /> Make Certificate Holder an Additional Insured</label>
              </div>
            </div>
          )}

          {/* Coverage Change / General Request */}
          {(form.serviceTypes.includes('coverage') || form.serviceTypes.includes('general')) && (
            <div className="wizard-section">
              <h3 className="wizard-section-title">Coverage Change / General Request</h3>
              <div className="form-group">
                <label className="form-label">Request Details *</label>
                <textarea className="form-input form-textarea" rows={5} value={form.coverageDetails} onChange={e => setForm(p => ({ ...p, coverageDetails: e.target.value }))} />
              </div>
            </div>
          )}

          {!allVinsVerified && form.serviceTypes.includes('vehicles') && (
            <div className="vin-warning-banner">
              Verification required — click Verify VIN on each unit before continuing.
            </div>
          )}

          <div className="wizard-actions">
            <button type="button" className="sc-btn-ghost" onClick={() => setStep(1)}>Back</button>
            <button type="button" className="sc-btn-primary" disabled={!canAdvanceToStep3} onClick={() => setStep(3)}>
              Continue to Review
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review & Submit */}
      {step === 3 && (
        <div className="wizard-step-content">
          <h3 className="wizard-section-title">Request Summary</h3>

          <div className="review-summary">
            <div className="review-section">
              <h4>Request Information</h4>
              <div className="review-field"><span>Date:</span> {form.changeDate}</div>
              <div className="review-field"><span>Services:</span> {form.serviceTypes.map(t => SERVICE_TYPES.find(s => s.id === t)?.label).join(', ')}</div>
              <div className="review-field"><span>Insured:</span> {form.insuredFirst} {form.insuredLast}</div>
              <div className="review-field"><span>Business:</span> {form.businessName}</div>
              <div className="review-field"><span>Email:</span> {form.email}</div>
              {form.policyNumber && <div className="review-field"><span>Policy #:</span> {form.policyNumber}</div>}
            </div>

            {form.serviceTypes.includes('drivers') && form.drivers.some(d => d.action) && (
              <div className="review-section">
                <h4>Drivers</h4>
                {form.drivers.filter(d => d.action).map((d, i) => (
                  <div key={d.id} className="review-field">
                    <span>Driver {i + 1}:</span> {d.action.toUpperCase()} — {d.firstName} {d.lastName}
                  </div>
                ))}
              </div>
            )}

            {form.serviceTypes.includes('vehicles') && form.vehicles.some(v => v.action) && (
              <div className="review-section">
                <h4>Vehicles & Trailers</h4>
                {form.vehicles.filter(v => v.action).map((v, i) => (
                  <div key={v.id} className="review-field">
                    <span>Unit {i + 1}:</span> {v.action.toUpperCase()} — VIN: {v.vin} ({v.year} {v.make} {v.model})
                    {v.isTrailer && ' · Trailer'}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="sc-disclaimer-box">
            Any change requested through this form is only a request for service and does not alter your policy
            until formal confirmation and endorsement is received from the carrier. Coverage cannot be bound by
            email, voicemail, or fax.
          </div>

          <div className="form-group" style={{ marginTop: '1.5rem' }}>
            <label className="form-checkbox-label">
              <input type="checkbox" checked={form.agreeDisclaimer} onChange={e => setForm(p => ({ ...p, agreeDisclaimer: e.target.checked }))} />
              I have read and agree to the above disclaimer *
            </label>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Signature *</label>
              <input className="form-input" value={form.signature} onChange={e => setForm(p => ({ ...p, signature: e.target.value }))} placeholder="Type your full name" />
              <span className="form-hint">Typing your name acts as your electronic signature</span>
            </div>
            <div className="form-group">
              <label className="form-label">Date *</label>
              <input type="date" className="form-input" value={form.signatureDate} min={today} onChange={e => setForm(p => ({ ...p, signatureDate: e.target.value }))} />
            </div>
          </div>

          <div className="wizard-actions">
            <button type="button" className="sc-btn-ghost" onClick={() => setStep(2)}>Back</button>
            <button
              type="button"
              className="sc-btn-primary"
              disabled={!form.agreeDisclaimer || !form.signature || submitting}
              onClick={handleSubmit}
            >
              {submitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
