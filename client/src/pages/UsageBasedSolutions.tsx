import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Link } from "wouter";

const UBS_FEATURES = [
  {
    title: "Real-Time Telematics",
    description: "Monitor driver behavior, vehicle diagnostics, and route data in real time.",
  },
  {
    title: "Safety Scoring",
    description: "Automated driver and fleet safety scores based on actual driving data.",
  },
  {
    title: "Premium Discounts",
    description: "Earn discounts (up to 15%) by maintaining safe driving records.",
  },
  {
    title: "Claims Reduction",
    description: "Fewer accidents = lower claims = lower premiums over time.",
  },
  {
    title: "Driver Coaching",
    description: "Automated alerts and coaching to improve driver behavior.",
  },
  {
    title: "Compliance Ready",
    description: "Data supports CSA scores, ELD compliance, and regulatory audits.",
  },
];

const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Install Telematics",
    description: "We provide or integrate with your existing ELD/telematics device.",
  },
  {
    step: 2,
    title: "Collect Data",
    description: "Real-time data on driving behavior, vehicle health, and routes.",
  },
  {
    step: 3,
    title: "Score & Coach",
    description: "Automated safety scores and driver coaching based on actual performance.",
  },
  {
    step: 4,
    title: "Earn Discounts",
    description: "Premium reductions based on demonstrated safe driving and maintenance.",
  },
];

export default function UsageBasedSolutions() {
  return (
    <Layout>
      <SEO
        title="Usage-Based Trucking Insurance | Telematics, Safety Scoring | Trux"
        description="Usage-based insurance for trucking fleets. Real-time telematics, safety scoring, and premium discounts for safe drivers. Up to 15% savings."
        canonical="/usage-based-solutions"
      />
      <Breadcrumbs items={[{ label: "Usage-Based Solutions" }]} />

      {/* Hero */}
      <section className="py-16 bg-paper-2">
        <div className="container">
          <span className="eyebrow">Insurance Innovation</span>
          <div className="tick mt-4"></div>
          <h1 className="mt-4 mb-4">Usage-Based Insurance for Trucking</h1>
          <p className="lead max-w-2xl">
            Pay for the safety you deliver. Real-time telematics, driver coaching, and premium discounts tied to actual performance — not just claims history.
          </p>
        </div>
      </section>

      <hr className="hairline" />

      {/* The Problem */}
      <section className="section bg-paper">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="mb-6">The problem with traditional trucking insurance</h2>
              <p className="font-sans text-[16px] text-muted-custom mb-4 leading-relaxed">
                Traditional insurance rates are based on historical claims data. If you had an accident two years ago, you're still paying for it. If you've improved your safety culture, the market doesn't know it yet.
              </p>
              <p className="font-sans text-[16px] text-muted-custom mb-4 leading-relaxed">
                You're also flying blind on driver behavior. You don't know which drivers are speeding, braking hard, or taking risks until something goes wrong.
              </p>
              <p className="font-sans text-[16px] text-muted-custom leading-relaxed">
                Usage-based insurance changes that. We measure safety in real time and reward it with lower premiums.
              </p>
            </div>
            <div className="bg-sand p-8 border-l-[5px] border-ink">
              <h3 className="font-serif text-[20px] text-ink mb-4">The Trux difference</h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-ink font-bold">·</span>
                  <span className="font-sans text-[14px] text-ink"><strong>Real-time visibility.</strong> Know what your drivers are doing on every mile.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-ink font-bold">·</span>
                  <span className="font-sans text-[14px] text-ink"><strong>Immediate feedback.</strong> Drivers get coached on unsafe behavior before it becomes a claim.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-ink font-bold">·</span>
                  <span className="font-sans text-[14px] text-ink"><strong>Measurable savings.</strong> Safe fleets earn discounts of 10–15% within the first year.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-ink font-bold">·</span>
                  <span className="font-sans text-[14px] text-ink"><strong>Compliance support.</strong> Telematics data supports CSA scores and regulatory audits.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* Features Grid */}
      <section className="section bg-paper-2">
        <div className="container">
          <h2 className="mb-12 text-center">What's included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {UBS_FEATURES.map((feature, idx) => (
              <div key={idx} className="p-6 border border-[var(--hair)] hover:border-purple/50 transition-colors">
                <h3 className="font-serif text-[16px] text-ink mb-3">{feature.title}</h3>
                <p className="font-sans text-[14px] text-muted-custom">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* How It Works */}
      <section className="section bg-paper">
        <div className="container">
          <h2 className="mb-12 text-center">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-purple text-white flex items-center justify-center font-serif text-[18px] font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-serif text-[16px] text-ink mb-2">{item.title}</h3>
                <p className="font-sans text-[13px] text-muted-custom">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* ROI Section */}
      <section className="section bg-sand">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="mb-6">What's the ROI?</h2>
              <p className="font-sans text-[16px] text-muted-custom mb-6 leading-relaxed">
                Most fleets see measurable improvements within the first 6 months:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-[24px] font-serif text-ink">↓</span>
                  <div>
                    <h4 className="font-serif text-[14px] text-ink mb-1">Fewer accidents</h4>
                    <p className="font-sans text-[13px] text-muted-custom">Real-time coaching reduces preventable incidents by 15–25%.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[24px] font-serif text-ink">↓</span>
                  <div>
                    <h4 className="font-serif text-[14px] text-ink mb-1">Lower premiums</h4>
                    <p className="font-sans text-[13px] text-muted-custom">Discounts of 10–15% in year one, compounding as safety improves.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[24px] font-serif text-ink">↓</span>
                  <div>
                    <h4 className="font-serif text-[14px] text-ink mb-1">Better CSA scores</h4>
                    <p className="font-sans text-[13px] text-muted-custom">Telematics data supports FMCSA compliance and audit readiness.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[24px] font-serif text-ink">↓</span>
                  <div>
                    <h4 className="font-serif text-[14px] text-ink mb-1">Happier drivers</h4>
                    <p className="font-sans text-[13px] text-muted-custom">Safe drivers earn recognition and incentives. Retention improves.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 border border-[var(--hair)]">
              <h3 className="font-serif text-[18px] text-ink mb-6">Example: 10-truck fleet</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-[var(--hair)]">
                  <span className="font-sans text-[14px] text-muted-custom">Current premium</span>
                  <span className="font-serif text-[16px] text-ink font-bold">$45,000/yr</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-[var(--hair)]">
                  <span className="font-sans text-[14px] text-muted-custom">With UBS (Year 1)</span>
                  <span className="font-serif text-[16px] text-ink font-bold">$38,250/yr</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-[var(--hair)]">
                  <span className="font-sans text-[14px] text-muted-custom">Telematics cost</span>
                  <span className="font-serif text-[14px] text-muted-custom">~$200/truck/yr</span>
                </div>
                <div className="flex justify-between items-center pt-3 bg-purple/5 p-3">
                  <span className="font-serif text-[14px] text-ink font-bold">Net savings</span>
                  <span className="font-serif text-[18px] text-purple font-bold">$5,550/yr</span>
                </div>
              </div>
              <p className="font-sans text-[12px] text-muted-custom mt-4 italic">
                Savings vary by fleet size, current premium, and safety performance. This is an example only.
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* FAQ */}
      <section className="section bg-paper">
        <div className="container">
          <h2 className="mb-12 text-center">Common questions</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="font-serif text-[16px] text-ink mb-3">Is telematics mandatory?</h3>
              <p className="font-sans text-[14px] text-muted-custom">
                For usage-based discounts, yes — we need real data. If you already have an ELD or telematics system, we can integrate with it.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-[16px] text-ink mb-3">What about driver privacy?</h3>
              <p className="font-sans text-[14px] text-muted-custom">
                Telematics collects vehicle and route data, not personal information. Drivers know they're being monitored and why.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-[16px] text-ink mb-3">How long until I see savings?</h3>
              <p className="font-sans text-[14px] text-muted-custom">
                Most fleets see discounts within 6 months. The longer your safety record, the bigger your discount.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-[16px] text-ink mb-3">Can I switch back to traditional insurance?</h3>
              <p className="font-sans text-[14px] text-muted-custom">
                Yes, but most fleets stay because the savings and safety benefits are real. And your improved safety record carries over.
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* CTA */}
      <section className="section bg-paper-2">
        <div className="container text-center">
          <h2 className="mb-4">Ready to lower your premiums and improve safety?</h2>
          <p className="font-sans text-[16px] text-muted-custom max-w-2xl mx-auto mb-8">
            Get a usage-based quote. We'll show you the exact savings your fleet can earn.
          </p>
          <Link href="/quote" className="btn-solid no-underline inline-block">
            Get a Quote
          </Link>
        </div>
      </section>
    </Layout>
  );
}
