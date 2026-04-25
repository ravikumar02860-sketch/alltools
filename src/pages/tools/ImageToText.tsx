import React from 'react';
import { ToolPage } from '../../components/ToolPage';
import { 
  Image as ImageIcon, 
  FileText, 
  Copy, 
  Check, 
  Loader2, 
  Trash2, 
  Languages, 
  Download,
  AlertCircle,
  ScanText,
  Zap,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { createWorker } from 'tesseract.js';

export const ImageToText: React.FC = () => {
  const [image, setImage] = React.useState<string | null>(null);
  const [text, setText] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [copied, setCopied] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setText('');
        setProgress(0);
      };
      reader.readAsDataURL(file);
    }
  };

  const recognizeText = async () => {
    if (!image) return;
    setIsProcessing(true);
    setText('');
    
    try {
      const worker = await createWorker('eng', 1, {
        logger: m => {
          if (m.status === 'recognizing text') {
            setProgress(m.progress * 100);
          }
        },
      });
      const { data: { text: result } } = await worker.recognize(image);
      setText(result);
      await worker.terminate();
    } catch (error) {
      console.error('OCR Error:', error);
      alert('Failed to process image. Please try another one.');
    } finally {
      setIsProcessing(false);
      setProgress(100);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadText = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'extracted-text.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setImage(null);
    setText('');
    setProgress(0);
    setIsProcessing(false);
  };

  return (
    <ToolPage
      toolId="image-to-text"
      category="image"
      title="Free Online OCR: Image to Text Converter"
      description="Extract text from images (JPG, PNG, WEBP) instantly using our free online OCR tool. High accuracy, no signup required."
      keywords={['image to text', 'ocr online', 'extract text from image', 'png to text', 'jpg to text', 'free ocr tool', 'image to word', 'photo text scanner']}
      longDescription={`
## Extract Text from Any Image with Precision

Stop retyping! Our **Image to Text converter** uses advanced Optical Character Recognition (OCR) technology to scan photos, documents, and screenshots for text. Whether it's a blurry receipt, a textbook page, or a complex data table, we turn pixels into editable strings in seconds.

### Why Use Our OCR Tool?

- **100% Free & Fast**: No daily limits, no annoying captcha checks. Just upload and extract.
- **Privacy First**: Your image is processed directly in the worker thread. We don't store your sensitive documents.
- **High Accuracy**: Our engine handles various fonts and layouts with superior recognition.
- **Cross-Platform**: Works on mobile, tablets, and desktops via any modern browser.

### How it Works:
1.  **Upload**: Drag or choose an image containing text.
2.  **Scan**: Our AI-driven OCR engine analyzes every character.
3.  **Refine**: Copy the plain text or download it as a .txt file for your records.

### Perfect For:
- **Students**: Quickly digitize lecture notes and book citations.
- **Developers**: Extract code snippets from video tutorials or screenshots.
- **Office Workers**: Convert scanned PDFs or physical memos into editable reports.
- **Translate**: Copy text from foreign language signs and paste into a translator.

## Best Results Tip
For the highest accuracy, ensure your image is:
- **Well Lit**: Avoid shadows over the text.
- **High Contrast**: Dark text on a light background works best.
- **Straight**: Try not to tilt the camera when taking the photo.
      `}
      faqs={[
        { question: "What image formats are supported?", answer: "We support the most common web formats including JPG, JPEG, PNG, and WEBP." },
        { question: "Is my data secure?", answer: "Absolutely. The processing happens in your browser session. Your images never leave your local environment to a central database." },
        { question: "Can it recognize handwriting?", answer: "While standard OCR is optimized for printed text, it can recognize clear, legible handwriting with moderate accuracy." },
        { question: "Is there a file size limit?", answer: "To ensure fast processing in your browser, we recommend images under 15MB." }
      ]}
    >
      <div className="space-y-10">
        {/* Tool Header UI */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[40px] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          <div className="relative bg-white border border-slate-100 rounded-[40px] p-8 md:p-12 shadow-sm overflow-hidden">
            
            {!image ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-4 border-dashed border-slate-100 rounded-[32px] p-12 md:p-20 flex flex-col items-center justify-center text-center space-y-6 hover:border-indigo-100 hover:bg-indigo-50/10 transition-all cursor-pointer group/upload"
              >
                <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 group-hover/upload:scale-110 transition-transform">
                  <ScanText size={40} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900">Image to Text (OCR)</h3>
                  <p className="text-slate-500 font-medium max-w-sm">Tap to select or drag & drop an image to start extracting text</p>
                </div>
                <button className="px-8 py-3.5 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/30">
                  Select Image
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left Side: Preview & Controls */}
                <div className="space-y-6">
                  <div className="relative aspect-video bg-slate-50 rounded-[32px] border border-slate-100 overflow-hidden flex items-center justify-center group/preview">
                    <img src={image} alt="Preview" className="max-w-full max-h-full object-contain" />
                    <button 
                      onClick={reset}
                      className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur text-red-500 rounded-xl shadow-sm border border-slate-100 opacity-0 group-hover/preview:opacity-100 transition-opacity"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {!isProcessing && !text && (
                    <button 
                      onClick={recognizeText}
                      className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3"
                    >
                      <Zap size={20} fill="currentColor" />
                      Extract Text Now
                    </button>
                  )}

                  {isProcessing && (
                    <div className="space-y-4">
                      <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          className="h-full bg-indigo-500"
                        />
                      </div>
                      <div className="flex justify-between items-center text-xs font-black text-slate-400 uppercase tracking-widest">
                        <span>Scanning Pixels...</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Side: Results */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Extracted Content</label>
                    {text && (
                      <div className="flex gap-2">
                        <button 
                          onClick={handleCopy}
                          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all"
                        >
                          {copied ? <Check size={14} /> : <Copy size={14} />}
                          {copied ? 'Copied' : 'Copy'}
                        </button>
                        <button 
                          onClick={downloadText}
                          className="p-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-all"
                        >
                          <Download size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <textarea 
                      value={text}
                      readOnly
                      placeholder="Your extracted text will appear here..."
                      className="w-full h-[400px] p-6 bg-slate-50 border border-slate-100 rounded-[32px] font-mono text-sm resize-none focus:outline-none"
                    />
                    {!text && !isProcessing && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 space-y-2 pointer-events-none">
                        <FileText size={48} />
                        <span className="text-xs font-black uppercase tracking-tighter">Waiting for scan</span>
                      </div>
                    )}
                    {isProcessing && (
                      <div className="absolute inset-0 bg-slate-50/50 backdrop-blur-[2px] flex flex-col items-center justify-center space-y-4 rounded-[32px]">
                        <Loader2 size={40} className="text-indigo-600 animate-spin" />
                        <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">OCR Engine Active</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Informational Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: ShieldCheck, title: 'Private & Local', desc: 'Processing happens in your browser. We never see your images.' },
            { icon: Sparkles, title: 'AI Driven', desc: 'Optimized engines for high-accuracy character recognition.' },
            { icon: Languages, title: 'Support for Eng', desc: 'Optimized for English text extraction from various sources.' }
          ].map((item, i) => (
            <div key={i} className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 space-y-4">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                <item.icon size={26} />
              </div>
              <h4 className="text-xl font-black text-slate-900 tracking-tight">{item.title}</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </ToolPage>
  );
};
