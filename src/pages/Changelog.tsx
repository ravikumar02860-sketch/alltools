import React from 'react';
import { SEO } from '../components/SEO';
import { motion } from 'motion/react';
import { Rocket, Zap, Bug, Sparkles, Clock } from 'lucide-react';

export const Changelog: React.FC = () => {
  const updates = [
    {
      date: "April 25, 2026",
      version: "v2.4.0",
      type: "major",
      title: "The SEO & AI Update",
      changes: [
        "Launched Video to Blog AI tool with YouTube transcript extraction.",
        "Added comprehensive FAQ, Privacy, and Terms of Service pages.",
        "Implemented structured data (JSON-LD) for all tool pages.",
        "Optimized meta tags for 100+ keywords.",
        "Improved mobile navigation and scroll-to-top behavior."
      ]
    },
    {
      date: "April 10, 2026",
      version: "v2.3.0",
      type: "feature",
      title: "PDF Power Suite",
      changes: [
        "Added PDF Merge and Split functionality using local browser processing.",
        "Launched PDF to Word converter with layout preservation.",
        "Improved PDF compression algorithm for smaller file sizes.",
        "Updated ToolPage layout for better clarity on utility steps."
      ]
    },
    {
      date: "March 28, 2026",
      version: "v2.2.0",
      type: "feature",
      title: "Image & OCR Improvements",
      changes: [
        "Revamped Image to Text (OCR) with higher accuracy using refined AI models.",
        "Added Favicon Generator with multi-size export options.",
        "Improved WebP conversion quality and transparency handling.",
        "Fixed minor UI spacing issues in the footer."
      ]
    },
    {
      date: "March 15, 2026",
      version: "v2.1.0",
      type: "fix",
      title: "Stability & Performance",
      changes: [
        "Reduced initial bundle size by 15% through route-based lazy loading.",
        "Fixed Base64 encoding errors for very large strings.",
        "Resolved a bug where the search bar would lose focus on mobile.",
        "Added support for SHA-512 in the Hash Generator."
      ]
    }
  ];

  return (
    <div className="pb-32">
      <SEO 
        title="Changelog - Latest Updates and Features | Tooolify" 
        description="Stay updated with the latest features, improvements, and bug fixes at Tooolify. Follow our journey in building the ultimate free online tool suite."
      />

      <div className="max-w-4xl mx-auto px-6 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-16"
        >
          {/* Header */}
          <div className="space-y-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-full text-xs font-black uppercase tracking-widest">
              <Rocket size={14} />
              <span>Project Updates</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight font-display leading-[1.1]">
              Release <span className="text-indigo-600">Notes</span>
            </h1>
            <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
              We're constantly improving. Track every new tool and feature we ship to help you work smarter.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            {updates.map((update, index) => (
              <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                {/* Icon */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 group-[.is-active]:bg-indigo-600 text-slate-500 group-[.is-active]:text-indigo-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  {update.type === 'major' ? <Sparkles size={18} /> : update.type === 'feature' ? <Zap size={18} /> : <Bug size={18} />}
                </div>
                {/* Content */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <time className="text-xs font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                      <Clock size={12} />
                      {update.date}
                    </time>
                    <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black rounded-full uppercase tracking-widest">
                      {update.version}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-6">{update.title}</h3>
                  <ul className="space-y-3">
                    {update.changes.map((change, i) => (
                      <li key={i} className="text-sm text-slate-500 flex items-start gap-2 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-200 mt-1.5 shrink-0" />
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Subscribe CTA */}
          <div className="bg-slate-900 rounded-[48px] p-12 text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/20 to-transparent" />
            <div className="relative z-10 space-y-4">
              <h2 className="text-3xl font-black text-white font-display">Stay in the loop</h2>
              <p className="text-slate-400 font-medium max-w-sm mx-auto">
                Get notified when we release new high-performance tools and updates.
              </p>
              <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 pt-4">
                <input 
                  type="email" 
                  placeholder="name@email.com"
                  className="flex-1 h-14 px-6 bg-white/10 border border-white/10 rounded-2xl text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                />
                <button className="h-14 px-8 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/30 whitespace-nowrap">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
