import { Link } from "wouter";
import Layout from "@/components/Layout";

export default function About() {
  return (
    <Layout>
      {/* Page header */}
      <section className="section bg-paper-2">
        <div className="container">
          <span className="eyebrow">About Trux</span>
          <div className="tick mt-4"></div>
          <h1 className="mt-4 mb-4">The only thing we do is trucking insurance.</h1>
          <p className="lead max-w-2xl">
            Trux Insurance Services places commercial trucking and fleet coverage in all 50 states. We've built our agency around one industry, one set of markets, and one promise: stand behind the program at claim time.
          </p>
        </div>
      </section>

      <hr className="hairline" />

      {/* Mission / Story */}
      <section className="section bg-paper">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="eyebrow">Our Mission</span>
              <div className="tick mt-4"></div>
              <h2 className="mt-4 mb-6">Built for trucking, from day one.</h2>
              <p className="font-sans text-[16px] text-muted-custom leading-relaxed mb-4">
                Trux Insurance Services primarily focuses on providing the best business insurance options to the trucking industry. Our top goal is not only to meet but to beat the service expectations of our clients.
              </p>
              <p className="font-sans text-[16px] text-muted-custom leading-relaxed mb-4">
                We accomplish this by partnering with them to assist in their efforts to reduce claims and insurance costs, and by providing stable, long-term, competitive insurance programs.
              </p>
              <p className="font-sans text-[16px] text-muted-custom leading-relaxed">
                We are proud to represent a wide range of insurance companies that have sound financial rankings with A.M. Best, Standard &amp; Poor's, and other top-ranking services. These companies have made solid pledges to the motor carrier industry.
              </p>
            </div>
            <div className="bg-sand p-8 flex items-center justify-center">
              <img
                src="/manus-storage/about-history_e281c740.png"
                alt="Color pencil sketch of a vintage delivery truck representing the history of trucking insurance"
                className="w-full h-auto max-w-[480px]"
              />
            </div>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* Three Differentiators */}
      <section className="section sand-band">
        <div className="container">
          <span className="eyebrow">Why Trux</span>
          <div className="tick mt-4"></div>
          <h2 className="mt-4 mb-12">Three things that set us apart.</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <span className="serif-numeral">01</span>
              <h3 className="mt-2 mb-3">Specialized expertise</h3>
              <p className="font-sans text-[15px] text-muted-custom">
                All our agents are equipped with the expertise to assist you in any situation that arises. Whether it's simply getting a quote, handling a claim, or anything in between — we know trucking because that's all we do.
              </p>
            </div>
            <div>
              <span className="serif-numeral">02</span>
              <h3 className="mt-2 mb-3">One submission, right markets</h3>
              <p className="font-sans text-[15px] text-muted-custom">
                We market your account once, to the carriers that fit your risk. Shopping one account to the same carriers through several agents blocks your risk and wastes everyone's time. We do it right the first time.
              </p>
            </div>
            <div>
              <span className="serif-numeral">03</span>
              <h3 className="mt-2 mb-3">Claims advocacy</h3>
              <p className="font-sans text-[15px] text-muted-custom">
                Coverage, compliance, and claims handling — not just a number. We show you what works for your trucking operation and make the case, then stand behind it when it matters most.
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* What you can expect */}
      <section className="section bg-paper">
        <div className="container max-w-3xl">
          <span className="eyebrow">What you can expect</span>
          <div className="tick mt-4"></div>
          <h2 className="mt-4 mb-8">Working with Trux</h2>

          <div className="pull-quote">
            <ul className="space-y-4">
              {[
                "A dedicated agent who knows trucking inside and out",
                "Competitive quotes from A-rated, specialist markets",
                "Fast certificates — 24/7 from our self-service portal",
                "Claims support that advocates for your operation",
                "Compliance assistance with filings, MCS-90, and state requirements",
                "Annual review to keep your program competitive",
                "No pressure, no games — just honest insurance advice",
              ].map((item, i) => (
                <li key={i} className="font-sans text-[15px] text-muted-custom flex items-start gap-3">
                  <span className="text-purple font-medium mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="section bg-ink text-center">
        <div className="container">
          <span className="eyebrow text-[var(--hair)]">Let's get you covered</span>
          <h2 className="mt-4 mb-8 text-white">
            Every mile covered — <em className="italic">by people who only do trucking.</em>
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://truxins.com/trucking-insurance-quote/" className="btn-solid" style={{ backgroundColor: "var(--purple)" }}>
              Start Trucking Application
            </a>
            <Link href="/quote" className="btn-ghost border-white text-white hover:bg-white hover:text-ink">
              Get a Fast Quote
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
