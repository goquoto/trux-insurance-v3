import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Coverages from "./pages/Coverages";
import CoverageDetail from "./pages/CoverageDetail";
import About from "./pages/About";
import Service from "./pages/Service";
import Quote from "./pages/Quote";
import Contact from "./pages/Contact";
import WhoWeInsure from "./pages/WhoWeInsure";
import WhoWeInsureDetail from "./pages/WhoWeInsureDetail";
import Cost from "./pages/Cost";
import StatePage from "./pages/StatePage";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/coverages"} component={Coverages} />
      <Route path={"/coverages/:slug"} component={CoverageDetail} />
      <Route path={"/who-we-insure"} component={WhoWeInsure} />
      <Route path={"/who-we-insure/:slug"} component={WhoWeInsureDetail} />
      <Route path={"/cost"} component={Cost} />
      <Route path={"/states/:state"} component={StatePage} />
      <Route path={"/about"} component={About} />
      <Route path={"/service"} component={Service} />
      <Route path={"/quote"} component={Quote} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
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
