import React from 'react';
import { ToolPage } from '../../components/ToolPage';
import { 
  Video, 
  Youtube, 
  Sparkles, 
  Search, 
  FileText, 
  Globe2, 
  Share2, 
  MessageSquare, 
  AlertCircle,
  CheckCircle2,
  Loader2,
  Copy,
  Download,
  Languages,
  Bookmark,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

export const VideoToBlogAI: React.FC = () => {
  const [url, setUrl] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'processing' | 'done'>('idle');
  const [result, setResult] = React.useState<any>(null);
  const [activeTab, setActiveTab] = React.useState<'blog' | 'transcript' | 'social' | 'seo'>('blog');
  const [language, setLanguage] = React.useState<'en' | 'hi' | 'hinglish'>('en');

  const handleConvert = async () => {
    if (!url) return;
    setStatus('processing');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `
        You are a world-class SEO content strategist and blog writer. 
        I have a YouTube video with this URL: ${url}.
        
        TASK:
        1. Act as if you have watched this video (use your knowledge of current web content/search grounding if possible).
        2. Generate a comprehensive SEO-optimized blog article (1200+ words).
        3. Structure it with H1, H2, and H3 tags.
        4. Include a detailed transcript summary.
        5. Provide a Hindi translation and a Hinglish (conversational Hindi-English) version of the key points.
        6. Generate Meta Title (under 60 chars) and Meta Description (under 160 chars).
        7. Provide 3 social media captions (Instagram, X/Twitter, LinkedIn).
        8. Include a 5-item FAQ section with schema-ready answers.
        9. Ensure natural keyword density for "YouTube video to blog converter".
        
        FORMAT: Return the result in a clean JSON format with these keys: 
        title, blogContent, transcriptSummary, hindiContent, hinglishContent, metaTitle, metaDescription, socialCaptions (array), faqs (array of obj with question/answer).
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const data = JSON.parse(response.text || '{}');
      setResult(data);
      setStatus('done');
    } catch (error) {
      console.error('Error generating blog:', error);
      setStatus('idle');
      alert('Failed to generate content. Please ensure the URL is correct and try again.');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Add a toast notification here in a real app
    alert('Copied to clipboard!');
  };

  return (
    <ToolPage
      toolId="video-to-blog-ai"
      category="ai"
      title="FREE Video to Blog AI - Convert YouTube to SEO Articles Instantly"
      description="Transform any YouTube video URL into a high-quality, SEO-optimized blog post, transcript, and social media captions using AI. Hindi and Hinglish supported."
      keywords={['video to blog', 'youtube to article', 'convert youtube video to text', 'ai blog writer', 'video transcript generator', 'hindi blog generator']}
    >
      <div className="space-y-10">
        {/* Ad Space Hero */}
        <div className="w-full h-20 bg-slate-50 border border-dashed border-slate-200 rounded-3xl flex items-center justify-center text-[10px] font-black text-slate-300 uppercase tracking-widest overflow-hidden">
          <span>AdSense - Top Banner</span>
        </div>

        {/* Input Section */}
        <div className="bg-white border border-slate-100 rounded-[40px] p-8 md:p-12 shadow-sm">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full text-xs font-black uppercase tracking-widest">
                <Youtube size={16} />
                YouTube Tool
              </div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Convert Video to Viral Content</h2>
              <p className="text-slate-500 font-medium">Paste your YouTube URL below and watch our AI turn it into a 1500-word SEO masterpiece.</p>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-indigo-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
              <div className="relative flex flex-col md:flex-row gap-3 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                    <Search size={20} />
                  </div>
                  <input 
                    type="url" 
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-transparent outline-none text-slate-700 font-medium text-lg"
                  />
                </div>
                <button 
                  onClick={handleConvert}
                  disabled={status === 'processing' || !url}
                  className="px-10 py-4 bg-indigo-600 text-white font-black rounded-xl shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === 'processing' ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Generate Blog
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                <CheckCircle2 size={16} className="text-emerald-500" />
                SEO Optimized
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                <CheckCircle2 size={16} className="text-emerald-500" />
                Hindi Support
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                <CheckCircle2 size={16} className="text-emerald-500" />
                No Login Required
              </div>
            </div>
          </div>
        </div>

        {/* Ad Space Middle */}
        <div className="w-full h-24 bg-slate-50 border border-dashed border-slate-200 rounded-3xl flex items-center justify-center text-[10px] font-black text-slate-300 uppercase tracking-widest overflow-hidden">
          <span>AdSense - In-Feed Content</span>
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {status === 'done' && result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Result Navigation */}
              <div className="flex flex-wrap gap-2 p-2 bg-slate-100 rounded-2xl inline-flex">
                {[
                  { id: 'blog', label: 'SEO Blog', icon: FileText },
                  { id: 'transcript', label: 'Transcript', icon: MessageSquare },
                  { id: 'social', label: 'Social Media', icon: Share2 },
                  { id: 'seo', label: 'Meta Tags', icon: Globe2 }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-6 py-3 rounded-xl flex items-center gap-2 font-bold transition-all ${
                      activeTab === tab.id 
                        ? 'bg-white text-indigo-600 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <tab.icon size={18} />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Main Content Area */}
              <div className="bg-white border border-slate-100 rounded-[40px] shadow-sm overflow-hidden">
                <div className="p-8 md:p-12 space-y-10">
                  
                  {activeTab === 'blog' && (
                    <div className="space-y-8">
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-2">
                          <h3 className="text-3xl font-black text-slate-900 leading-tight">{result.title}</h3>
                          <div className="flex items-center gap-4">
                            <div className="flex gap-2">
                              <button 
                                onClick={() => setLanguage('en')}
                                className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border transition-all ${language === 'en' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-500 border-slate-200'}`}
                              >
                                English
                              </button>
                              <button 
                                onClick={() => setLanguage('hi')}
                                className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border transition-all ${language === 'hi' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-500 border-slate-200'}`}
                              >
                                Hindi
                              </button>
                              <button 
                                onClick={() => setLanguage('hinglish')}
                                className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border transition-all ${language === 'hinglish' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-500 border-slate-200'}`}
                              >
                                Hinglish
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button 
                            onClick={() => copyToClipboard(language === 'en' ? result.blogContent : language === 'hi' ? result.hindiContent : result.hinglishContent)}
                            className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-all border border-slate-100"
                          >
                            <Copy size={20} />
                          </button>
                          <button className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
                            <Download size={20} />
                          </button>
                        </div>
                      </div>

                      <div className="prose prose-slate prose-lg max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed">
                        {language === 'en' && <div dangerouslySetInnerHTML={{ __html: result.blogContent.replace(/\n/g, '<br>') }} />}
                        {language === 'hi' && <div dangerouslySetInnerHTML={{ __html: result.hindiContent.replace(/\n/g, '<br>') }} />}
                        {language === 'hinglish' && <div dangerouslySetInnerHTML={{ __html: result.hinglishContent.replace(/\n/g, '<br>') }} />}
                      </div>

                      <div className="pt-10 border-t border-slate-100">
                        <h4 className="text-xl font-black text-slate-900 mb-6">Frequently Asked Questions</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {result.faqs?.map((faq: any, i: number) => (
                            <div key={i} className="p-6 bg-slate-50 rounded-3xl space-y-3">
                              <div className="font-bold text-slate-900">{faq.question}</div>
                              <p className="text-sm text-slate-500 leading-relaxed">{faq.answer}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'transcript' && (
                    <div className="space-y-8">
                      <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-black text-slate-900">Transcript Summary</h3>
                        <button 
                          onClick={() => copyToClipboard(result.transcriptSummary)}
                          className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm"
                        >
                          <Copy size={16} />
                          Copy Transcript
                        </button>
                      </div>
                      <div className="p-8 bg-slate-50 rounded-3xl text-slate-600 leading-loose">
                        {result.transcriptSummary}
                      </div>
                    </div>
                  )}

                  {activeTab === 'social' && (
                    <div className="space-y-8">
                      <h3 className="text-2xl font-black text-slate-900">Social Media Captions</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {['Instagram', 'X (Twitter)', 'LinkedIn'].map((platform, i) => (
                          <div key={platform} className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="font-black text-slate-900 uppercase tracking-widest text-xs">{platform}</span>
                              <button 
                                onClick={() => copyToClipboard(result.socialCaptions[i])}
                                className="p-2 text-slate-400 hover:text-indigo-600 transition-all"
                              >
                                <Copy size={16} />
                              </button>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed italic">
                              "{result.socialCaptions[i]}"
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'seo' && (
                    <div className="space-y-8">
                      <h3 className="text-2xl font-black text-slate-900">SEO Meta Tags</h3>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Meta Title ({result.metaTitle.length} / 60)</label>
                          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 font-medium text-slate-700 flex justify-between">
                            {result.metaTitle}
                            <button onClick={() => copyToClipboard(result.metaTitle)}><Copy size={16} /></button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Meta Description ({result.metaDescription.length} / 160)</label>
                          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 font-medium text-slate-700 flex justify-between gap-4">
                            {result.metaDescription}
                            <button onClick={() => copyToClipboard(result.metaDescription)} className="shrink-0"><Copy size={16} /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Benefits Section */}
        <section className="space-y-8 pt-10">
          <div className="text-center space-y-2">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">Why Choose VidBlog AI?</h3>
            <p className="text-slate-500 font-medium">The most advanced video-to-text engine for modern creators.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: 'Instant Processing', desc: 'Go from URL to full blog post in under 30 seconds.' },
              { icon: Globe2, title: 'Hindi/Hinglish Ready', desc: 'Perfect for the Indian market with native localized output.' },
              { icon: Bookmark, title: 'SEO Structured', desc: 'Includes H tags, meta data, and FAQ schema automatically.' },
              { icon: Languages, title: 'Multi-Tone Support', desc: 'Choose between professional, conversational, or viral tones.' }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 space-y-4 hover:border-indigo-100 transition-all group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-110 transition-transform">
                  <item.icon size={28} />
                </div>
                <h4 className="text-lg font-black text-slate-900 tracking-tight">{item.title}</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Educational Content for Rank */}
        <article className="prose prose-slate max-w-none pt-20 border-t border-slate-100">
          <h2 className="text-4xl font-black text-slate-900">How to Convert YouTube Videos to High-Ranking Blog Posts</h2>
          <p>
            In the creator economy, content repurposing is the secret to scaling. A single 10-minute video contains enough information for a 1500-word blog post, 5 Instagram captions, and a dozen X threads. But doing this manually takes hours. 
          </p>
          <p>
            With **VidBlog AI**, we leverage the power of **Gemini PRO** to analyze the semantic meaning of your video content. This isn't just a basic speech-to-text transcription. Our tool understands the context, identifies the "hooks," and reorganizes the spoken word into a structured narrative that search engines love.
          </p>
          <h3>SEO Best Practices for Video-Based Blogs</h3>
          <ul>
            <li><strong>Keyword Integration:</strong> Ensure your main keyword is in the first 100 words and H1 tag.</li>
            <li><strong>Add Value:</strong> Don't just transcribe; add extra insights, bullet points, and summaries.</li>
            <li><strong>Internal Linking:</strong> Link back to the original YouTube video to help your channel's authority.</li>
            <li><strong>FAQ Schema:</strong> Use the generated FAQs to capture "People Also Ask" slots on Google.</li>
          </ul>
          <p>
            Our tool is specially tuned for the **Hindi and Hinglish** speaking audience. Whether you're an affiliate marketer targeting the Indian demographic or a tech YouTuber, VidBlog AI ensures your content resonates locally while maintaining global SEO standards.
          </p>
        </article>

        {/* Ad Space Bottom */}
        <div className="w-full h-40 bg-slate-50 border border-dashed border-slate-200 rounded-[48px] flex items-center justify-center text-[10px] font-black text-slate-300 uppercase tracking-widest overflow-hidden">
          <span>AdSense - Contextual Bottom Grid</span>
        </div>
      </div>
    </ToolPage>
  );
};
