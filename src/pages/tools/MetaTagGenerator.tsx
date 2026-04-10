import React from 'react';
import { ToolPage } from '@/src/components/ToolPage';
import { Copy, Trash2, Check, Globe, Code } from 'lucide-react';

export const MetaTagGenerator: React.FC = () => {
  const [tags, setTags] = React.useState({
    title: '',
    description: '',
    keywords: '',
    author: '',
    robots: 'index, follow',
    language: 'English',
    revisit: '7 days',
  });
  const [copied, setCopied] = React.useState(false);

  const generateCode = () => {
    const lines = [
      '<!-- Primary Meta Tags -->',
      `<title>${tags.title}</title>`,
      `<meta name="title" content="${tags.title}">`,
      `<meta name="description" content="${tags.description}">`,
      tags.keywords ? `<meta name="keywords" content="${tags.keywords}">` : null,
      tags.author ? `<meta name="author" content="${tags.author}">` : null,
      `<meta name="robots" content="${tags.robots}">`,
      `<meta http-equiv="Content-Type" content="text/html; charset=utf-8">`,
      `<meta name="language" content="${tags.language}">`,
      `<meta name="revisit-after" content="${tags.revisit}">`,
    ].filter(Boolean);

    return lines.join('\n');
  };

  const code = generateCode();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPage
      toolId="meta-tag-generator"
      category="seo"
      title="Meta Tag Generator"
      description="Create SEO-optimized HTML meta tags for your website. Improve your search engine rankings and social media appearance with proper headers."
      longDescription={`Meta tags are snippets of text that describe a page's content; the meta tags don't appear on the page itself, but only in the page's source code.

Proper meta tags are essential for SEO (Search Engine Optimization) as they tell search engines what your page is about.

Key Tags Generated:
- Title Tag: The most important SEO tag.
- Description: Used by search engines for the results snippet.
- Robots: Tells search engines whether to index the page or follow links.
- Keywords: Legacy tag, still used by some smaller search engines.

Simply fill out the form and copy the generated code into the <head> section of your HTML.`}
      faqs={[
        { question: "Where do I put meta tags?", answer: "Meta tags should be placed within the <head> section of your HTML document." },
        { question: "Are meta keywords still important?", answer: "Most major search engines (like Google) no longer use the keywords tag for ranking, but it doesn't hurt to include a few relevant ones." },
        { question: "How long should a meta description be?", answer: "Aim for 150-160 characters to ensure it doesn't get truncated in search results." }
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Globe size={16} className="text-indigo-600" />
            Page Information
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Site Title</label>
              <input 
                type="text" 
                value={tags.title}
                onChange={(e) => setTags({...tags, title: e.target.value})}
                placeholder="e.g. OmniTools - Free Online Utilities"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Site Description</label>
              <textarea 
                value={tags.description}
                onChange={(e) => setTags({...tags, description: e.target.value})}
                placeholder="A brief description of your website..."
                className="w-full h-24 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Keywords (comma separated)</label>
              <input 
                type="text" 
                value={tags.keywords}
                onChange={(e) => setTags({...tags, keywords: e.target.value})}
                placeholder="tools, seo, developer, utilities"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Robots</label>
                <select 
                  value={tags.robots}
                  onChange={(e) => setTags({...tags, robots: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option>index, follow</option>
                  <option>noindex, follow</option>
                  <option>index, nofollow</option>
                  <option>noindex, nofollow</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Author</label>
                <input 
                  type="text" 
                  value={tags.author}
                  onChange={(e) => setTags({...tags, author: e.target.value})}
                  placeholder="Your Name"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Code size={16} className="text-indigo-600" />
              Generated Code
            </h3>
            <div className="flex gap-2">
              <button 
                onClick={() => setTags({ title: '', description: '', keywords: '', author: '', robots: 'index, follow', language: 'English', revisit: '7 days' })}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                title="Reset"
              >
                <Trash2 size={18} />
              </button>
              <button 
                onClick={handleCopy}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
          </div>
          
          <div className="relative h-full min-h-[300px]">
            <pre className="absolute inset-0 p-6 bg-slate-900 text-indigo-300 font-mono text-xs rounded-2xl overflow-auto leading-relaxed">
              {code}
            </pre>
          </div>
        </div>
      </div>
    </ToolPage>
  );
};
