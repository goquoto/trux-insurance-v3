import ServiceCenterLayout from "@/components/ServiceCenterLayout";

export default function ServiceCenterPolicyChange() {
  return (
    <ServiceCenterLayout>
      <div className="sc-form-page">
        <h1 className="sc-page-title">Policy Change Request</h1>
        <p className="sc-intro-text">
          Use the form below to request changes to your policy, including vehicle additions/removals, 
          driver changes, address updates, coverage modifications, and more.
        </p>
        <p className="sc-intro-disclaimer">
          <strong>Please keep in mind</strong> that coverage cannot be bound by email, voicemail, or fax. 
          Coverage will only be bound with written notification from our office.
        </p>
        <div className="sc-form-placeholder">
          <p>Policy change request form coming soon.</p>
          <p>In the meantime, please call us at <a href="tel:3312401101">(331) 240-1101</a> or email <a href="mailto:info@truxins.com">info@truxins.com</a>.</p>
        </div>
      </div>
    </ServiceCenterLayout>
  );
}
