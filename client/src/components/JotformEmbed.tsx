import { useEffect, useRef, useState } from "react";

interface JotformEmbedProps {
  /** Jotform form ID — replace with your actual form ID once created */
  formId: string;
  /** Title for accessibility */
  title?: string;
  /** Minimum height in pixels */
  minHeight?: number;
  /** Callback when form is submitted successfully */
  onSubmit?: () => void;
  /** Custom class name for the container */
  className?: string;
}

/**
 * JotformEmbed — Embeds a Jotform form using the JavaScript embed method.
 * 
 * Features:
 * - Auto-resizing iframe (responds to Jotform's postMessage height events)
 * - Styled to match Trux design tokens (square corners, Poppins/Lora fonts)
 * - Inline success message after submission
 * - Meta Pixel hook point (fires custom event on submit)
 * - Responsive on mobile and desktop
 * 
 * Usage:
 *   <JotformEmbed formId="YOUR_FORM_ID" title="Get a Quote" onSubmit={() => setSubmitted(true)} />
 * 
 * To get your form ID:
 *   1. Create a form at jotform.com
 *   2. The form ID is in the URL: jotform.com/build/FORM_ID
 *   3. Replace the placeholder ID below
 */
export default function JotformEmbed({
  formId,
  title = "Form",
  minHeight = 500,
  onSubmit,
  className = "",
}: JotformEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(minHeight);
  const [isLoading, setIsLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Listen for Jotform iframe messages (height changes and submission)
    const handleMessage = (event: MessageEvent) => {
      // Jotform sends messages from its domain
      if (typeof event.data !== "string") return;

      try {
        const data = JSON.parse(event.data);
        
        // Handle iframe height adjustment
        if (data.action === "setHeight" && data.formID === formId) {
          setHeight(Math.max(data.height, minHeight));
        }

        // Handle form submission
        if (data.action === "submission-completed" && data.formID === formId) {
          setSubmitted(true);
          onSubmit?.();

          // Meta Pixel hook point — uncomment and add your pixel ID when ready
          // if (typeof window !== "undefined" && (window as any).fbq) {
          //   (window as any).fbq("track", "Lead", {
          //     content_name: title,
          //     content_category: "form_submission",
          //   });
          // }
        }
      } catch {
        // Not a JSON message, or not from Jotform — ignore
        // Also handle the simpler height format: "setHeight:500:formId"
        if (event.data.startsWith("setHeight:")) {
          const parts = event.data.split(":");
          if (parts[2] === formId) {
            setHeight(Math.max(parseInt(parts[1]) || minHeight, minHeight));
          }
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [formId, minHeight, onSubmit, title]);

  // Show success message after submission
  if (submitted) {
    return (
      <div className={`jotform-success ${className}`}>
        <div className="jotform-success-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3>Thank you!</h3>
        <p>Your submission has been received. A member of our team will be in touch shortly.</p>
        <button onClick={() => setSubmitted(false)} className="jotform-reset-btn">
          Submit another response
        </button>
      </div>
    );
  }

  // Placeholder state when no real form ID is provided
  const isPlaceholder = formId.includes("PLACEHOLDER") || formId.length < 8;

  if (isPlaceholder) {
    return (
      <div className={`jotform-placeholder ${className}`}>
        <div className="jotform-placeholder-content">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="0"/>
            <path d="M9 9h6M9 12h6M9 15h4"/>
          </svg>
          <h4>Jotform Integration Ready</h4>
          <p>This form will be powered by Jotform. Replace the placeholder form ID with your actual Jotform form ID to activate.</p>
          <div className="jotform-placeholder-steps">
            <span>1. Create your form at <a href="https://www.jotform.com" target="_blank" rel="noopener noreferrer">jotform.com</a></span>
            <span>2. Copy the form ID from the URL</span>
            <span>3. Update the formId prop in the code</span>
            <span>4. Configure webhook: <code>https://truxins.net/api/webhooks/jotform</code></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`jotform-container ${className}`}>
      {isLoading && (
        <div className="jotform-loading">
          <div className="jotform-spinner" />
          <span>Loading form...</span>
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={`https://form.jotform.com/${formId}?isIframeEmbed=1`}
        title={title}
        style={{
          width: "100%",
          height: `${height}px`,
          border: "none",
          display: isLoading ? "none" : "block",
        }}
        onLoad={() => setIsLoading(false)}
        allow="geolocation; microphone; camera; fullscreen"
        allowFullScreen
      />
    </div>
  );
}
