import React from 'react';
import { SEO } from './SEO';
import { motion } from 'motion/react';
import { ArrowLeft, Share2, Star, Info, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackToolUsage } from '@/src/lib/analytics';
import { tools } from '@/src/lib/tools';

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
    <div className="space-y-8 max-w-4xl mx-auto">
      <SEO 
        title={title} 
        description={description} 
        keywords={keywords}
        schema={schemas} 
      />

      {/* Breadcrumbs & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <ChevronRight size={12} />
          <Link to={`/category/${category}`} className="hover:text-indigo-600">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Link>
          <ChevronRight size={12} />
          <span className="text-slate-600 truncate max-w-[150px]">{title}</span>
        </nav>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all text-sm font-bold"
          >
            <Share2 size={16} />
            Share
          </button>
        </div>
      </div>

      {/* Tool Header */}
      <header className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          {title}
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          {description}
        </p>
      </header>

      {/* Main Tool Area */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm"
      >
        {children}
      </motion.section>

      {/* Tool Content & SEO Copy */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
        <div className="md:col-span-2 space-y-8">
          {longDescription && (
            <div className="prose prose-slate max-w-none">
              <h2 className="text-2xl font-bold text-slate-900">About {title}</h2>
              <div className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                {longDescription}
              </div>
            </div>
          )}

          {faqs && faqs.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-2 flex items-start gap-3">
                      <span className="text-indigo-600 mt-1">Q:</span>
                      {faq.question}
                    </h3>
                    <p className="text-slate-600 text-sm pl-7 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100">
            <div className="flex items-center gap-2 text-indigo-600 mb-3">
              <Info size={18} />
              <h4 className="font-bold text-sm uppercase tracking-wider">Quick Tip</h4>
            </div>
            <p className="text-sm text-indigo-900/70 leading-relaxed">
              Use the "Copy" button to instantly save your results to the clipboard. 
              All processing is done in your browser for maximum privacy.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-4">Related Tools</h4>
            <div className="space-y-3">
              {relatedTools.map(tool => (
                <Link 
                  key={tool.id} 
                  to={tool.path} 
                  className="block text-sm text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  {tool.name}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};
