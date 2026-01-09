import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { BottomMenu } from "../ui/BottomMenu";
import { ScrollProgress } from "../ui/ScrollProgress";
import { ScrollToTopButton } from "../ui/ScrollToTopButton";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImageUrl?: string;
  ogType?: string;
  twitterCardType?: string;
}

export function Layout({
  children,
  title = "SIGNAL — Strategy-Led Digital Partner",
  description = "We partner with considered brands to build clarity through brand systems, web platforms, digital creatives, and SEO foundations.",
  canonicalUrl = "https://signal.agency",
  ogImageUrl = "https://lovable.dev/opengraph-image-p98pqg.png",
  ogType = "website",
  twitterCardType = "summary_large_image",
}: LayoutProps) {
  return (
    <>
      <ScrollProgress />
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="SIGNAL" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content={twitterCardType} />
        <meta name="twitter:site" content="@signal" />
        <meta name="twitter:creator" content="@signal" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImageUrl} />

        {/* Additional meta tags */}
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="light dark" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
        <Navigation />
        <main id="main-content" className="flex-1 pt-20 md:pt-24" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <div className="hidden md:block">
          <BottomMenu />
        </div>
        <ScrollToTopButton />
      </div>
    </>
  );
}
