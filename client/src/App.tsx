import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ToastProvider } from "./contexts/ToastContext";
import AdminPanel from "./pages/AdminPanel";

function App() {
  const [_location, setLocation] = useLocation();

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <ToastProvider>
          <TooltipProvider>
            <Toaster />
            <Switch>
              <Route path="/" component={() => {
                setLocation("/admin");
                return null;
              }} />
              <Route path="/admin" component={AdminPanel} />
              <Route path="/404" component={NotFound} />
              <Route component={NotFound} />
            </Switch>
          </TooltipProvider>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
