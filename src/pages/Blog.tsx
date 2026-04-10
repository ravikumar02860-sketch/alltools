import React from 'react';
import { blogPosts } from '@/src/lib/blog';
import { SEO } from '@/src/components/SEO';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const Blog: React.FC = () => {
  return (
    <div className="space-y-12">
      <SEO 
        title="OmniTools Blog - Tutorials, Guides & Industry Insights" 
        description="Stay updated with the latest in web development, SEO, and digital productivity with the OmniTools blog."
      />

      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">OmniTools Blog</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Expert guides, tool tutorials, and industry insights to help you work smarter.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogPosts.map((post, idx) => (
          <motion.article 
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all"
          >
            <Link to={`/blog/${post.id}`}>
              <div className="aspect-video overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4 text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  <span>{post.category}</span>
                  <span className="text-slate-300">•</span>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Calendar size={14} />
                    {post.date}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-slate-600 line-clamp-2 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                      <User size={16} />
                    </div>
                    {post.author}
                  </div>
                  <span className="text-indigo-600 font-bold text-sm flex items-center gap-1">
                    Read More <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
};
