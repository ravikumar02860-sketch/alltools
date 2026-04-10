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
      title="Word Counter"
      description="Count words, characters, sentences, and paragraphs in real-time. Calculate reading time and analyze text density for SEO."
      longDescription={`Our Word Counter is a powerful tool designed for writers, students, and SEO professionals. Whether you're writing a blog post, an essay, or meta descriptions, knowing your exact word and character count is essential.

Key Features:
- Real-time counting: See results as you type.
- Detailed metrics: Get counts for sentences, paragraphs, and characters (with and without spaces).
- Reading time estimation: Know how long it will take an average reader to consume your content.
- Privacy focused: All processing happens in your browser. Your text is never sent to our servers.

Why use a word counter?
Many platforms have strict limits. Twitter has a character limit, Google has limits for meta titles and descriptions, and academic papers often have strict word counts. Our tool helps you stay within these boundaries while maintaining high-quality content.`}
      faqs={[
        { question: "Is there a limit to how much text I can paste?", answer: "No, our tool can handle very large amounts of text as it processes everything locally in your browser." },
        { question: "Does it count spaces as characters?", answer: "We provide both counts: total characters (including spaces) and characters excluding spaces." },
        { question: "How is reading time calculated?", answer: "It's based on an average reading speed of 200 words per minute, which is standard for adult readers." }
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
