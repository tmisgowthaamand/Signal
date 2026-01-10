import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import React, { Suspense } from "react";
import { ThemeProvider } from "@/components/theme-provider";
const Index = React.lazy(() => import("./pages/Index"));
const Philosophy = React.lazy(() => import("./pages/Philosophy"));
const Work = React.lazy(() => import("./pages/Work"));
const CaseStudy = React.lazy(() => import("./pages/CaseStudy"));
const Insights = React.lazy(() => import("./pages/Insights"));
const Proposal = React.lazy(() => import("./pages/Proposal"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light" storageKey="signal-theme">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToTop />
          <Suspense fallback={
            <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          }>
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
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
