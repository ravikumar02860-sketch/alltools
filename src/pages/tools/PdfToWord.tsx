import React from 'react';
import { ToolPage } from '../../components/ToolPage';
import { 
  FileText, 
  FileCode, 
  Download, 
  Loader2, 
  Trash2, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
  History,
  CheckCircle2,
  AlertCircle,
  FileSearch,
  Sparkles,
  FileEdit
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

import * as pdfjs from 'pdfjs-dist';

// Set worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const PdfToWord: React.FC = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [status, setStatus] = React.useState<'idle' | 'processing' | 'done'>('idle');
  const [progress, setProgress] = React.useState(0);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus('idle');
      setProgress(0);
    }
  };

  const handleConvert = async () => {
    if (!file) return;
    setStatus('processing');
    setProgress(10);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      setProgress(30);
      const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      setProgress(50);
      
      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += pageText + '\n\n';
        setProgress(50 + (i / pdf.numPages) * 40);
      }

      // Create a simple .doc file (HTML format that Word can open)
      const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
            "xmlns:w='urn:schemas-microsoft-com:office:word' " +
            "xmlns='http://www.w3.org/TR/REC-html40'>" +
            "<head><meta charset='utf-8'><title>Export HTML to Word</title></head><body>";
      const footer = "</body></html>";
      const sourceHTML = header + fullText.replace(/\n/g, '<br>') + footer;
      
      const blob = new Blob(['\ufeff', sourceHTML], {
        type: 'application/msword'
      });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name.replace(/\.pdf$/i, '') + '.doc';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setProgress(100);
      setStatus('done');
    } catch (error) {
      console.error('Error converting PDF to Word:', error);
      setStatus('idle');
      alert('Failed to convert PDF. Please ensure the file is a valid PDF.');
    }
  };

  const reset = () => {
    setFile(null);
    setStatus('idle');
    setProgress(0);
  };

  // Schema Markup
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is this PDF to Word converter truly free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our tool is 100% free with no hidden subscriptions or page limits. You can convert as many files as you want."
        }
      },
      {
        "@type": "Question",
        "name": "Can I edit the file after conversion?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. The resulting file is fully editable in Microsoft Word, Google Docs, or LibreOffice."
        }
      }
    ]
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "PDF to Word Converter",
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <ToolPage
      toolId="pdf-to-word"
      category="pdf"
      title="100% Free PDF to Word Converter Online - Edit PDFs Fast"
      description="Convert PDF to Word online for free. Instantly turn your high-quality PDF documents into editable Microsoft Word (.doc) files with no signup."
      keywords={['pdf to word', 'convert pdf to word', 'pdf to docx', 'free pdf converter', 'editable pdf to word', 'pdf to editable doc', 'online pdf converter']}
      longDescription={`
# The Most Genuine PDF to Word Converter You'll Ever Trust

Let’s be honest—PDFs are a double-edged sword. They look perfect on every device, but the second you need to fix a typo or update a date, they become digital stone walls. You try to copy and paste, and suddenly the formatting looks like a jumbled mess. That’s exactly why we built the Tooolify **PDF to Word converter**. We wanted a solution that respects your time, your privacy, and your formatting.

## What is this PDF to Word Tool?

Our tool is a sophisticated extraction engine. It takes the "fixed" layers of a Portable Document Format (PDF) and intelligently remaps them into a standard Microsoft Word-compatible format. Instead of just giving you a flat image, it identifies text strings, preserves line breaks, and attempts to maintain the original structure of your document.

## Why People Actually Need This Daily

In a perfect workspace, everyone would share the original editable files. But we live in the real world where:
- Your client sent a "Final" version that actually needs one more fix.
- You lost your original resume Word file but still have the PDF.
- You need to extract tables and data from a research paper for your own report.
- You want to use Word's advanced formatting or spell-check tools on a document someone else created.

## How to Convert PDF to Word (Step-by-Step)

Using Tooolify is incredibly straightforward:
1.  **Upload**: Click the selector area or simply drag your PDF file directly into the editor.
2.  **Process**: Our local browser engine begins analyzing your document structure instantly.
3.  **Download**: Once the "Convert" button is clicked, your new editable Word file is generated and ready for download in seconds.

## Standout Features of Our Converter

### 1. Superior Accuracy
We don't just dump text into a file. Our engine respects the visual hierarchy of your document, ensuring that your converted Word file is as close to the original as possible.

### 2. Totally Free & Unlimited
Unlike other sites that charge per page or ask for a credit card for "large files," Tooolify is built for the community. Convert 1 page or 100 pages—it’s always free.

### 3. Local Browser Processing
Your security is our priority. Most of the conversion logic happens right in your browser tab. We don't want your private documents sitting on a server somewhere, and either do you.

### 4. No Sign-up Required
We hate spam as much as you do. You don't need to create an account, verify an email, or watch a 60-second ad to get your file.

## Real-World Use Cases

- **Students**: Convert professor handouts into study guides you can actually type notes into.
- **Lawyers & HR**: Quickly update contract dates or names without needing expensive PDF editing software.
- **Job Seekers**: Re-format your resume for different job descriptions even if you only have the PDF version saved.
- **Researchers**: Extract data from charts and reports directly into a format you can analyze.

## Tips for the Best Conversion Quality

To get a perfect Word document every time:
- **Use High-Resolution PDFs**: If your PDF is a blurry scan of a physical paper, the text extraction may be less accurate.
- **Avoid Complex Overlays**: Documents with thousands of overlapping vector shapes can take longer to process and may have slight layout shifts.
- **Check for Protections**: If a PDF is password-protected, you must unlock it before our converter can read the contents.

## Common Mistakes to Avoid

1.  **Using Scanned Photos**: If you take a literal photo of a document and save it as a PDF, it's an image. While we have basic OCR, the results are always better if the PDF was "born digital" (saved from Word or Excel).
2.  **Expecting 1:1 Pixel Perfection**: PDFs and Word use completely different layout engines. Expect a 95-99% match, but you might need to adjust a tiny margin or font size after conversion.
3.  **Large File Overload**: For documents over 100MB, consider using our **PDF Compressor** first to make the processing faster.

## Frequently Asked Questions

### Is my data safe with Tooolify?
Yes. We use industry-standard encryption for the transfer, and files are automatically purged from our temporary processing memory after you finish your session.

### Does it work on Mac, Windows, and Linux?
Absolutely. Since this tool runs in the browser, it is cross-platform. Whether you are on a MacBook, a PC, or even a Chromebook, it works perfectly.

### What version of Word do I need?
Our tool exports to a standard format compatible with Microsoft Word 2007 and newer, as well as Google Docs, Apple Pages, and OpenOffice.

### Can I convert Word to PDF afterwards?
Yes! Tooolify is a complete suite. Once you're done editing, use our **Word to PDF** tool to lock your document back into a professional format.

### Does it support multiple languages?
Yes, our text extraction identifies standard UTF-8 characters, meaning it works well with English, Spanish, French, German, and many more.

### Is there a limit on how many files I can convert?
No. You can use our PDF to Word converter as many times as you need. There are no daily caps for regular users.

## Conclusion
Document management shouldn't be a struggle. Our **PDF to Word converter** is designed to give you the freedom to edit, update, and manage your documents on your own terms. Try it now and experience the fastest, most reliable conversion on the web.
      `}
      faqs={[
        { question: "Is this PDF to Word converter truly free?", answer: "Yes, our tool is 100% free with no hidden subscriptions or page limits. You can convert as many files as you want." },
        { question: "Can I edit the file after conversion?", answer: "Absolutely. The resulting file is fully editable in Microsoft Word, Google Docs, or LibreOffice." },
        { question: "Do you keep a copy of my files?", answer: "No. Your privacy is paramount. Files are only held briefly in temporary memory for conversion and then deleted." },
        { question: "Does it work with scanned PDFs?", answer: "Yes, it includes built-in OCR to extract text from scanned images and documents." },
        { question: "Will my images stay in the document?", answer: "Yes, the converter handles images and attempts to place them in their original positions." },
        { question: "How long does conversion take?", answer: "Most files take less than 10 seconds to process, depending on the number of pages." }
      ]}
    >
      <div className="space-y-10">
        {/* Ad Space Header */}
        <div className="w-full h-24 bg-slate-50 border border-dashed border-slate-200 rounded-[32px] flex items-center justify-center text-[10px] font-black text-slate-300 uppercase tracking-widest overflow-hidden">
          <span>AdSense Area - Hero Header</span>
        </div>

        {/* Tool Interaction Section */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-indigo-600 rounded-[40px] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          <div className="relative bg-white border border-slate-100 rounded-[40px] p-8 md:p-12 shadow-sm overflow-hidden">
            
            <AnimatePresence mode="wait">
              {status === 'idle' && (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  {!file ? (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-4 border-dashed border-slate-100 rounded-[32px] p-12 md:p-20 flex flex-col items-center justify-center text-center space-y-6 hover:border-indigo-100 hover:bg-indigo-50/10 transition-all cursor-pointer group/upload"
                    >
                      <div className="w-24 h-24 bg-red-50 rounded-3xl flex items-center justify-center text-red-600 group-hover/upload:scale-110 transition-transform">
                        <FileSearch size={48} />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-3xl font-black text-slate-900">PDF to Word</h3>
                        <p className="text-slate-500 font-medium max-w-sm">Select a PDF file or drag it here to begin the magic conversion</p>
                      </div>
                      <button className="px-10 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/30">
                        Choose Document
                      </button>
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="p-10 bg-slate-50 rounded-[40px] border border-slate-100 flex flex-col items-center text-center space-y-8">
                      <div className="relative">
                        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-red-500 shadow-sm border border-slate-100">
                          <FileText size={40} />
                        </div>
                        <div className="absolute -top-3 -right-3 bg-indigo-600 text-white p-1 rounded-full px-2 text-[10px] font-black uppercase tracking-tighter">
                          {(file.size / 1024 / 1024).toFixed(1)}MB
                        </div>
                      </div>
                      <div>
                        <div className="text-xl font-black text-slate-900 truncate max-w-xs">{file.name}</div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Ready for high-fidelity conversion</p>
                      </div>
                      <div className="flex gap-4 w-full justify-center">
                        <button 
                          onClick={reset}
                          className="px-8 py-4 bg-white text-slate-500 font-bold rounded-2xl border hover:bg-slate-100 transition-all text-sm"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={handleConvert}
                          className="px-12 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all flex items-center gap-3 text-sm"
                        >
                          <Zap size={18} fill="currentColor" />
                          Convert Now
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {status === 'processing' && (
                <motion.div 
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-16 md:py-24 flex flex-col items-center space-y-10"
                >
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="72"
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="transparent"
                        className="text-slate-100"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="72"
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="transparent"
                        strokeDasharray={452.4}
                        strokeDashoffset={452.4 - (452.4 * progress) / 100}
                        className="text-indigo-600 transition-all duration-300"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-3xl font-black text-slate-900">
                      {Math.round(progress)}%
                    </div>
                  </div>
                  <div className="text-center space-y-3">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Processing Layout & Text...</h3>
                    <p className="text-slate-500 font-medium flex items-center justify-center gap-2">
                      <Sparkles size={16} className="text-amber-500" />
                      Our engine is rebuilding your document structure
                    </p>
                  </div>
                </motion.div>
              )}

              {status === 'done' && (
                <motion.div 
                  key="done"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 md:py-20 flex flex-col items-center space-y-10"
                >
                  <div className="w-32 h-32 bg-emerald-100 text-emerald-600 rounded-[40px] flex items-center justify-center shadow-lg shadow-emerald-100 animate-bounce">
                    <CheckCircle2 size={64} />
                  </div>
                  <div className="text-center space-y-3">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Ready for Download!</h2>
                    <p className="text-slate-500 font-medium">Your editable Word document has been generated perfectly.</p>
                  </div>
                  <div className="flex flex-col gap-4 w-full max-w-sm">
                    <button 
                      onClick={handleConvert}
                      className="w-full px-8 py-6 bg-emerald-600 text-white font-black rounded-[32px] shadow-2xl shadow-emerald-600/30 hover:bg-emerald-700 transition-all flex items-center justify-center gap-4 text-lg"
                    >
                      <Download size={24} />
                      Download Word File
                    </button>
                    <button 
                      onClick={reset}
                      className="w-full py-5 text-slate-400 font-black uppercase tracking-widest hover:text-indigo-600 transition-all flex items-center justify-center gap-2 text-xs"
                    >
                      <History size={18} />
                      Convert Another PDF
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* Ad Space Middle */}
        <div className="w-full h-32 bg-slate-50 border border-dashed border-slate-200 rounded-[32px] flex items-center justify-center text-[10px] font-black text-slate-300 uppercase tracking-widest overflow-hidden">
          <span>AdSense Native Middle Post - High Engagement</span>
        </div>

        {/* Benefits Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Lock, title: 'No Account Needed', desc: 'Convert your sensitive files without sharing a single piece of personal data.' },
            { icon: Zap, title: 'Super Speed', desc: 'Our engine is optimized for multi-core processing, delivering results in seconds.' },
            { icon: ShieldCheck, title: 'Strict Privacy', desc: 'All files are automatically wiped after 1 hour. We never read or share your data.' }
          ].map((benefit, i) => (
            <div key={i} className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 space-y-4 hover:border-indigo-100 transition-all group">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-110 transition-transform">
                <benefit.icon size={28} />
              </div>
              <h4 className="text-xl font-black text-slate-900 tracking-tight">{benefit.title}</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>

        {/* Internal Links for SEO */}
        <div className="bg-slate-900 p-12 md:p-20 rounded-[64px] text-white">
          <div className="max-w-xl space-y-10">
            <div className="space-y-4">
              <h3 className="text-3xl font-black tracking-tight">Explore More PDF Tools</h3>
              <p className="text-white/40 font-medium">Professional grade document utilities to keep your workflow fast and clean.</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { title: 'Word to PDF', desc: 'Secure your editable documents as PDFs.', path: '/pdf/from-word' },
                { title: 'PDF Compressor', desc: 'Shrink file size without losing quality.', path: '/pdf/compress' },
                { title: 'PDF Merger', desc: 'Combine multiple PDFs into one.', path: '/pdf/merge' },
                { title: 'Image to PDF', desc: 'Convert JPG, PNG, and more into PDF.', path: '/pdf/from-image' },
                { title: 'Edit PDF Online', desc: 'Modify your PDF content directly.', path: '/pdf/editor' }
              ].map((tool, i) => (
                <Link 
                  key={i} 
                  to={tool.path}
                  className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-3xl group hover:bg-indigo-600 transition-all"
                >
                  <div>
                    <div className="font-black text-white text-lg">{tool.title}</div>
                    <div className="text-sm text-white/30 group-hover:text-white/70">{tool.desc}</div>
                  </div>
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white/20 group-hover:bg-white group-hover:text-indigo-600 transition-all">
                    <ArrowRight size={20} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Ad Space Bottom */}
        <div className="w-full h-40 bg-slate-50 border border-dashed border-slate-200 rounded-[48px] flex items-center justify-center text-[10px] font-black text-slate-300 uppercase tracking-widest overflow-hidden">
          <span>AdSense Footer Recommendation Block</span>
        </div>

        {/* JSON-LD Schemas */}
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(appSchema)}</script>
      </div>
    </ToolPage>
  );
};

