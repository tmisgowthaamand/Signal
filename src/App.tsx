import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import Index from "./pages/Index";
import Philosophy from "./pages/Philosophy";
import Work from "./pages/Work";
import CaseStudy from "./pages/CaseStudy";
import Insights from "./pages/Insights";
import Proposal from "./pages/Proposal";
import { ThemeProvider } from "@/components/theme-provider";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light" storageKey="signal-theme">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToTop />
          <Routes>
            <Route
              path="/"
              element={
                <Layout
                  title="SIGNAL — Strategy-Led Digital Partner"
                  description="We partner with considered brands to build clarity through brand systems, web platforms, digital creatives, and SEO foundations."
                >
                  <Index />
                </Layout>
              }
            />
            <Route
              path="/philosophy"
              element={
                <Layout
                  title="Our Philosophy — SIGNAL"
                  description="Our approach to digital strategy and design that puts clarity and purpose at the forefront."
                >
                  <Philosophy />
                </Layout>
              }
            />
            <Route
              path="/work"
              element={
                <Layout
                  title="Our Work — SIGNAL"
                  description="Explore our portfolio of strategic digital solutions for forward-thinking brands."
                >
                  <Work />
                </Layout>
              }
            />
            <Route
              path="/work/:id"
              element={
                <Layout
                  title="Case Study — SIGNAL"
                  description="An in-depth look at our strategic approach and execution."
                >
                  <CaseStudy />
                </Layout>
              }
            />
            <Route
              path="/insights"
              element={
                <Layout
                  title="Insights — SIGNAL"
                  description="Thoughts and perspectives on digital strategy, design, and technology."
                >
                  <Insights />
                </Layout>
              }
            />
            <Route
              path="/proposal"
              element={
                <Layout
                  title="Get a Proposal — SIGNAL"
                  description="Start your project with SIGNAL. Let's discuss how we can help your brand achieve its digital goals."
                >
                  <Proposal />
                </Layout>
              }
            />
            <Route
              path="*"
              element={
                <Layout
                  title="Page Not Found — SIGNAL"
                  description="The page you're looking for doesn't exist or has been moved."
                >
                  <NotFound />
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
