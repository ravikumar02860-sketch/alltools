import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '@/src/components/SEO';
import { nsfwCategories, nsfwTools } from '@/src/lib/tools';
import { NsfwCard } from '@/src/components/NsfwCard';
import { motion } from 'motion/react';
import { Search, Filter, ChevronLeft, Star, ExternalLink, ShieldCheck } from 'lucide-react';

interface NsfwCategoryPageProps {
  categoryId?: string;
}

export const NsfwCategoryPage: React.FC<NsfwCategoryPageProps> = ({ categoryId: propCategoryId }) => {
  const { categoryId: paramCategoryId } = useParams<{ categoryId: string }>();
  const categoryId = propCategoryId || paramCategoryId;
  const category = nsfwCategories.find(c => c.id === categoryId);
  const [searchQuery, setSearchQuery] = React.useState('');

  if (!category) {
    return (
      <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Category Not Found</h1>
          <Link to="/nsfw-ai-tools" className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center justify-center gap-2">
            <ChevronLeft size={20} />
            Back to Directory
          </Link>
        </div>
      </div>
    );
  }

  const filteredTools = nsfwTools
    .filter(tool => tool.category === categoryId)
    .filter(tool => 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-300">
      <SEO 
        title={`Best ${category.name} Tools (2026) - Tooolify`}
        description={`Explore the top rated ${category.name} tools. Compare features, ratings, and find the best adult AI generators for your needs.`}
        canonical={`/nsfw/${categoryId}`}
      />

      {/* Header Section */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-gradient-to-b from-indigo-600/10 via-purple-600/5 to-transparent blur-3xl -z-10" />
        
        <div className="max-w-7xl mx-auto px-6">
          <Link to="/nsfw-ai-tools" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-400 transition-colors mb-8">
            <ChevronLeft size={16} />
            NSFW Directory
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight"
          >
            {category.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 max-w-3xl leading-relaxed mb-12"
          >
            Discover and compare the best {category.name} available in 2026. 
            We've curated the top-performing AI tools in this category based on quality, 
            ease of use, and community ratings.
          </motion.p>

          {/* Search Bar */}
          <div className="max-w-2xl flex gap-4 p-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder={`Search ${category.name}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-transparent border-none focus:ring-0 text-white placeholder:text-slate-500 font-medium"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredTools.map((tool) => (
            <NsfwCard key={tool.id} tool={tool} />
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5">
            <Search size={48} className="text-slate-700 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-white mb-2">No tools found</h3>
            <p className="text-slate-500">Try adjusting your search query</p>
          </div>
        )}

        {/* Pagination Placeholder */}
        <div className="mt-16 flex justify-center gap-2">
          <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white font-bold hover:bg-indigo-600 transition-all">1</button>
          <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 font-bold hover:bg-white/10 transition-all">2</button>
          <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 font-bold hover:bg-white/10 transition-all">3</button>
        </div>
      </section>

      {/* Category FAQ Section */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="p-12 bg-white/5 border border-white/10 rounded-[40px] backdrop-blur-xl">
          <h2 className="text-3xl font-bold text-white mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">What is an {category.name}?</h3>
              <p className="text-slate-500 leading-relaxed">
                An {category.name} is a specialized artificial intelligence tool designed to generate or facilitate 
                adult-oriented content within this specific niche. These tools use advanced machine learning 
                to provide high-quality, customizable results.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">How do I choose the best tool?</h3>
              <p className="text-slate-500 leading-relaxed">
                Consider factors like output quality, generation speed, pricing model, and user reviews. 
                Our rating system (1-5 stars) is based on community feedback and technical testing 
                to help you make an informed decision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Disclaimer */}
      <section className="max-w-4xl mx-auto px-6 pb-32">
        <div className="p-8 bg-red-500/5 border border-red-500/10 rounded-3xl backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-4 text-red-400">
            <ShieldCheck size={24} />
            <h3 className="text-xl font-bold">Safety Disclaimer</h3>
          </div>
          <p className="text-slate-400 leading-relaxed text-sm">
            This category page lists third-party AI tools. Tooolify does not host adult content. 
            Please ensure you are of legal age in your jurisdiction before accessing these services. 
            Use AI tools ethically and respect the privacy of others.
          </p>
        </div>
      </section>
    </div>
  );
};
