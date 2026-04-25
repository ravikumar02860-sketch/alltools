import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '@/src/components/SEO';
import { Search, Home, ArrowRight, Zap } from 'lucide-react';
import { tools } from '@/src/lib/tools';

export const NotFound: React.FC = () => {
  const suggestedTools = tools.slice(0, 6);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center space-y-8 px-4">
      <SEO 
        title="404 - Page Not Found" 
        description="Sorry, the page you are looking for does not exist. Explore our collection of 100+ free online tools instead."
      />

      <div className="space-y-4">
        <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 mx-auto animate-bounce">
          <Search size={40} />
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">404</h1>
        <h2 className="text-xl md:text-2xl font-bold text-slate-600">Oops! Page not found.</h2>
        <p className="text-slate-500 max-w-md mx-auto">
          We couldn't find the page you were looking for. It might have been moved or deleted.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link to="/" className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-200">
          <Home size={18} />
          Back to Home
        </Link>
        <Link to="/seo/sitemap" className="px-8 py-3 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all">
          View Sitemap
        </Link>
      </div>

      <div className="w-full max-w-4xl pt-12">
        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center justify-center gap-2">
          <Zap size={18} className="text-amber-500" />
          Try one of these popular tools instead
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {suggestedTools.map(tool => (
            <Link 
              key={tool.id} 
              to={tool.path}
              className="p-4 bg-white rounded-2xl border border-slate-100 hover:border-indigo-100 hover:shadow-md transition-all text-left flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                <tool.icon size={16} />
              </div>
              <span className="text-sm font-bold text-slate-900 truncate">{tool.name}</span>
              <ArrowRight size={14} className="ml-auto text-slate-300" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
