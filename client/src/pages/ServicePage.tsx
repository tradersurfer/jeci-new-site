import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function ServicePage() {
  const { id } = useParams();
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="container px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 text-primary hover:text-secondary mb-12 font-bold group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-serif font-bold text-primary capitalize">{id?.replace('-', ' ')}</h1>
        <p className="mt-8 text-slate-600 max-w-2xl">This service is part of the JECI Group's institutional readiness framework. We are currently updating this page with detailed specifications.</p>
      </div>
    </div>
  );
}
