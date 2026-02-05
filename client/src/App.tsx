import { Switch, Route } from "wouter";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import Consultation from "./pages/Consultation";
import ExploreServices from "./pages/ExploreServices";
import FoundersSuiteDetail from "./pages/FoundersSuiteDetail";
import TaxSpecialties from "./pages/TaxSpecialties";
import Success from "./pages/Success";
import NotFound from "./pages/not-found";
import Foundation from "./pages/services/Foundation";
import Engine from "./pages/services/Engine";
import Growth from "./pages/services/Growth";
import About from "./pages/About";
import Contact from "./pages/Contact";

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/book-consultation" component={Consultation} />
        <Route path="/explore" component={ExploreServices} />
        <Route path="/founders-suite-detail" component={FoundersSuiteDetail} />
        <Route path="/success" component={Success} />
        <Route path="/pillar-1" component={Foundation} />
        <Route path="/pillar-2" component={Engine} />
        <Route path="/pillar-3" component={Growth} />
        <Route path="/services/:id">
          {(params) => <TaxSpecialties {...params} />}
        </Route>
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default function App() {
  return <Router />;
}
