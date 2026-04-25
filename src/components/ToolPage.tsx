import React from 'react';
import { SEO } from './SEO';
import { motion } from 'motion/react';
import { ArrowLeft, Share2, Star, Info, ChevronRight, CheckCircle, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackToolUsage } from '@/src/lib/analytics';
import { tools } from '@/src/lib/tools';
import Markdown from 'react-markdown';

interface FAQ {
  question: string;
  answer: string;
}

interface ToolPageProps {
  title: string;
  description: string;
  longDescription?: string;
  faqs?: FAQ[];
  children: React.ReactNode;
  category: string;
  toolId: string;
  keywords?: string[];
}

export const ToolPage: React.FC<ToolPageProps> = ({
  title,
  description,
  longDescription,
  faqs,
  children,
  category,
  toolId,
  keywords
}) => {
  React.useEffect(() => {
    trackToolUsage(toolId);
  }, [toolId]);

  const relatedTools = tools
    .filter(t => t.category === category && t.id !== toolId)
    .slice(0, 5);

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": title,
    "description": description,
    "url": window.location.href,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "Tooolify"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://tooolify.vercel.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": category.charAt(0).toUpperCase() + category.slice(1),
        "item": `https://tooolify.vercel.app/category/${category}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": window.location.href
      }
    ]
  };

  const faqSchema = faqs && faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${title} | Tooolify`,
        text: description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const schemas: any[] = [softwareSchema, breadcrumbSchema];
  if (faqSchema) schemas.push(faqSchema);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      <SEO 
        title={title} 
        description={description} 
        keywords={keywords}
        schema={schemas} 
      />

      {/* Breadcrumbs & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4">
        <nav className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <ChevronRight size={12} />
          <Link to={`/category/${category}`} className="hover:text-indigo-600">
            {category}
          </Link>
          <ChevronRight size={12} />
          <span className="text-slate-600 truncate max-w-[150px]">{title}</span>
        </nav>
        <div className="flex items-center gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
            <CheckCircle size={12} />
            <span>Verified Tool</span>
          </div>
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all text-xs font-black uppercase tracking-widest"
          >
            <Share2 size={16} />
            Share
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4">
        <div className="lg:col-span-8 space-y-8">
          {/* Top Ad Slot */}
          <div className="w-full h-24 bg-slate-50 border border-dashed border-slate-200 rounded-[32px] flex items-center justify-center text-[10px] font-black text-slate-300 uppercase tracking-widest overflow-hidden">
            <span className="animate-pulse">Ad Space - Leaderboard Header</span>
          </div>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 md:p-12 rounded-[48px] border border-slate-100 shadow-sm relative"
          >
            <div className="mb-10 space-y-4">
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                {title}
              </h1>
              <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl">
                {description}
              </p>
            </div>

            <div className="min-h-[300px]">
              {children}
            </div>

            {/* Middle Ad Slot */}
            <div className="mt-12 w-full h-40 bg-slate-100/50 border border-dashed border-slate-200 rounded-3xl flex items-center justify-center text-[10px] font-black text-slate-300 uppercase tracking-widest overflow-hidden">
              <span className="animate-pulse">Ad Space - Mid-Content Native</span>
            </div>
          </motion.section>

          {/* SEO Content & FAQs */}
          <div className="space-y-8">
            {longDescription && (
              <div className="bg-white p-8 md:p-16 rounded-[48px] border border-slate-100 shadow-sm prose prose-slate max-w-none">
                <Markdown>{longDescription}</Markdown>
              </div>
            )}

            {faqs && faqs.length > 0 && (
              <div className="bg-white p-8 md:p-16 rounded-[48px] border border-slate-100 shadow-sm space-y-10">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
                <div className="grid grid-cols-1 gap-6">
                  {faqs.map((faq, i) => (
                    <div key={i} className="p-8 bg-slate-50 rounded-[32px] border border-slate-50 shadow-sm hover:border-indigo-100 transition-all">
                      <h3 className="text-lg font-black text-slate-900 mb-3 flex items-start gap-4">
                        <span className="text-indigo-600">Q.</span>
                        {faq.question}
                      </h3>
                      <p className="text-slate-500 font-medium leading-relaxed pl-8">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-slate-900 p-8 md:p-10 rounded-[48px] text-white space-y-8 sticky top-24">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2 py-1 bg-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-indigo-400">
                <Zap size={14} fill="currentColor" />
                <span>Trending Discovery</span>
              </div>
              <h3 className="text-2xl font-black tracking-tight">Related Tools</h3>
            </div>
            
            <div className="space-y-4">
              {relatedTools.map(tool => (
                <Link 
                  key={tool.id} 
                  to={tool.path}
                  className="flex items-center gap-4 p-5 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white/40 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    <tool.icon size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-black truncate">{tool.name}</div>
                    <div className="text-[10px] text-white/30 uppercase font-black tracking-widest">{tool.category} Tool</div>
                  </div>
                  <ArrowRight size={16} className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>

            <button className="w-full py-5 bg-indigo-600 text-white font-black rounded-3xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/30 text-sm uppercase tracking-widest">
              Browse 100+ AI Tools
            </button>
            
            <div className="pt-6 border-t border-white/10">
              <p className="text-[10px] text-white/40 font-black uppercase tracking-widest text-center">
                Processing locally in browser
              </p>
            </div>
          </div>

          <div className="p-8 bg-indigo-50 border border-indigo-100 rounded-[40px] space-y-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
              <Info size={24} />
            </div>
            <h4 className="text-lg font-black text-slate-900">Pro Tip</h4>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              Use our **Meta Tag Generator** alongside this tool to maximize your SEO performance for any project.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};
