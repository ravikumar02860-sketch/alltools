import React from 'react';
import { ToolPage } from '@/src/components/ToolPage';
import { FileText, Hash, AlignLeft, Type } from 'lucide-react';

export const WordCounter: React.FC = () => {
  const [text, setText] = React.useState('');

  const stats = {
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    sentences: text.split(/[.!?]+/).filter(Boolean).length,
    paragraphs: text.split(/\n+/).filter(Boolean).length,
    readingTime: Math.ceil(text.trim().split(/\s+/).length / 200), // Avg 200 wpm
  };

  return (
    <ToolPage
      toolId="word-counter"
      category="text"
      title="Word Counter Online - Free Character & Sentence Count Tool"
      description="Count words, characters, sentences, and paragraphs in real-time. Our free online word counter also calculates reading time and helps you optimize text for SEO, social media, and academic writing."
      keywords={['word counter online', 'character count tool', 'sentence counter', 'paragraph counter', 'text analysis tool', 'free word count', 'writing statistics', 'seo word counter']}
      longDescription={`Our Word Counter is a professional-grade text analysis tool designed for writers, students, bloggers, and SEO specialists. In a world where character limits and word counts define our digital communication, having a reliable and instant counting tool is essential.

### Why Use Our Online Word Counter?
Whether you're drafting a 280-character tweet, a 60-character meta title, or a 2,000-word academic essay, our tool provides the precision you need.

- **Real-Time Analysis**: No need to click "submit." See your word and character counts update instantly as you type or paste your text.
- **Comprehensive Metrics**: Beyond just words, we provide detailed statistics for sentences, paragraphs, and characters (both with and without spaces).
- **Reading Time Estimation**: Perfect for content creators who want to inform their audience about the length of a blog post or article.
- **Privacy & Security**: Your content is yours. We process all text locally in your browser using JavaScript. Your text is never uploaded to our servers, ensuring your drafts remain private.
- **SEO Optimization**: Use our tool to ensure your meta descriptions and titles stay within Google's recommended limits to avoid truncation in search results.

### Who is this tool for?
- **Bloggers & SEOs**: Optimize content length for better search engine rankings.
- **Students**: Ensure your essays and assignments meet the required word count.
- **Social Media Managers**: Stay within character limits for Twitter, Instagram, and LinkedIn.
- **Writers & Editors**: Track your daily writing progress and maintain consistency.`}
      faqs={[
        { question: "Is this word counter free to use?", answer: "Yes, Tooolify's Word Counter is 100% free. There are no hidden fees, no registration required, and no limits on how many times you can use it." },
        { question: "Does it count spaces as characters?", answer: "We provide two separate metrics: 'Total Characters' (which includes spaces) and 'Characters No Spaces'. This helps you meet specific requirements for different platforms." },
        { question: "How is the reading time calculated?", answer: "Our algorithm uses an average adult reading speed of 200 words per minute (WPM). This is the industry standard for estimating how long it takes to read a piece of content." },
        { question: "Can I use this tool on my mobile device?", answer: "Absolutely. Our website is fully responsive, meaning you can count words on your iPhone, Android, or tablet just as easily as on a desktop." }
      ]}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
            <div className="text-xs font-bold text-slate-500 uppercase mb-1">Words</div>
            <div className="text-2xl font-black text-indigo-600">{stats.words}</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
            <div className="text-xs font-bold text-slate-500 uppercase mb-1">Chars</div>
            <div className="text-2xl font-black text-indigo-600">{stats.characters}</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
            <div className="text-xs font-bold text-slate-500 uppercase mb-1">No Spaces</div>
            <div className="text-2xl font-black text-indigo-600">{stats.charactersNoSpaces}</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
            <div className="text-xs font-bold text-slate-500 uppercase mb-1">Sentences</div>
            <div className="text-2xl font-black text-indigo-600">{stats.sentences}</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
            <div className="text-xs font-bold text-slate-500 uppercase mb-1">Paragraphs</div>
            <div className="text-2xl font-black text-indigo-600">{stats.paragraphs}</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
            <div className="text-xs font-bold text-slate-500 uppercase mb-1">Read Time</div>
            <div className="text-2xl font-black text-indigo-600">{stats.readingTime}m</div>
          </div>
        </div>

        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste or type your text here..."
            className="w-full h-80 p-6 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none text-slate-700 leading-relaxed"
          />
          {text && (
            <button 
              onClick={() => setText('')}
              className="absolute bottom-4 right-4 px-4 py-2 bg-white text-slate-500 text-xs font-bold rounded-xl border border-slate-200 hover:text-red-500 hover:border-red-100 transition-all"
            >
              Clear Text
            </button>
          )}
        </div>
      </div>
    </ToolPage>
  );
};
