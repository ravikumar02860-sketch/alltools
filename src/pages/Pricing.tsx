import React from 'react';
import { SEO } from '../components/SEO';
import { motion } from 'motion/react';
import { Check, Zap, Sparkles, Star, Rocket } from 'lucide-react';

export const Pricing: React.FC = () => {
  return (
    <div className="pb-32">
      <SEO 
        title="Pricing & Plans - Why Tooolify is Free | Tooolify" 
        description="Tooolify is 100% free with no signups. Explore our vision for the ultimate ad-supported free online tool suite."
      />

      <div className="max-w-6xl mx-auto px-6 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-20"
        >
          {/* Header */}
          <div className="space-y-6 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-widest">
              <Star size={14} />
              <span>Transparent Pricing</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight font-display leading-[1.1]">
              The Best Tools. <br/>
              <span className="text-indigo-600">Zero Cost.</span>
            </h1>
            <p className="text-slate-500 text-lg font-medium">
              We believe that the most essential digital utilities should be accessible to everyone without barriers. No subscriptions, no credit cards, no catch.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="p-10 bg-white border-2 border-slate-100 rounded-[40px] space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
                  <Zap size={24} />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 font-display">Forever Free</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">$0</span>
                  <span className="text-slate-400 font-bold">/ per use</span>
                </div>
              </div>
              <p className="text-slate-500 font-medium leading-relaxed">
                Perfect for individuals, students, and professionals who need quick, reliable tools.
              </p>
              <ul className="space-y-4">
                {[
                  "No account required",
                  "Access to 100+ tools",
                  "Browser-side processing",
                  "Unlimited basic conversions",
                  "Community support",
                  "Ad-supported experience"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Check size={12} strokeWidth={4} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full h-16 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-slate-800 transition-all">
                Start Using Tools
              </button>
            </div>

            {/* Pro Plan (Coming Soon) */}
            <div className="p-10 bg-slate-900 rounded-[40px] space-y-8 relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl" />
              <div className="absolute top-0 right-0 p-6">
                <div className="px-4 py-1.5 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                  Coming Soon
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white font-display">Tooolify Pro</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">$9</span>
                  <span className="text-slate-400 font-bold">/ month</span>
                </div>
              </div>
              <p className="text-slate-400 font-medium leading-relaxed">
                Advanced features for power users and enterprise workflows.
              </p>
              <ul className="space-y-4">
                {[
                  "No advertisements",
                  "Priority tool requests",
                  "Bulk file processing",
                  "API access (beta)",
                  "Custom export templates",
                  "Cloud storage for results"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300 font-medium">
                    <div className="w-5 h-5 rounded-full bg-indigo-600/30 text-indigo-400 flex items-center justify-center shrink-0">
                      <Check size={12} strokeWidth={4} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full h-16 bg-white text-slate-900 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all">
                Join Waitlist
              </button>
            </div>
          </div>

          {/* FAQ Preview */}
          <div className="bg-indigo-600 rounded-[48px] p-12 md:p-20 text-white space-y-12 relative overflow-hidden text-center">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent" />
            <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
              <h2 className="text-4xl font-black font-display tracking-tight">How do we keep it free?</h2>
              <p className="text-indigo-100 text-lg font-medium leading-relaxed">
                By keeping our overhead low and using non-intrusive advertisements, we're able to offer professional-grade tools to everyone. We value impact over profit.
              </p>
              <div className="pt-8 flex flex-wrap justify-center gap-8">
                <div className="flex items-center gap-3 font-bold">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><Cloud size={20} /></div>
                  Cloud Infrastructure
                </div>
                <div className="flex items-center gap-3 font-bold">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><Heart size={20} /></div>
                  Built with Love
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Cloud = ({ size }: { size: number }) => <Sparkles size={size} />;
const Heart = ({ size }: { size: number }) => <Rocket size={size} />;
