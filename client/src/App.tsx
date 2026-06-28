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
        <Route path={"/states/:state"} component={StatePage} />
        <Route path={"/about"} component={About} />
        <Route path={"/service"} component={Service} />
        <Route path={"/quote"} component={QuoteForm} />
        <Route path={"/quote-confirmation/:id"} component={QuoteConfirmation} />
        <Route path={"/admin/quotes"} component={AdminQuotes} />
        <Route path={"/contact"} component={Contact} />
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
