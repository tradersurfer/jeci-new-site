import { Switch, Route } from "wouter";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop"; // Import the new component
import Consultation from "./pages/Consultation";
import ExploreServices from "./pages/ExploreServices";
import FoundersSuiteDetail from "./pages/FoundersSuiteDetail";
import TaxSpecialties from "./pages/TaxSpecialties";
import Success from "./pages/Success"; // FIXED: Success page import registered
import NotFound from "./pages/not-found";

// Import your Pillar pages
import Foundation from "./pages/services/Foundation";
import Engine from "./pages/services/Engine";
import Growth from "./pages/services/Growth";

function Router() {
  return (
    <>
      <ScrollToTop /> {/* PLACE THIS HERE: Outside the Switch but inside the Router */}
    <Switch>
      {/* Primary Routes */}
      <Route path="/" component={Home} />
      <Route path="/book-consultation" component={Consultation} />
      <Route path="/explore" component={ExploreServices} />
      <Route path="/founders-suite-detail" component={FoundersSuiteDetail} />
      <Route path="/success" component={Success} /> {/* FIXED: Success route registered */}

      {/* Pillar Routes - Fixed these to match your internal links */}
      <Route path="/pillar-1" component={Foundation} />
      <Route path="/pillar-2" component={Engine} />
      <Route path="/pillar-3" component={Growth} />
      
      {/* Dynamic Specialty Routes (Crypto, Real Estate, Cannabis) */}
      <Route path="/services/:id">
        {(params) => <TaxSpecialties id={params.id} />}
      </Route>

      {/* Fallback 404 Page */}
      <Route component={NotFound} />
    </Switch>
    </>
  );
}

export default function App() {
  return <Router />;
}