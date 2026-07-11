# Project TODO

- [x] Design system: CSS tokens (ink, head, taupe, muted, sand, paper, hair, tick, warn, purple accent)
- [x] Typography: Google Fonts (Lora + Poppins) with correct weights and scale
- [x] Global styles: warm paper backgrounds, hairline rules, tick accents, square geometry
- [x] Header component: sticky nav with Trux logo, nav links, phone CTA, mobile hamburger
- [x] Footer component: address, phones, Get Insurance links, For Clients links, fraud disclaimer
- [x] Home page: hero with color-pencil truck, headline, dual CTAs, coverage highlights, partners, client center
- [x] Coverages index page: card grid for all coverage types with sketch illustrations
- [x] Coverage detail template: eyebrow/heading/body layout, pull-quote band, related coverages sidebar
- [x] About / Why Trux page: mission, team values, color-pencil truck history illustration
- [x] Service & Claims page: client center links (Request Certificate, Report a Claim, Policy Service, MVR Request, Make a Payment)
- [x] Get a Quote page: fast-quote form (business name, contact info, DOT#, state selector) + full application link
- [x] Contact page: office address, phone, hours, contact form
- [x] Responsive design: mobile-first, breakpoints at 900px and 560px
- [x] Routing: all pages wired with wouter
- [x] Vitest specs for key components
- [x] Replace text wordmark in Header with actual Trux logo (Asset 2 - dark version for light bg)
- [x] Replace text wordmark in Footer with actual Trux logo
- [x] Add white logo variant to dark utility bar area
- [x] Use SVG checkmark as favicon/brand mark
- [x] Add dark/light theme toggle button to header
- [x] Create dark theme CSS variables for all design tokens
- [x] Enable switchable theme in ThemeProvider
- [x] Ensure all pages respect dark theme colors
- [x] Use white logo variant in dark mode header/footer
- [x] Generate unique color-pencil sketch illustrations for each coverage type
- [x] Add detailed article content to each Coverage Detail page
- [x] Update Coverages index page with unique images for all cards
- [x] Remove or shrink the sand-colored padding/borders around all images site-wide
- [x] Add Freight Broker Bonds coverage to Coverages index and detail page
- [x] Add Personal Lines (Coming Soon) coverage to Coverages index and detail page
- [x] Generate color-pencil style US state map with 21 licensed states highlighted in purple
- [x] Update "all 50 states" language across the site to reflect actual licensed states
- [x] Add the state map to the homepage and/or About page
- [x] Fix missing images on Freight Broker Bonds and Personal Lines coverage cards
- [x] Move dark/light theme toggle icon to the end of the header (after Get a Quote button)
- [x] Regenerate state map with state abbreviations (AZ, CO, FL, etc.) written on each state in pencil style
- [x] Add Cyber Coverage to Coverages index and detail page with illustration
- [x] Add Crime Coverage to Coverages index and detail page with illustration
- [x] Add Contractors (Coming Soon) to Coverages index and detail page with illustration

## Competitor-Beating Enhancements (from build brief)

### SEO Infrastructure
- [x] Add unique title tags and meta descriptions to every page
- [x] Add JSON-LD schema (Organization, LocalBusiness, BreadcrumbList, Service, FAQPage)
- [x] Add breadcrumb navigation to all inner pages
- [x] Add self-referencing canonical tags
- [x] Create robots.txt with proper rules
- [x] Ensure single H1 per page across entire site

### Who We Insure Hub (NEW - competitor gap)
- [x] Create Who We Insure index page with operation-type cards
- [x] Owner-Operator leaf page
- [x] Small Fleet (2-10 trucks) leaf page
- [x] Large Fleet (10+ trucks) leaf page
- [x] Reefer / Refrigerated leaf page
- [x] Flatbed leaf page
- [x] Dump Truck leaf page
- [x] Hazmat leaf page
- [x] Hot-Shot leaf page
- [x] Car Hauler leaf page
- [x] Container / Intermodal leaf page
- [x] Tow Truck leaf page
- [x] Agricultural leaf page

### FAQ Sections
- [x] Add FAQ accordion sections to all coverage detail pages
- [x] Add FAQ accordion sections to all operation-type pages
- [x] Implement FAQPage schema on pages with FAQ blocks

### Service Center Expansion
- [x] Add Renewals section to Service & Claims page
- [x] Add Request a Policy Change section
- [x] Improve multi-step quote form with progress indicator

### Cost / Pricing Pages (NEW - competitor gap)
- [x] Create Cost hub page (/cost)
- [x] Add pricing context and cost factors to relevant pages

### State Pages (NEW - competitor gap)
- [x] Create state page template
- [x] Build state pages for top licensed states (IL, TX, FL, GA, OH)

### Conversion & UX Improvements
- [x] Add sticky mobile call/quote bar
- [x] Add trust badges (years in business, carrier partners, trucking-focused)
- [x] Add carrier/partner logos section
- [x] Ensure every content page has a quote CTA

### Accessibility
- [x] Ensure proper heading hierarchy (single H1 per page)
- [x] Descriptive alt text on all images
- [x] Keyboard-navigable menus and forms
- [x] ARIA labels where needed

## Navigation Consolidation
- [x] Combine Coverages and Who We Insure under a single "Insurance" dropdown tab in the header nav

## Hero Video
- [x] Generate animated video of the color-pencil truck sketch for the homepage hero
- [x] Replace static hero image with the video (autoplay, muted, loop)

## Blog Section
- [x] Create blog articles data (10 articles with full content)
- [x] Build Blog listing page with list/tile view toggle
- [x] Build individual Blog article page
- [x] Add Blog to navigation header
- [x] Add blog route to App.tsx
- [x] Add SEO to blog pages

## Blog Expansion
- [x] Add Blog link to the footer navigation
- [x] Add 5 more full-length blog articles

## SEO Audit Implementation
- [x] P1: Add prerendering/SSR so H1, body copy, and JSON-LD appear in raw HTML
- [x] P1: Fix XML sitemap (currently returns HTML shell) — generate proper sitemap with all URLs (70 URLs)
- [x] P1: Ensure structured data (InsuranceAgency, Service, FAQPage, BreadcrumbList, Organization) ships in initial HTML
- [x] P2: Fix duplicate breadcrumb on Quote page (Home > Home > Get a Quote)
- [x] P2: Coverage pages have 4+ paragraphs, spec tables, endorsements, FAQ, and pull-quotes each
- [x] P2: Add state-specific pages (/states/:state) with genuine state content (21 states)
- [x] P3: SEO meta tags added to all pages via SEO component + server prerender
- [x] P3: Trust signals added to CoverageDetail, BlogArticle, and Home hero
- [x] P3: Add sticky mobile CTA bar (Call Now / Get a Quote) on all pages
- [x] P3: Internal linking: Home coverage list links to detail pages, state list links to state pages, blog has related articles
- [x] P4: Performance — code split via React.lazy, font preload, reduced motion support
- [x] P4: Accessibility pass — focus rings, skip-to-content, reduced motion, ARIA roles
- [x] P4: Verify robots/crawl rules after SSR is live (robots.txt + sitemap confirmed)

## Quote Form System
- [x] Create quotes database table with all fields
- [x] Build backend tRPC procedures (submit, getById, getAll, updateStatus)
- [x] Build 8-step quote form UI with progress indicator
- [x] Add quote confirmation page with tracking link
- [x] Add admin dashboard to manage quotes
- [x] Wire form submissions to email notifications
- [x] Add "Save and Continue Later" functionality (auto-save + manual save button + draft restoration)

## Quick Quote Form (Simplified)
- [x] Create QuickQuote page with simplified form (name, email, phone, company, DOT, state, notes, file upload)
- [x] Wire to database and email notifications (uses existing quotes.submit procedure)
- [x] Add route and navigation link (GET A FAST QUOTE button on homepage)

## MOTUS Blog Post
- [x] Add extensive MOTUS blog article (14 min read, covers what it is, timeline, who's affected, what changed, insurance implications, action checklist, FAQ)

## Google Reviews Widget
- [x] Find Google Place ID for Trux Insurance Services (ChIJq6pq55utD4gR7mAyuFzJt34)
- [x] Create tRPC procedure to fetch Google reviews via Places API (server-side, cached 1 hour)
- [x] Build GoogleReviews component with star ratings, review cards, and "See all reviews" link
- [x] Integrate GoogleReviews component into the About page

## Footer Link Fixes
- [x] Fix "For Clients" footer links: Policy Service → support.truxins.com, Report a Claim → /service page, Make a Payment → truxins.epaypolicy.com

## State Landing Pages (21 States) — Comprehensive Implementation
- [x] Create interactive US map component with clickable states (SVG-based, shows all 21 licensed states)
- [x] Build StatesHub page at /states with interactive map and state grid
- [x] Generate comprehensive content for all 21 states (freight hubs, corridors, regulations, endorsements, FAQs)
- [x] Create state landing page template that renders new comprehensive content format
- [x] Fix routing for multi-word states (north-carolina, south-carolina) with hyphenated slugs
- [x] Verify all state pages load with complete content (tested North Carolina)
- [x] Embed interactive map on homepage (optional for future)


## Safety-Focused Blog Articles (5 New Articles)
- [x] Add "Safety" category to blogCategories
- [x] Create 5 comprehensive safety articles:
  - Driver Fatigue: The Silent Killer in Trucking
  - Pre-Trip Inspections: The Checklist Every Driver Should Complete
  - Distracted Driving in Trucking: The Risks, The Law, and How to Stop It
  - Weather-Related Trucking Accidents: How to Prepare, Adjust, and Stay Safe
  - Backing Accidents: The #1 Preventable Accident in Trucking
- [x] Integrate safety articles into blog listing and filtering
- [x] Verify all articles display correctly on blog page


## Build Spec Implementation (Priority 1-6)

### Priority 1: Enhanced 3-Step Quote Form
- [x] Convert quote form to 3-step progressive form (Get Started → Your Operation → Equipment & Docs)
- [x] Add progress bar showing all 3 steps
- [x] Make Steps 2-3 optional (allow submit after Step 1)
- [x] Add Save & Continue functionality to reduce abandonment
- [x] Keep file upload prominent (multi-file, 10 files max, 25MB per file)
- [x] Add "Confidence line" near submit button
- [x] Enable AJAX submission (no page reload)
- [x] Add inline validation on blur

### Priority 2: State Landing Pages Enhancement
- [x] Add unique state-specific copy to all 21 state pages (150-250 words per state)
- [x] Include major freight corridors/cities in intro paragraph
- [x] Add unique meta titles and descriptions per state
- [x] Add internal links from states index page
- [x] Verify state pages appear in XML sitemap

### Priority 3: Product Silos
- [x] Create Freight Broker Insurance silo (/freight-broker-insurance/)
  - [x] Contingent Cargo section
  - [x] General Liability section
  - [x] Shippers Interest section
  - [x] Errors & Omissions section
  - [x] Broker Bonds section
  - [x] Cyber section
- [x] Create Usage-Based Solutions silo (/usage-based-solutions/)
  - [x] Telematics integration section
  - [x] Driver coaching section
  - [x] Premium discount section
  - [x] How it works section

### Priority 4: Safety/Risk Management Hub
- [x] Create /safety/ landing page with comprehensive content
- [x] Add CSA Score Management section (all 7 BASICs)
- [x] Add ELD Compliance section
- [x] Add Pre-Trip Inspection Programs section
- [x] Add Driver Training & Coaching section
- [x] Add Post-Accident Protocol sidebar
- [x] Link to safety blog articles

### Priority 5: Client Login Hub
- [x] Create /client-login/ page
- [x] Add Policy Service Portal tile (link to support.truxins.com)
- [x] Add Request a Certificate tile (link to NowCerts portal)
- [x] Add Make a Payment tile (link to epaypolicy)
- [x] Add Report a Claim tile (link to /service)
- [x] Add help section with contact info

### Priority 6: Homepage Trust Block & Sticky CTA
- [x] Add trust/social proof block with stats (5.0 rating, 10+ years, 21 states, A+ carriers)
- [x] Add partner section (Bizee, Blue Ink Tech, Motive, RTS)
- [x] Phone number already prominent in header
- [x] Add sticky mobile CTA bar (Get a Quote + Call Now) on homepage


## Vehicles We Cover Page
- [x] Create /vehicles-we-cover page with all 27 vehicle types from truxins.com
- [x] Style consistently with existing site (editorial layout, eyebrow/tick/hairline)
- [x] Add to Insurance dropdown navigation
- [x] Add route to App.tsx
- [x] Include in sitemap


## Vehicles We Cover Enhancements
- [x] Fix Insurance dropdown: Vehicles We Cover as 3rd column/tab (not just a link)
- [x] Create individual vehicle detail pages at /vehicles-we-cover/:slug with comprehensive content
- [x] Generate pencil-sketch images for 28 unique vehicle illustrations (uploaded to storage; similar types like Big Rigs/18-Wheelers share images by design)
- [x] Add images to vehicle listing page (grid + list views)
- [x] Cross-link popular vehicles from state landing pages (6 vehicle types per state)


## Vehicle Detail & Homepage Map Enhancements
- [x] Enlarge vehicle detail page hero image (larger sand panel, decorative border, max-w-lg, min-h-420px)
- [x] Embed interactive clickable state map on the homepage (replaced static PNG with InteractiveStateMap component)


## Map & Vehicle Enhancements (Round 2)
- [x] Fix interactive state map: replace circle dots with proper SVG state outlines (geographic shapes)
- [x] Audit all vehicle images and regenerate mismatched ones (dry van, commercial fleet, freight truck, gooseneck, mobile home mover)
- [x] Commercial Fleets vehicle page already exists with proper fleet image
- [x] Pre-select vehicle type in quote form via ?vehicle= URL param from vehicle detail pages

## Collapsible Coverage Columns & Map Fix
- [x] Make Trucking & Auto column collapsible (same pattern as Endorsements)
- [x] Make Workforce & Specialty column collapsible (same pattern as Endorsements)
- [x] Replace interactive state map with proper full 50-state US SVG (21 licensed states active/clickable, rest grayed out)
- [x] Add New Jersey as a licensed state (now 22 states licensed)

## Resources Hub & Tool Pages Rebuild
- [ ] Rebuild Resources hub page at /resources
- [ ] Rebuild VIN Check tool page at /resources/vin-check
- [ ] Build High-Risk Truck Insurance page at /resources/high-risk-truck-insurance
- [ ] Build Glossary of Terms page at /resources/glossary
- [ ] Build New Venture Trucking Insurance page at /resources/new-venture-trucking-insurance
- [ ] Build Owner-Operator Insurance page at /resources/owner-operator-insurance
- [ ] Build Towing Insurance page at /resources/towing-insurance
- [ ] Build Truck Fleet Insurance page at /resources/truck-fleet-insurance
- [ ] Register all routes in App.tsx
- [ ] Add Resources and VIN Check links to Footer
- [ ] Remove Blog and Resources from header nav (keep in footer only)

## Resend Email Integration
- [x] Install Resend SDK and add API key
- [x] Create email service (server/email.ts) with quote and contact notification functions
- [x] Wire quote form submission to send email to info@truxins.com and milen@truxins.com
- [x] Wire contact form to send email via tRPC contact.submit mutation
- [x] Validate Resend API key with vitest
