import React from 'react';
import { ToolPage } from '@/src/components/ToolPage';
import { Copy, Trash2, Check, Hash as HashIcon } from 'lucide-react';
import CryptoJS from 'crypto-js';
import { cn } from '@/src/lib/utils';

export const HashGenerator: React.FC = () => {
  const [input, setInput] = React.useState('');
  const [algorithm, setAlgorithm] = React.useState<'MD5' | 'SHA1' | 'SHA256' | 'SHA512'>('SHA256');
  const [copied, setCopied] = React.useState(false);

  const generateHash = () => {
    if (!input) return '';
    switch (algorithm) {
      case 'MD5': return CryptoJS.MD5(input).toString();
      case 'SHA1': return CryptoJS.SHA1(input).toString();
      case 'SHA256': return CryptoJS.SHA256(input).toString();
      case 'SHA512': return CryptoJS.SHA512(input).toString();
      default: return '';
    }
  };

  const hash = generateHash();

  const handleCopy = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPage
      toolId="hash-generator"
      category="security"
      title="Online Hash Generator"
      description="Generate MD5, SHA-1, SHA-256, and SHA-512 hashes for any text input. Securely verify data integrity and create cryptographic checksums."
      longDescription={`A hash function is any function that can be used to map data of arbitrary size to fixed-size values. The values returned by a hash function are called hash values, hash codes, digests, or simply hashes.

Common Algorithms:
- MD5: Fast but cryptographically broken. Good for non-security checksums.
- SHA-1: Legacy algorithm, no longer considered secure for critical data.
- SHA-256: Part of the SHA-2 family, widely used for security (SSL, Bitcoin).
- SHA-512: Stronger version of SHA-2, used for high-security applications.

Our tool runs entirely in your browser using the CryptoJS library, ensuring your sensitive input never leaves your device.`}
      faqs={[
        { question: "What is a hash?", answer: "A hash is a unique string of characters generated from an input. Even a tiny change in the input will result in a completely different hash." },
        { question: "Can I reverse a hash?", answer: "No. Hashing is a one-way function. You cannot get the original text back from the hash value." },
        { question: "Is MD5 still safe?", answer: "No, MD5 is vulnerable to collision attacks and should not be used for security purposes like password hashing." }
      ]}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Input Text</label>
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to hash..."
              className="w-full h-40 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none text-slate-700"
            />
            <button 
              onClick={() => setInput('')}
              className="absolute bottom-4 right-4 p-2 bg-white text-slate-400 hover:text-red-500 border border-slate-200 rounded-lg shadow-sm transition-all"
              title="Clear"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {(['MD5', 'SHA1', 'SHA256', 'SHA512'] as const).map((algo) => (
            <button 
              key={algo}
              onClick={() => setAlgorithm(algo)}
              className={cn(
                "px-6 py-2.5 text-sm font-bold rounded-xl transition-all",
                algorithm === algo 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" 
                  : "bg-white text-slate-600 border border-slate-100 hover:bg-slate-50"
              )}
            >
              {algo}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Generated {algorithm} Hash</label>
          <div className="relative group">
            <div className="w-full p-6 bg-slate-900 text-emerald-400 font-mono text-sm md:text-base rounded-2xl break-all min-h-[80px] flex items-center">
              {hash || <span className="text-slate-600 italic">Waiting for input...</span>}
            </div>
            {hash && (
              <button 
                onClick={handleCopy}
                className="absolute top-2 right-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-lg backdrop-blur-sm transition-all flex items-center gap-2 text-xs font-bold"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between text-xs text-slate-400 font-medium uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <HashIcon size={14} />
            <span>Cryptographic Digest</span>
          </div>
          <span>Local Processing</span>
        </div>
      </div>
    </ToolPage>
  );
};
