import React from 'react';
import { ToolPage } from '@/src/components/ToolPage';
import { Copy, Trash2, Check } from 'lucide-react';

export const CaseConverter: React.FC = () => {
  const [text, setText] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const convert = (type: string) => {
    switch (type) {
      case 'upper': setText(text.toUpperCase()); break;
      case 'lower': setText(text.toLowerCase()); break;
      case 'title':
        setText(text.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' '));
        break;
      case 'sentence':
        setText(text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase()));
        break;
      case 'slug':
        setText(text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-'));
        break;
    }
  };

  return (
    <ToolPage
      toolId="case-converter"
      category="text"
      title="Online Case Converter"
      description="Easily convert your text between different letter cases: UPPERCASE, lowercase, Title Case, Sentence case, and more."
      longDescription={`Our Online Case Converter is a simple yet powerful tool designed to help you format your text instantly. Whether you're a developer needing to create slugs, a writer fixing capitalization, or a student formatting an essay, this tool has you covered.

Key Features:
- Sentence Case: Capitalizes the first letter of each sentence.
- Lower Case: Converts all text to small letters.
- Upper Case: Converts all text to capital letters.
- Title Case: Capitalizes the first letter of every word.
- Slug Case: Converts text to a URL-friendly format (hyphenated).

All processing happens locally in your browser, ensuring your data never leaves your device.`}
      faqs={[
        { question: "Is this tool free to use?", answer: "Yes, our Case Converter is 100% free with no limits on usage." },
        { question: "Does it support large amounts of text?", answer: "Yes, you can paste thousands of words and it will process them instantly." },
        { question: "Is my text saved on your servers?", answer: "No. All conversion happens directly in your browser using JavaScript. We never see or store your text." },
        { question: "What is Title Case?", answer: "Title Case capitalizes the first letter of every word, which is commonly used for book titles and headings." },
        { question: "Can I convert text to a URL slug?", answer: "Yes, use the 'Slug Case' button to convert any text into a URL-friendly format." }
      ]}
    >
      <div className="space-y-6">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here..."
            className="w-full h-64 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none text-slate-700"
          />
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button 
              onClick={() => setText('')}
              className="p-2 bg-white text-slate-400 hover:text-red-500 border border-slate-200 rounded-lg shadow-sm transition-all"
              title="Clear text"
            >
              <Trash2 size={18} />
            </button>
            <button 
              onClick={handleCopy}
              className="px-4 py-2 bg-white text-slate-700 hover:text-indigo-600 border border-slate-200 rounded-lg shadow-sm transition-all flex items-center gap-2 font-medium"
            >
              {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          <button 
            onClick={() => convert('upper')}
            className="px-4 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all"
          >
            UPPERCASE
          </button>
          <button 
            onClick={() => convert('lower')}
            className="px-4 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all"
          >
            lowercase
          </button>
          <button 
            onClick={() => convert('title')}
            className="px-4 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all"
          >
            Title Case
          </button>
          <button 
            onClick={() => convert('sentence')}
            className="px-4 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all"
          >
            Sentence case
          </button>
          <button 
            onClick={() => convert('slug')}
            className="px-4 py-2.5 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition-all"
          >
            Slug Case
          </button>
        </div>

        <div className="pt-4 flex items-center justify-between text-xs text-slate-400 font-medium uppercase tracking-widest">
          <div className="flex gap-4">
            <span>Words: {text.trim() ? text.trim().split(/\s+/).length : 0}</span>
            <span>Characters: {text.length}</span>
          </div>
          <span>Instant Processing</span>
        </div>
      </div>
    </ToolPage>
  );
};
