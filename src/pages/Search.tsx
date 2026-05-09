import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { tools, categories } from '@/src/lib/tools';
import { SEO } from '@/src/components/SEO';
import { motion } from 'motion/react';
import { Search as SearchIcon, ArrowRight, Zap, Filter } from 'lucide-react';

export const Search: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const q = queryParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = React.useState(q);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const filteredTools = tools.filter(tool => {
    const matchesQuery = 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.keywords.some(kw => kw.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory ? tool.category === selectedCategory : true;
    
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="pb-32">
      <SEO 
        title={searchQuery ? `Search results for "${searchQuery}" | Tooolify` : "Search Tools | Tooolify"}
        description={`Find the best free online tools on Tooolify. Search from over 100+ utilities for designers, developers, and creators.`}
      />

      <div className="max-w-6xl mx-auto px-6 pt-12 space-y-12">
        {/* Search Header */}
        <div className="space-y-6">
          <div className="relative max-w-2xl">
            <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 100+ tools..." 
              className="w-full h-16 pl-16 pr-6 bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-200/50 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-lg font-medium"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${!selectedCategory ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-white border border-slate-100 text-slate-500 hover:bg-slate-50'}`}
            >
              All Tools
            </button>
            {categories.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${selectedCategory === cat.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-white border border-slate-100 text-slate-500 hover:bg-slate-50'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-6">
          <div className="text-slate-500 font-medium">
            Showing <span className="text-slate-900 font-black">{filteredTools.length}</span> tools
            {searchQuery && <span> for "<span className="text-indigo-600">{searchQuery}</span>"</span>}
          </div>
          <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
            <Filter size={14} />
            Filter active
          </div>
        </div>

        {/* Results Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool, idx) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link 
                  to={tool.path}
                  className="group block p-8 bg-white border border-slate-100 rounded-[32px] hover:shadow-2xl hover:shadow-indigo-500/10 transition-all hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      <tool.icon size={28} />
                    </div>
                    <div className="px-3 py-1 bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-full group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      {tool.category}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-indigo-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium line-clamp-2 mb-6">
                    {tool.description}
                  </p>
                  <div className="flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                    Open Tool <ArrowRight size={14} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-6">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
              <SearchIcon size={40} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900">No tools found</h3>
              <p className="text-slate-500 font-medium">Try different keywords or browse our categories.</p>
            </div>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}
              className="px-8 py-3 bg-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-indigo-600/30"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Feature Suggestion */}
        <div className="pt-20">
          <div className="p-12 bg-slate-900 rounded-[48px] text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl -mr-32 -mt-32" />
            <h2 className="text-3xl font-black text-white font-display">Can't find what you need?</h2>
            <p className="text-slate-400 font-medium max-w-sm mx-auto">
              Suggest a tool and we'll build it for you. We add new utilities every week.
            </p>
            <Link 
              to="/contact"
              className="inline-flex h-16 items-center px-10 bg-white text-slate-900 font-black rounded-2xl hover:bg-indigo-50 transition-all shadow-xl"
            >
              Request a Tool
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
