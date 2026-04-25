import React from 'react';
import { ToolPage } from '@/src/components/ToolPage';
import { Search, BarChart3, Info, Trash2 } from 'lucide-react';

export const KeywordDensityChecker: React.FC = () => {
  const [text, setText] = React.useState('');
  
  const getKeywords = (inputText: string) => {
    if (!inputText.trim()) return [];
    
    // Clean text: remove punctuation, lowercase, split into words
    const words = inputText
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2); // Filter out short words
      
    const stopWords = new Set(['the', 'and', 'for', 'that', 'this', 'with', 'from', 'your', 'have', 'was', 'are', 'but', 'not', 'you', 'all', 'any', 'can', 'had', 'her', 'his', 'its', 'our', 'she', 'who', 'will', 'how', 'one', 'two', 'use', 'get']);
    
    const freqMap: Record<string, number> = {};
    words.forEach(word => {
      if (!stopWords.has(word)) {
        freqMap[word] = (freqMap[word] || 0) + 1;
      }
    });
    
    const totalWords = words.length;
    
    return Object.entries(freqMap)
      .map(([word, count]) => ({
        word,
        count,
        density: ((count / totalWords) * 100).toFixed(2)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);
  };

  const keywords = getKeywords(text);

  return (
    <ToolPage
      toolId="keyword-density-checker"
      category="seo"
      title="Keyword Density Checker"
      description="Analyze your content to find the most frequent keywords and their density. Optimize your text for search engines by avoiding keyword stuffing and ensuring relevance."
      keywords={['keyword density checker', 'seo keyword analyzer', 'text analysis tool', 'keyword frequency tool', 'seo content optimizer', 'free seo tools']}
      longDescription={`Keyword density is the percentage of times a keyword or phrase appears on a web page compared to the total number of words on the page. In the context of SEO, keyword density can be used to determine whether a web page is relevant to a specified keyword or keyword phrase.

### Why Check Keyword Density?
Search engines like Google use keyword frequency as one of many signals to understand the topic of a page. However, "keyword stuffing" (using a keyword too many times) can lead to penalties.

- **Avoid Over-Optimization**: Ensure your primary keywords don't exceed 2-3% density.
- **Identify Core Topics**: See which words are actually dominating your content.
- **Improve Relevance**: Make sure your intended keywords are appearing frequently enough to be noticed by crawlers.
- **Stop Word Filtering**: Our tool automatically filters out common "stop words" (like 'the', 'and', 'is') to give you a clear view of your meaningful content.

### How to use:
1. Paste your article, blog post, or web copy into the text area.
2. The tool will instantly analyze the text and display the top 15 keywords.
3. Review the "Count" and "Density %" to adjust your content accordingly.`}
      faqs={[
        { question: "What is the ideal keyword density for SEO?", answer: "There is no 'perfect' number, but most SEO experts recommend a primary keyword density of 1% to 2%. Anything over 3% might be seen as keyword stuffing by search engines." },
        { question: "Does this tool count common words like 'the' or 'a'?", answer: "No, our tool uses a 'Stop Word' filter to exclude common functional words, allowing you to focus on the actual keywords that matter for your topic." },
        { question: "Is this tool safe for my content?", answer: "Yes, all processing happens locally in your browser. Your text is never uploaded to our servers, keeping your drafts 100% private." }
      ]}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Area */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Paste Your Content</label>
              <button 
                onClick={() => setText('')}
                className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors"
              >
                <Trash2 size={14} />
                Clear
              </button>
            </div>
            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your blog post, article, or web content here for analysis..."
              className="w-full h-[400px] p-6 bg-slate-50 border border-slate-200 rounded-[32px] focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none text-slate-700 leading-relaxed"
            />
          </div>

          {/* Results Area */}
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-[32px] border border-slate-100 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
                <BarChart3 size={18} className="text-indigo-600" />
                Keyword Analysis
              </h3>
              
              {keywords.length > 0 ? (
                <div className="space-y-4">
                  {keywords.map((item, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-700">{item.word}</span>
                        <span className="text-slate-400">{item.count} times ({item.density}%)</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(parseFloat(item.density) * 10, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center space-y-3">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                    <Search size={24} />
                  </div>
                  <p className="text-xs text-slate-400">Enter text to see keyword density</p>
                </div>
              )}
            </div>

            <div className="p-6 bg-indigo-50 rounded-[32px] border border-indigo-100">
              <div className="flex items-center gap-2 text-indigo-600 mb-3">
                <Info size={18} />
                <h4 className="font-bold text-xs uppercase tracking-wider">SEO Tip</h4>
              </div>
              <p className="text-xs text-indigo-900/70 leading-relaxed">
                Aim for a primary keyword density of <strong>1-2%</strong>. If a word appears too often, try using synonyms (LSI keywords) to keep the content natural and avoid penalties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolPage>
  );
};
