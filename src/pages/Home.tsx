import React from 'react';
import { Link } from 'react-router-dom';
import { categories, tools } from '@/src/lib/tools';
import { SEO } from '@/src/components/SEO';
import { 
  ArrowRight, 
  Star, 
  TrendingUp, 
  Clock, 
  ShieldAlert, 
  Search, 
  Zap, 
  Shield, 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle, 
  Play, 
  Heart 
} from 'lucide-react';
import { motion } from 'motion/react';
import { getRecentlyUsedTools } from '@/src/lib/analytics';
import { nsfwTools } from '@/src/lib/tools';
import { NsfwCard } from '@/src/components/NsfwCard';

export const Home: React.FC = () => {
  const popularTools = tools.slice(0, 4);
  const recentTools = tools.slice(4, 9);
  const trendingNsfw = nsfwTools.slice(0, 8);

  const trendingTags = [
    { label: 'PDF Editor', path: '/pdf/merge' },
    { label: 'AI Story', path: '/ai-erotic-story-generator' },
    { label: 'QR Generator', path: '/generator/qr-code' },
    { label: 'Word Counter', path: '/text/word-counter' },
    { label: 'SEO Audit', path: '/seo/meta-tags' }
  ];

  return (
    <div className="space-y-20 pb-20">
      <SEO 
        title="Tooolify | The Ultimate AI Tool Website & Digital Directory" 
        description="Discover the best AI tool website featuring 100+ free online utilities. Fast, secure AI generators, converters, and developer tools. No signup required."
        keywords={['ai tool website', 'best ai directory', 'free online ai tools', 'ai content generators', 'developer utilities online', 'seo ai tools']}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Tooolify AI Directory",
            "url": "https://tooolify.vercel.app",
            "description": "Premium AI tool website and directory for digital professionals.",
            "applicationCategory": "AIApplication",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          }
        ]}
      />

      {/* Hero Section - AI Directory Style */}
      <section className="relative py-20 px-4 overflow-hidden -mt-8">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-indigo-50/50 to-transparent -z-10" />
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full -z-10" />
        <div className="absolute top-48 right-1/4 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm text-indigo-600 text-xs font-black uppercase tracking-widest"
          >
            <Star size={14} fill="currentColor" />
            <span>#1 AI Tool Website & Directory</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1]">
            Find the Best <br />
            <span className="bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent italic">AI Tools</span> for Everything.
          </h1>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
            Join thousands of creators using the most powerful AI tool website. 
            Access 100+ utilities for free, forever.
          </p>

          {/* Massive Search Bar Overlay */}
          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-[32px] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
            <div className="relative bg-white rounded-[28px] border border-slate-100 p-2 shadow-2xl flex items-center gap-4">
              <div className="pl-4 text-slate-400">
                <Search size={24} />
              </div>
              <input 
                type="text" 
                placeholder="Search by keyword (e.g., 'Writing', 'Code', 'NSFW')..." 
                className="flex-1 bg-transparent border-none outline-none text-lg font-medium text-slate-900 placeholder:text-slate-400"
              />
              <button className="px-8 py-4 bg-indigo-600 text-white font-black rounded-3xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                Find Tools
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Trending:</span>
            {trendingTags.map((tag) => (
              <Link 
                key={tag.label} 
                to={tag.path}
                className="px-4 py-1.5 bg-white border border-slate-100 rounded-xl text-xs font-bold text-slate-600 hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm"
              >
                {tag.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bento Grid  */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
        {[
          { label: 'Total Tools', value: '100+', color: 'text-indigo-600' },
          { label: 'Category Count', value: '12+', color: 'text-emerald-600' },
          { label: 'Daily Users', value: '5k+', color: 'text-amber-600' },
          { label: 'Cost to Use', value: '$0', color: 'text-rose-600' }
        ].map((item, i) => (
          <div key={i} className="p-8 bg-white border border-slate-100 rounded-[40px] text-center shadow-sm hover:shadow-md transition-all">
            <div className={`text-3xl font-black ${item.color} mb-1`}>{item.value}</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</div>
          </div>
        ))}
      </section>

      {/* Featured AI Categories */}
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between px-4 gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Browse Popular Categories</h2>
            <p className="text-slate-500 font-medium">Explore hand-picked tools across the 100+ utilities available on our AI tool website.</p>
          </div>
          <Link to="/categories" className="px-6 py-3 bg-white border border-slate-100 rounded-2xl font-bold text-indigo-600 flex items-center gap-2 hover:bg-indigo-50 transition-all shadow-sm">
            Explore All Categories <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {categories.slice(0, 8).map((cat, idx) => (
            <Link 
              key={cat.id} 
              to={`/category/${cat.id}`}
              className="group p-8 bg-white rounded-[40px] border border-slate-100 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 transition-all duration-500 mb-6 border border-slate-100 group-hover:border-transparent">
                <cat.icon size={32} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2 truncate w-full">{cat.name}</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* NSFW AI Special Section (The Viral hook) */}
      <section className="bg-slate-950 -mx-6 px-6 py-24 rounded-[64px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/10 to-transparent -z-0" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs font-black uppercase tracking-widest border border-indigo-500/30">
                <TrendingUp size={14} />
                <span>Trending Adult Section</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                Premium NSFW <br />
                <span className="text-indigo-500 italic">AI Tools Directory.</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-xl font-medium">Explore the fastest-growing niche in AI. Discover uncensored chatbots, image generators, and erotic storytellers.</p>
            </div>
            <Link to="/nsfw-ai-tools" className="inline-flex items-center gap-4 px-10 py-5 bg-indigo-600 text-white rounded-[32px] font-black text-lg hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-500/40 group">
              Browse Directory
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingNsfw.map((tool) => (
              <NsfwCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Benefits Section  */}
      <section className="bg-white border border-slate-100 rounded-[56px] p-8 md:p-20 shadow-sm mx-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Why Tooolify is the <br />
              <span className="text-indigo-600 italic">Smart Choice</span> for Creators.
            </h2>
            
            <div className="space-y-8">
              {[
                { title: 'Privacy First', icon: ShieldAlert, desc: 'Your data is handled client-side. No logs, no leaks, total privacy.' },
                { title: 'Blazing Fast', icon: Zap, desc: 'Optimized code ensures 100% of our tools load in under 1 second.' },
                { title: 'No Hidden Fees', icon: Star, desc: 'We don\'t hide premium features behind paywalls. Life-long free access.' }
              ].map((benefit, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all shrink-0">
                    <benefit.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-slate-900 mb-1">{benefit.title}</h4>
                    <p className="text-slate-500 font-medium leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative bg-slate-50 rounded-[48px] p-8 aspect-square flex items-center justify-center group">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-50 blur-[100px] rounded-full group-hover:scale-110 transition-transform duration-1000" />
            <div className="relative text-center space-y-4">
              <div className="text-8xl font-black text-indigo-100 tracking-tighter uppercase">Trusted</div>
              <div className="text-lg font-black text-indigo-600 uppercase tracking-widest bg-white border border-indigo-100 px-6 py-2 rounded-full shadow-xl">by 50,000+ Monthly Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO FAQ Section */}
      <section className="px-4 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Everything You Need to Know</h2>
          <p className="text-slate-500 font-medium">Common questions about our AI tool website.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { q: "What makes Tooolify the best AI tool website?", a: "Tooolify focuses on high-speed, privacy-first tools that run directly in your browser. Unlike other directories, we don't just list tools; we build the most essential utilities for you to use instantly." },
            { q: "Is it really free for commercial use?", a: "Yes. Every tool output, from AI-generated stories to formatted code, can be used commercially without any attribution. We provide professional-grade utility at zero cost." },
            { q: "How are NSFW AI tools moderated?", a: "Our NSFW directory is a curated list of high-quality, verified services. We manually review every tool to ensure it meets our standards for privacy and safety." },
            { q: "Do you offer API access?", a: "We are building a unified API for bulk processing. Register your interest in our 'Submit Tool' section to get early beta access." }
          ].map((faq, i) => (
            <div key={i} className="p-8 bg-slate-50 rounded-[32px] border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-4 flex gap-2">
                <span className="text-indigo-600">Q.</span>
                {faq.q}
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed pl-5">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
