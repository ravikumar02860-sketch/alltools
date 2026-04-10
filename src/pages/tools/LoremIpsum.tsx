import React from 'react';
import { ToolPage } from '@/src/components/ToolPage';
import { Copy, Check, RefreshCw, Type } from 'lucide-react';

export const LoremIpsum: React.FC = () => {
  const [paragraphs, setParagraphs] = React.useState(3);
  const [type, setType] = React.useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [output, setOutput] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const baseText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  const generate = () => {
    let result = '';
    if (type === 'paragraphs') {
      result = Array(paragraphs).fill(baseText).join('\n\n');
    } else if (type === 'sentences') {
      const sentences = baseText.split('. ');
      result = Array(paragraphs).fill(0).map(() => sentences[Math.floor(Math.random() * sentences.length)]).join('. ') + '.';
    } else {
      const words = baseText.split(' ');
      result = Array(paragraphs).fill(0).map(() => words[Math.floor(Math.random() * words.length)]).join(' ');
    }
    setOutput(result);
  };

  React.useEffect(generate, [paragraphs, type]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPage
      toolId="lorem-ipsum"
      category="text"
      title="Lorem Ipsum Generator"
      description="Generate high-quality placeholder text for your design projects. Choose between paragraphs, sentences, or words."
      longDescription={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard dummy text ever since the 1500s.

Our generator allows you to:
- Specify the amount of text needed.
- Choose the format (paragraphs, sentences, or words).
- Instantly copy the result to your clipboard.

Why use Lorem Ipsum?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. Using Lorem Ipsum makes it look like readable English, which helps designers focus on the visual elements rather than the content.`}
      faqs={[
        { question: "Where does Lorem Ipsum come from?", answer: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC." },
        { question: "Is it free to use?", answer: "Yes, you can use the generated text for any personal or commercial project without attribution." },
        { question: "Can I generate other types of dummy text?", answer: "Currently we only support the classic Lorem Ipsum, but we plan to add more variations soon." }
      ]}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Type</label>
            <div className="flex bg-white p-1 rounded-xl border border-slate-200">
              {['paragraphs', 'sentences', 'words'].map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t as any)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${type === t ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</label>
            <input 
              type="number" 
              min="1" 
              max="100"
              value={paragraphs}
              onChange={(e) => setParagraphs(parseInt(e.target.value) || 1)}
              className="w-24 px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div className="flex-1 flex justify-end">
            <button 
              onClick={generate}
              className="p-3 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
              title="Regenerate"
            >
              <RefreshCw size={20} />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute top-4 right-4 z-10">
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy Text'}
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            className="w-full h-80 p-8 bg-white border border-slate-200 rounded-[32px] focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none text-slate-600 leading-relaxed shadow-sm"
          />
        </div>
      </div>
    </ToolPage>
  );
};
