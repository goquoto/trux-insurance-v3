import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Link } from "wouter";
import { blogArticles } from "@/data/blogArticles";

const SAFETY_TOPICS = [
  {
    title: "CSA Score Management",
    description: "Your CSA scores directly affect your insurance premiums. We help you understand, monitor, and improve your BASIC scores.",
    details: [
      "Unsafe Driving — speeding, reckless driving, improper lane change",
      "Hours-of-Service Compliance — HOS violations, logbook falsification",
      "Driver Fitness — medical certificate, licensing violations",
      "Controlled Substances — positive drug/alcohol tests",
      "Vehicle Maintenance — brake, tire, and lighting defects",
      "Hazmat Compliance — packaging, labeling, placarding violations",
      "Crash Indicator — crash involvement history",
    ],
  },
  {
    title: "ELD Compliance",
    description: "Electronic Logging Devices are mandatory for most CMV operators. We help you stay compliant and use ELD data to reduce risk.",
    details: [
      "FMCSA mandate requires ELDs for all CMV drivers subject to HOS",
      "Exemptions: short-haul, pre-2000 engines, driveaway-towaway",
      "Data transfer methods: Bluetooth, USB, wireless web services",
      "Roadside inspection procedures and driver rights",
      "ELD malfunction protocols and 8-day paper log backup",
      "Using ELD data for safety coaching and premium discounts",
    ],
  },
  {
    title: "Pre-Trip Inspection Programs",
    description: "A thorough pre-trip inspection catches problems before they become accidents or violations. We help you build inspection programs that work.",
    details: [
      "FMCSA requires pre-trip inspections before each trip",
      "Key items: brakes, tires, lights, mirrors, coupling devices",
      "Document inspections with standardized checklists",
      "Train drivers on what to look for and when to refuse a load",
      "Use inspection data to schedule preventive maintenance",
      "Reduce Vehicle Maintenance BASIC violations by 40-60%",
    ],
  },
  {
    title: "Driver Training & Coaching",
    description: "The best insurance program starts with well-trained drivers. We help you build training programs that reduce claims and improve safety culture.",
    details: [
      "New driver orientation and road testing protocols",
      "Ongoing safety training (quarterly minimum recommended)",
      "Post-accident retraining and return-to-duty procedures",
      "Defensive driving techniques for CMV operators",
      "Backing safety and spotter protocols",
      "Fatigue management and wellness programs",
    ],
  },
];

const RISK_STATS = [
  { value: "40%", label: "of trucking accidents are preventable" },
  { value: "15%", label: "premium reduction with strong safety programs" },
  { value: "$1.7M", label: "average nuclear verdict in trucking litigation" },
  { value: "72hrs", label: "critical window for post-accident response" },
];

export default function SafetyHub() {
  const safetyArticles = blogArticles.filter((a) => a.category === "Safety").slice(0, 5);

  return (
    <Layout>
      <SEO
        title="Safety & Risk Management | CSA Scores, ELD, Driver Training | Trux"
        description="Comprehensive safety and risk management resources for trucking fleets. CSA score management, ELD compliance, driver training, and claims prevention."
        canonical="/safety"
      />
      <Breadcrumbs items={[{ label: "Safety & Risk Management" }]} />

      {/* Hero */}
      <section className="py-16 bg-paper-2">
        <div className="container">
          <span className="eyebrow">Safety & Risk Management</span>
          <div className="tick mt-4"></div>
          <h1 className="mt-4 mb-4">Safer fleets pay less.</h1>
          <p className="lead max-w-2xl">
            Every dollar invested in safety returns $3–$5 in reduced claims, lower premiums, and better CSA scores. We help you build the programs that make it happen.
          </p>
        </div>
      </section>

      <hr className="hairline" />

      {/* Stats */}
      <section className="py-12 bg-sand">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {RISK_STATS.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="font-serif text-[32px] text-ink font-bold mb-1">{stat.value}</div>
                <p className="font-sans text-[13px] text-muted-custom">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* Safety Topics */}
      <section className="section bg-paper">
        <div className="container">
          <h2 className="mb-12 text-center">Key safety programs</h2>
          <div className="space-y-12">
            {SAFETY_TOPICS.map((topic, idx) => (
              <div key={idx} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12 border-b border-[var(--hair)] last:border-b-0 last:pb-0">
                <div className="lg:col-span-1">
                  <h3 className="font-serif text-[20px] text-ink mb-3">{topic.title}</h3>
                  <p className="font-sans text-[14px] text-muted-custom leading-relaxed">{topic.description}</p>
                </div>
                <div className="lg:col-span-2">
                  <ul className="space-y-2">
                    {topic.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex gap-3 items-start">
                        <span className="text-purple mt-1 text-[10px]">●</span>
                        <span className="font-sans text-[14px] text-ink">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* How We Help */}
      <section className="section bg-paper-2">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="mb-6">How Trux helps with safety</h2>
              <p className="font-sans text-[16px] text-muted-custom mb-6 leading-relaxed">
                We don't just sell insurance — we help you reduce the risk that drives your premiums up. Our safety consulting is included for all Trux clients.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-purple text-white flex items-center justify-center font-serif text-[14px] font-bold shrink-0">1</div>
                  <div>
                    <h4 className="font-serif text-[14px] text-ink mb-1">Safety audit</h4>
                    <p className="font-sans text-[13px] text-muted-custom">We review your CSA scores, loss runs, and current safety programs to identify gaps.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-purple text-white flex items-center justify-center font-serif text-[14px] font-bold shrink-0">2</div>
                  <div>
                    <h4 className="font-serif text-[14px] text-ink mb-1">Action plan</h4>
                    <p className="font-sans text-[13px] text-muted-custom">We build a prioritized plan targeting the specific BASICs and claim types driving your costs.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-purple text-white flex items-center justify-center font-serif text-[14px] font-bold shrink-0">3</div>
                  <div>
                    <h4 className="font-serif text-[14px] text-ink mb-1">Implementation support</h4>
                    <p className="font-sans text-[13px] text-muted-custom">We provide templates, training materials, and ongoing guidance to execute the plan.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-purple text-white flex items-center justify-center font-serif text-[14px] font-bold shrink-0">4</div>
                  <div>
                    <h4 className="font-serif text-[14px] text-ink mb-1">Premium impact</h4>
                    <p className="font-sans text-[13px] text-muted-custom">We present your improved safety record to carriers at renewal for maximum premium reduction.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-sand p-8 border-l-[5px] border-ink">
              <h3 className="font-serif text-[20px] text-ink mb-4">Post-accident protocol</h3>
              <p className="font-sans text-[14px] text-muted-custom mb-4">
                The first 72 hours after an accident are critical. Here's what to do:
              </p>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <span className="font-serif text-[14px] text-ink font-bold">1.</span>
                  <span className="font-sans text-[14px] text-ink">Ensure safety of all parties. Call 911 if needed.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-serif text-[14px] text-ink font-bold">2.</span>
                  <span className="font-sans text-[14px] text-ink">Document the scene — photos, witness info, police report.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-serif text-[14px] text-ink font-bold">3.</span>
                  <span className="font-sans text-[14px] text-ink">Report to Trux immediately: (331) 240-1101.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-serif text-[14px] text-ink font-bold">4.</span>
                  <span className="font-sans text-[14px] text-ink">Do NOT admit fault or discuss details with other parties.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-serif text-[14px] text-ink font-bold">5.</span>
                  <span className="font-sans text-[14px] text-ink">Preserve all ELD, dashcam, and telematics data.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-serif text-[14px] text-ink font-bold">6.</span>
                  <span className="font-sans text-[14px] text-ink">Drug/alcohol test within 2 hours (required by FMCSA).</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* Safety Articles */}
      {safetyArticles.length > 0 && (
        <>
          <section className="section bg-paper">
            <div className="container">
              <h2 className="mb-12 text-center">Safety resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {safetyArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="group block p-6 border border-[var(--hair)] hover:border-purple transition-colors no-underline"
                  >
                    <span className="eyebrow text-[11px]">{article.category}</span>
                    <h3 className="font-serif text-[16px] text-ink mt-2 mb-3 group-hover:text-purple transition-colors">
                      {article.title}
                    </h3>
                    <p className="font-sans text-[13px] text-muted-custom line-clamp-3">{article.excerpt}</p>
                    <span className="font-sans text-[12px] text-purple mt-3 inline-block">Read →</span>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link href="/blog" className="btn-ghost no-underline inline-block">
                  View All Articles
                </Link>
              </div>
            </div>
          </section>
          <hr className="hairline" />
        </>
      )}

      {/* CTA */}
      <section className="section bg-sand">
        <div className="container text-center">
          <h2 className="mb-4">Ready to lower your risk — and your premiums?</h2>
          <p className="font-sans text-[16px] text-muted-custom max-w-2xl mx-auto mb-8">
            Get a quote and a free safety consultation. We'll show you exactly where to focus for maximum impact.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/quote" className="btn-solid no-underline inline-block">
              Get a Quote
            </Link>
            <a href="tel:3312401101" className="btn-ghost no-underline inline-block">
              Call (331) 240-1101
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
