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
import FinancialModel from "./pages/tools/FinancialModel";
import RetirementCalculator from "./pages/tools/RetirementCalculator";
import WeeklyTracker from "./pages/tools/WeeklyTracker";
import WealthDiversification from "./pages/tools/WealthDiversification";
import AccountingServiceDetail from "./pages/AccountingServiceDetail";
import CreditClubDetails from "./pages/CreditClubDetails";
import Blog from "./pages/Blog";

import BookingPage from "./pages/booking/BookingPage";
import ChatWidget from "./components/ChatWidget";

import { 
  TaxServices, 
  AccountingServices, 
  BusinessServices, 
  BusinessDevelopment, 
  PremiumServices 
} from "./pages/services/CategoryPages";

import CryptoTax from "./pages/services/landing/CryptoTax";
import RealEstateTax from "./pages/services/landing/RealEstateTax";
import LlcFormation from "./pages/services/landing/LlcFormation";
import QuickbooksSetup from "./pages/services/landing/QuickbooksSetup";
import FreeConsultation from "./pages/services/landing/FreeConsultation";
import IndividualTax from "./pages/services/landing/IndividualTax";
import BusinessStrategy from "./pages/services/landing/BusinessStrategy";

import AdminDashboard from "./pages/admin/Dashboard";

function Router() {
  return (
    <>
      <ScrollToTop />
      <ChatWidget />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/admin/dashboard" component={AdminDashboard} />
        <Route path="/book-consultation" component={BookingPage} />
        <Route path="/book" component={BookingPage} />
        
        {/* Service Categories */}
        <Route path="/tax-services" component={TaxServices} />
        <Route path="/accounting-services" component={AccountingServices} />
        <Route path="/business-services" component={BusinessServices} />
        <Route path="/business-development" component={BusinessDevelopment} />
        <Route path="/premium-services" component={PremiumServices} />

        {/* Service Landing Pages */}
        <Route path="/crypto-tax-consultation" component={CryptoTax} />
        <Route path="/real-estate-tax-planning" component={RealEstateTax} />
        <Route path="/llc-formation" component={LlcFormation} />
        <Route path="/quickbooks-setup" component={QuickbooksSetup} />
        <Route path="/free-consultation" component={FreeConsultation} />
        <Route path="/individual-tax-preparation" component={IndividualTax} />
        <Route path="/business-strategy-session" component={BusinessStrategy} />

        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/explore" component={ExploreServices} />
        <Route path="/founders-suite-detail" component={FoundersSuiteDetail} />
        <Route path="/success" component={Success} />
        <Route path="/pillar-1" component={Foundation} />
        <Route path="/pillar-2" component={Engine} />
        <Route path="/pillar-3" component={Growth} />
        <Route path="/tools/financial-model" component={FinancialModel} />
        <Route path="/tools/retirement-calculator" component={RetirementCalculator} />
        <Route path="/tools/weekly-tracker" component={WeeklyTracker} />
        <Route path="/tools/wealth-diversification" component={WealthDiversification} />
        <Route path="/accounting/:id">
          {(params) => <AccountingServiceDetail id={params.id} />}
        </Route>
        <Route path="/credit-club-details" component={CreditClubDetails} />
        <Route path="/blog" component={Blog} />
        <Route path="/services/:id" component={TaxSpecialties} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default function App() {
  return <Router />;
}
