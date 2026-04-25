import React from 'react';
import { ToolPage } from '../../components/ToolPage';
import { 
  Image as ImageIcon, 
  Download, 
  Trash2, 
  Settings2, 
  Maximize, 
  Minimize, 
  ShieldCheck, 
  Zap, 
  FileImage,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ImageFile {
  file: File;
  preview: string;
  name: string;
  originalSize: number;
  compressedSize?: number;
  status: 'idle' | 'processing' | 'done' | 'error';
  width?: number;
  height?: number;
  format: string;
}

export const ImageOptimizer: React.FC = () => {
  const [images, setImages] = React.useState<ImageFile[]>([]);
  const [quality, setQuality] = React.useState(0.8);
  const [targetWidth, setTargetWidth] = React.useState<number | ''>('');
  const [targetFormat, setTargetFormat] = React.useState<'original' | 'image/jpeg' | 'image/png' | 'image/webp'>('original');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages: ImageFile[] = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      originalSize: file.size,
      status: 'idle',
      format: file.type
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(images[index].preview);
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const optimizeImage = async (image: ImageFile, index: number) => {
    setImages(prev => {
      const next = [...prev];
      next[index].status = 'processing';
      return next;
    });

    try {
      const img = new Image();
      img.src = image.preview;
      await new Promise((resolve) => (img.onload = resolve));

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      const ratio = img.width / img.height;
      const width = targetWidth ? Number(targetWidth) : img.width;
      const height = targetWidth ? Number(targetWidth) / ratio : img.height;

      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);

      const mimeType = targetFormat === 'original' ? image.format : targetFormat;
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setImages(prev => {
              const next = [...prev];
              next[index] = {
                ...next[index],
                compressedSize: blob.size,
                preview: url,
                status: 'done'
              };
              return next;
            });
          }
        },
        mimeType,
        quality
      );
    } catch (error) {
      setImages(prev => {
        const next = [...prev];
        next[index].status = 'error';
        return next;
      });
    }
  };

  const processAll = () => {
    images.forEach((img, i) => {
      if (img.status !== 'done') optimizeImage(img, i);
    });
  };

  const downloadImage = (image: ImageFile) => {
    const link = document.createElement('a');
    link.href = image.preview;
    link.download = `optimized-${image.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ToolPage
      toolId="image-optimizer"
      category="image"
      title="Complete Image Optimizer & Converter"
      description="Compress, resize, and convert your images instantly. Reduce file size by up to 90% without losing quality. Support for JPG, PNG, and WebP."
      keywords={['image compressor', 'image resizer', 'png to jpg', 'jpg to png', 'webp to jpg', 'jpg to webp', 'bulk image optimizer', 'browser based converter']}
      longDescription={`
## Why Use Our Image Optimizer?

In today's digital landscape, website speed is critical. High-quality images are often the biggest culprit for slow page load times. Our **Image Optimizer & Converter** solves this problem by providing high-performance, lossless-style compression directly in your browser.

### Key Benefits:
- **SEO Boost**: Faster loading images result in better rankings on Google.
- **Conversion focused**: A faster site keeps users engaged and increases sales.
- **Privacy Guaranteed**: Your photos are processed locally using your device's GPU/CPU. They are **never** uploaded to any server.
- **Bulk Processing**: Optimize multiple images simultaneously to save time.
- **Format Flexibility**: Convert between PNG (lossless), JPG (universal), and WebP (next-gen) formats with one click.

### Professional Features:
- **Variable Compression**: Adjust the quality slider to find the perfect balance between file size and visual fidelity.
- **Smart Resizing**: Scale images to specific widths while maintaining aspect ratio perfectly.
- **Instant Previews**: See the file size reduction in real-time before you download.
- **Zero Watermarks**: Free for commercial and personal use with no strings attached.

### Recommended Settings:
- **For Blogs**: WebP format, 80% quality.
- **For Social Media**: JPG format, 90% quality.
- **For Logos**: PNG format (to maintain transparency).
      `}
      faqs={[
        { question: "Is this tool free for commercial use?", answer: "Yes, Tooolify's Image Optimizer is 100% free for both personal and commercial projects. No attribution required." },
        { question: "How does the 'Quality' slider work?", answer: "The quality slider controls the JPEG/WebP compression level. 80-90% is the 'sweet spot' where you get massive size reduction with no noticeable loss in quality." },
        { question: "Will my images be stored on your servers?", answer: "No. Unlike other converters, we use your browser's local processing capabilities. Your images never leave your computer." },
        { question: "What is WebP and why should I use it?", answer: "WebP is a modern image format that provides superior lossless and lossy compression. It can make your images up to 34% smaller than equivalent JPEGs." },
        { question: "Can I resize images as well?", answer: "Yes! Enter a target width in the settings panel, and the tool will automatically scale the image while preserving its original aspect ratio." }
      ]}
    >
      <div className="space-y-10">
        {/* Ad Space Header */}
        <div className="w-full h-24 bg-slate-50 border border-dashed border-slate-200 rounded-[32px] flex items-center justify-center text-[10px] font-black text-slate-300 uppercase tracking-widest overflow-hidden">
          <span>Google AdSense Area - Hero Leaderboard</span>
        </div>

        {/* Settings Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-slate-900 rounded-[32px] text-white">
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-400">
              <Settings2 size={14} /> Quality ({Math.round(quality * 100)}%)
            </label>
            <input 
              type="range" min="0.1" max="1.0" step="0.05"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] font-bold text-white/40">
              <span>Low (Tiny Size)</span>
              <span>High (Best Quality)</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-400">
              <Maximize size={14} /> Resize (Width)
            </label>
            <input 
              type="number" 
              placeholder="Keep Original"
              value={targetWidth}
              onChange={(e) => setTargetWidth(e.target.value ? Number(e.target.value) : '')}
              className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-sm font-bold outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-400">
              <FileImage size={14} /> Convert To
            </label>
            <select 
              value={targetFormat}
              onChange={(e) => setTargetFormat(e.target.value as any)}
              className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-sm font-bold outline-none focus:border-indigo-500"
            >
              <option value="original" className="bg-slate-900">Keep Original Format</option>
              <option value="image/jpeg" className="bg-slate-900">JPG (Smallest)</option>
              <option value="image/png" className="bg-slate-900">PNG (Best for Logos)</option>
              <option value="image/webp" className="bg-slate-900">WebP (Next-Gen)</option>
            </select>
          </div>
        </div>

        {/* Upload Area */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="group relative cursor-pointer"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-[40px] blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
          <div className="relative border-4 border-dashed border-slate-100 rounded-[40px] p-12 md:p-20 flex flex-col items-center justify-center space-y-6 hover:border-indigo-200 hover:bg-indigo-50/10 transition-all">
            <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
              <ImageIcon size={40} />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-black text-slate-900 mb-2">Drop Images Here</h3>
              <p className="text-slate-500 font-medium">Supports JPG, PNG, WebP & SVG. Max 20MB per file.</p>
            </div>
            <button className="px-8 py-3 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-200">
              Select Photos
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              multiple 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileSelect}
            />
          </div>
        </div>

        {/* Image Grid */}
        <AnimatePresence>
          {images.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-900">Image Queue ({images.length})</h3>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setImages([])}
                    className="text-sm font-bold text-red-500 hover:underline flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Clear All
                  </button>
                  <button 
                    onClick={processAll}
                    className="px-6 py-2 bg-emerald-600 text-white font-black rounded-xl text-sm shadow-lg shadow-emerald-100"
                  >
                    Optimize All
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {images.map((img, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-4 bg-white border border-slate-100 rounded-3xl flex items-center gap-6 shadow-sm group hover:border-indigo-100 transition-colors"
                  >
                    <div className="w-20 h-20 bg-slate-50 rounded-2xl overflow-hidden shrink-0">
                      <img src={img.preview} alt={img.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-black text-slate-900 truncate mb-1">{img.name}</div>
                      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <span>Original: {formatSize(img.originalSize)}</span>
                        {img.compressedSize && (
                          <>
                            <span className="text-slate-200">|</span>
                            <span className="text-emerald-600">Saved: {Math.round((1 - img.compressedSize/img.originalSize)*100)}%</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {img.status === 'processing' && (
                        <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                      )}
                      {img.status === 'done' && (
                        <button 
                          onClick={() => downloadImage(img)}
                          className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all"
                        >
                          <Download size={20} />
                        </button>
                      )}
                      {img.status === 'idle' && (
                        <button 
                          onClick={() => optimizeImage(img, i)}
                          className="px-4 py-2 bg-indigo-50 text-indigo-600 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
                        >
                          Optimize
                        </button>
                      )}
                      <button 
                        onClick={() => removeImage(i)}
                        className="p-3 text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* Ad Space Footer */}
        <div className="w-full h-40 bg-slate-50 border border-dashed border-slate-200 rounded-[48px] flex items-center justify-center text-[10px] font-black text-slate-300 uppercase tracking-widest overflow-hidden">
          <span>Related content / Ad Space - Native Footer Multiplier</span>
        </div>

        {/* Features Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
          <div className="p-8 bg-indigo-50/50 rounded-[40px] border border-indigo-100/50 space-y-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
              <ShieldCheck size={24} />
            </div>
            <h4 className="text-xl font-black text-slate-900 tracking-tight">Zero-Server Trust</h4>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              We never see your photos. All optimization happens using browser Web APIs for 100% data residency and safety.
            </p>
          </div>
          <div className="p-8 bg-emerald-50/50 rounded-[40px] border border-emerald-100/50 space-y-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
              <Zap size={24} />
            </div>
            <h4 className="text-xl font-black text-slate-900 tracking-tight">Multi-Threaded Output</h4>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              Process unlimited photos at once with zero lag. Our engine utilizes your device's full power for rapid delivery.
            </p>
          </div>
          <div className="p-8 bg-amber-50/50 rounded-[40px] border border-amber-100/50 space-y-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-600 shadow-sm">
              <CheckCircle2 size={24} />
            </div>
            <h4 className="text-xl font-black text-slate-900 tracking-tight">Format Perfection</h4>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              Perfectly optimized outputs for Google Search, Shopify, Wordpress, and all modern web frameworks.
            </p>
          </div>
        </div>
      </div>
    </ToolPage>
  );
};
