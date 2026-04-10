import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { categories, tools } from '@/src/lib/tools';
import { SEO } from '@/src/components/SEO';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { motion } from 'motion/react';

export const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categories.find(c => c.id === categoryId);
  const categoryTools = tools.filter(t => t.category === categoryId);

  if (!category) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Category Not Found</h2>
        <Link to="/" className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <SEO 
        title={`${category.name} - Free Online Utilities`} 
        description={category.description}
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": category.name,
          "description": category.description,
          "url": window.location.href
        }}
      />

      <div className="space-y-4">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
            <category.icon size={32} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              {category.name}
            </h1>
            <p className="text-slate-600 max-w-2xl mt-1">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryTools.map((tool, idx) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Link 
              to={tool.path}
              className="group flex flex-col p-6 bg-white rounded-3xl border border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all h-full"
            >
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-600 group-hover:bg-indigo-600 group-hover:text-white transition-all mb-4">
                <tool.icon size={24} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{tool.name}</h3>
              <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-4">{tool.description}</p>
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider group-hover:gap-3 transition-all">
                Open Tool <ArrowRight size={14} />
              </div>
            </Link>
          </motion.div>
        ))}
        
        {/* Placeholder for future tools */}
        <div className="flex flex-col p-6 bg-slate-50 rounded-3xl border border-dashed border-slate-200 items-center justify-center text-center">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-300 mb-4">
            <Star size={24} />
          </div>
          <h3 className="font-bold text-slate-400 mb-2">More Tools Coming Soon</h3>
          <p className="text-xs text-slate-400">We're adding new utilities every week.</p>
        </div>
      </div>

      {/* Category SEO Content */}
      <section className="prose prose-slate max-w-none bg-white p-8 md:p-12 rounded-3xl border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">About our {category.name}</h2>
        <p className="text-slate-600 leading-relaxed">
          Our collection of {category.name.toLowerCase()} is designed to simplify your daily digital tasks. 
          Whether you're a professional developer, a creative designer, or just someone looking to get things done faster, 
          these utilities provide instant results directly in your browser.
        </p>
        <p className="text-slate-600 leading-relaxed mt-4">
          All tools in this category are privacy-focused, meaning your data is processed locally whenever possible. 
          We don't store your inputs, and we don't require any signup to access the full functionality of our tools.
        </p>
      </section>
    </div>
  );
};
