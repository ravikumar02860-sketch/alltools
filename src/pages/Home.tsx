import React from 'react';
import { Link } from 'react-router-dom';
import { categories, tools } from '@/src/lib/tools';
import { SEO } from '@/src/components/SEO';
import { ArrowRight, Star, TrendingUp, Clock, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { getRecentlyUsedTools } from '@/src/lib/analytics';
import { nsfwTools } from '@/src/lib/tools';
import { NsfwCard } from '@/src/components/NsfwCard';

export const Home: React.FC = () => {
  const popularTools = tools.slice(0, 4);
  const recentTools = tools.slice(4, 8);
  const recentlyUsedIds = getRecentlyUsedTools();
  const recentlyUsed = tools.filter(t => recentlyUsedIds.includes(t.id));
  const trendingNsfw = nsfwTools.slice(0, 8);

  return (
    <div className="space-y-12">
      <SEO 
        title="100+ Free Online Tools for Developers & Creators" 
        description="Access the ultimate collection of free online utilities. From text manipulation to developer tools, Tooolify has everything you need in one place."
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Tooolify",
          "url": "https://tooolify.vercel.app",
          "description": "A comprehensive platform offering over 100 free online tools.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All"
        }}
      />

      {/* Hero Section */}
      <section className="text-center space-y-6 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider"
        >
          <Star size={14} fill="currentColor" />
          <span>New Tools Added Weekly</span>
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Every Tool You Need, <br />
          <span className="text-indigo-600">All in One Place.</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Free, fast, and secure online tools for developers, designers, and digital professionals. 
          No signup required. No watermarks. Just pure utility.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link to="/category/text" className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
            Explore All Tools
          </Link>
          <Link to="/nsfw-ai-tools" className="px-8 py-3 bg-slate-900 text-white font-bold rounded-2xl border hover:bg-slate-800 transition-all flex items-center gap-2">
            NSFW AI Directory <ShieldAlert size={18} className="text-indigo-400" />
          </Link>
        </div>
      </section>

      {/* Recently Used */}
      {recentlyUsed.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Clock className="text-indigo-600" size={24} />
            <h2 className="text-2xl font-bold text-slate-900">Recently Used</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {recentlyUsed.map((tool) => (
              <Link 
                key={tool.id}
                to={tool.path}
                className="flex flex-col items-center text-center p-4 bg-white rounded-2xl border border-slate-100 hover:border-indigo-100 hover:bg-slate-50 transition-all"
              >
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-2">
                  <tool.icon size={20} />
                </div>
                <span className="text-sm font-bold text-slate-900 truncate w-full">{tool.name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Categories Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Browse by Category</h2>
          <Link to="/categories" className="text-indigo-600 text-sm font-bold flex items-center gap-1 hover:underline">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link 
                to={`/category/${cat.id}`}
                className="group block p-6 bg-white rounded-3xl border border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all h-full"
              >
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600 group-hover:bg-indigo-600 group-hover:text-white transition-all mb-4">
                  <cat.icon size={24} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{cat.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{cat.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular Tools */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-indigo-600" size={24} />
          <h2 className="text-2xl font-bold text-slate-900">Popular Tools</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {popularTools.map((tool) => (
            <Link 
              key={tool.id}
              to={tool.path}
              className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 hover:border-indigo-100 hover:bg-slate-50 transition-all"
            >
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
                <tool.icon size={24} />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-slate-900 truncate">{tool.name}</h3>
                <p className="text-sm text-slate-500 truncate">{tool.description}</p>
              </div>
              <ArrowRight className="ml-auto text-slate-300 group-hover:text-indigo-600" size={20} />
            </Link>
          ))}
        </div>
      </section>

      {/* Recently Added */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Clock className="text-indigo-600" size={24} />
          <h2 className="text-2xl font-bold text-slate-900">Recently Added</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentTools.map((tool) => (
            <Link 
              key={tool.id}
              to={tool.path}
              className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 hover:border-indigo-100 hover:bg-slate-50 transition-all"
            >
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
                <tool.icon size={24} />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-slate-900 truncate">{tool.name}</h3>
                <p className="text-sm text-slate-500 truncate">{tool.description}</p>
              </div>
              <ArrowRight className="ml-auto text-slate-300 group-hover:text-indigo-600" size={20} />
            </Link>
          ))}
        </div>
      </section>

      {/* Trending NSFW AI Tools Section */}
      <section className="bg-slate-950 -mx-6 px-6 py-20 rounded-[48px]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-black text-white mb-3 tracking-tight">Trending <span className="text-indigo-500">NSFW AI</span> Tools</h2>
              <p className="text-slate-400 max-w-xl">Discover the most popular adult AI generators and chatbots trending this week.</p>
            </div>
            <Link to="/nsfw-ai-tools" className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 text-white border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all">
              Explore All NSFW <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingNsfw.map((tool) => (
              <NsfwCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="prose prose-slate max-w-none bg-white p-8 md:p-12 rounded-3xl border border-slate-100">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Choose Tooolify?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Fast & Efficient</h3>
            <p className="text-slate-600 leading-relaxed">
              Our tools are built with performance in mind. Most processing happens directly in your browser, 
              ensuring instant results without the need for server round-trips. This means your data stays 
              private and the experience is lightning fast.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Privacy First</h3>
            <p className="text-slate-600 leading-relaxed">
              We value your privacy. Unlike other platforms, we don't store your input data. 
              Everything is processed locally whenever possible, and any files uploaded for 
              processing are automatically deleted after 1 hour.
            </p>
          </div>
        </div>
        
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {[
              { q: "Are these tools really free?", a: "Yes, all our basic tools are 100% free to use without any signup or subscription." },
              { q: "Is my data secure?", a: "Absolutely. We use industry-standard encryption and process most data locally in your browser." },
              { q: "Can I use these tools for commercial projects?", a: "Yes, you are free to use the outputs of our tools for any personal or commercial project." },
              { q: "Do you have an API?", a: "We are currently developing a premium API for developers. Stay tuned for updates!" }
            ].map((faq, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-2xl">
                <h4 className="font-bold text-slate-900 mb-2">{faq.q}</h4>
                <p className="text-sm text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
