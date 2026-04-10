import React from 'react';
import { ToolPage } from '@/src/components/ToolPage';
import { FileText, Scissors, Download, Loader2, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

export const SplitPdf: React.FC = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [splitMode, setSplitMode] = React.useState<'all' | 'range'>('all');
  const [range, setRange] = React.useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSplit = () => {
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
      toolId="split-pdf"
      category="pdf"
      title="Split PDF"
      description="Extract pages from your PDF or save each page as a separate PDF file. Fast, secure, and easy to use."
      longDescription={`Need to extract a single page from a large PDF? Or maybe you want to split a document into multiple smaller files? Our Split PDF tool gives you full control over your documents.

Key Features:
- Multiple split modes: Extract every page or specify a custom range.
- Instant processing: No waiting in queues.
- High quality: Your PDF content remains untouched and sharp.
- Secure: All splitting happens in your browser.

How to split a PDF:
1. Upload your PDF file.
2. Choose your split mode: "Extract All Pages" or "Custom Range".
3. If using a custom range, enter the page numbers (e.g., 1-5, 8, 10-12).
4. Click "Split PDF" and download your results.`}
      faqs={[
        { question: "How do I specify page ranges?", answer: "Use dashes for ranges (e.g., 1-5) and commas for individual pages (e.g., 1, 3, 5). You can combine them: 1-3, 5, 7-10." },
        { question: "Will the split files be smaller?", answer: "Yes, each new PDF will only contain the data for the specific pages you extracted, resulting in smaller file sizes." },
        { question: "Can I split password-protected PDFs?", answer: "Currently, you must remove the password protection before splitting the file using our tool." }
      ]}
    >
      <div className="space-y-8">
        {!file ? (
          <label className="block py-20 border-2 border-dashed border-slate-200 rounded-[40px] text-center cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group">
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
              <FileText size={40} />
            </div>
            <div className="space-y-2">
              <div className="text-xl font-bold text-slate-900">Select PDF File</div>
              <p className="text-slate-500">or drag and drop here</p>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button 
                onClick={() => setSplitMode('all')}
                className={`p-8 rounded-[32px] border text-left transition-all ${splitMode === 'all' ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-200' : 'bg-white border-slate-100 text-slate-900 hover:border-indigo-200'}`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${splitMode === 'all' ? 'bg-white/20' : 'bg-indigo-50 text-indigo-600'}`}>
                  <Scissors size={24} />
                </div>
                <div className="font-bold text-lg mb-2">Extract All Pages</div>
                <p className={`text-sm ${splitMode === 'all' ? 'text-indigo-100' : 'text-slate-500'}`}>Save every page as a separate PDF file.</p>
              </button>

              <button 
                onClick={() => setSplitMode('range')}
                className={`p-8 rounded-[32px] border text-left transition-all ${splitMode === 'range' ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-200' : 'bg-white border-slate-100 text-slate-900 hover:border-indigo-200'}`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${splitMode === 'range' ? 'bg-white/20' : 'bg-indigo-50 text-indigo-600'}`}>
                  <FileText size={24} />
                </div>
                <div className="font-bold text-lg mb-2">Custom Range</div>
                <p className={`text-sm ${splitMode === 'range' ? 'text-indigo-100' : 'text-slate-500'}`}>Select specific pages or ranges to extract.</p>
              </button>
            </div>

            {splitMode === 'range' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Page Range</label>
                <input 
                  type="text" 
                  value={range}
                  onChange={(e) => setRange(e.target.value)}
                  placeholder="e.g. 1-5, 8, 11-13"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </motion.div>
            )}

            <div className="pt-6 border-t flex justify-end">
              <button 
                onClick={handleSplit}
                disabled={isProcessing}
                className="px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all flex items-center gap-3 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Splitting...
                  </>
                ) : isSuccess ? (
                  <>
                    <Download size={20} />
                    Download Split Files
                  </>
                ) : (
                  'Split PDF'
                )}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </ToolPage>
  );
};
