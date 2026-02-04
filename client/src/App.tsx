import { Switch, Route } from "wouter";
import Home from "./pages/Home";
import Consultation from "./pages/Consultation";
import ExploreServices from "./pages/ExploreServices";
import FoundersSuiteDetail from "./pages/FoundersSuiteDetail";
import TaxSpecialties from "./pages/TaxSpecialties"; // The new file we just created
import NotFound from "./pages/not-found";

function Router() {
  return (
    <Switch>
      {/* Root Path */}
      <Route path="/" component={Home} />

      {/* Static Subpages */}
      <Route path="/book-consultation" component={Consultation} />
      <Route path="/explore" component={ExploreServices} />
      <Route path="/founders-suite-detail" component={FoundersSuiteDetail} />

      {/* Dynamic Specialty Paths (Crypto, Real Estate, Cannabis) */}
      <Route path="/services/:id" component={TaxSpecialties} />

      {/* 404 Fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return <Router />;
}