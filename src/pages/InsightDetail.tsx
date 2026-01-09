import { useParams, Link } from "react-router-dom";
import { insights } from "@/data/insights";
import { LiquidBackground } from "@/components/ui/LiquidBackground";

const InsightDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const insight = insights.find(i => i.id === slug);

  if (!insight) {
    return (
      <div className="section-padding relative overflow-hidden min-h-[50vh] flex flex-col justify-center">
        <LiquidBackground variant="insights" />
        <div className="container-editorial max-w-3xl relative z-10">
          <h1 className="headline-hero">Insight not found</h1>
          <p className="body-large text-muted-foreground mt-6">
            The insight you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/insights"
            className="inline-block mt-8 text-foreground hover:opacity-70 transition-opacity"
          >
            ← Back to all insights
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding pb-12 bg-section-primary relative overflow-hidden">
        <LiquidBackground variant="insights" />
        <div className="container-editorial max-w-3xl relative z-10">
          <Link
            to="/insights"
            className="inline-block mb-8 text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to insights
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="caption uppercase tracking-wider font-semibold">
              {insight.type}
            </span>
            <span className="w-1 h-1 rounded-full bg-foreground/20" />
            <span className="caption text-muted-foreground italic">
              {insight.category}
            </span>
          </div>

          <h1 className="headline-hero mb-6">
            {insight.title}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding pt-12">
        <div className="container-editorial max-w-3xl">
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              {insight.content || `This is a placeholder for the ${insight.title} content.`}
            </p>
          </div>
        </div>
      </section>
    </article>
  );
};

export default InsightDetail;
