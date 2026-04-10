import React from 'react';
import { ToolPage } from '@/src/components/ToolPage';
import { Copy, Trash2, Check, FileJson, Minimize, Maximize } from 'lucide-react';

export const JsonFormatter: React.FC = () => {
  const [input, setInput] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const format = (spaces: number = 2) => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, spaces));
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <ToolPage
      toolId="json-formatter"
      category="dev"
      title="JSON Formatter & Validator"
      description="Prettify, minify, and validate your JSON data instantly. Our tool handles large payloads and provides clear error messages for invalid JSON."
      longDescription={`JSON (JavaScript Object Notation) is the most popular format for data exchange on the web. However, raw JSON is often minified and hard to read. Our JSON Formatter helps you visualize your data structure clearly.

Key Features:
- Prettify: Format messy JSON with 2 or 4 space indentation.
- Minify: Remove all whitespace to reduce payload size.
- Validate: Instantly check if your JSON is valid and see exactly where errors occur.
- Privacy: Your data is processed entirely in your browser.

Whether you're debugging an API response or preparing a configuration file, this tool is an essential part of any developer's workflow.`}
      faqs={[
        { question: "Can it handle large JSON files?", answer: "Yes, our tool is optimized to handle large JSON payloads efficiently directly in your browser." },
        { question: "Does it validate JSON syntax?", answer: "Yes, it will show you a descriptive error message if your JSON is invalid." },
        { question: "Is my JSON data secure?", answer: "Absolutely. We do not send your JSON to any server. All processing happens locally on your device." },
        { question: "Can I minify JSON for production?", answer: "Yes, use the 'Minify' button to remove all unnecessary whitespace." }
      ]}
    >
      <div className="space-y-6">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JSON here..."
            className={`w-full h-96 p-4 bg-slate-50 border ${error ? 'border-red-300 focus:ring-red-500' : 'border-slate-200 focus:ring-indigo-500'} rounded-2xl outline-none transition-all resize-none font-mono text-sm text-slate-700`}
          />
          
          {error && (
            <div className="absolute top-4 right-4 max-w-xs p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-bold shadow-sm">
              Error: {error}
            </div>
          )}

          <div className="absolute bottom-4 right-4 flex gap-2">
            <button 
              onClick={() => setInput('')}
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

        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => format(2)}
            className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all flex items-center gap-2"
          >
            <Maximize size={16} />
            Format (2 Spaces)
          </button>
          <button 
            onClick={() => format(4)}
            className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all flex items-center gap-2"
          >
            <Maximize size={16} />
            Format (4 Spaces)
          </button>
          <button 
            onClick={minify}
            className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            <Minimize size={16} />
            Minify JSON
          </button>
          <button 
            onClick={() => format(2)}
            className="px-6 py-2.5 bg-white text-slate-700 border border-slate-200 text-sm font-bold rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            <FileJson size={16} />
            Validate JSON
          </button>
        </div>

        <div className="pt-4 flex items-center justify-between text-xs text-slate-400 font-medium uppercase tracking-widest">
          <div className="flex gap-4">
            <span>Size: {(new Blob([input]).size / 1024).toFixed(2)} KB</span>
          </div>
          <span>Client-Side Validation</span>
        </div>
      </div>
    </ToolPage>
  );
};
