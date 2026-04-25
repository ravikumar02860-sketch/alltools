import React from 'react';
import { ToolPage } from '@/src/components/ToolPage';
import { Copy, Trash2, Check, Shield, Plus, X } from 'lucide-react';

export const RobotsTxtGenerator: React.FC = () => {
  const [sitemap, setSitemap] = React.useState('');
  const [rules, setRules] = React.useState([
    { userAgent: '*', type: 'allow', path: '/' }
  ]);
  const [copied, setCopied] = React.useState(false);

  const addRule = () => {
    setRules([...rules, { userAgent: '*', type: 'disallow', path: '' }]);
  };

  const removeRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const updateRule = (index: number, field: string, value: string) => {
    const newRules = [...rules];
    newRules[index] = { ...newRules[index], [field]: value };
    setRules(newRules);
  };

  const generateCode = () => {
    let code = '';
    
    // Group by user agent
    const grouped = rules.reduce((acc: any, rule) => {
      if (!acc[rule.userAgent]) acc[rule.userAgent] = [];
      acc[rule.userAgent].push(rule);
      return acc;
    }, {});

    Object.entries(grouped).forEach(([agent, agentRules]: [string, any]) => {
      code += `User-agent: ${agent}\n`;
      agentRules.forEach((rule: any) => {
        const directive = rule.type.charAt(0).toUpperCase() + rule.type.slice(1);
        code += `${directive}: ${rule.path || '/'}\n`;
      });
      code += '\n';
    });

    if (sitemap) {
      code += `Sitemap: ${sitemap}\n`;
    }

    return code.trim();
  };

  const code = generateCode();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPage
      toolId="robots-txt-generator"
      category="seo"
      title="Robots.txt Generator"
      description="Create a custom robots.txt file for your website to control how search engine crawlers access your content. Improve SEO by hiding private pages and highlighting your sitemap."
      keywords={['robots.txt generator', 'create robots.txt online', 'seo robots tool', 'crawler control', 'search engine optimization', 'free seo tools']}
      longDescription={`A robots.txt file tells search engine crawlers which pages or files the crawler can or can't request from your site. This is used mainly to avoid overloading your site with requests; it is not a mechanism for keeping a web page out of Google.

### Why Use a Robots.txt File?
- **Optimize Crawl Budget**: Prevent search engines from wasting time on low-value pages (like admin areas or search result pages).
- **Hide Private Sections**: Keep sensitive directories from appearing in search results.
- **Specify Sitemap Location**: Help crawlers find your sitemap quickly for faster indexing.
- **Prevent Duplicate Content**: Disallow crawlers from indexing duplicate versions of your pages.

### How to use:
1. **User-agent**: Use '*' for all crawlers, or specify one (e.g., 'Googlebot').
2. **Allow/Disallow**: Choose whether to permit or block access.
3. **Path**: Enter the directory or file path (e.g., '/admin/').
4. **Sitemap**: Enter the full URL to your XML sitemap.
5. **Copy & Upload**: Copy the generated code and save it as 'robots.txt' in your website's root directory.`}
      faqs={[
        { question: "Where should I put the robots.txt file?", answer: "It must be placed in the root directory of your website (e.g., https://example.com/robots.txt)." },
        { question: "Does robots.txt hide pages from the public?", answer: "No, it only gives instructions to search engine bots. Anyone can still access the pages if they have the URL." },
        { question: "What does 'User-agent: *' mean?", answer: "The asterisk is a wildcard that applies the following rules to all search engine crawlers (Google, Bing, DuckDuckGo, etc.)." }
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Shield size={18} className="text-indigo-600" />
                Crawler Rules
              </h3>
              <button 
                onClick={addRule}
                className="px-3 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-xl hover:bg-indigo-100 transition-all flex items-center gap-1"
              >
                <Plus size={14} />
                Add Rule
              </button>
            </div>

            <div className="space-y-3">
              {rules.map((rule, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-wrap gap-3 items-end">
                  <div className="flex-1 min-w-[120px]">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">User-agent</label>
                    <input 
                      type="text" 
                      value={rule.userAgent}
                      onChange={(e) => updateRule(idx, 'userAgent', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="w-24">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Action</label>
                    <select 
                      value={rule.type}
                      onChange={(e) => updateRule(idx, 'type', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none"
                    >
                      <option value="allow">Allow</option>
                      <option value="disallow">Disallow</option>
                    </select>
                  </div>
                  <div className="flex-[2] min-w-[150px]">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Path</label>
                    <input 
                      type="text" 
                      value={rule.path}
                      onChange={(e) => updateRule(idx, 'path', e.target.value)}
                      placeholder="/example-path/"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <button 
                    onClick={() => removeRule(idx)}
                    className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sitemap URL (Optional)</label>
            <input 
              type="url" 
              value={sitemap}
              onChange={(e) => setSitemap(e.target.value)}
              placeholder="https://example.com/sitemap.xml"
              className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">File Preview</h3>
            <button 
              onClick={handleCopy}
              className="px-6 py-3 bg-slate-900 text-white text-sm font-bold rounded-2xl hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg"
            >
              {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy robots.txt'}
            </button>
          </div>
          
          <div className="relative h-full min-h-[400px]">
            <pre className="absolute inset-0 p-8 bg-slate-900 text-indigo-300 font-mono text-sm rounded-[32px] overflow-auto leading-relaxed border-4 border-slate-800">
              {code}
            </pre>
          </div>
        </div>
      </div>
    </ToolPage>
  );
};
