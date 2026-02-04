import { Switch, Route } from "wouter";
import Home from "./pages/Home";
import Consultation from "./pages/Consultation";
import ExploreServices from "./pages/ExploreServices";
import FoundersSuiteDetail from "./pages/FoundersSuiteDetail";
import TaxSpecialties from "./pages/TaxSpecialties";
import Success from "./pages/Success"; // FIXED: Success page import registered
import NotFound from "./pages/not-found";

function Router() {
  return (
    <Switch>
      {/* Primary Routes */}
      <Route path="/" component={Home} />
      <Route path="/book-consultation" component={Consultation} />
      <Route path="/explore" component={ExploreServices} />
      <Route path="/founders-suite-detail" component={FoundersSuiteDetail} />
      <Route path="/success" component={Success} /> {/* FIXED: Success route registered */}

      {/* Dynamic Specialty Routes (Crypto, Real Estate, Cannabis) */}
      <Route path="/services/:id">
        {(params) => <TaxSpecialties id={params.id} />}
      </Route>

      {/* Fallback 404 Page */}
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return <Router />;
}