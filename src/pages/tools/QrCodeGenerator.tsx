import React from 'react';
import { ToolPage } from '@/src/components/ToolPage';
import { QrCode, Download, Settings, RefreshCw } from 'lucide-react';

export const QrCodeGenerator: React.FC = () => {
  const [text, setText] = React.useState('https://tooolify.vercel.app');
  const [size, setSize] = React.useState(256);
  const [color, setColor] = React.useState('#4f46e5');
  const [bgColor, setBgColor] = React.useState('#ffffff');

  // We use a simple QR code API for the preview
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&color=${color.replace('#', '')}&bgcolor=${bgColor.replace('#', '')}`;

  return (
    <ToolPage
      toolId="qr-code-generator"
      category="generator"
      title="QR Code Generator"
      description="Create custom QR codes for URLs, text, and more. Customize colors and size instantly."
      longDescription={`QR codes are a versatile way to bridge the gap between the physical and digital worlds. Whether you're a business owner wanting to share your website, a marketer tracking campaign performance, or just someone wanting to share a Wi-Fi password, our QR Code Generator is the perfect tool.

Key Features:
- Custom URLs & Text: Generate codes for any content.
- Color Customization: Match your brand colors for the foreground and background.
- High Resolution: Download sharp images ready for print or web.
- Instant Preview: See your changes in real-time.

How to use:
1. Enter the URL or text you want to encode.
2. Adjust the size and colors to your liking.
3. Download the generated QR code image.`}
      faqs={[
        { question: "Do QR codes expire?", answer: "No, the QR codes generated here are static and will work as long as the underlying URL or data is valid." },
        { question: "Can I use these for commercial purposes?", answer: "Yes, you can use the generated QR codes for any personal or commercial project without any fees." },
        { question: "How many QR codes can I generate?", answer: "There is no limit. You can generate as many as you need." }
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Content (URL or Text)</label>
            <input 
              type="text" 
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Foreground Color</label>
              <div className="flex gap-2">
                <input 
                  type="color" 
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-12 h-12 rounded-xl cursor-pointer border-none p-0"
                />
                <input 
                  type="text" 
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Background Color</label>
              <div className="flex gap-2">
                <input 
                  type="color" 
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-12 h-12 rounded-xl cursor-pointer border-none p-0"
                />
                <input 
                  type="text" 
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Size (px)</label>
            <input 
              type="range" 
              min="100" 
              max="1000" 
              step="10"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="text-center text-xs font-bold text-slate-400">{size} x {size}</div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-8 p-12 bg-slate-50 rounded-[48px] border border-slate-100">
          <div className="p-6 bg-white rounded-[32px] shadow-2xl shadow-indigo-500/10 border border-slate-100">
            <img 
              src={qrUrl} 
              alt="Generated QR Code" 
              className="w-full h-auto rounded-xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <a 
            href={qrUrl} 
            download="qrcode.png"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all flex items-center gap-3 shadow-xl"
          >
            <Download size={20} />
            Download PNG
          </a>
        </div>
      </div>
    </ToolPage>
  );
};
