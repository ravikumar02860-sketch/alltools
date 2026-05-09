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
  Heart,
  MousePointer2,
  Lock,
  Cpu
} from 'lucide-react';
import { motion } from 'motion/react';
import { getRecentlyUsedTools } from '@/src/lib/analytics';
import { nsfwTools } from '@/src/lib/tools';
import { NsfwCard } from '@/src/components/NsfwCard';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const Home: React.FC = () => {
  const popularTools = tools.slice(0, 4);
  const recentTools = tools.slice(4, 9);
  const trendingNsfw = nsfwTools.slice(0, 8);

  const trendingTags = [
    { label: 'Free PDF to Word Tool', path: '/pdf/to-word' },
    { label: 'AI Video to Blog Generator', path: '/ai/video-to-blog' },
    { label: 'Best Online Image OCR', path: '/image/to-text' },
    { label: 'Professional Favicon Gen', path: '/image/favicon-generator' },
    { label: 'SEO Meta Tag Optimizer', path: '/seo/meta-tags' }
  ];

  const homeFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Tooolify?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tooolify is a free online tools website with 100+ utilities including AI generators, tools name in Hindi and English, tools images, tools list, tool box info, tool bag guides, toolbar utilities, and developer tools."
        }
      },
      {
        "@type": "Question",
        "name": "Is Tooolify free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all tools on Tooolify are 100% free with no hidden charges, and no account registration is required to access our core utilities."
        }
      },
      {
        "@type": "Question",
        "name": "Are my files secure on Tooolify?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Most of our tools process files locally in your browser, and we never store your personal data or uploaded documents on our servers."
        }
      },
      {
        "@type": "Question",
        "name": "What are tools name in Hindi?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Common tools name in Hindi: Hammer - हथौड़ा, Wrench - रिंच, Screwdriver - पेचकश, Pliers - प्लायर्स, Drill Machine - ड्रिल मशीन, Tool Box - टूल बॉक्स, Tool Bag - टूल बैग, Chisel - छेनी, Saw - आरी."
        }
      },
      {
        "@type": "Question",
        "name": "What does Tooolify AI offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tooolify AI offers free AI image generators, AI video to blog converter, AI writing tools, AI document analysis, and more — all powered by cutting-edge AI models with no signup required."
        }
      }
    ]
  };

  return (
    <div className="space-y-32 pb-32 overflow-hidden">
      <SEO 
        title="Tooolify | #1 Free Online Tools Website — Tools Name, Images, AI Utilities" 
        description="Tooolify offers 100+ free online tools: tools name in Hindi & English, tools images, tool box, tool bag, toolbar, tools drawing, tools list, AI generators, PDF tools and more. No signup needed."
        keywords={[
          'tools name', 'tools name in hindi', 'tools name in english', 'tools images',
          'tools list', 'tool box', 'tool bag', 'toolbar', 'tools drawing', 'tools set',
          'toolify', 'toolify ai', 'free ai tool website', 'online utilities',
          'tools in hindi', 'tools definition', 'tools wrench', 'tools icon',
          'tools in computer', 'tools diagram', 'tools name with picture',
          'tools drawing with name', 'tools drawing easy with names', 'tool belt',
          'tools qa', 'tools in ai', 'tools website', 'tool box price', 'toolsvilla'
        ]}
      />

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-4 overflow-hidden -mt-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-indigo-50/30 to-transparent -z-10" />
        <div className="absolute -top-48 left-1/4 w-[500px] h-[500px] bg-indigo-200/20 blur-[140px] rounded-full -z-10 animate-pulse" />
        <div className="absolute top-48 right-1/4 w-[400px] h-[400px] bg-emerald-200/20 blur-[120px] rounded-full -z-10" />

        <div className="max-w-6xl mx-auto text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass premium-shadow text-indigo-600 text-[10px] font-black uppercase tracking-widest border border-indigo-100"
          >
            <Sparkles size={12} fill="currentColor" />
            <span>Redefining Utility Tools</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="text-6xl md:text-8xl font-display font-black text-slate-900 tracking-tight leading-[1.05] max-w-5xl mx-auto"
          >
            Smarter Tools. <br />
            <span className="text-gradient">Faster Workflow.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-slate-500 max-w-2xl mx-auto font-medium"
          >
            100+ free online tools — tools name in English &amp; Hindi, tools images, tools drawing, tool box, tool bag, AI generators and more. No logins, no limits.
          </motion.p>

          {/* Premium Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative max-w-2xl mx-auto group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-indigo-600/20 to-indigo-500/20 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000" />
            <div className="relative glass rounded-[36px] p-2 pr-2 overflow-hidden premium-shadow ring-1 ring-slate-200/50 flex items-center group-focus-within:ring-indigo-500/50 transition-all">
              <div className="pl-6 text-slate-400">
                <Search size={24} />
              </div>
              <input 
                type="text" 
                placeholder="Search tools (e.g. PDF to Word, Image OCR, tools name in Hindi...)" 
                className="flex-1 bg-transparent border-none outline-none text-lg font-medium text-slate-900 placeholder:text-slate-400 p-4"
              />
              <button className="px-10 py-5 bg-slate-950 text-white font-black rounded-[32px] hover:bg-indigo-600 transition-all flex items-center gap-2 group/btn">
                <span>Find Tool</span>
                <MousePointer2 size={18} className="group-hover/btn:translate-y-0.5 group-hover/btn:scale-110 transition-transform" />
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-6"
          >
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">Top Searched:</span>
            {trendingTags.map((tag) => (
              <Link 
                key={tag.label} 
                to={tag.path}
                className="px-4 py-2 bg-white/50 backdrop-blur rounded-full text-xs font-bold text-slate-600 hover:bg-white hover:text-indigo-600 ring-1 ring-slate-200 transition-all"
              >
                {tag.label}
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features bento grid */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-6 h-[700px] md:h-[600px]">
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-3 md:row-span-2 bento-card p-12 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                <Cpu size={28} />
              </div>
              <h3 className="text-3xl font-display font-black tracking-tight text-slate-900">AI-First Infrastructure</h3>
              <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-sm">Every tool is optimized using edge-computing to ensure instant delivery regardless of file size.</p>
            </div>
            <div className="flex items-center gap-8 pt-8">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-slate-900 tracking-tighter uppercase whitespace-nowrap">0.3s</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avg Latency</span>
              </div>
              <div className="w-px h-10 bg-slate-100" />
              <div className="flex flex-col">
                <span className="text-3xl font-black text-slate-900 tracking-tighter">100%</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Success Rate</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-3 bento-card p-10 bg-slate-950 flex flex-col justify-between group"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-2xl font-display font-black text-white">Privacy Secured</h3>
                <p className="text-slate-400 text-sm font-medium">Your data never leaves your browser.</p>
              </div>
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-indigo-400 border border-white/10 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Lock size={20} />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  className="h-full bg-indigo-500"
                />
              </div>
              <div className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ delay: 0.2 }}
                  className="h-full bg-indigo-500"
                />
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-3 bento-card p-10 bg-indigo-600 flex flex-col justify-between text-white group"
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Verified Community</span>
              <TrendingUp size={20} />
            </div>
            <div className="space-y-1">
              <span className="text-4xl font-black font-display tracking-tight leading-none">50K+</span>
              <p className="text-white/60 font-medium">Active monthly developers &amp; creators using Tooolify.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Browse Popular Categories */}
      <section className="space-y-16 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-12">
          <div className="space-y-3">
            <h2 className="text-4xl font-display font-black text-slate-900 tracking-tight">Ecosystem Directory</h2>
            <p className="text-slate-500 font-medium text-lg">Hand-picked categories to fuel your creative production.</p>
          </div>
          <Link to="/categories" className="px-8 py-4 bg-white border border-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-900 flex items-center gap-2 hover:bg-slate-50 transition-all">
            Explore 12+ Categories <ArrowRight size={16} />
          </Link>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {categories.slice(0, 8).map((cat) => (
            <motion.div key={cat.id} variants={item}>
              <Link 
                to={`/category/${cat.id}`}
                className="group h-full p-10 bg-white rounded-[48px] ring-1 ring-slate-100 hover:ring-indigo-200 hover:bg-indigo-50/20 transition-all flex flex-col items-center text-center premium-shadow"
              >
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-indigo-600 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-indigo-500/10 transition-all duration-500 mb-8 border border-slate-100 group-hover:border-indigo-100">
                  <cat.icon size={36} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-display font-black text-slate-900 mb-3">{cat.name}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">{cat.description}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ✅ NEW: SEO Keyword Section — Tools Name in English & Hindi */}
      <section className="max-w-7xl mx-auto px-6 py-16 bg-slate-50 rounded-[48px]">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-black text-slate-900 tracking-tight mb-4">
            Tools Name in English &amp; Hindi
          </h2>
          <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
            Complete tools name list with pictures — from tool box and tool bag to drill machine, wrench, and more. Explore tools in Hindi meaning and English.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { en: 'Hammer', hi: 'हथौड़ा', emoji: '🔨' },
            { en: 'Wrench', hi: 'रिंच', emoji: '🔧' },
            { en: 'Screwdriver', hi: 'पेचकश', emoji: '🪛' },
            { en: 'Pliers', hi: 'प्लायर्स', emoji: '🪚' },
            { en: 'Drill Machine', hi: 'ड्रिल', emoji: '🔩' },
            { en: 'Tool Box', hi: 'टूल बॉक्स', emoji: '🧰' },
            { en: 'Tool Bag', hi: 'टूल बैग', emoji: '👜' },
            { en: 'Saw', hi: 'आरी', emoji: '🪚' },
            { en: 'Chisel', hi: 'छेनी', emoji: '🪛' },
            { en: 'Tool Belt', hi: 'टूल बेल्ट', emoji: '🎽' },
          ].map((tool) => (
            <div key={tool.en} className="bg-white rounded-2xl p-4 text-center ring-1 ring-slate-100 hover:ring-indigo-200 transition-all">
              <div className="text-3xl mb-2">{tool.emoji}</div>
              <div className="font-black text-slate-900 text-sm">{tool.en}</div>
              <div className="text-indigo-600 text-xs font-bold mt-1">{tool.hi}</div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <p className="text-slate-500 text-sm font-medium">
            Looking for tools near me, tools shop near me, tools store near me, tool repair shop near me, or tools wholesale market? 
            Use our tools directory to find what you need.
          </p>
        </div>
      </section>

      {/* ✅ NEW: SEO Keyword Section — Tools Categories & Keywords */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-black text-slate-900 tracking-tight mb-4">
            Everything You Need — One Tools Website
          </h2>
          <p className="text-slate-500 font-medium text-lg max-w-3xl mx-auto">
            Whether you're searching for tools drawing, tools images, tools logo, tools icon, tools diagram, 
            tools list name, tools in geometry box, tools in ms paint, tools in photoshop, 
            or tools in computer — Tooolify has it all.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: For Students & Teachers */}
          <div className="bg-white rounded-[32px] p-8 ring-1 ring-slate-100">
            <h3 className="text-xl font-black text-slate-900 mb-4">🎓 For Students &amp; Teachers</h3>
            <ul className="space-y-2 text-sm text-slate-600 font-medium">
              <li>✅ Tools name with picture</li>
              <li>✅ Tools drawing easy with names</li>
              <li>✅ Tools name in English and Hindi</li>
              <li>✅ Tools sentence for class 1</li>
              <li>✅ Tools in geometry box</li>
              <li>✅ Tools diagram</li>
              <li>✅ Tools synonyms &amp; definition</li>
              <li>✅ Tools quotes &amp; words</li>
            </ul>
          </div>

          {/* Column 2: For Developers & QA */}
          <div className="bg-white rounded-[32px] p-8 ring-1 ring-slate-100">
            <h3 className="text-xl font-black text-slate-900 mb-4">💻 For Developers &amp; QA</h3>
            <ul className="space-y-2 text-sm text-slate-600 font-medium">
              <li>✅ Tools QA &amp; Selenium</li>
              <li>✅ Tools QA TestNG</li>
              <li>✅ Tools QA demo site</li>
              <li>✅ Tools in computer</li>
              <li>✅ Tools name in computer</li>
              <li>✅ Tools in AI &amp; LangChain</li>
              <li>✅ Tools to learn for data analyst</li>
              <li>✅ Tools to learn for business analyst</li>
            </ul>
          </div>

          {/* Column 3: For Creators & Professionals */}
          <div className="bg-white rounded-[32px] p-8 ring-1 ring-slate-100">
            <h3 className="text-xl font-black text-slate-900 mb-4">🎨 For Creators &amp; Professionals</h3>
            <ul className="space-y-2 text-sm text-slate-600 font-medium">
              <li>✅ Tools in Photoshop &amp; MS Paint</li>
              <li>✅ Tools logo &amp; logo design</li>
              <li>✅ Tools icon &amp; vector</li>
              <li>✅ Tools to make PPT using AI</li>
              <li>✅ Tools to write a research paper</li>
              <li>✅ Tools to humanize AI content</li>
              <li>✅ Toolify AI image generator</li>
              <li>✅ Toolify AI Wan 2.2 animate</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ✅ NEW: Keyword-rich info strip */}
      <section className="bg-indigo-600 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'toolfly', 'toolify al', 'toolsvilla', 'tools ninja', 'tools india', 
              'tools world', 'tools town', 'tools qatar', 'tools warehouse',
              'tool room', 'tool rack', 'tool roll', 'tool rent', 'tool belt',
              'tools stand', 'tools trolley', 'tools tackles', 'tools lanyard',
              'tools wall mount', 'tools storage box', 'tools display board',
              'tool box talk', 'tools set box', 'tool bag heavy duty',
              'tool bag electrician', 'tools wholesale market', 'tools wholesaler near me'
            ].map((kw) => (
              <span key={kw} className="px-3 py-1.5 bg-white/10 text-white text-xs font-bold rounded-full border border-white/20">
                {kw}
              </span>
            ))}
          </div>
          <p className="text-center text-white/60 text-xs font-medium mt-6">
            Your one-stop tools website — from tools shop near me to toolify AI, we cover it all.
          </p>
        </div>
      </section>

      {/* NSFW AI - Premium Dark Mode */}
      <section className="px-4">
        <div className="max-w-7xl mx-auto bg-slate-950 px-8 py-24 md:py-32 rounded-[64px] relative overflow-hidden ring-1 ring-white/10">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-indigo-500/10 to-transparent -z-0 pointer-events-none" />
          <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-purple-500/20 blur-[140px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-20 gap-12">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 text-slate-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
                  <TrendingUp size={14} className="text-indigo-400" />
                  <span>Unfiltered Intelligence</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-display font-black text-white tracking-tight leading-[0.9]">
                  Premium <br />
                  <span className="text-gradient from-indigo-500 to-purple-400 italic">NSFW Directory.</span>
                </h2>
                <p className="text-slate-400 text-xl max-w-xl font-medium leading-relaxed">The global standard for adult AI tool discovery. Secure, verified, and strictly private.</p>
              </div>
              <Link to="/nsfw-ai-tools" className="inline-flex items-center gap-6 px-12 py-7 bg-white text-slate-950 rounded-[40px] font-black text-xl hover:bg-slate-100 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.1)] group">
                Enter Directory
                <ArrowRight size={28} className="group-hover:translate-x-3 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {trendingNsfw.map((tool) => (
                <NsfwCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ✅ NEW: FAQ Section for long-tail keywords */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-black text-slate-900 tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 font-medium">Everything about Tooolify, tools name, tools images, and more.</p>
        </div>
        <div className="space-y-4">
          {[
            {
              q: "What are common tools name in English with pictures?",
              a: "Common tools include: Hammer, Wrench, Screwdriver, Pliers, Drill Machine, Saw, Chisel, Tool Box, Tool Bag, Tool Belt, Tool Rack, Tool Roll, and more. Tooolify provides tools name with picture and tools drawing with name for all major hand tools and power tools."
            },
            {
              q: "What is the tools definition?",
              a: "A tool is any instrument, device, or implement used to carry out a particular function. Tools definition encompasses hand tools (hammer, wrench, pliers), power tools (drill machine), digital tools (software, apps), and AI tools. Tooolify offers both physical tools information and 100+ digital/AI tools."
            },
            {
              q: "What are tools in WhatsApp and tools in Photoshop?",
              a: "Tools in WhatsApp include features like voice typing, SMS bomber (third-party), and messaging utilities. Tools in Photoshop include the toolbar with selection tools, brush tools, crop tool, clone stamp, healing brush, text tool, and more. Tooolify's online toolkit replicates many of these functions for free."
            },
            {
              q: "What is Toolify AI (toolify.ai)?",
              a: "Toolify AI (http://toolify.ai) is an AI tool directory. Tooolify (tooolify.vercel.app) is a similar free tools website offering 100+ utilities including AI image generator, Toolify AI Wan 2.2 animate-style tools, and more — all completely free."
            },
            {
              q: "Where can I find tools shop near me or tools store near me?",
              a: "For physical tools shop near me or tools store near me, you can search Google Maps. For online tools, Tooolify is your best free tools website with 100+ digital and AI tools available instantly — no need to visit a tool repair shop near me."
            },
            {
              q: "What tools should a data analyst or business analyst learn?",
              a: "Tools to learn for data analyst: Python, SQL, Tableau, Power BI, Excel, R. Tools to learn for business analyst: JIRA, Confluence, MS Excel, Power BI, SQL, Visio. Tooolify also offers tools QA, tools QA Selenium, and tools QA TestNG resources."
            },
          ].map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 ring-1 ring-slate-100">
              <h3 className="font-black text-slate-900 mb-2">{faq.q}</h3>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-slate-50 border-y border-slate-100 py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-display font-black tracking-tight text-slate-950">Free Forever. For Everyone.</h2>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Tooolify is the ultimate free tools website — for tools name in Hindi, tools images, tools QA, AI utilities, and beyond. Always fast, always private, always free.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto px-12 py-6 bg-slate-950 text-white rounded-[32px] font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-slate-200">
              Start Building Now
            </button>
            <Link to="/about" className="w-full sm:w-auto px-12 py-6 bg-white border border-slate-200 text-slate-950 rounded-[32px] font-black text-lg hover:bg-slate-50 transition-all">
              Our Vision
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400 font-bold uppercase tracking-widest text-[10px] pt-8">
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-emerald-500" /> No Credit Card</span>
            <div className="w-1 h-1 bg-slate-200 rounded-full" />
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-emerald-500" /> Open Source Heart</span>
            <div className="w-1 h-1 bg-slate-200 rounded-full" />
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-emerald-500" /> Privacy First</span>
            <div className="w-1 h-1 bg-slate-200 rounded-full" />
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-emerald-500" /> 100+ Free Tools</span>
          </div>
        </div>
      </section>
    </div>
  );
};