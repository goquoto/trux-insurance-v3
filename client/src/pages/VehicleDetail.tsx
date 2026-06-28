import { Link, useParams, useLocation } from "wouter";
import Layout from "../components/Layout";
import { vehicleDetails } from "../data/vehicleDetailData";
import { useEffect } from "react";

export default function VehicleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const vehicle = slug ? vehicleDetails[slug] : undefined;

  useEffect(() => {
    if (slug && !vehicle) {
      setLocation("/vehicles-we-cover");
    }
  }, [slug, vehicle, setLocation]);

  if (!vehicle) {
    return (
      <Layout>
        <section className="section bg-paper">
          <div className="container text-center">
            <h1>Vehicle Not Found</h1>
            <p className="lead mt-4">The vehicle type you're looking for doesn't exist.</p>
            <Link href="/vehicles-we-cover" className="btn-solid no-underline mt-6 inline-block">
              View All Vehicles
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  // Get related vehicles data
  const relatedVehicleData = vehicle.relatedVehicles
    .map((rvSlug: string) => vehicleDetails[rvSlug])
    .filter(Boolean)
    .slice(0, 4);

  return (
    <Layout>
      {/* SEO Meta */}
      <title>{vehicle.name} Insurance | Trux Insurance Services</title>
      <meta name="description" content={vehicle.description} />

      {/* Hero Section */}
      <section className="section bg-paper">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <nav className="flex items-center gap-2 mb-6 font-sans text-[13px] text-[var(--taupe)]">
                <Link href="/" className="hover:text-[var(--ink)] transition-colors no-underline">Home</Link>
                <span>/</span>
                <Link href="/vehicles-we-cover" className="hover:text-[var(--ink)] transition-colors no-underline">Vehicles We Cover</Link>
                <span>/</span>
                <span className="text-[var(--ink)]">{vehicle.name}</span>
              </nav>
              <span className="eyebrow">{vehicle.category} Insurance</span>
              <div className="tick mt-4"></div>
              <h1 className="mt-4 mb-4">{vehicle.name} Insurance</h1>
              <p className="lead mb-8">{vehicle.description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/quote" className="btn-solid no-underline text-center">
                  Get a Quote
                </Link>
                <a href="tel:18773508789" className="btn-ghost no-underline text-center">
                  Call 1-877-350-8789
                </a>
              </div>
            </div>
            <div className="relative bg-[var(--sand)] p-6 lg:p-10 flex items-center justify-center min-h-[320px] lg:min-h-[420px]">
              {/* Pencil-sketch decorative border */}
              <div className="absolute inset-3 border border-[var(--hair)] pointer-events-none" />
              <img
                src={vehicle.image}
                alt={`${vehicle.name} — pencil sketch illustration`}
                className="w-full max-w-lg h-auto object-contain relative z-10 drop-shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* Overview Section */}
      <section className="section bg-paper-2">
        <div className="container">
          <div className="max-w-3xl">
            <span className="eyebrow">Overview</span>
            <div className="tick mt-4"></div>
            <h2 className="mt-4 mb-6">About {vehicle.name} Insurance</h2>
            <p className="font-sans text-[16px] text-[var(--muted)] leading-[1.8]">
              {vehicle.overview}
            </p>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* Who Needs It + Common Claims */}
      <section className="section bg-paper">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Who Needs It */}
            <div>
              <span className="eyebrow">Who Needs It</span>
              <div className="tick mt-4"></div>
              <h2 className="mt-4 mb-6">Who needs {vehicle.name.toLowerCase()} insurance?</h2>
              <ul className="space-y-3">
                {vehicle.whoNeedsIt.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 py-2 border-b border-[var(--hair)]">
                    <span className="text-[var(--tick)] font-medium mt-0.5">·</span>
                    <span className="font-sans text-[15px] text-[var(--muted)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Common Claims */}
            <div>
              <span className="eyebrow">Common Claims</span>
              <div className="tick mt-4"></div>
              <h2 className="mt-4 mb-6">Typical claim scenarios</h2>
              <ul className="space-y-3">
                {vehicle.commonClaims.map((claim: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 py-2 border-b border-[var(--hair)]">
                    <span className="text-[var(--warn)] font-medium mt-0.5">!</span>
                    <span className="font-sans text-[15px] text-[var(--muted)]">{claim}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* Coverages + Endorsements */}
      <section className="section bg-sand">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Coverages Included */}
            <div>
              <span className="eyebrow">Coverages Included</span>
              <div className="tick mt-4"></div>
              <h2 className="mt-4 mb-6">What's covered</h2>
              <div className="space-y-3">
                {vehicle.coveragesIncluded.map((coverage: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 py-3 border-b border-[var(--hair)] bg-white/60 px-4">
                    <span className="font-serif text-[var(--taupe)] text-[14px] font-medium w-6 text-right">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-sans text-[15px] text-[var(--head)] font-medium">{coverage}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Endorsements */}
            <div>
              <span className="eyebrow">Available Endorsements</span>
              <div className="tick mt-4"></div>
              <h2 className="mt-4 mb-6">Optional add-ons</h2>
              <div className="space-y-3">
                {vehicle.endorsements.map((endorsement: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 py-3 border-b border-[var(--hair)] bg-white/60 px-4">
                    <span className="text-[var(--tick)] font-bold">+</span>
                    <span className="font-sans text-[15px] text-[var(--head)]">{endorsement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* FAQ Section */}
      <section className="section bg-paper">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <span className="eyebrow">Frequently Asked Questions</span>
            <div className="tick mt-4"></div>
            <h2 className="mt-4 mb-8">{vehicle.name} insurance FAQ</h2>
            <div className="space-y-6">
              {vehicle.faq.map((item: { q: string; a: string }, i: number) => (
                <details key={i} className="group border-b border-[var(--hair)] pb-6">
                  <summary className="cursor-pointer font-serif text-[18px] text-[var(--head)] font-medium list-none flex items-start gap-3">
                    <span className="text-[var(--taupe)] font-sans text-[13px] mt-1 shrink-0">Q{i + 1}</span>
                    <span className="group-open:text-[var(--ink)]">{item.q}</span>
                  </summary>
                  <p className="font-sans text-[15px] text-[var(--muted)] leading-[1.7] mt-4 ml-8">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* States We Cover This Vehicle */}
      {vehicle.states.length > 0 && (
        <>
          <section className="section bg-paper-2">
            <div className="container">
              <span className="eyebrow">Coverage Areas</span>
              <div className="tick mt-4"></div>
              <h2 className="mt-4 mb-6">States where we insure {vehicle.name.toLowerCase()}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {vehicle.states.map((state: string) => (
                  <Link
                    key={state}
                    href={`/states/${state}`}
                    className="no-underline py-3 px-4 border border-[var(--hair)] hover:border-[var(--ink)] transition-colors font-sans text-[14px] text-[var(--head)] hover:text-[var(--ink)] text-center"
                  >
                    {state.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </Link>
                ))}
              </div>
            </div>
          </section>
          <hr className="hairline" />
        </>
      )}

      {/* Related Vehicles */}
      {relatedVehicleData.length > 0 && (
        <>
          <section className="section bg-paper">
            <div className="container">
              <span className="eyebrow">Related Vehicles</span>
              <div className="tick mt-4"></div>
              <h2 className="mt-4 mb-8">You might also need coverage for</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedVehicleData.map((rv: any) => (
                  <Link
                    key={rv.slug}
                    href={`/vehicles-we-cover/${rv.slug}`}
                    className="no-underline group border border-[var(--hair)] hover:border-[var(--ink)] transition-all"
                  >
                    <div className="bg-[var(--sand)] p-4 flex items-center justify-center h-32">
                      <img
                        src={rv.image}
                        alt={rv.name}
                        className="h-full w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-serif text-[16px] text-[var(--head)] group-hover:text-[var(--ink)] mb-1">
                        {rv.name}
                      </h3>
                      <span className="font-sans text-[12px] text-[var(--taupe)] uppercase tracking-wider">
                        {rv.category}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
          <hr className="hairline" />
        </>
      )}

      {/* CTA Band */}
      <section className="section bg-sand">
        <div className="container text-center">
          <h2 className="mb-4">Ready to insure your {vehicle.name.toLowerCase()}?</h2>
          <p className="lead max-w-xl mx-auto mb-8">
            Get a custom quote in minutes. A licensed agent reviews every submission and calls you back — usually the same day.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/quote" className="btn-solid no-underline">
              Get a Quote
            </Link>
            <a href="tel:18773508789" className="btn-ghost no-underline">
              Call 1-877-350-8789
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
