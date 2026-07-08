import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Philosophy from "@/components/sections/Philosophy";
import Services from "@/components/sections/Services";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Booking from "@/components/sections/Booking";
import AdminPage from "@/pages/admin";

const queryClient = new QueryClient();

function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden selection:bg-accent selection:text-white">
      <Navbar />
      <Hero />
      <Philosophy />
      <Services />
      <Gallery />
      <Testimonials />
      <FAQ />
      <Booking />
      <Footer />
    </main>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Switch>
            <Route path="/admin" component={AdminPage} />
            <Route path="/" component={LandingPage} />
          </Switch>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
