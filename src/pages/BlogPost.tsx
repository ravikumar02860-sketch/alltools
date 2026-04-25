import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogPosts } from '@/src/lib/blog';
import { SEO } from '@/src/components/SEO';
import { ArrowLeft, Calendar, User, Clock, Share2, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';

export const BlogPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.id === postId);

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Post Not Found</h2>
        <Link to="/blog" className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold">Back to Blog</Link>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <SEO 
        title={post.title} 
        description={post.excerpt}
        ogType="article"
        ogImage={post.image}
        schema={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "image": [post.image],
          "datePublished": post.date,
          "author": [{
            "@type": "Person",
            "name": post.author,
            "url": "https://tooolify.vercel.app/about"
          }],
          "publisher": {
            "@type": "Organization",
            "name": "Tooolify",
            "logo": {
              "@type": "ImageObject",
              "url": "https://tooolify.vercel.app/logo.png"
            }
          },
          "description": post.excerpt
        }}
      />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-medium text-slate-400">
        <Link to="/" className="hover:text-indigo-600">Home</Link>
        <ChevronRight size={12} />
        <Link to="/blog" className="hover:text-indigo-600">Blog</Link>
        <ChevronRight size={12} />
        <span className="text-slate-600 truncate max-w-[200px]">{post.title}</span>
      </nav>

      <div className="space-y-6">
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        <div className="space-y-4">
          <div className="flex items-center gap-4 text-xs font-bold text-indigo-600 uppercase tracking-wider">
            <span className="px-2 py-1 bg-indigo-50 rounded-md">{post.category}</span>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1 text-slate-400">
              <Calendar size={14} />
              {post.date}
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1 text-slate-400">
              <Clock size={14} />
              5 min read
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between py-6 border-y border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <User size={20} />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">{post.author}</div>
                <div className="text-xs text-slate-500">Content Strategist</div>
              </div>
            </div>
            <button 
              onClick={handleShare}
              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="aspect-video rounded-[40px] overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200/50">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <article className="prose prose-slate prose-indigo max-w-none py-8">
        <div className="markdown-body">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>

      {/* Related Posts Placeholder */}
      <div className="pt-12 border-t border-slate-100">
        <h3 className="text-xl font-bold text-slate-900 mb-6">You might also like</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.filter(p => p.id !== post.id).slice(0, 2).map(p => (
            <Link 
              key={p.id} 
              to={`/blog/${p.id}`}
              className="group p-4 bg-slate-50 rounded-3xl border border-transparent hover:border-indigo-100 hover:bg-white transition-all"
            >
              <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">{p.title}</h4>
              <p className="text-xs text-slate-500 line-clamp-2">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
