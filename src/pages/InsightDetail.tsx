import { useParams, Link } from "react-router-dom";
import { insights } from "@/data/insights";

const InsightDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const insight = insights.find(i => i.id === slug);

  if (!insight) {
    return (
      <div className="section-padding">
        <div className="container-editorial max-w-3xl">
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
    <article className="section-padding">
      <div className="container-editorial max-w-3xl">
        <Link 
          to="/insights" 
          className="inline-block mb-8 text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to insights
        </Link>
        
        <div className="flex items-center gap-3 mb-6">
          <span className="caption">
            {insight.type}
          </span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground" />
          <span className="caption">
            {insight.category}
          </span>
        </div>
        
        <h1 className="headline-hero mb-6">
          {insight.title}
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground">
            {insight.content || `This is a placeholder for the ${insight.title} content.`}
          </p>
        </div>
      </div>
    </article>
  );
};

export default InsightDetail;
