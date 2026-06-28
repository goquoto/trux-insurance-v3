import React, { useEffect } from 'react';
import { useLocation, useRoute } from 'wouter';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import { trpc } from '@/lib/trpc';

export default function QuoteConfirmation() {
  const [, params] = useRoute('/quote-confirmation/:id');
  const [, setLocation] = useLocation();
  const quoteId = params?.id ? parseInt(params.id) : null;

  const { data: quote, isLoading, error } = trpc.quotes.getById.useQuery(quoteId || 0, {
    enabled: !!quoteId,
  });

  useEffect(() => {
    if (!quoteId) {
      setLocation('/quote');
    }
  }, [quoteId, setLocation]);

  if (!quoteId) return null;

  if (isLoading) {
    return (
      <Layout>
        <div className="section container min-h-[60vh] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[var(--hair)] border-t-[var(--purple)] rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (error || !quote) {
    return (
      <Layout>
        <SEO
          title="Quote Not Found"
          description="We couldn't find your quote. Please check the link or contact us."
          canonical={`/quote-confirmation/${quoteId}`}
        />
        <Breadcrumbs items={[{ label: 'Quote Confirmation', href: `/quote-confirmation/${quoteId}` }]} />
        <div className="section container">
          <div className="max-w-2xl">
            <h1 className="mb-4">Quote Not Found</h1>
            <p className="text-muted mb-6">We couldn't find your quote. Please check the link or contact us for assistance.</p>
            <a href="/quote" className="btn-solid">
              Start a New Quote
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  const contactName = `${quote.contactFirstName} ${quote.contactLastName}`;
  const formattedDate = new Date(quote.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Layout>
      <SEO
        title="Quote Confirmation"
        description="Your trucking insurance quote has been submitted. Track your quote status here."
        canonical={`/quote-confirmation/${quoteId}`}
      />
      <Breadcrumbs items={[{ label: 'Quote Confirmation', href: `/quote-confirmation/${quoteId}` }]} />

      <div className="section container">
        <div className="max-w-2xl mb-12">
          <div className="mb-8">
            <div className="eyebrow">QUOTE SUBMITTED</div>
            <div className="tick"></div>
            <h1 className="mb-4">Thank You!</h1>
            <p className="lead">Your trucking insurance quote has been received.</p>
          </div>

          {/* Confirmation Details */}
          <div className="p-8 bg-sand rounded mb-8">
            <h2 className="font-serif text-lg mb-6">Your Quote Details</h2>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-hair pb-3">
                <span className="text-muted">Quote ID</span>
                <span className="font-medium">{quoteId}</span>
              </div>

              <div className="flex justify-between border-b border-hair pb-3">
                <span className="text-muted">Submitted</span>
                <span className="font-medium">{formattedDate}</span>
              </div>

              <div className="flex justify-between border-b border-hair pb-3">
                <span className="text-muted">Business Name</span>
                <span className="font-medium">{quote.businessName}</span>
              </div>

              <div className="flex justify-between border-b border-hair pb-3">
                <span className="text-muted">Contact</span>
                <span className="font-medium">{contactName}</span>
              </div>

              <div className="flex justify-between border-b border-hair pb-3">
                <span className="text-muted">Email</span>
                <span className="font-medium">{quote.contactEmail}</span>
              </div>

              <div className="flex justify-between border-b border-hair pb-3">
                <span className="text-muted">Phone</span>
                <span className="font-medium">{quote.contactPhone}</span>
              </div>

              <div className="flex justify-between border-b border-hair pb-3">
                <span className="text-muted">Policy State</span>
                <span className="font-medium">{quote.policyState}</span>
              </div>

              <div className="flex justify-between border-b border-hair pb-3">
                <span className="text-muted">Status</span>
                <span className="font-medium capitalize">
                  {quote.status === 'pending' && '⏳ Pending Review'}
                  {quote.status === 'under_review' && '👀 Under Review'}
                  {quote.status === 'approved' && '✓ Approved'}
                  {quote.status === 'issued' && '✓ Issued'}
                  {quote.status === 'rejected' && '✗ Unable to Quote'}
                </span>
              </div>

              {quote.selectedCoverages && Array.isArray(quote.selectedCoverages) && (quote.selectedCoverages as any[]).length > 0 ? (
                <div className="flex justify-between pb-3">
                  <span className="text-muted">Coverages Requested</span>
                  <span className="font-medium text-right max-w-xs">
                    {((quote.selectedCoverages as any) as string[]).join(', ')}
                  </span>
                </div>
              ) : null}
            </div>
          </div>

          {/* Next Steps */}
          <div className="mb-8">
            <h2 className="font-serif text-lg mb-4">What Happens Next</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple text-white flex items-center justify-center text-sm font-medium">1</div>
                <div>
                  <p className="font-medium mb-1">We'll Review Your Application</p>
                  <p className="text-muted text-sm">Our team will review your information and verify your details within 1-2 business days.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple text-white flex items-center justify-center text-sm font-medium">2</div>
                <div>
                  <p className="font-medium mb-1">We'll Contact You</p>
                  <p className="text-muted text-sm">We'll reach out to {quote.contactEmail} or {quote.contactPhone} with your personalized quote and coverage options.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple text-white flex items-center justify-center text-sm font-medium">3</div>
                <div>
                  <p className="font-medium mb-1">Get Your Policy</p>
                  <p className="text-muted text-sm">Once approved, we'll issue your policy and send you all the documents you need.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking Link */}
          <div className="mb-8 p-6 bg-paper-2 rounded border border-hair">
            <p className="text-muted text-sm mb-2">Save this link to check your quote status anytime:</p>
            <p className="font-mono text-sm break-all text-purple">
              {typeof window !== 'undefined' ? window.location.href : ''}
            </p>
          </div>

          {/* CTA */}
          <div className="flex gap-4">
            <a href="/quote" className="btn-ghost">
              Get Another Quote
            </a>
            <a href="/" className="btn-solid">
              Back to Home
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-2xl border-t border-hair pt-12">
          <h2 className="font-serif text-lg mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">How long does it take to get a quote?</h3>
              <p className="text-muted text-sm">Most quotes are reviewed within 1-2 business days. We'll contact you as soon as we have your personalized quote.</p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Can I modify my quote after submission?</h3>
              <p className="text-muted text-sm">Yes! When we contact you, we can discuss any changes to your coverage or business details before finalizing your policy.</p>
            </div>

            <div>
              <h3 className="font-medium mb-2">What if I need to update my information?</h3>
              <p className="text-muted text-sm">Please call us at <a href="tel:+13312401101" className="text-purple hover:underline">(331) 240-1101</a> or reply to the email we send you with any updates.</p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Is my information secure?</h3>
              <p className="text-muted text-sm">Yes. We use industry-standard encryption and security measures to protect your personal and business information.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
