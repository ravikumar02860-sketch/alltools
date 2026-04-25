import React from 'react';
import { ToolPage } from '@/src/components/ToolPage';
import { Copy, Trash2, Check, Globe, Code, Facebook, Twitter, Search, Layout } from 'lucide-react';

export const MetaTagGenerator: React.FC = () => {
  const [tags, setTags] = React.useState({
    title: '',
    description: '',
    keywords: '',
    author: '',
    robots: 'index, follow',
    language: 'English',
    revisit: '7 days',
    ogType: 'website',
    ogUrl: '',
    ogImage: '',
    twitterCard: 'summary_large_image',
  });
  const [copied, setCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'standard' | 'og' | 'twitter' | 'schema'>('standard');

  const generateCode = () => {
    const standard = [
      '<!-- Primary Meta Tags -->',
      `<title>${tags.title || 'Page Title'}</title>`,
      `<meta name="title" content="${tags.title || 'Page Title'}">`,
      `<meta name="description" content="${tags.description || 'Page description goes here...'}">`,
      tags.keywords ? `<meta name="keywords" content="${tags.keywords}">` : null,
      tags.author ? `<meta name="author" content="${tags.author}">` : null,
      `<meta name="robots" content="${tags.robots}">`,
      `<meta http-equiv="Content-Type" content="text/html; charset=utf-8">`,
      `<meta name="language" content="${tags.language}">`,
      `<meta name="revisit-after" content="${tags.revisit}">`,
    ].filter(Boolean);

    const og = [
      '',
      '<!-- Open Graph / Facebook -->',
      `<meta property="og:type" content="${tags.ogType}">`,
      `<meta property="og:url" content="${tags.ogUrl || 'https://example.com/'}">`,
      `<meta property="og:title" content="${tags.title || 'Page Title'}">`,
      `<meta property="og:description" content="${tags.description || 'Page description goes here...'}">`,
      `<meta property="og:image" content="${tags.ogImage || 'https://example.com/image.jpg'}">`,
    ];

    const twitter = [
      '',
      '<!-- Twitter -->',
      `<meta property="twitter:card" content="${tags.twitterCard}">`,
      `<meta property="twitter:url" content="${tags.ogUrl || 'https://example.com/'}">`,
      `<meta property="twitter:title" content="${tags.title || 'Page Title'}">`,
      `<meta property="twitter:description" content="${tags.description || 'Page description goes here...'}">`,
      `<meta property="twitter:image" content="${tags.ogImage || 'https://example.com/image.jpg'}">`,
    ];

    const schema = [
      '',
      '<!-- JSON-LD Schema -->',
      '<script type="application/ld+json">',
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": tags.title || "Page Title",
        "description": tags.description || "Page description",
        "url": tags.ogUrl || "https://example.com/"
      }, null, 2),
      '</script>'
    ];

    return [...standard, ...og, ...twitter, ...schema].join('\n');
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
      title="Advanced Meta Tag & Schema Generator"
      description="Create fully SEO-optimized HTML meta tags, Open Graph tags, Twitter Cards, and JSON-LD Schema for your website. Boost your search engine rankings and social media visibility instantly."
      keywords={['meta tag generator', 'seo tags creator', 'open graph generator', 'twitter card maker', 'json-ld schema generator', 'seo optimization tool', 'website meta tags']}
      longDescription={`Meta tags are the foundation of on-page SEO. They provide search engines and social media platforms with essential information about your content. 

Our Advanced Meta Tag Generator goes beyond basic tags to provide a complete SEO header suite:

### 1. Standard Meta Tags
Essential for Google, Bing, and other search engines to index and rank your page correctly. Includes Title, Description, Robots, and Language tags.

### 2. Open Graph (OG) Tags
Optimizes how your content appears when shared on Facebook, LinkedIn, and other social platforms. Control the preview image, title, and description that users see.

### 3. Twitter Cards
Specifically designed for X (formerly Twitter) to ensure your links stand out with large, engaging preview images and summaries.

### 4. JSON-LD Structured Data
Generates the modern schema format recommended by Google. This helps your site qualify for "Rich Results" like star ratings, search boxes, and enhanced snippets.

### How to use:
1. Fill out the **Standard Info** (Title and Description are most important).
2. Switch to **Social & Schema** tabs to add images and URLs for social sharing.
3. Use the **Live Preview** to see how your site will look on Google and Social Media.
4. Copy the generated code and paste it into the \`<head>\` section of your HTML.`}
      faqs={[
        { question: "Where do I put these meta tags?", answer: "All generated tags and the script block should be placed within the <head> section of your HTML document, before the closing </head> tag." },
        { question: "Why is the Meta Description important?", answer: "While not a direct ranking factor, the description is what users see in search results. A compelling description increases Click-Through Rate (CTR), which is a positive signal to search engines." },
        { question: "What is the recommended image size for OG tags?", answer: "For the best appearance across all platforms, use an image that is 1200 x 630 pixels." },
        { question: "Does this tool generate Schema for Rich Results?", answer: "Yes, it automatically generates a WebPage JSON-LD schema based on your input, which helps search engines understand your site's structure." }
      ]}
    >
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Left Column: Inputs */}
        <div className="space-y-6">
          <div className="flex p-1 bg-slate-100 rounded-2xl">
            {(['standard', 'og', 'twitter', 'schema'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all capitalize ${
                  activeTab === tab 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab === 'og' ? 'Open Graph' : tab}
              </button>
            ))}
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            {activeTab === 'standard' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Globe size={16} className="text-indigo-600" />
                  Standard SEO Tags
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Site Title (Max 60 chars)</label>
                    <input 
                      type="text" 
                      value={tags.title}
                      onChange={(e) => setTags({...tags, title: e.target.value})}
                      placeholder="e.g. Tooolify - Free Online Utilities"
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                    <div className={`text-[10px] mt-1 text-right ${tags.title.length > 60 ? 'text-red-500' : 'text-slate-400'}`}>
                      {tags.title.length}/60
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Site Description (Max 160 chars)</label>
                    <textarea 
                      value={tags.description}
                      onChange={(e) => setTags({...tags, description: e.target.value})}
                      placeholder="A brief description of your website..."
                      className="w-full h-24 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                    />
                    <div className={`text-[10px] mt-1 text-right ${tags.description.length > 160 ? 'text-red-500' : 'text-slate-400'}`}>
                      {tags.description.length}/160
                    </div>
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
            )}

            {(activeTab === 'og' || activeTab === 'twitter') && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  {activeTab === 'og' ? <Facebook size={16} className="text-blue-600" /> : <Twitter size={16} className="text-sky-500" />}
                  Social Media Optimization
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Canonical URL</label>
                    <input 
                      type="url" 
                      value={tags.ogUrl}
                      onChange={(e) => setTags({...tags, ogUrl: e.target.value})}
                      placeholder="https://example.com/page"
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Preview Image URL (1200x630)</label>
                    <input 
                      type="url" 
                      value={tags.ogImage}
                      onChange={(e) => setTags({...tags, ogImage: e.target.value})}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                  {activeTab === 'og' ? (
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">OG Type</label>
                      <select 
                        value={tags.ogType}
                        onChange={(e) => setTags({...tags, ogType: e.target.value})}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                      >
                        <option value="website">Website</option>
                        <option value="article">Article</option>
                        <option value="profile">Profile</option>
                        <option value="book">Book</option>
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Twitter Card Type</label>
                      <select 
                        value={tags.twitterCard}
                        onChange={(e) => setTags({...tags, twitterCard: e.target.value})}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                      >
                        <option value="summary">Summary</option>
                        <option value="summary_large_image">Summary Large Image</option>
                        <option value="app">App</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'schema' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Search size={16} className="text-emerald-600" />
                  JSON-LD WebPage Schema
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  This schema is automatically generated based on the information you provided in the Standard and Social tabs. It helps Google understand your site's identity.
                </p>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 font-mono text-[10px] text-slate-600 overflow-auto">
                  <pre>{JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    "name": tags.title || "Page Title",
                    "description": tags.description || "Page description",
                    "url": tags.ogUrl || "https://example.com/"
                  }, null, 2)}</pre>
                </div>
              </div>
            )}
          </div>

          {/* Preview Section */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layout size={16} className="text-indigo-600" />
              Live Previews
            </h3>
            
            <div className="space-y-6">
              {/* Google Preview */}
              <div className="space-y-2">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Google Search Result</div>
                <div className="p-4 border border-slate-100 rounded-2xl bg-white shadow-sm max-w-[600px]">
                  <div className="text-[12px] text-slate-500 mb-1 truncate">
                    {tags.ogUrl || 'https://www.example.com'}
                  </div>
                  <div className="text-[18px] text-[#1a0dab] hover:underline cursor-pointer mb-1 truncate">
                    {tags.title || 'Your Page Title Will Appear Here'}
                  </div>
                  <div className="text-[14px] text-[#4d5156] line-clamp-2 leading-relaxed">
                    {tags.description || 'This is how your description will look in Google search results. Make sure it is compelling to attract clicks!'}
                  </div>
                </div>
              </div>

              {/* Social Preview */}
              <div className="space-y-2">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Social Media Share Card</div>
                <div className="border border-slate-100 rounded-2xl bg-white shadow-sm overflow-hidden max-w-[500px]">
                  <div className="aspect-[1200/630] bg-slate-100 relative overflow-hidden">
                    {tags.ogImage ? (
                      <img src={tags.ogImage} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                        <Globe size={48} />
                      </div>
                    )}
                  </div>
                  <div className="p-4 space-y-1 bg-slate-50">
                    <div className="text-[10px] text-slate-400 uppercase font-bold truncate">
                      {new URL(tags.ogUrl || 'https://example.com').hostname}
                    </div>
                    <div className="text-sm font-bold text-slate-900 truncate">
                      {tags.title || 'Page Title'}
                    </div>
                    <div className="text-xs text-slate-500 line-clamp-1">
                      {tags.description || 'Page description goes here...'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Code Output */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Code size={16} className="text-indigo-600" />
              Generated SEO Code
            </h3>
            <div className="flex gap-2">
              <button 
                onClick={() => setTags({ 
                  title: '', description: '', keywords: '', author: '', 
                  robots: 'index, follow', language: 'English', revisit: '7 days',
                  ogType: 'website', ogUrl: '', ogImage: '', twitterCard: 'summary_large_image'
                })}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                title="Reset All"
              >
                <Trash2 size={18} />
              </button>
              <button 
                onClick={handleCopy}
                className="px-6 py-3 bg-slate-900 text-white text-sm font-bold rounded-2xl hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-200"
              >
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy All Tags'}
              </button>
            </div>
          </div>
          
          <div className="relative h-full min-h-[600px] xl:min-h-0 xl:flex-1">
            <pre className="absolute inset-0 p-8 bg-slate-900 text-indigo-300 font-mono text-xs rounded-[32px] overflow-auto leading-relaxed border-4 border-slate-800 shadow-2xl">
              {code}
            </pre>
          </div>
        </div>
      </div>
    </ToolPage>
  );
};
