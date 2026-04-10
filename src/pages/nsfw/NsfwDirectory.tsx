import React from 'react';
import { SEO } from '@/src/components/SEO';
import { nsfwCategories, nsfwTools } from '@/src/lib/tools';
import { NsfwCard } from '@/src/components/NsfwCard';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Zap, ShieldCheck, Search, Filter, ChevronRight } from 'lucide-react';

export const NsfwDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('all');
  const [filterType, setFilterType] = React.useState<'all' | 'free' | 'premium'>('all');

  const filteredTools = nsfwTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    const matchesType = filterType === 'all' || (filterType === 'free' ? tool.isFree : !tool.isFree);
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-300 selection:bg-indigo-500 selection:text-white">
      <SEO 
        title="Best NSFW AI Tools (2026) - OmniTools"
        description="Discover the best NSFW AI tools including AI image generators, AI girlfriend chatbots, face swap AI tools, and more. Explore top adult AI tools available online."
        canonical="/nsfw-ai-tools"
      />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-indigo-600/20 via-purple-600/10 to-transparent blur-3xl -z-10" />
        <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-md"
          >
            <Zap size={16} className="text-indigo-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">The Ultimate Directory</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight"
          >
            Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">NSFW AI Tools</span> (2026)
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Explore the most advanced adult AI generators, virtual companions, and deepfake tools. 
            A curated list of high-quality NSFW AI services for every need.
          </motion.p>

          {/* Search & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 p-4 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl shadow-2xl"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input 
                type="text" 
                placeholder="Search tools, categories, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-transparent border-none focus:ring-0 text-white placeholder:text-slate-500 font-medium"
              />
            </div>
            <div className="flex gap-2">
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-slate-300 font-bold text-sm focus:ring-indigo-500 focus:border-indigo-500 outline-none cursor-pointer hover:bg-white/10 transition-all"
              >
                <option value="all" className="bg-slate-900">All Types</option>
                <option value="free" className="bg-slate-900">Free Only</option>
                <option value="premium" className="bg-slate-900">Premium</option>
              </select>
              <button className="px-6 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-indigo-900/40 flex items-center gap-2">
                <Filter size={18} />
                Filter
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-white">Browse by Category</h2>
          <div className="h-px flex-1 bg-white/5 mx-8" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {nsfwCategories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link 
                to={`/nsfw/${cat.id}`}
                className="group block p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 hover:border-indigo-500/50 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight size={20} className="text-indigo-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{cat.name}</h3>
                <p className="text-sm text-slate-500">Explore top {cat.name} tools</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-white">Trending NSFW AI Tools</h2>
          <div className="h-px flex-1 bg-white/5 mx-8" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredTools.map((tool) => (
            <NsfwCard key={tool.id} tool={tool} />
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-slate-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No tools found</h3>
            <p className="text-slate-500">Try adjusting your search or filters</p>
          </div>
        )}
      </section>

      {/* Safety Disclaimer */}
      <section className="max-w-4xl mx-auto px-6 pb-32">
        <div className="p-8 bg-red-500/5 border border-red-500/10 rounded-3xl backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-4 text-red-400">
            <ShieldCheck size={24} />
            <h3 className="text-xl font-bold">Safety & Content Disclaimer</h3>
          </div>
          <p className="text-slate-400 leading-relaxed">
            OmniTools is an AI tools directory. We list and review third-party AI services for informational purposes. 
            <strong> This website does not host, store, or distribute adult content directly.</strong> 
            Users are responsible for following the terms of service and legal requirements of the individual tools listed. 
            Please use these tools responsibly and ethically.
          </p>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="prose prose-invert max-w-none">
          <h2 className="text-3xl font-bold text-white mb-8">What are NSFW AI Generators?</h2>
          <p className="text-slate-400 text-lg mb-8">
            NSFW AI generators are advanced artificial intelligence models trained to create adult-oriented content, 
            including images, text, and interactive chat experiences. These tools use deep learning techniques 
            to understand complex prompts and generate realistic or stylized NSFW content.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">How do AI image generators work?</h3>
              <p className="text-slate-500 leading-relaxed">
                Most NSFW AI image generators are based on Diffusion models. They start with a field of random noise 
                and gradually refine it into a clear image based on the text prompt provided by the user. 
                Specialized models (Checkpoints) and LoRAs are often used to achieve specific styles like anime or photorealism.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Are AI adult tools free?</h3>
              <p className="text-slate-500 leading-relaxed">
                Many tools offer a "freemium" model where you get a limited number of daily credits for free. 
                However, high-quality, unrestricted generation often requires a premium subscription to cover 
                the significant GPU computing costs involved in running these AI models.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
