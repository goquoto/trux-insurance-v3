import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Critical path — loaded eagerly
import Home from "./pages/Home";

// Lazy-loaded routes (code-split for performance)
const Coverages = lazy(() => import("./pages/Coverages"));
const CoverageDetail = lazy(() => import("./pages/CoverageDetail"));
const About = lazy(() => import("./pages/About"));
const Service = lazy(() => import("./pages/Service"));
const Quote = lazy(() => import("./pages/Quote"));
const QuickQuote = lazy(() => import("./pages/QuickQuote"));
const QuoteForm = lazy(() => import("./pages/QuoteForm"));
const QuoteConfirmation = lazy(() => import("./pages/QuoteConfirmation"));
const AdminQuotes = lazy(() => import("./pages/AdminQuotes"));
const Contact = lazy(() => import("./pages/Contact"));
const WhoWeInsure = lazy(() => import("./pages/WhoWeInsure"));
const WhoWeInsureDetail = lazy(() => import("./pages/WhoWeInsureDetail"));
const Cost = lazy(() => import("./pages/Cost"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const StatePage = lazy(() => import("./pages/StatePage"));
const StatesHub = lazy(() => import("./pages/StatesHub"));
const ClientCenter = lazy(() => import("./pages/ClientCenter"));
const FreightBrokerInsurance = lazy(() => import("./pages/FreightBrokerInsurance"));
const UsageBasedSolutions = lazy(() => import("./pages/UsageBasedSolutions"));
const SafetyHub = lazy(() => import("./pages/SafetyHub"));
const ClientLoginHub = lazy(() => import("./pages/ClientLoginHub"));
const VehiclesWeCover = lazy(() => import("./pages/VehiclesWeCover"));
const VehicleDetail = lazy(() => import("./pages/VehicleDetail"));
const Resources = lazy(() => import("./pages/Resources"));
const VinCheck = lazy(() => import("./pages/VinCheck"));
const HighRiskInsurance = lazy(() => import("./pages/HighRiskInsurance"));
const Glossary = lazy(() => import("./pages/Glossary"));
const NewVentureInsurance = lazy(() => import("./pages/NewVentureInsurance"));
const OwnerOperatorInsurance = lazy(() => import("./pages/OwnerOperatorInsurance"));
const TowingInsurance = lazy(() => import("./pages/TowingInsurance"));
const FleetInsurance = lazy(() => import("./pages/FleetInsurance"));

// Agency Hub (Internal Staff Portal)
const PortalLogin = lazy(() => import("./pages/portal/PortalLogin"));
const HubDashboard = lazy(() => import("./pages/portal/HubDashboard"));
const HubTeam = lazy(() => import("./pages/portal/HubTeam"));
const HubCarriers = lazy(() => import("./pages/portal/HubCarriers"));
const HubMGAs = lazy(() => import("./pages/portal/HubMGAs"));
const HubSubmissions = lazy(() => import("./pages/portal/HubSubmissions"));
const HubKnowledgeBase = lazy(() => import("./pages/portal/HubKnowledgeBase"));
const HubWorkflows = lazy(() => import("./pages/portal/HubWorkflows"));
const HubTraining = lazy(() => import("./pages/portal/HubTraining"));
const HubForms = lazy(() => import("./pages/portal/HubForms"));
const HubIntake = lazy(() => import("./pages/portal/HubIntake"));
const HubStandards = lazy(() => import("./pages/portal/HubStandards"));
const HubPayments = lazy(() => import("./pages/portal/HubPayments"));
const HubUsers = lazy(() => import("./pages/portal/HubUsers"));

// Service Center (Customer Portal)
const ServiceCenterHome = lazy(() => import("./pages/service-center/ServiceCenterHome"));
const ServiceCenterCarriers = lazy(() => import("./pages/service-center/ServiceCenterCarriers"));
const ServiceCenterPolicyChange = lazy(() => import("./pages/service-center/PolicyChangeWizard"));
const ServiceCenterCertificate = lazy(() => import("./pages/service-center/CertificateRequest"));
const ServiceCenterClaim = lazy(() => import("./pages/service-center/ClaimSubmission"));
const ServiceCenterAppointment = lazy(() => import("./pages/service-center/AccountReview"));
const ServiceCenterBilling = lazy(() => import("./pages/service-center/BillingPayments"));
const ServiceCenterLossRuns = lazy(() => import("./pages/service-center/LossRuns"));

// Minimal loading fallback that matches the site's style
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[var(--hair)] border-t-[var(--purple)] rounded-full animate-spin" />
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/coverages"} component={Coverages} />
        <Route path={"/coverages/:slug"} component={CoverageDetail} />
        <Route path={"/who-we-insure"} component={WhoWeInsure} />
        <Route path={"/who-we-insure/:slug"} component={WhoWeInsureDetail} />
        <Route path={"/cost"} component={Cost} />
        <Route path={"/blog"} component={Blog} />
        <Route path={"/blog/:slug"} component={BlogArticle} />
        <Route path={"/states"} component={StatesHub} />
        <Route path={"/states/:state"} component={StatePage} />
        <Route path={"/about"} component={About} />
        <Route path={"/service"} component={Service} />
        <Route path={"/quote"} component={Quote} />
        <Route path={"/quick-quote"} component={QuickQuote} />
        <Route path={"/quote-confirmation/:id"} component={QuoteConfirmation} />
        <Route path={"/admin/quotes"} component={AdminQuotes} />
        <Route path={"/client-center"} component={ClientCenter} />
        <Route path={"/freight-broker-insurance"} component={FreightBrokerInsurance} />
        <Route path={"/usage-based-solutions"} component={UsageBasedSolutions} />
        <Route path={"/safety"} component={SafetyHub} />
        <Route path={"/client-login"} component={ClientLoginHub} />
        <Route path={"/vehicles-we-cover"} component={VehiclesWeCover} />
        <Route path={"/vehicles-we-cover/:slug"} component={VehicleDetail} />
        <Route path={"/resources"} component={Resources} />
        <Route path={"/resources/vin-check"} component={VinCheck} />
        <Route path={"/resources/high-risk-insurance"} component={HighRiskInsurance} />
        <Route path={"/resources/glossary"} component={Glossary} />
        <Route path={"/resources/new-venture-insurance"} component={NewVentureInsurance} />
        <Route path={"/resources/owner-operator-insurance"} component={OwnerOperatorInsurance} />
        <Route path={"/resources/towing-insurance"} component={TowingInsurance} />
        <Route path={"/resources/fleet-insurance"} component={FleetInsurance} />
        <Route path={"/contact"} component={Contact} />
        {/* Agency Hub routes */}
        <Route path={"/portal/login"} component={PortalLogin} />
        <Route path={"/portal"} component={HubDashboard} />
        <Route path={"/portal/carriers"} component={HubCarriers} />
        <Route path={"/portal/mgas"} component={HubMGAs} />
        <Route path={"/portal/submissions"} component={HubSubmissions} />
        <Route path={"/portal/kb"} component={HubKnowledgeBase} />
        <Route path={"/portal/workflows"} component={HubWorkflows} />
        <Route path={"/portal/training"} component={HubTraining} />
        <Route path={"/portal/team"} component={HubTeam} />
        <Route path={"/portal/intake"} component={HubIntake} />
        <Route path={"/portal/forms"} component={HubForms} />
        <Route path={"/portal/standards"} component={HubStandards} />
        <Route path={"/portal/payments"} component={HubPayments} />
        <Route path={"/portal/users"} component={HubUsers} />
        {/* Service Center (Customer Portal) routes */}
        <Route path={"/service-center"} component={ServiceCenterHome} />
        <Route path={"/service-center/carriers"} component={ServiceCenterCarriers} />
        <Route path={"/service-center/policy-change"} component={ServiceCenterPolicyChange} />
        <Route path={"/service-center/certificate"} component={ServiceCenterCertificate} />
        <Route path={"/service-center/claim"} component={ServiceCenterClaim} />
        <Route path={"/service-center/appointment"} component={ServiceCenterAppointment} />
        <Route path={"/service-center/billing"} component={ServiceCenterBilling} />
        <Route path={"/service-center/loss-runs"} component={ServiceCenterLossRuns} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
