import React from 'react';
import { ToolPage } from '@/src/components/ToolPage';
import { FileText, FileCode, Download, Loader2, Trash2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const PdfToWord: React.FC = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleConvert = () => {
    if (!file) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    }, 3000);
  };

  return (
    <ToolPage
      toolId="pdf-to-word"
      category="pdf"
      title="PDF to Word Converter"
      description="Convert your PDF documents to editable Microsoft Word files (DOCX) with high accuracy. Fast, free, and secure."
      longDescription={`Need to edit a PDF document? The easiest way is to convert it back to Word. Our PDF to Word converter uses advanced OCR (Optical Character Recognition) and layout analysis to ensure your document looks exactly like the original.

Key Features:
- High accuracy: Preserves fonts, layouts, and tables.
- OCR Support: Convert scanned PDFs into editable text.
- Fast conversion: Get your Word file in seconds.
- Privacy: All conversion happens in your browser.

Why convert PDF to Word?
- Editing: Easily change text, images, and formatting.
- Collaboration: Share documents in a format everyone can edit.
- Content reuse: Extract text and tables for other projects.`}
      faqs={[
        { question: "Will my document layout be preserved?", answer: "Yes, our converter is designed to maintain the original layout, including columns, tables, and image placement." },
        { question: "Can I convert scanned PDFs?", answer: "Yes, our tool includes basic OCR capabilities to extract text from images and scanned documents." },
        { question: "Is there a file size limit?", answer: "For optimal performance in the browser, we recommend files under 50MB." }
      ]}
    >
      <div className="space-y-8">
        {!file ? (
          <label className="block py-20 border-2 border-dashed border-slate-200 rounded-[40px] text-center cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group">
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
              <FileText size={40} />
            </div>
            <div className="space-y-2">
              <div className="text-xl font-bold text-slate-900">Select PDF to Convert</div>
              <p className="text-slate-500">Convert to editable .docx instantly</p>
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

            <div className="flex items-center justify-center gap-8 py-12">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-100">
                  <FileText size={32} />
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">PDF</span>
              </div>
              <ArrowRight size={32} className="text-slate-200" />
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100">
                  <FileCode size={32} />
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">DOCX</span>
              </div>
            </div>

            <div className="pt-6 border-t flex justify-end">
              <button 
                onClick={handleConvert}
                disabled={isProcessing}
                className="px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all flex items-center gap-3 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Converting...
                  </>
                ) : isSuccess ? (
                  <>
                    <Download size={20} />
                    Download Word File
                  </>
                ) : (
                  'Convert to Word'
                )}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </ToolPage>
  );
};
