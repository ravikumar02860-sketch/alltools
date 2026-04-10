import React from 'react';
import { ToolPage } from '@/src/components/ToolPage';
import { Copy, RefreshCw, Check, List } from 'lucide-react';

export const UuidGenerator: React.FC = () => {
  const [uuids, setUuids] = React.useState<string[]>([]);
  const [count, setCount] = React.useState(5);
  const [copied, setCopied] = React.useState<number | null>(null);

  const generateUuids = React.useCallback(() => {
    const newUuids = Array.from({ length: count }, () => window.crypto.randomUUID());
    setUuids(newUuids);
  }, [count]);

  React.useEffect(() => {
    generateUuids();
  }, [generateUuids]);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopied(-1);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <ToolPage
      toolId="uuid-generator"
      category="generator"
      title="UUID v4 Generator"
      description="Generate unique version 4 UUIDs (Universally Unique Identifiers) instantly. Perfect for developers needing unique keys for databases or testing."
      longDescription={`A UUID (Universally Unique Identifier) is a 128-bit label used for information in computer systems. The term GUID (Globally Unique Identifier) is also used.

Version 4 UUIDs are randomly generated. The probability of a collision is so low that it is effectively zero for most applications.

Key Features:
- Bulk Generation: Generate up to 50 UUIDs at once.
- Instant Copy: Copy individual UUIDs or the entire list.
- Secure: Uses cryptographically secure random numbers.
- Standard Compliant: Generates RFC 4122 compliant UUIDs.`}
      faqs={[
        { question: "What is a UUID?", answer: "A Universally Unique Identifier (UUID) is a 128-bit number used to uniquely identify information in computer systems without a central coordination entity." },
        { question: "Are these UUIDs truly unique?", answer: "While not mathematically guaranteed to be unique, the probability of a duplicate is so small (1 in 2^128) that they are considered unique for all practical purposes." },
        { question: "What is the difference between UUID and GUID?", answer: "GUID is Microsoft's implementation of the UUID standard. They are essentially the same thing." }
      ]}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Number of UUIDs:</label>
            <select 
              value={count} 
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="bg-slate-100 border-none rounded-xl px-4 py-2 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              {[1, 5, 10, 20, 50].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={generateUuids}
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all flex items-center gap-2"
            >
              <RefreshCw size={18} />
              Regenerate
            </button>
            <button 
              onClick={handleCopyAll}
              className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2"
            >
              {copied === -1 ? <Check size={18} className="text-emerald-400" /> : <List size={18} />}
              {copied === -1 ? 'Copied All!' : 'Copy All'}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {uuids.map((uuid, idx) => (
            <div 
              key={idx} 
              className="group flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-indigo-100 transition-all"
            >
              <code className="text-sm md:text-base font-mono text-slate-700 break-all">{uuid}</code>
              <button 
                onClick={() => handleCopy(uuid, idx)}
                className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                title="Copy UUID"
              >
                {copied === idx ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </ToolPage>
  );
};
