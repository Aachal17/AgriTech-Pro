import { QueryClientProvider } from "@tanstack/react-query";
import { Router, Switch, Route } from "wouter";
import { DashboardProvider } from "@/context/dashboard-context";
import { queryClient } from "@/lib/queryClient";
import { Home } from "@/pages/home";
import { MapPage } from "@/pages/map";
import { AnalyticsPage } from "@/pages/analytics";
import { DevicesPage } from "@/pages/devices";
import { IrrigationPage } from "@/pages/irrigation";
import { SchedulePage } from "@/pages/schedule";
import { SettingsPage } from "@/pages/settings";
import { NotFound } from "@/pages/not-found";
import { Toaster } from "@/components/ui/toaster";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardProvider>
        <Router>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/map" component={MapPage} />
            <Route path="/analytics" component={AnalyticsPage} />
            <Route path="/devices" component={DevicesPage} />
            <Route path="/irrigation" component={IrrigationPage} />
            <Route path="/schedule" component={SchedulePage} />
            <Route path="/settings" component={SettingsPage} />
            <Route component={NotFound} />
          </Switch>
          <Toaster/>
        </Router>
      </DashboardProvider>
    </QueryClientProvider>
  );
}