import { useState } from "react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you within one business day.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Layout>
      <SEO
        title="Contact Us"
        description="Contact Trux Insurance Services in Bloomingdale, IL. Call 331-240-1101 or visit us at 1 Tiffany Pt Suite G2 for commercial trucking insurance quotes and service."
        canonical="/contact"
      />
      <Breadcrumbs items={[{ label: "Contact" }]} />
      {/* Page header */}
      <section className="section bg-paper-2">
        <div className="container">
          <span className="eyebrow">Contact</span>
          <div className="tick mt-4"></div>
          <h1 className="mt-4 mb-4">Get in touch.</h1>
          <p className="lead max-w-2xl">
            Ready to get started, have questions, or just need to talk about your insurance? We're here for you.
          </p>
        </div>
      </section>

      <hr className="hairline" />

      {/* Contact info + form */}
      <section className="section bg-paper">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact details */}
            <div>
              <h2 className="mb-8">Trux Insurance Services</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin size={20} className="text-purple mt-1 shrink-0" />
                  <div>
                    <h3 className="font-sans text-[15px] font-medium text-ink mb-1">Office Address</h3>
                    <p className="font-sans text-[15px] text-muted-custom">
                      1 Tiffany Pt Suite G2<br />
                      Bloomingdale, IL 60108
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone size={20} className="text-purple mt-1 shrink-0" />
                  <div>
                    <h3 className="font-sans text-[15px] font-medium text-ink mb-1">Phone</h3>
                    <p className="font-sans text-[15px] text-muted-custom">
                      Main: <a href="tel:3312401101" className="text-purple">(331) 240-1101</a><br />
                      Toll-free: <a href="tel:3312401101" className="text-purple">(331) 240-1101</a><br />
                      Fax: 331-240-1055
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail size={20} className="text-purple mt-1 shrink-0" />
                  <div>
                    <h3 className="font-sans text-[15px] font-medium text-ink mb-1">Email</h3>
                    <p className="font-sans text-[15px] text-muted-custom">
                      <a href="mailto:info@truxins.com" className="text-purple">info@truxins.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock size={20} className="text-purple mt-1 shrink-0" />
                  <div>
                    <h3 className="font-sans text-[15px] font-medium text-ink mb-1">Business Hours</h3>
                    <div className="font-sans text-[15px] text-muted-custom">
                      <table className="text-left">
                        <tbody>
                          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                            <tr key={day}>
                              <td className="pr-6 py-0.5">{day}</td>
                              <td className="py-0.5">9:00 AM – 5:00 PM</td>
                            </tr>
                          ))}
                          <tr>
                            <td className="pr-6 py-0.5">Saturday</td>
                            <td className="py-0.5 text-taupe">Closed</td>
                          </tr>
                          <tr>
                            <td className="pr-6 py-0.5">Sunday</td>
                            <td className="py-0.5 text-taupe">Closed</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick links */}
              <div className="mt-10 pt-8 border-t border-[var(--hair)]">
                <h3 className="font-sans text-[14px] font-semibold uppercase tracking-[0.1em] text-ink mb-4">Quick Links</h3>
                <div className="flex flex-wrap gap-3">
                  <a href="https://truxins.com/certificate/" className="font-sans text-[13px] text-muted-custom border border-[var(--hair)] px-3 py-1.5 hover:border-purple hover:text-purple no-underline transition-colors">
                    Request Certificate
                  </a>
                  <a href="https://truxins.com/claim/" className="font-sans text-[13px] text-muted-custom border border-[var(--hair)] px-3 py-1.5 hover:border-purple hover:text-purple no-underline transition-colors">
                    Report a Claim
                  </a>
                  <a href="https://truxins.com/service/" className="font-sans text-[13px] text-muted-custom border border-[var(--hair)] px-3 py-1.5 hover:border-purple hover:text-purple no-underline transition-colors">
                    Policy Service
                  </a>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div>
              <div className="bg-paper-2 border border-[var(--hair)] p-8">
                <h3 className="mb-6">Send us a message</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="form-label" htmlFor="name">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="form-input"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="form-input"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-input"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 555-5555"
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="form-input"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help?"
                    />
                  </div>
                  <button type="submit" className="btn-solid w-full">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
