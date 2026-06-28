import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import { trpc } from '@/lib/trpc';
import { LICENSED_STATES } from '@shared/states';

type FormStep = 'basic' | 'coverages' | 'contacts' | 'trucks' | 'trailers' | 'drivers' | 'commodities' | 'wrapping';

const STEPS: { id: FormStep; label: string; number: number }[] = [
  { id: 'basic', label: 'Basic Info', number: 1 },
  { id: 'coverages', label: 'Coverages', number: 2 },
  { id: 'contacts', label: 'Contacts', number: 3 },
  { id: 'trucks', label: 'Trucks', number: 4 },
  { id: 'trailers', label: 'Trailers', number: 5 },
  { id: 'drivers', label: 'Drivers', number: 6 },
  { id: 'commodities', label: 'Commodities', number: 7 },
  { id: 'wrapping', label: 'Wrapping Up', number: 8 },
];

const US_STATES = LICENSED_STATES;

const COVERAGE_OPTIONS = [
  'Commercial Auto Liability',
  'Physical Damage',
  'Cargo',
  'General Liability',
  'Workers Compensation',
  'Trailer Interchange',
  'Hired & Non-Owned Auto',
];

interface FormData {
  effectiveDate: string;
  policyState: string;
  currentlyInsured: boolean;
  targetPremium: number | '';
  dotNumber: string;
  mcNumber: string;
  ein: string;
  businessName: string;
  hasDba: boolean;
  dbaName: string;
  businessStructure: string;
  website: string;
  yearEstablished: number | '';
  mailingAddress: string;
  mailingCity: string;
  mailingState: string;
  mailingZip: string;
  garagingAddress: string;
  garagingCity: string;
  garagingState: string;
  garagingZip: string;
  sameAsMailingAddress: boolean;
  allVehiclesSameLocation: boolean;
  selectedCoverages: string[];
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactPhone: string;
  trucks: Array<{ year: number; make: string; model: string; vin: string }>;
  trailers: Array<{ year: number; type: string; count: number }>;
  drivers: Array<{ name: string; yearsExperience: number; violations: number }>;
  commodities: string[];
}

const initialFormData: FormData = {
  effectiveDate: '',
  policyState: '',
  currentlyInsured: false,
  targetPremium: '',
  dotNumber: '',
  mcNumber: '',
  ein: '',
  businessName: '',
  hasDba: false,
  dbaName: '',
  businessStructure: '',
  website: '',
  yearEstablished: '',
  mailingAddress: '',
  mailingCity: '',
  mailingState: '',
  mailingZip: '',
  garagingAddress: '',
  garagingCity: '',
  garagingState: '',
  garagingZip: '',
  sameAsMailingAddress: false,
  allVehiclesSameLocation: false,
  selectedCoverages: [],
  contactFirstName: '',
  contactLastName: '',
  contactEmail: '',
  contactPhone: '',
  trucks: [],
  trailers: [],
  drivers: [],
  commodities: [],
};

const STORAGE_KEY = 'trux_quote_draft';

export default function QuoteForm() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState<FormStep>(() => {
    if (typeof window === 'undefined') return 'basic';
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).step : 'basic';
    } catch {
      return 'basic';
    }
  });
  const [formData, setFormData] = useState<FormData>(() => {
    if (typeof window === 'undefined') return initialFormData;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).data : initialFormData;
    } catch {
      return initialFormData;
    }
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saveMessage, setSaveMessage] = useState<string>('');

  const submitQuoteMutation = trpc.quotes.submit.useMutation({
    onSuccess: (data) => {
      if (data.success && data.id) {
        setLocation(`/quote-confirmation/${data.id}`);
      }
    },
    onError: (error) => {
      setErrors({ submit: error.message });
    },
  });

  const saveProgress = () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ step: currentStep, data: formData }));
        setSaveMessage('✓ Progress saved! You can close and return later.');
        setTimeout(() => setSaveMessage(''), 4000);
      } catch (e) {
        console.error('Failed to save:', e);
      }
    }
  };

  const clearDraft = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
      setFormData(initialFormData);
      setCurrentStep('basic');
      setSaveMessage('Draft cleared.');
      setTimeout(() => setSaveMessage(''), 2000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => {
      const updated = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      };
      // Auto-save to localStorage
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ step: currentStep, data: updated }));
        } catch (e) {
          console.error('Auto-save failed:', e);
        }
      }
      return updated;
    });
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 'basic') {
      if (!formData.effectiveDate) newErrors.effectiveDate = 'Effective date is required';
      if (!formData.policyState) newErrors.policyState = 'Policy state is required';
      if (!formData.businessName) newErrors.businessName = 'Business name is required';
      if (!formData.businessStructure) newErrors.businessStructure = 'Business structure is required';
      if (!formData.yearEstablished) newErrors.yearEstablished = 'Year established is required';
      if (!formData.mailingAddress) newErrors.mailingAddress = 'Mailing address is required';
      if (!formData.mailingCity) newErrors.mailingCity = 'City is required';
      if (!formData.mailingState) newErrors.mailingState = 'State is required';
      if (!formData.mailingZip) newErrors.mailingZip = 'ZIP code is required';
    }

    if (currentStep === 'contacts') {
      if (!formData.contactFirstName) newErrors.contactFirstName = 'First name is required';
      if (!formData.contactLastName) newErrors.contactLastName = 'Last name is required';
      if (!formData.contactEmail) newErrors.contactEmail = 'Email is required';
      if (!formData.contactPhone) newErrors.contactPhone = 'Phone is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToNextStep = () => {
    if (!validateStep()) return;

    const currentIndex = STEPS.findIndex(s => s.id === currentStep);
    if (currentIndex < STEPS.length - 1) {
      const nextStep = STEPS[currentIndex + 1].id;
      setCurrentStep(nextStep);
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ step: nextStep, data: formData }));
        } catch (e) {
          console.error('Save failed:', e);
        }
      }
    }
  };

  const goToPreviousStep = () => {
    const currentIndex = STEPS.findIndex(s => s.id === currentStep);
    if (currentIndex > 0) {
      const prevStep = STEPS[currentIndex - 1].id;
      setCurrentStep(prevStep);
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ step: prevStep, data: formData }));
        } catch (e) {
          console.error('Save failed:', e);
        }
      }
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    await submitQuoteMutation.mutateAsync(formData as any);
    // Clear draft on successful submission
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const currentStepData = STEPS.find(s => s.id === currentStep);
  const currentStepIndex = STEPS.findIndex(s => s.id === currentStep);

  return (
    <Layout>
      <SEO
        title="Trucking Insurance Quote"
        description="Get a quick quote for commercial trucking insurance. 8-step application process."
        canonical="/quote"
      />
      <Breadcrumbs items={[{ label: 'Get a Quote', href: '/quote' }]} />

      <div className="section container">
        <div className="mb-12">
          <div className="eyebrow">GET A QUOTE</div>
          <div className="tick"></div>
          <h1 className="mb-4">Trucking Insurance Quote</h1>
          <p className="lead">Step {currentStepData?.number} of {STEPS.length}: {currentStepData?.label}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex gap-2 mb-4">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded flex items-center justify-center text-sm font-medium transition-colors ${
                    index < currentStepIndex
                      ? 'bg-purple text-white'
                      : index === currentStepIndex
                      ? 'bg-purple text-white'
                      : 'bg-hair text-muted'
                  }`}
                >
                  {index < currentStepIndex ? '✓' : step.number}
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`h-1 w-8 mx-1 transition-colors ${
                      index < currentStepIndex ? 'bg-purple' : 'bg-hair'
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-2xl mb-12">
          {currentStep === 'basic' && (
            <div className="space-y-6">
              <div>
                <label className="form-label">Effective Date *</label>
                <input
                  type="date"
                  name="effectiveDate"
                  value={formData.effectiveDate}
                  onChange={handleInputChange}
                  className="form-input"
                />
                {errors.effectiveDate && <p className="text-warn text-sm mt-1">{errors.effectiveDate}</p>}
              </div>

              <div>
                <label className="form-label">Policy State *</label>
                <select
                  name="policyState"
                  value={formData.policyState}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="">Select State</option>
                  {US_STATES.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                {errors.policyState && <p className="text-warn text-sm mt-1">{errors.policyState}</p>}
              </div>

              <div>
                <label className="form-label">Currently Insured?</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="currentlyInsured"
                      checked={formData.currentlyInsured === true}
                      onChange={() => setFormData(prev => ({ ...prev, currentlyInsured: true }))}
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="currentlyInsured"
                      checked={formData.currentlyInsured === false}
                      onChange={() => setFormData(prev => ({ ...prev, currentlyInsured: false }))}
                    />
                    No
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Target Premium</label>
                  <input
                    type="number"
                    name="targetPremium"
                    value={formData.targetPremium}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="$"
                  />
                </div>
                <div>
                  <label className="form-label">DOT #</label>
                  <input
                    type="text"
                    name="dotNumber"
                    value={formData.dotNumber}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">MC #</label>
                  <input
                    type="text"
                    name="mcNumber"
                    value={formData.mcNumber}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">EIN / TNN</label>
                  <input
                    type="text"
                    name="ein"
                    value={formData.ein}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Business Name *</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="form-input"
                />
                {errors.businessName && <p className="text-warn text-sm mt-1">{errors.businessName}</p>}
              </div>

              <div>
                <label className="form-label">Has DBA?</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={formData.hasDba === true}
                      onChange={() => setFormData(prev => ({ ...prev, hasDba: true }))}
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={formData.hasDba === false}
                      onChange={() => setFormData(prev => ({ ...prev, hasDba: false }))}
                    />
                    No
                  </label>
                </div>
              </div>

              {formData.hasDba && (
                <div>
                  <label className="form-label">DBA Name</label>
                  <input
                    type="text"
                    name="dbaName"
                    value={formData.dbaName}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              )}

              <div>
                <label className="form-label">Business Structure *</label>
                <select
                  name="businessStructure"
                  value={formData.businessStructure}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="">Select Structure</option>
                  <option value="sole-proprietor">Sole Proprietor</option>
                  <option value="partnership">Partnership</option>
                  <option value="llc">LLC</option>
                  <option value="corporation">Corporation</option>
                  <option value="other">Other</option>
                </select>
                {errors.businessStructure && <p className="text-warn text-sm mt-1">{errors.businessStructure}</p>}
              </div>

              <div>
                <label className="form-label">Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="https://"
                />
              </div>

              <div>
                <label className="form-label">Year Established *</label>
                <input
                  type="number"
                  name="yearEstablished"
                  value={formData.yearEstablished}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="YYYY"
                />
                {errors.yearEstablished && <p className="text-warn text-sm mt-1">{errors.yearEstablished}</p>}
              </div>

              <div>
                <label className="form-label">Mailing Address *</label>
                <input
                  type="text"
                  name="mailingAddress"
                  value={formData.mailingAddress}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Street Address"
                />
                {errors.mailingAddress && <p className="text-warn text-sm mt-1">{errors.mailingAddress}</p>}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="form-label">City *</label>
                  <input
                    type="text"
                    name="mailingCity"
                    value={formData.mailingCity}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                  {errors.mailingCity && <p className="text-warn text-sm mt-1">{errors.mailingCity}</p>}
                </div>
                <div>
                  <label className="form-label">State *</label>
                  <select
                    name="mailingState"
                    value={formData.mailingState}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value="">Select State</option>
                    {US_STATES.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  {errors.mailingState && <p className="text-warn text-sm mt-1">{errors.mailingState}</p>}
                </div>
                <div>
                  <label className="form-label">ZIP *</label>
                  <input
                    type="text"
                    name="mailingZip"
                    value={formData.mailingZip}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                  {errors.mailingZip && <p className="text-warn text-sm mt-1">{errors.mailingZip}</p>}
                </div>
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="sameAsMailingAddress"
                  checked={formData.sameAsMailingAddress}
                  onChange={handleInputChange}
                />
                Garaging address same as mailing address
              </label>

              {!formData.sameAsMailingAddress && (
                <>
                  <div>
                    <label className="form-label">Garaging Address</label>
                    <input
                      type="text"
                      name="garagingAddress"
                      value={formData.garagingAddress}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="garagingCity"
                      value={formData.garagingCity}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="City"
                    />
                    <select
                      name="garagingState"
                      value={formData.garagingState}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="">State</option>
                      {US_STATES.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      name="garagingZip"
                      value={formData.garagingZip}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="ZIP"
                    />
                  </div>
                </>
              )}

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="allVehiclesSameLocation"
                  checked={formData.allVehiclesSameLocation}
                  onChange={handleInputChange}
                />
                All vehicles garaged at same location
              </label>
            </div>
          )}

          {currentStep === 'coverages' && (
            <div className="space-y-4">
              <p className="text-muted mb-6">Select the coverages you need:</p>
              {COVERAGE_OPTIONS.map(coverage => (
                <label key={coverage} className="flex items-center gap-3 p-4 border border-hair rounded">
                  <input
                    type="checkbox"
                    checked={formData.selectedCoverages.includes(coverage)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData(prev => ({
                          ...prev,
                          selectedCoverages: [...prev.selectedCoverages, coverage],
                        }));
                      } else {
                        setFormData(prev => ({
                          ...prev,
                          selectedCoverages: prev.selectedCoverages.filter(c => c !== coverage),
                        }));
                      }
                    }}
                  />
                  <span className="font-medium">{coverage}</span>
                </label>
              ))}
            </div>
          )}

          {currentStep === 'contacts' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">First Name *</label>
                  <input
                    type="text"
                    name="contactFirstName"
                    value={formData.contactFirstName}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                  {errors.contactFirstName && <p className="text-warn text-sm mt-1">{errors.contactFirstName}</p>}
                </div>
                <div>
                  <label className="form-label">Last Name *</label>
                  <input
                    type="text"
                    name="contactLastName"
                    value={formData.contactLastName}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                  {errors.contactLastName && <p className="text-warn text-sm mt-1">{errors.contactLastName}</p>}
                </div>
              </div>

              <div>
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  className="form-input"
                />
                {errors.contactEmail && <p className="text-warn text-sm mt-1">{errors.contactEmail}</p>}
              </div>

              <div>
                <label className="form-label">Phone *</label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  className="form-input"
                />
                {errors.contactPhone && <p className="text-warn text-sm mt-1">{errors.contactPhone}</p>}
              </div>
            </div>
          )}

          {currentStep === 'trucks' && (
            <div className="space-y-6">
              <p className="text-muted">List all trucks in your fleet</p>
              {formData.trucks.map((truck, index) => (
                <div key={index} className="p-4 border border-hair rounded space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Year"
                      value={truck.year}
                      onChange={(e) => {
                        const updated = [...formData.trucks];
                        updated[index].year = parseInt(e.target.value);
                        setFormData(prev => ({ ...prev, trucks: updated }));
                      }}
                      className="form-input"
                    />
                    <input
                      type="text"
                      placeholder="Make"
                      value={truck.make}
                      onChange={(e) => {
                        const updated = [...formData.trucks];
                        updated[index].make = e.target.value;
                        setFormData(prev => ({ ...prev, trucks: updated }));
                      }}
                      className="form-input"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Model"
                      value={truck.model}
                      onChange={(e) => {
                        const updated = [...formData.trucks];
                        updated[index].model = e.target.value;
                        setFormData(prev => ({ ...prev, trucks: updated }));
                      }}
                      className="form-input"
                    />
                    <input
                      type="text"
                      placeholder="VIN"
                      value={truck.vin}
                      onChange={(e) => {
                        const updated = [...formData.trucks];
                        updated[index].vin = e.target.value;
                        setFormData(prev => ({ ...prev, trucks: updated }));
                      }}
                      className="form-input"
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={() => setFormData(prev => ({
                  ...prev,
                  trucks: [...prev.trucks, { year: new Date().getFullYear(), make: '', model: '', vin: '' }],
                }))}
                className="btn-ghost"
              >
                + Add Truck
              </button>
            </div>
          )}

          {currentStep === 'trailers' && (
            <div className="space-y-6">
              <p className="text-muted">List all trailers in your fleet</p>
              {formData.trailers.map((trailer, index) => (
                <div key={index} className="p-4 border border-hair rounded space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <input
                      type="number"
                      placeholder="Year"
                      value={trailer.year}
                      onChange={(e) => {
                        const updated = [...formData.trailers];
                        updated[index].year = parseInt(e.target.value);
                        setFormData(prev => ({ ...prev, trailers: updated }));
                      }}
                      className="form-input"
                    />
                    <input
                      type="text"
                      placeholder="Type (Dry Van, Reefer, Flatbed, etc)"
                      value={trailer.type}
                      onChange={(e) => {
                        const updated = [...formData.trailers];
                        updated[index].type = e.target.value;
                        setFormData(prev => ({ ...prev, trailers: updated }));
                      }}
                      className="form-input"
                    />
                    <input
                      type="number"
                      placeholder="Count"
                      value={trailer.count}
                      onChange={(e) => {
                        const updated = [...formData.trailers];
                        updated[index].count = parseInt(e.target.value);
                        setFormData(prev => ({ ...prev, trailers: updated }));
                      }}
                      className="form-input"
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={() => setFormData(prev => ({
                  ...prev,
                  trailers: [...prev.trailers, { year: new Date().getFullYear(), type: '', count: 1 }],
                }))}
                className="btn-ghost"
              >
                + Add Trailer
              </button>
            </div>
          )}

          {currentStep === 'drivers' && (
            <div className="space-y-6">
              <p className="text-muted">List all drivers</p>
              {formData.drivers.map((driver, index) => (
                <div key={index} className="p-4 border border-hair rounded space-y-4">
                  <input
                    type="text"
                    placeholder="Driver Name"
                    value={driver.name}
                    onChange={(e) => {
                      const updated = [...formData.drivers];
                      updated[index].name = e.target.value;
                      setFormData(prev => ({ ...prev, drivers: updated }));
                    }}
                    className="form-input"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Years of Experience"
                      value={driver.yearsExperience}
                      onChange={(e) => {
                        const updated = [...formData.drivers];
                        updated[index].yearsExperience = parseInt(e.target.value);
                        setFormData(prev => ({ ...prev, drivers: updated }));
                      }}
                      className="form-input"
                    />
                    <input
                      type="number"
                      placeholder="Traffic Violations"
                      value={driver.violations}
                      onChange={(e) => {
                        const updated = [...formData.drivers];
                        updated[index].violations = parseInt(e.target.value);
                        setFormData(prev => ({ ...prev, drivers: updated }));
                      }}
                      className="form-input"
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={() => setFormData(prev => ({
                  ...prev,
                  drivers: [...prev.drivers, { name: '', yearsExperience: 0, violations: 0 }],
                }))}
                className="btn-ghost"
              >
                + Add Driver
              </button>
            </div>
          )}

          {currentStep === 'commodities' && (
            <div className="space-y-6">
              <p className="text-muted">What commodities do you typically haul?</p>
              <textarea
                value={formData.commodities.join(', ')}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  commodities: e.target.value.split(',').map(c => c.trim()),
                }))}
                className="form-input"
                rows={4}
                placeholder="Enter commodities separated by commas (e.g., Dry goods, Refrigerated, Hazmat)"
              />
            </div>
          )}

          {currentStep === 'wrapping' && (
            <div className="space-y-6">
              <div className="p-6 bg-sand rounded">
                <h3 className="font-serif text-lg mb-4">Review Your Information</h3>
                <p className="text-muted mb-4">Please review the information you've provided. Once you submit, our team will review your application and contact you with a quote.</p>
                <div className="space-y-2 text-sm">
                  <p><strong>Business:</strong> {formData.businessName}</p>
                  <p><strong>Policy State:</strong> {formData.policyState}</p>
                  <p><strong>Contact:</strong> {formData.contactFirstName} {formData.contactLastName}</p>
                  <p><strong>Email:</strong> {formData.contactEmail}</p>
                  <p><strong>Coverages:</strong> {formData.selectedCoverages.join(', ')}</p>
                </div>
              </div>
              {errors.submit && <p className="text-warn">{errors.submit}</p>}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-between max-w-2xl mb-6">
          <button
            onClick={goToPreviousStep}
            disabled={currentStepIndex === 0}
            className="btn-ghost disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>

          {currentStep !== 'wrapping' ? (
            <button onClick={goToNextStep} className="btn-solid">
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitQuoteMutation.isPending}
              className="btn-solid disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitQuoteMutation.isPending ? 'Submitting...' : 'Submit Quote'}
            </button>
          )}
        </div>

        {/* Save Progress Section */}
        <div className="max-w-2xl space-y-4">
          <div className="flex gap-2">
            <button
              onClick={saveProgress}
              className="text-sm text-purple hover:underline"
            >
              💾 Save Progress
            </button>
            {typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) && (
              <button
                onClick={clearDraft}
                className="text-sm text-muted hover:text-warn"
              >
                Clear Draft
              </button>
            )}
          </div>

          {saveMessage && (
            <div className="p-3 bg-sand border border-hair rounded text-sm text-muted">
              {saveMessage}
            </div>
          )}

          {typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) && !saveMessage && (
            <div className="p-3 bg-paper-2 border border-hair rounded text-sm text-muted">
              <p className="mb-2">You have a saved draft from a previous session.</p>
              <p className="text-xs">Your progress is automatically saved as you fill out the form.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
