import React from 'react';
import { ToolPage } from '../../components/ToolPage';
import { 
  Image as ImageIcon, 
  RefreshCw, 
  Download, 
  Trash2, 
  ArrowRight,
  Monitor,
  Smartphone,
  ChevronRight,
  CheckCircle2,
  Zap,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Format = 'png' | 'jpeg' | 'webp';

export const ImageConverter: React.FC = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [targetFormat, setTargetFormat] = React.useState<Format>('png');
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [quality, setQuality] = React.useState(0.9);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const convertImage = async () => {
    if (!imagePreview || !file) return;
    setIsProcessing(true);

    try {
      const img = new Image();
      img.src = imagePreview;
      await new Promise((resolve) => { img.onload = resolve; });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      ctx.drawImage(img, 0, 0);

      const mimeType = `image/${targetFormat}`;
      const dataUrl = canvas.toDataURL(mimeType, quality);
      
      const link = document.createElement('a');
      const filename = file.name.split('.').slice(0, -1).join('.') + `.${targetFormat}`;
      link.href = dataUrl;
      link.download = filename;
      link.click();
    } catch (error) {
      console.error('Conversion error:', error);
      alert('Failed to convert image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setImagePreview(null);
    setIsProcessing(false);
  };

  return (
    <ToolPage
      toolId="image-converter"
      category="image"
      title="Free Image Converter: JPG, PNG, WEBP Online"
      description="Convert your images to JPG, PNG, or WEBP instantly. Fast, free, and secure browser-based image conversion without loss of quality."
      keywords={['image converter', 'jpg to png', 'png to webp', 'convert webp to jpg', 'online image converter', 'free image tool', 'batch image conversion']}
      longDescription={`
## Versatile Image Conversion for Every Need

Need a specific file format for your website, app, or social media? Our **Image Converter** is the ultimate lightweight solution. We move beyond simple format changes to ensure your images are optimized for their intended use.

### Why Use Our Image Converter?

- **Zero Server Uploads**: Your images are processed directly in your browser using the HTML5 Canvas API. This means maximum speed and absolute privacy.
- **Superior Quality**: Control the output quality for JPEG and WEBP formats to find the perfect balance between file size and visual fidelity.
- **Modern Formats**: Easily convert older JPEG/PNG files into high-performance **WEBP** format, which is recommended by Google for faster web loading times.
- **Cross-Platform**: Whether you're on a Mac, PC, iPhone, or Android, our tool works seamlessly without requiring any software installation.

### How to Convert Images:
1.  **Drop Your File**: Select or drag an image into the workspace.
2.  **Select Format**: Choose between PNG (Lossless), JPEG (Compatible), or WEBP (Modern).
3.  **Adjust Quality**: For JPEG and WEBP, use the slider to optimize file size.
4.  **Download**: Click Convert and get your new file in a heart-beat.

### When to Use Each Format:
- **PNG**: Best for graphics with transparency or when you need 100% lossless quality.
- **JPEG**: Ideal for photographs where you want a small file size with good compatibility across all devices.
- **WEBP**: The gold standard for modern web performance, offering much smaller file sizes than JPEG or PNG at comparable quality.
      `}
      faqs={[
        { question: "Is this tool truly free?", answer: "Yes, our image converter is 100% free with no hidden paywalls or watermarks on your converted images." },
        { question: "Does it support bulk conversion?", answer: "Currently, we focus on high-fidelity single file conversion to ensure stability, but you can process multiple files sequentially very quickly." },
        { question: "Will my images be private?", answer: "Your images never leave your computer. All conversion logic runs locally in your browser memory." },
        { question: "Does quality adjustment work for PNG?", answer: "No, PNG is a lossless format, so quality sliders only apply to lossy formats like JPEG and WEBP." }
      ]}
    >
      <div className="space-y-10">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-[40px] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          <div className="relative bg-white border border-slate-100 rounded-[40px] p-8 md:p-12 shadow-sm overflow-hidden">
            
            {!file ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-4 border-dashed border-slate-100 rounded-[32px] p-12 md:p-20 flex flex-col items-center justify-center text-center space-y-6 hover:border-emerald-100 hover:bg-emerald-50/10 transition-all cursor-pointer group/upload"
              >
                <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-600 group-hover/upload:scale-110 transition-transform">
                  <ImageIcon size={40} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900">Image Format Converter</h3>
                  <p className="text-slate-500 font-medium max-w-sm">Upload an image to convert it between PNG, JPG, or WEBP formats</p>
                </div>
                <button className="px-8 py-3.5 bg-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-600/30">
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
                {/* Left: Image Info */}
                <div className="space-y-8">
                  <div className="relative aspect-square bg-slate-50 rounded-[40px] border border-slate-100 overflow-hidden flex items-center justify-center group/preview">
                    {imagePreview && (
                      <img src={imagePreview} alt="Preview" className="max-w-full max-h-full object-contain" />
                    )}
                    <button 
                      onClick={reset}
                      className="absolute top-6 right-6 p-2.5 bg-white/90 backdrop-blur text-red-500 rounded-2xl shadow-sm border border-slate-100 opacity-0 group-hover/preview:opacity-100 transition-opacity"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400">
                        <Monitor size={24} />
                      </div>
                      <div>
                        <div className="font-black text-slate-900 text-sm truncate max-w-[150px]">{file.name}</div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Original Format</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-slate-900 text-sm">{(file.size / 1024).toFixed(1)} KB</div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">File Size</div>
                    </div>
                  </div>
                </div>

                {/* Right: Conversion Settings */}
                <div className="space-y-10 py-4">
                  <div className="space-y-4">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Settings size={14} />
                      Output Format
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {(['png', 'jpeg', 'webp'] as Format[]).map((f) => (
                        <button
                          key={f}
                          onClick={() => setTargetFormat(f)}
                          className={`py-4 rounded-2xl font-black uppercase tracking-tighter text-sm transition-all border ${
                            targetFormat === f 
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/30' 
                              : 'bg-slate-50 text-slate-500 border-slate-100 hover:border-emerald-200'
                          }`}
                        >
                          {f === 'jpeg' ? 'JPG' : f}
                        </button>
                      ))}
                    </div>
                  </div>

                  {(targetFormat === 'jpeg' || targetFormat === 'webp') && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Conversion Quality</label>
                        <span className="text-sm font-black text-emerald-600">{Math.round(quality * 100)}%</span>
                      </div>
                      <input 
                        type="range"
                        min="0.1"
                        max="1"
                        step="0.05"
                        value={quality}
                        onChange={(e) => setQuality(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                      />
                    </div>
                  )}

                  <div className="pt-6 border-t border-slate-100">
                    <button 
                      onClick={convertImage}
                      disabled={isProcessing}
                      className="w-full py-6 bg-slate-900 text-white font-black rounded-3xl shadow-2xl shadow-slate-200 hover:bg-emerald-600 transition-all flex items-center justify-center gap-4 group"
                    >
                      {isProcessing ? (
                        <>
                          <RefreshCw size={24} className="animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Download size={24} />
                          Convert to {targetFormat === 'jpeg' ? 'JPG' : targetFormat.toUpperCase()}
                          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>

                  <div className="bg-emerald-50 p-6 rounded-3xl flex gap-4 border border-emerald-100">
                    <Zap size={24} className="text-emerald-600 shrink-0" />
                    <p className="text-xs font-medium text-emerald-800 leading-relaxed">
                      <strong>Tip:</strong> Converting to WEBP can reduce your image weight by up to 80% without visible quality loss.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </ToolPage>
  );
};
