import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import Foundation from "@/pages/services/Foundation";
import Engine from "@/pages/services/Engine";
import Growth from "@/pages/services/Growth";

import Consultation from "./pages/Consultation";
import ExploreServices from "./pages/ExploreServices";
import FoundersSuiteDetail from "./pages/FoundersSuiteDetail";
import ServicePage from "./pages/ServicePage";
import Success from "./pages/Success";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services/foundation" element={<Foundation />} />
            <Route path="/services/engine" element={<Engine />} />
            <Route path="/services/growth" element={<Growth />} />
            
            <Route path="/book-consultation" element={<Consultation />} />
            <Route path="/explore" element={<ExploreServices />} />
            <Route path="/founders-suite-deep-dive" element={<FoundersSuiteDetail />} />
            <Route path="/services/:id" element={<ServicePage />} />
            <Route path="/success" element={<Success />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
