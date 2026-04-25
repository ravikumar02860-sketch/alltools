import React from 'react';
import { ToolPage } from '@/src/components/ToolPage';
import { FileText, Plus, Trash2, ArrowUp, ArrowDown, Download, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PDFDocument } from 'pdf-lib';

export const MergePdf: React.FC = () => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [mergedBlob, setMergedBlob] = React.useState<Blob | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
      setMergedBlob(null);
      setIsSuccess(false);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setMergedBlob(null);
    setIsSuccess(false);
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...files];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newFiles.length) {
      [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]];
      setFiles(newFiles);
      setMergedBlob(null);
      setIsSuccess(false);
    }
  };

  const handleMerge = async () => {
    if (files.length < 2) return;
    setIsProcessing(true);
    
    try {
      const mergedPdf = await PDFDocument.create();
      
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }
      
      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setMergedBlob(blob);
      setIsSuccess(true);
    } catch (error) {
      console.error('Error merging PDFs:', error);
      alert('An error occurred while merging PDFs. Please check your files.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (mergedBlob) {
      const url = URL.createObjectURL(mergedBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'merged.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <ToolPage
      toolId="merge-pdf"
      category="pdf"
      title="Merge PDF Online - Combine PDF Files for Free"
      description="Combine multiple PDF files into one document in seconds. Our free online PDF merger is easy to use, secure, and works directly in your browser without any software installation."
      keywords={['merge pdf online', 'combine pdf files', 'join pdf documents', 'free pdf merger', 'online pdf joiner', 'merge multiple pdfs', 'pdf binder']}
      longDescription={`Merging PDF files is a common task for professionals, students, and businesses alike. Whether you're combining monthly reports, gathering receipts for taxes, or organizing research papers into a single document, our Merge PDF tool makes the process effortless and fast.

### Why Use Our Online PDF Merger?
Our tool is designed to be the most user-friendly and secure PDF binder available online. Unlike other services, we prioritize your privacy and speed.

- **Drag and Drop Interface**: Easily upload multiple files at once from your computer or mobile device.
- **Complete Control**: Arrange your PDFs in the exact order you want them merged using our intuitive up/down arrows.
- **No Software Needed**: Everything happens in your web browser. No need to download bulky software like Adobe Acrobat.
- **Privacy First**: Your files are processed locally using JavaScript. This means your sensitive documents never leave your computer and are never stored on our servers.
- **100% Free**: No hidden costs, no watermarks, and no registration required.

### How to Merge PDFs in 3 Simple Steps:
1. **Add Your Files**: Click the "Add Files" button to select the PDF documents you want to combine.
2. **Organize**: Use the arrows to reorder the files. The top file will be the first page of your new document.
3. **Merge & Download**: Click the "Merge PDF" button. Once processed, your new combined PDF will be ready for instant download.`}
      faqs={[
        { question: "Is there a limit to how many PDFs I can merge?", answer: "Our tool can handle dozens of files at once. While there is no hard limit on the number of files, merging extremely large documents (hundreds of MBs) may depend on your browser's available memory." },
        { question: "Will the quality of my PDFs be affected after merging?", answer: "No, merging PDFs simply combines the pages into a new document. It does not re-compress or alter the original content, so your images and text will remain as sharp as the original." },
        { question: "Are my sensitive documents safe with Tooolify?", answer: "Absolutely. We use client-side technology to process your files. This means the merging happens on your device, not our server. Your data never touches our backend, ensuring 100% privacy." },
        { question: "Can I merge PDFs on my mobile phone?", answer: "Yes! Tooolify is fully responsive and works perfectly on iPhones, Android devices, and tablets. You can merge files directly from your mobile storage or cloud drives." }
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
              onClick={isSuccess ? handleDownload : handleMerge}
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
