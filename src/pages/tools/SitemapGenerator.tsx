import React from 'react';
import { ToolPage } from '@/src/components/ToolPage';
import { Copy, Trash2, Check, FileCode, Plus, X, Globe } from 'lucide-react';

export const SitemapGenerator: React.FC = () => {
  const [urls, setUrls] = React.useState([
    { loc: 'https://example.com/', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: '1.0' }
  ]);
  const [copied, setCopied] = React.useState(false);

  const addUrl = () => {
    setUrls([...urls, { loc: '', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: '0.8' }]);
  };

  const removeUrl = (index: number) => {
    setUrls(urls.filter((_, i) => i !== index));
  };

  const updateUrl = (index: number, field: string, value: string) => {
    const newUrls = [...urls];
    newUrls[index] = { ...newUrls[index], [field]: value };
    setUrls(newUrls);
  };

  const generateCode = () => {
    let code = '<?xml version="1.0" encoding="UTF-8"?>\n';
    code += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    urls.forEach(url => {
      if (url.loc) {
        code += '  <url>\n';
        code += `    <loc>${url.loc}</loc>\n`;
        code += `    <lastmod>${url.lastmod}</lastmod>\n`;
        code += `    <changefreq>${url.changefreq}</changefreq>\n`;
        code += `    <priority>${url.priority}</priority>\n`;
        code += '  </url>\n';
      }
    });

    code += '</urlset>';
    return code;
  };

  const code = generateCode();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPage
      toolId="sitemap-generator"
      category="seo"
      title="XML Sitemap Generator"
      description="Create a professional XML sitemap for your website. Help search engines like Google and Bing index your pages faster and more efficiently."
      keywords={['xml sitemap generator', 'create sitemap online', 'seo sitemap tool', 'website indexing', 'google sitemap creator', 'free seo tools']}
      longDescription={`An XML sitemap is a file that lists a website's essential pages, making sure Google and other search engines can find and crawl them all. It also helps search engines understand your website structure.

### Why Do You Need an XML Sitemap?
- **Faster Indexing**: New pages are discovered much faster by search engine bots.
- **Better Crawling**: Ensures that deep pages (those with few internal links) are still found.
- **Priority Signaling**: Tell search engines which pages are most important on your site.
- **Update Frequency**: Inform crawlers how often your content changes (daily, weekly, etc.).

### How to use:
1. **URL Location**: Enter the full URL of your page (including https://).
2. **Last Modified**: The date the page was last updated.
3. **Change Frequency**: How often the page is likely to change.
4. **Priority**: The relative importance of the page compared to others (0.0 to 1.0).
5. **Download**: Copy the generated XML and save it as 'sitemap.xml' in your root directory.`}
      faqs={[
        { question: "How many URLs should be in a sitemap?", answer: "A single sitemap file can contain up to 50,000 URLs and must not exceed 50MB in size. For larger sites, you can use multiple sitemaps and a sitemap index file." },
        { question: "What is the 'Priority' tag used for?", answer: "It tells search engines which pages you consider most important. However, most modern search engines (like Google) largely ignore this tag now, focusing more on the content itself." },
        { question: "Where do I submit my sitemap?", answer: "Once uploaded to your site, you should submit the URL (e.g., example.com/sitemap.xml) to Google Search Console and Bing Webmaster Tools." }
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Globe size={18} className="text-indigo-600" />
                Page URLs
              </h3>
              <button 
                onClick={addUrl}
                className="px-3 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-xl hover:bg-indigo-100 transition-all flex items-center gap-1"
              >
                <Plus size={14} />
                Add URL
              </button>
            </div>

            <div className="space-y-4">
              {urls.map((url, idx) => (
                <div key={idx} className="p-5 bg-slate-50 border border-slate-100 rounded-[24px] space-y-4 relative group">
                  <button 
                    onClick={() => removeUrl(idx)}
                    className="absolute top-4 right-4 p-1.5 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <X size={16} />
                  </button>
                  
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase">Page URL</label>
                    <input 
                      type="url" 
                      value={url.loc}
                      onChange={(e) => updateUrl(idx, 'loc', e.target.value)}
                      placeholder="https://example.com/page"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Frequency</label>
                      <select 
                        value={url.changefreq}
                        onChange={(e) => updateUrl(idx, 'changefreq', e.target.value)}
                        className="w-full px-2 py-2 bg-white border border-slate-200 rounded-lg text-[10px] outline-none"
                      >
                        <option>always</option>
                        <option>hourly</option>
                        <option>daily</option>
                        <option>weekly</option>
                        <option>monthly</option>
                        <option>yearly</option>
                        <option>never</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Priority</label>
                      <select 
                        value={url.priority}
                        onChange={(e) => updateUrl(idx, 'priority', e.target.value)}
                        className="w-full px-2 py-2 bg-white border border-slate-200 rounded-lg text-[10px] outline-none"
                      >
                        <option>1.0</option>
                        <option>0.9</option>
                        <option>0.8</option>
                        <option>0.7</option>
                        <option>0.6</option>
                        <option>0.5</option>
                        <option>0.4</option>
                        <option>0.3</option>
                        <option>0.2</option>
                        <option>0.1</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Last Mod</label>
                      <input 
                        type="date" 
                        value={url.lastmod}
                        onChange={(e) => updateUrl(idx, 'lastmod', e.target.value)}
                        className="w-full px-2 py-2 bg-white border border-slate-200 rounded-lg text-[10px] outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <FileCode size={18} className="text-indigo-600" />
              XML Output
            </h3>
            <button 
              onClick={handleCopy}
              className="px-6 py-3 bg-slate-900 text-white text-sm font-bold rounded-2xl hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg"
            >
              {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy Sitemap'}
            </button>
          </div>
          
          <div className="relative h-full min-h-[500px]">
            <pre className="absolute inset-0 p-8 bg-slate-900 text-indigo-300 font-mono text-xs rounded-[32px] overflow-auto leading-relaxed border-4 border-slate-800">
              {code}
            </pre>
          </div>
        </div>
      </div>
    </ToolPage>
  );
};
