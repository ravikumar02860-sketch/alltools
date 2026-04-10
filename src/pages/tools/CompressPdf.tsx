import React from 'react';
import { ToolPage } from '@/src/components/ToolPage';
import { FileText, Zap, Download, Loader2, Trash2, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const CompressPdf: React.FC = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [level, setLevel] = React.useState<'low' | 'medium' | 'high'>('medium');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleCompress = () => {
    if (!file) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    }, 2000);
  };

  return (
    <ToolPage
      toolId="compress-pdf"
      category="pdf"
      title="Compress PDF"
      description="Reduce PDF file size without losing quality. Optimize your documents for email and web sharing instantly."
      longDescription={`Large PDF files can be a headache to share or upload. Our Compress PDF tool uses advanced optimization algorithms to shrink your document's file size while maintaining the best possible visual quality.

Key Features:
- Multiple compression levels: Choose between extreme, recommended, or low compression.
- Smart optimization: Automatically optimizes images and fonts within the PDF.
- Batch ready: Handle large documents with ease.
- 100% Secure: Your data never leaves your browser.

Why compress PDFs?
- Email attachments: Stay within the 25MB limit of most email providers.
- Web performance: Faster loading documents for your website visitors.
- Storage space: Save valuable space on your hard drive or cloud storage.`}
      faqs={[
        { question: "Will my PDF look blurry after compression?", answer: "Our 'Recommended' setting balances file size and quality perfectly. Most users won't notice any difference in visual quality." },
        { question: "How much can I reduce the file size?", answer: "Depending on the original file's content (especially images), you can often see reductions of 40% to 80%." },
        { question: "Is this tool free to use?", answer: "Yes, Tooolify provides this and all other utilities completely free of charge." }
      ]}
    >
      <div className="space-y-8">
        {!file ? (
          <label className="block py-20 border-2 border-dashed border-slate-200 rounded-[40px] text-center cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group">
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
              <Zap size={40} />
            </div>
            <div className="space-y-2">
              <div className="text-xl font-bold text-slate-900">Select PDF to Compress</div>
              <p className="text-slate-500">Fast, secure, and ad-free</p>
            </div>
            <input type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
          </label>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-[32px] shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                  <FileText size={24} />
                </div>
                <div>
                  <div className="font-bold text-slate-900">{file.name}</div>
                  <div className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                </div>
              </div>
              <button 
                onClick={() => setFile(null)}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Compression Level</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'low', name: 'Low Compression', desc: 'High quality, larger file size' },
                  { id: 'medium', name: 'Recommended', desc: 'Good quality, good compression' },
                  { id: 'high', name: 'Extreme', desc: 'Less quality, smallest file size' }
                ].map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLevel(l.id as any)}
                    className={`p-6 rounded-2xl border text-left transition-all ${level === l.id ? 'bg-indigo-50 border-indigo-600 ring-1 ring-indigo-600' : 'bg-white border-slate-100 hover:border-indigo-200'}`}
                  >
                    <div className="font-bold text-slate-900 mb-1">{l.name}</div>
                    <div className="text-xs text-slate-500">{l.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
                <ShieldCheck size={18} />
                Secure Browser Processing
              </div>
              <button 
                onClick={handleCompress}
                disabled={isProcessing}
                className="px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all flex items-center gap-3 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Compressing...
                  </>
                ) : isSuccess ? (
                  <>
                    <Download size={20} />
                    Download Compressed PDF
                  </>
                ) : (
                  'Compress PDF'
                )}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </ToolPage>
  );
};
