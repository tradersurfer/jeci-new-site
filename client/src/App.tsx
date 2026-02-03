import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import Foundation from "@/pages/services/Foundation";
import Engine from "@/pages/services/Engine";
import Growth from "@/pages/services/Growth";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services/foundation" component={Foundation} />
      <Route path="/services/engine" component={Engine} />
      <Route path="/services/growth" component={Growth} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
