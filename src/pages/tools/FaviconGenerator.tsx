import React from 'react';
import { ToolPage } from '../../components/ToolPage';
import { 
  Plus, 
  Download, 
  Trash2, 
  Monitor, 
  Smartphone, 
  Type, 
  ImageIcon, 
  Settings2,
  RefreshCw,
  Palette,
  CheckCircle2,
  Zap,
  Layout
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FaviconGenerator: React.FC = () => {
  const [mode, setMode] = React.useState<'text' | 'image'>('text');
  const [text, setText] = React.useState('T');
  const [bgColor, setBgColor] = React.useState('#4f46e5');
  const [textColor, setTextColor] = React.useState('#ffffff');
  const [file, setFile] = React.useState<string | null>(null);
  const [radius, setRadius] = React.useState(20);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const drawFavicon = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 512;
    canvas.width = size;
    canvas.height = size;

    // Clear
    ctx.clearRect(0, 0, size, size);

    // Draw background
    ctx.fillStyle = bgColor;
    const r = (radius / 100) * (size / 2);
    
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.lineTo(size - r, 0);
    ctx.quadraticCurveTo(size, 0, size, r);
    ctx.lineTo(size, size - r);
    ctx.quadraticCurveTo(size, size, size - r, size);
    ctx.lineTo(r, size);
    ctx.quadraticCurveTo(0, size, 0, size - r);
    ctx.lineTo(0, r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.closePath();
    ctx.fill();

    if (mode === 'text' && text) {
      ctx.fillStyle = textColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `bold ${size * 0.6}px Inter, sans-serif`;
      ctx.fillText(text.slice(0, 2), size / 2, size / 2 + size * 0.02);
    } else if (mode === 'image' && file) {
      const img = new Image();
      img.src = file;
      img.onload = () => {
        const padding = size * 0.15;
        const drawSize = size - padding * 2;
        ctx.drawImage(img, padding, padding, drawSize, drawSize);
      };
    }
  }, [bgColor, textColor, text, file, radius, mode]);

  React.useEffect(() => {
    drawFavicon();
  }, [drawFavicon]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => setFile(event.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const downloadFavicon = (size: number, name: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx || !canvasRef.current) return;

    ctx.drawImage(canvasRef.current, 0, 0, size, size);
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `${name}.png`;
    link.click();
  };

  const downloadAll = () => {
    const sizes = [16, 32, 48, 64, 128, 180, 192, 512];
    sizes.forEach(s => downloadFavicon(s, `favicon-${s}x${s}`));
  };

  return (
    <ToolPage
      toolId="favicon-generator"
      category="image"
      title="Free Online Favicon Generator: Text, Image & Emoji"
      description="Create professional favicons for your website instantly. Generate multiple sizes, customize text, colors, and shapes for perfect branding."
      keywords={['favicon generator', 'create favicon online', 'text to favicon', 'image to favicon', 'app icon creator', 'apple touch icon generator', 'free branding tool']}
      longDescription={`
## Create the Perfect Identity for Your Website

Your favicon is the first thing users see in their browser tabs and bookmarks. A well-designed favicon makes your brand recognizable and professional. Our **Favicon Generator** gives you all the tools to build yours in seconds.

### Professional Features:

- **Text to Favicon**: Create clean, minimalist favicons using initials or characters. Customize fonts and colors to match your brand style.
- **Image to Icon**: Upload your logo and we'll automatically scale and center it perfectly within the icon boundaries.
- **Corner Radius Control**: Choose from sharp squares, modern rounded corners, or perfect circles for your icons.
- **Multi-Size Export**: We generate all standard sizes including 16x16, 32x32, and high-resolution 512x512 icons for Apple Touch and Android App manifest needs.
- **Privacy Guaranteed**: Just like our other tools, all generation happens in your browser. We don't track your designs or store your logos.

### Why Every Site Needs a Favicon:
1.  **Professionalism**: Sites without favicons look unfinished or untrustworthy.
2.  **Brand Recall**: It helps users find your tab among many others.
3.  **Cross-Device Consistency**: High-quality icons ensure your site looks great when saved to a phone's home screen.

### Pro Designer Tip:
- **Keep it Simple**: Tiny icons don't handle complex details well. Use high-contrast colors and simple shapes for maximum visibility at 16px.
      `}
      faqs={[
        { question: "What sizes are included?", answer: "We provide all standard sizes: 16x16, 32x32 (standard), 180x180 (Apple Touch), and up to 512x512 for modern PWAs." },
        { question: "Can I use emojis?", answer: "Yes! In text mode, you can paste any emoji and it will be rendered as a high-quality vector-based icon." },
        { question: "Is the background transparent?", answer: "By default, the corners outside your selected radius are transparent. You can control the icon's primary background color manually." },
        { question: "Can I download an .ico file?", answer: "Our tool exports standard .png files which are widely accepted and recommended by modern browsers over the legacy .ico format." }
      ]}
    >
      <div className="space-y-10">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-indigo-600 rounded-[40px] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          <div className="relative bg-white border border-slate-100 rounded-[40px] p-8 md:p-12 shadow-sm overflow-hidden">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left: Configuration */}
              <div className="space-y-10">
                <div className="flex bg-slate-100 p-1.5 rounded-[20px] w-fit">
                  <button 
                    onClick={() => setMode('text')}
                    className={`px-8 py-3 rounded-2xl flex items-center gap-2 font-black text-xs uppercase tracking-widest transition-all ${mode === 'text' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    <Type size={16} /> Text Mode
                  </button>
                  <button 
                    onClick={() => setMode('image')}
                    className={`px-8 py-3 rounded-2xl flex items-center gap-2 font-black text-xs uppercase tracking-widest transition-all ${mode === 'image' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    <ImageIcon size={16} /> Image Mode
                  </button>
                </div>

                <div className="space-y-8">
                  {mode === 'text' ? (
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Favicon Text</label>
                      <input 
                        type="text" 
                        maxLength={2}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-2xl font-black outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Upload Logo</label>
                      <div className="flex gap-4">
                        <button 
                          onClick={() => document.getElementById('favicon-upload')?.click()}
                          className="flex-1 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-500 font-bold flex items-center gap-3 hover:bg-slate-100 transition-all"
                        >
                          <Plus size={20} /> Select File
                        </button>
                        <input id="favicon-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                        {file && (
                          <button onClick={() => setFile(null)} className="p-4 bg-red-50 text-red-500 rounded-2xl"><Trash2 size={20} /></button>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Palette size={14} /> Background</label>
                      <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-14 rounded-2xl border-none p-0 cursor-pointer" />
                    </div>
                    {mode === 'text' && (
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Palette size={14} /> Text Color</label>
                        <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-full h-14 rounded-2xl border-none p-0 cursor-pointer" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex justify-between">
                      Corner Radius <span>{radius}%</span>
                    </label>
                    <input 
                      type="range" 
                      min="0" max="100" 
                      value={radius} 
                      onChange={(e) => setRadius(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                </div>
              </div>

              {/* Right: Preview & Download */}
              <div className="flex flex-col items-center justify-center space-y-10 bg-slate-50 rounded-[48px] p-12 border border-slate-100">
                <div className="relative group/preview">
                  <canvas ref={canvasRef} className="w-48 h-48 rounded-[32px] shadow-2xl shadow-indigo-500/10 border-4 border-white" />
                  <div className="absolute -top-4 -right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase">Live Preview</div>
                </div>

                <div className="flex flex-col gap-4 w-full">
                  <button 
                    onClick={downloadAll}
                    className="w-full px-8 py-5 bg-slate-900 text-white font-black rounded-3xl shadow-xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-3"
                  >
                    <Download size={24} /> Download All PNGs
                  </button>
                  <p className="text-[10px] font-black text-slate-400 text-center uppercase tracking-widest">Includes 16px to 512px variants</p>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="p-4 bg-white rounded-2xl border border-slate-200 flex flex-col items-center space-y-2">
                    <Monitor size={20} className="text-slate-400" />
                    <span className="text-[10px] font-black text-slate-900 uppercase">Desktop Tab</span>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-slate-200 flex flex-col items-center space-y-2">
                    <Smartphone size={20} className="text-slate-400" />
                    <span className="text-[10px] font-black text-slate-900 uppercase">App Icon</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </ToolPage>
  );
};
