import ServiceCenterLayout from "@/components/ServiceCenterLayout";

export default function ServiceCenterCertificate() {
  return (
    <ServiceCenterLayout>
      <div className="sc-form-page">
        <h1 className="sc-page-title">Request Certificate of Insurance</h1>
        <p className="sc-intro-text">
          Submit your Additional Insured's requests to us for review. We'll process your certificate 
          request and deliver it to the appropriate parties.
        </p>
        <div className="sc-form-placeholder">
          <p>Certificate of Insurance request form coming soon.</p>
          <p>In the meantime, please call us at <a href="tel:3312401101">(331) 240-1101</a> or email <a href="mailto:info@truxins.com">info@truxins.com</a>.</p>
        </div>
      </div>
    </ServiceCenterLayout>
  );
}
