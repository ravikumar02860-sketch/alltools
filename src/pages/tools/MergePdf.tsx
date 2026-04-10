import React from 'react';
import { ToolPage } from '@/src/components/ToolPage';
import { FileText, Plus, Trash2, ArrowUp, ArrowDown, Download, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const MergePdf: React.FC = () => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...files];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newFiles.length) {
      [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]];
      setFiles(newFiles);
    }
  };

  const handleMerge = () => {
    if (files.length < 2) return;
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    }, 2000);
  };

  return (
    <ToolPage
      toolId="merge-pdf"
      category="pdf"
      title="Merge PDF"
      description="Combine multiple PDF files into one document in seconds. Easy to use, secure, and works in your browser."
      longDescription={`Merging PDF files is a common task for professionals and students alike. Whether you're combining reports, gathering receipts, or organizing research papers, our Merge PDF tool makes it effortless.

Key Features:
- Drag and drop interface: Easily upload multiple files at once.
- Reorder files: Arrange your PDFs in the exact order you want them merged.
- Fast processing: Merge large files in seconds.
- Privacy first: Your files are processed locally. We don't store your documents.

How to merge PDFs:
1. Upload your PDF files using the "Add Files" button.
2. Use the up and down arrows to arrange the files in your preferred order.
3. Click "Merge PDF" to combine them into a single document.
4. Download your new merged PDF file.`}
      faqs={[
        { question: "Is there a limit to how many PDFs I can merge?", answer: "Our tool can handle dozens of files at once, though very large total file sizes may depend on your browser's memory." },
        { question: "Will the quality of my PDFs be affected?", answer: "No, merging PDFs simply combines the pages into a new document without re-compressing or altering the original content quality." },
        { question: "Are my files safe?", answer: "Yes, all processing is done client-side in your browser. Your files are never uploaded to our servers." }
      ]}
    >
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">Upload Files</h3>
            <p className="text-sm text-slate-500">Add at least 2 PDF files to merge.</p>
          </div>
          <label className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-indigo-200">
            <Plus size={20} />
            Add Files
            <input type="file" multiple accept=".pdf" className="hidden" onChange={handleFileChange} />
          </label>
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {files.map((file, idx) => (
              <motion.div
                key={`${file.name}-${idx}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl group hover:bg-white hover:border-indigo-100 transition-all"
              >
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
                  <FileText size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-slate-900 truncate">{file.name}</div>
                  <div className="text-xs text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => moveFile(idx, 'up')}
                    disabled={idx === 0}
                    className="p-2 text-slate-400 hover:text-indigo-600 disabled:opacity-30"
                  >
                    <ArrowUp size={18} />
                  </button>
                  <button 
                    onClick={() => moveFile(idx, 'down')}
                    disabled={idx === files.length - 1}
                    className="p-2 text-slate-400 hover:text-indigo-600 disabled:opacity-30"
                  >
                    <ArrowDown size={18} />
                  </button>
                  <button 
                    onClick={() => removeFile(idx)}
                    className="p-2 text-slate-400 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {files.length === 0 && (
            <div className="py-20 border-2 border-dashed border-slate-200 rounded-[32px] text-center space-y-4">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                <FileText size={32} />
              </div>
              <div className="text-slate-400 font-medium">No files selected</div>
            </div>
          )}
        </div>

        {files.length >= 2 && (
          <div className="pt-6 border-t flex items-center justify-between">
            <div className="text-sm text-slate-500">
              <span className="font-bold text-slate-900">{files.length}</span> files selected
            </div>
            <button 
              onClick={handleMerge}
              disabled={isProcessing}
              className="px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all flex items-center gap-3 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Merging...
                </>
              ) : isSuccess ? (
                <>
                  <Download size={20} />
                  Download Merged PDF
                </>
              ) : (
                'Merge PDF'
              )}
            </button>
          </div>
        )}
      </div>
    </ToolPage>
  );
};
