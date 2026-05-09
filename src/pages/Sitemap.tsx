import React from 'react';
import { categories, tools, nsfwCategories } from '@/src/lib/tools';
import { blogPosts } from '@/src/lib/blog';
import { SEO } from '@/src/components/SEO';
import { Link } from 'react-router-dom';
import { ChevronRight, Globe, FileText, Search, ShieldAlert } from 'lucide-react';

export const Sitemap: React.FC = () => {
  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      <SEO 
        title="Sitemap - All Online Tools & Resources" 
        description="Explore the complete directory of Tooolify's free online tools, blog posts, and categories. Find exactly what you need with our comprehensive sitemap."
        keywords={['tooolify sitemap', 'all online tools', 'website directory', 'tool index']}
      />

      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Website Sitemap</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          A comprehensive list of all pages, tools, and resources available on Tooolify.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {/* Main Pages */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b pb-4">
            <Globe size={20} className="text-indigo-600" />
            Main Pages
          </h2>
          <ul className="space-y-3">
            <li><Link to="/" className="text-slate-600 hover:text-indigo-600 flex items-center gap-2"><ChevronRight size={14} /> Home</Link></li>
            <li><Link to="/about" className="text-slate-600 hover:text-indigo-600 flex items-center gap-2"><ChevronRight size={14} /> About Us</Link></li>
            <li><Link to="/contact" className="text-slate-600 hover:text-indigo-600 flex items-center gap-2"><ChevronRight size={14} /> Contact</Link></li>
            <li><Link to="/changelog" className="text-slate-600 hover:text-indigo-600 flex items-center gap-2"><ChevronRight size={14} /> Changelog</Link></li>
            <li><Link to="/faq" className="text-slate-600 hover:text-indigo-600 flex items-center gap-2"><ChevronRight size={14} /> FAQ</Link></li>
            <li><Link to="/pricing" className="text-slate-600 hover:text-indigo-600 flex items-center gap-2"><ChevronRight size={14} /> Pricing</Link></li>
            <li><Link to="/blog" className="text-slate-600 hover:text-indigo-600 flex items-center gap-2"><ChevronRight size={14} /> Blog</Link></li>
            <li><Link to="/privacy" className="text-slate-600 hover:text-indigo-600 flex items-center gap-2"><ChevronRight size={14} /> Privacy Policy</Link></li>
            <li><Link to="/terms" className="text-slate-600 hover:text-indigo-600 flex items-center gap-2"><ChevronRight size={14} /> Terms of Service</Link></li>
          </ul>
        </div>

        {/* Blog Posts */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b pb-4">
            <FileText size={20} className="text-emerald-600" />
            Blog Articles
          </h2>
          <ul className="space-y-3">
            {blogPosts.map(post => (
              <li key={post.id}>
                <Link to={`/blog/${post.id}`} className="text-slate-600 hover:text-indigo-600 flex items-center gap-2">
                  <ChevronRight size={14} className="shrink-0" />
                  <span className="truncate">{post.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* NSFW AI Directory */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b pb-4">
            <ShieldAlert size={20} className="text-rose-600" />
            NSFW AI Directory
          </h2>
          <ul className="space-y-3">
            <li><Link to="/nsfw-ai-tools" className="text-slate-600 hover:text-indigo-600 font-bold flex items-center gap-2"><ChevronRight size={14} /> All NSFW Tools</Link></li>
            {nsfwCategories.map(cat => (
              <li key={cat.id}>
                <Link to={cat.path} className="text-slate-600 hover:text-indigo-600 flex items-center gap-2">
                  <ChevronRight size={14} /> {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tools by Category */}
      <div className="space-y-8 pt-12 border-t">
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <Search size={24} className="text-indigo-600" />
          Tools by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map(cat => (
            <div key={cat.id} className="space-y-4">
              <Link to={`/category/${cat.id}`} className="font-bold text-slate-900 hover:text-indigo-600 flex items-center gap-2">
                <cat.icon size={18} />
                {cat.name}
              </Link>
              <ul className="space-y-2 pl-6 border-l-2 border-slate-100">
                {tools.filter(t => t.category === cat.id).map(tool => (
                  <li key={tool.id}>
                    <Link to={tool.path} className="text-xs text-slate-500 hover:text-indigo-600 truncate block">
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
