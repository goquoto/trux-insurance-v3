import ServiceCenterLayout from "@/components/ServiceCenterLayout";

export default function ServiceCenterAppointment() {
  return (
    <ServiceCenterLayout>
      <div className="sc-form-page">
        <h1 className="sc-page-title">Account Review</h1>
        <p className="sc-intro-text">
          Schedule an appointment for a comprehensive review of your account. Our team will review 
          your coverages, rates, and ensure you have the protection you need.
        </p>
        <div className="sc-form-placeholder">
          <p>Appointment scheduling coming soon.</p>
          <p>In the meantime, please call us at <a href="tel:3312401101">(331) 240-1101</a> or email <a href="mailto:info@truxins.com">info@truxins.com</a>.</p>
        </div>
      </div>
    </ServiceCenterLayout>
  );
}
