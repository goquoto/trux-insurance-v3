import { useState } from 'react';
import { useLocation } from 'wouter';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import JotformEmbed from '@/components/JotformEmbed';
import { trpc } from '@/lib/trpc';
import { LICENSED_STATES } from '@shared/states';

// Jotform form ID for the fast quote form
// Replace with your actual Jotform form ID once created
const JOTFORM_FAST_QUOTE_FORM_ID = "PLACEHOLDER_FAST_QUOTE_FORM";

// Toggle: set to true to use Jotform embed, false to use native form
const USE_JOTFORM = true;

interface QuickQuoteData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  dotNumber: string;
  state: string;
  notes: string;
}

const initialFormData: QuickQuoteData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  companyName: '',
  dotNumber: '',
  state: '',
  notes: '',
};

export default function QuickQuote() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState<QuickQuoteData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const submitMutation = trpc.quotes.submit.useMutation({
    onSuccess: (data: any) => {
      if (data.success && data.id) {
        setLocation(`/quote-confirmation/${data.id}`);
      }
    },
    onError: (error: any) => {
      setErrors({ submit: error.message });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.companyName) newErrors.companyName = 'Company name is required';
    if (!formData.dotNumber) newErrors.dotNumber = 'DOT number is required';
    if (!formData.state) newErrors.state = 'State is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const submitData = {
      ...formData,
      businessName: formData.companyName,
      policyState: formData.state,
      contactFirstName: formData.firstName,
      contactLastName: formData.lastName,
      contactEmail: formData.email,
      contactPhone: formData.phone,
      effectiveDate: new Date().toISOString().split('T')[0],
      businessStructure: 'Sole Proprietor',
      yearEstablished: new Date().getFullYear(),
      mailingAddress: '',
      mailingCity: '',
      mailingState: formData.state,
      mailingZip: '',
      currentlyInsured: false,
      targetPremium: 0,
      mcNumber: '',
      ein: '',
      coverages: [],
      trucks: [],
      trailers: [],
      drivers: [],
      commodities: [],
      notes: formData.notes,
    };

    await submitMutation.mutateAsync(submitData as any);
  };

  return (
    <Layout>
      <SEO
        title="Get a Fast Quote"
        description="Submit a quick quote request for trucking insurance. We'll get back to you within 24 hours."
        canonical="/quick-quote"
      />
      <Breadcrumbs items={[{ label: 'Get a Fast Quote', href: '/quick-quote' }]} />

      <div className="container py-16">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12">
            <p className="eyebrow">QUICK APPLICATION</p>
            <div className="tick-rule mb-6"></div>
            <h1 className="text-4xl font-serif font-medium mb-4">Get a Fast Quote</h1>
            <p className="text-lg text-muted">
              Fill out this quick form and we'll get back to you within 24 hours with a quote tailored to your trucking operation.
            </p>
          </div>

          {USE_JOTFORM ? (
            <JotformEmbed
              formId={JOTFORM_FAST_QUOTE_FORM_ID}
              title="Get a Fast Quote"
              minHeight={500}
              onSubmit={() => {
                // Optionally redirect or show inline success
              }}
            />
          ) : (
          <form onSubmit={handleSubmit} className="space-y-6 bg-paper-2 p-8 rounded">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="John"
                />
                {errors.firstName && <p className="text-warn text-sm mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="form-label">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Doe"
                />
                {errors.lastName && <p className="text-warn text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {/* Contact Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-warn text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="form-label">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="(555) 123-4567"
                />
                {errors.phone && <p className="text-warn text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Company Fields */}
            <div>
              <label className="form-label">Company Name *</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Your Trucking Company"
              />
              {errors.companyName && <p className="text-warn text-sm mt-1">{errors.companyName}</p>}
            </div>

            {/* DOT and State */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">DOT Number *</label>
                <input
                  type="text"
                  name="dotNumber"
                  value={formData.dotNumber}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="123456"
                />
                {errors.dotNumber && <p className="text-warn text-sm mt-1">{errors.dotNumber}</p>}
              </div>
              <div>
                <label className="form-label">State *</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="">- Select State -</option>
                  {LICENSED_STATES.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                {errors.state && <p className="text-warn text-sm mt-1">{errors.state}</p>}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="form-label">Additional Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Tell us about your operation, any special requirements, or questions..."
                rows={4}
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="form-label">Attach Documents (Optional)</label>
              <p className="text-sm text-muted mb-3">Loss runs, IFTAs, driver lists, or vehicle lists help us expedite your quote</p>
              <div className="border-2 border-dashed border-hair rounded p-6 text-center bg-sand">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <p className="text-muted mb-2">Drop files here or click to select</p>
                  {uploadedFile && (
                    <p className="text-sm text-ink font-medium">✓ {uploadedFile.name}</p>
                  )}
                </label>
              </div>
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="p-4 bg-warn/10 border border-warn rounded text-warn text-sm">
                {errors.submit}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={submitMutation.isPending}
                className="btn-solid flex-1"
              >
                {submitMutation.isPending ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>

            <p className="text-xs text-muted text-center">
              We'll review your application and contact you within 24 hours.
            </p>
          </form>
          )}
        </div>
      </div>
    </Layout>
  );
}
