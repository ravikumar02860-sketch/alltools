import React from 'react';
import { ToolPage } from '@/src/components/ToolPage';
import { RefreshCw, Copy, Check, Trash2 } from 'lucide-react';

export const Base64: React.FC = () => {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [mode, setMode] = React.useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = React.useState(false);

  const process = (val: string, currentMode: 'encode' | 'decode') => {
    setInput(val);
    if (!val) {
      setOutput('');
      return;
    }
    try {
      if (currentMode === 'encode') {
        setOutput(btoa(val));
      } else {
        setOutput(atob(val));
      }
    } catch (e) {
      setOutput('Invalid input for ' + currentMode + 'ing');
    }
  };

  const handleModeSwitch = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode';
    setMode(newMode);
    process(input, newMode);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPage
      toolId="base64-encoder"
      category="dev"
      title="Base64 Encoder/Decoder"
      description="Instantly encode text to Base64 or decode Base64 strings back to plain text. Fast, secure, and browser-based."
      longDescription={`Base64 is a group of binary-to-text encoding schemes that represent binary data in an ASCII string format. It is commonly used when there is a need to encode binary data that needs to be stored and transferred over media that are designed to deal with textual data.

Our tool provides a simple interface to:
- Encode: Convert plain text into Base64 format.
- Decode: Convert Base64 strings back into readable text.

Common Use Cases:
- Embedding image data within HTML or CSS.
- Encoding data for use in URLs or hidden form fields.
- Simple obfuscation of data (though not for security/encryption).
- Handling binary data in JSON or XML environments.`}
      faqs={[
        { question: "Is Base64 a form of encryption?", answer: "No, Base64 is an encoding scheme, not encryption. It can be easily decoded by anyone and does not provide security." },
        { question: "Can I encode images?", answer: "This specific tool is designed for text. For images, you would typically use a file-to-base64 converter." },
        { question: "What happens if the decoding fails?", answer: "If the input string is not a valid Base64 encoded string, the tool will display an 'Invalid input' error message." }
      ]}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => { setMode('encode'); process(input, 'encode'); }}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'encode' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Encode
            </button>
            <button 
              onClick={() => { setMode('decode'); process(input, 'decode'); }}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'decode' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Decode
            </button>
          </div>
          <button 
            onClick={handleModeSwitch}
            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
            title="Switch Mode"
          >
            <RefreshCw size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Input Text</label>
            <textarea
              value={input}
              onChange={(e) => process(e.target.value, mode)}
              placeholder={mode === 'encode' ? "Enter plain text..." : "Enter Base64 string..."}
              className="w-full h-64 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none font-mono text-sm"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Output</label>
              <div className="flex gap-2">
                <button 
                  onClick={() => { setInput(''); setOutput(''); }}
                  className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
                <button 
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-all"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="Output will appear here..."
              className="w-full h-64 p-4 bg-slate-900 text-indigo-300 border-none rounded-2xl outline-none resize-none font-mono text-sm"
            />
          </div>
        </div>
      </div>
    </ToolPage>
  );
};
