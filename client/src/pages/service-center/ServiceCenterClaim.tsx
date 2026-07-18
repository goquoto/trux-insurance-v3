import ServiceCenterLayout from "@/components/ServiceCenterLayout";

export default function ServiceCenterClaim() {
  return (
    <ServiceCenterLayout>
      <div className="sc-form-page">
        <h1 className="sc-page-title">Submit a Claim</h1>
        <p className="sc-intro-text">
          Contact us or your insurance company to start a new claim. You can also find your carrier's 
          claims contact information on our <a href="/service-center/carriers" className="sc-inline-link">Carriers page</a>.
        </p>
        <div className="sc-form-placeholder">
          <p>Claims submission form coming soon.</p>
          <p>In the meantime, please call us at <a href="tel:3312401101">(331) 240-1101</a> or email <a href="mailto:info@truxins.com">info@truxins.com</a>.</p>
        </div>
      </div>
    </ServiceCenterLayout>
  );
}
