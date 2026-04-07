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
import CryptoTaxChecklist from "./pages/tools/CryptoTaxChecklist";
import ToolsAndResources from "./pages/Resources";
import AccountingServiceDetail from "./pages/AccountingServiceDetail";
import CreditClubDetails from "./pages/CreditClubDetails";
import DigitalPlans from "./pages/DigitalPlans";
import Blog from "./pages/Blog";

import BookingPage from "./pages/booking/BookingPage";
import NewsletterArchive from "./pages/newsletter/NewsletterArchive";
import NewsletterIssue1 from "./pages/newsletter/Issue1";
import ChatWidget from "./components/ChatWidget";

import { 
  TaxServices, 
  AccountingServices, 
  CreditFundingServices,
  DigitalMarketingServices,
  BusinessServices, 
  BusinessDevelopment, 
  PremiumServices 
} from "./pages/services/CategoryPages";

import ServiceDetailPage from "./pages/services/ServiceDetailPage";

import AdminDashboard from "./pages/admin/Dashboard";
import AdminLogin from "./pages/admin/AdminLogin";

import { PortalAuthProvider } from "./components/portal/PortalAuthContext";
import PortalLogin from "./pages/portal/PortalLogin";
import PortalRegister from "./pages/portal/PortalRegister";
import DocumentsTab from "./pages/portal/DocumentsTab";
import SignTab from "./pages/portal/SignTab";
import ChatTab from "./pages/portal/ChatTab";
import CryptoTab from "./pages/portal/CryptoTab";
import ProfileTab from "./pages/portal/ProfileTab";

import PortalAdminDashboard from "./pages/portal/admin/AdminDashboard";
import PortalAdminClients from "./pages/portal/admin/AdminClients";
import PortalAdminDocuments from "./pages/portal/admin/AdminDocuments";
import PortalAdminReturns from "./pages/portal/admin/AdminReturns";
import PortalAdminMessages from "./pages/portal/admin/AdminMessages";
import PortalAdminCrypto from "./pages/portal/admin/AdminCrypto";
import PrivacyPolicy from "./pages/portal/PrivacyPolicy";
import TermsOfService from "./pages/portal/TermsOfService";

function PortalRoutes() {
  return (
    <PortalAuthProvider>
      <Switch>
        <Route path="/tax-portal/login" component={PortalLogin} />
        <Route path="/tax-portal/register" component={PortalRegister} />
        <Route path="/tax-portal/privacy" component={PrivacyPolicy} />
        <Route path="/tax-portal/terms" component={TermsOfService} />
        <Route path="/tax-portal/admin/clients" component={PortalAdminClients} />
        <Route path="/tax-portal/admin/documents" component={PortalAdminDocuments} />
        <Route path="/tax-portal/admin/returns" component={PortalAdminReturns} />
        <Route path="/tax-portal/admin/messages" component={PortalAdminMessages} />
        <Route path="/tax-portal/admin/crypto" component={PortalAdminCrypto} />
        <Route path="/tax-portal/admin" component={PortalAdminDashboard} />
        <Route path="/tax-portal/documents" component={DocumentsTab} />
        <Route path="/tax-portal/sign" component={SignTab} />
        <Route path="/tax-portal/chat" component={ChatTab} />
        <Route path="/tax-portal/crypto" component={CryptoTab} />
        <Route path="/tax-portal/profile" component={ProfileTab} />
        <Route path="/tax-portal">{() => { window.location.href = '/tax-portal/documents'; return null; }}</Route>
      </Switch>
    </PortalAuthProvider>
  );
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <ChatWidget />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/jeci-ops" component={AdminLogin} />
        <Route path="/jeci-ops/dashboard" component={AdminDashboard} />
        <Route path="/tax-portal/:rest*" component={PortalRoutes} />

        <Route path="/book-consultation" component={BookingPage} />
        <Route path="/book" component={BookingPage} />

        <Route path="/newsletter" component={NewsletterArchive} />
        <Route path="/newsletter/issue-1" component={NewsletterIssue1} />
        
        <Route path="/tax-services" component={TaxServices} />
        <Route path="/tax-specialties" component={TaxSpecialties} />
        <Route path="/accounting-services" component={AccountingServices} />
        <Route path="/credit-funding" component={CreditFundingServices} />
        <Route path="/digital-marketing" component={DigitalMarketingServices} />
        <Route path="/business-services" component={BusinessServices} />
        <Route path="/business-development" component={BusinessDevelopment} />
        <Route path="/premium-services" component={PremiumServices} />
        <Route path="/digital-plans" component={JeciDigitalPlans} />

        <Route path="/services/:id">
          {(params) => <ServiceDetailPage id={params.id} />}
        </Route>

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
        <Route path="/crypto-tax-checklist" component={CryptoTaxChecklist} />
        <Route path="/resources" component={ToolsAndResources} />
        <Route path="/accounting/:id">
          {(params) => <AccountingServiceDetail id={params.id} />}
        </Route>
        <Route path="/credit-club-details" component={CreditClubDetails} />
        <Route path="/blog" component={Blog} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default function App() {
  return <Router />;
}
