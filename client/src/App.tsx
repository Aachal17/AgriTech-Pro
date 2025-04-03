
import { QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import { DashboardProvider } from "@/context/dashboard-context";
import { queryClient } from "@/lib/queryClient";
import Dashboard from "@/pages/dashboard";
import { Toaster } from "@/components/ui/toaster";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardProvider>
        <Router>
          <Switch>
            <Route path="/" component={Dashboard} />
          </Switch>
        </Router>
        <Toaster />
      </DashboardProvider>
    </QueryClientProvider>
  );
}
