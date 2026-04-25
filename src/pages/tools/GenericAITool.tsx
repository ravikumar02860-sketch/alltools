import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ToolPage } from '../../components/ToolPage';
import { tools } from '../../lib/tools';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Zap, Shield, Clock, MousePointer2 } from 'lucide-react';

export const GenericAITool: React.FC = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const tool = tools.find(t => t.id === toolId || t.path.split('/').pop() === toolId);

  if (!tool) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Tool Not Found</h1>
        <Link to="/" className="text-indigo-600 hover:underline mt-4 inline-block">Go back home</Link>
      </div>
    );
  }

  const benefits = [
    { icon: Zap, title: 'Lightning Fast', desc: 'Get results in seconds with our optimized AI engines.' },
    { icon: Shield, title: 'Secure & Private', desc: 'Your data is encrypted and never stored on our servers.' },
    { icon: Clock, title: '24/7 Availability', desc: 'Access high-performance AI whenever you need it.' },
  ];

  return (
    <ToolPage
      title={tool.name}
      description={tool.description}
      category={tool.category}
      toolId={tool.id}
      keywords={tool.keywords}
      longDescription={`
## Why use our ${tool.name}?

Our **${tool.name}** is designed to provide professional-grade results using state-of-the-art artificial intelligence. Whether you are a creator, developer, or business professional, this tool streamlines your workflow and saves you hours of manual effort.

### Key Features of ${tool.name}:
- **High-Quality Output**: Leveraging the latest AI models for superior accuracy.
- **Easy to Use**: Simple interface designed for both beginners and pros.
- **No Installation Required**: Works directly in your web browser.
- **Regular Updates**: We constantly improve our models to ensure the best performance.

### How to use ${tool.name} effectively:
1. **Input Your Data**: Enter the text, image, or parameters required for the tool.
2. **Click Generate**: Let our AI process your request in real-time.
3. **Download or Copy**: Instantly save your high-quality results to your device.

Start using the **${tool.name}** today and experience the future of digital productivity.
      `}
      faqs={[
        {
          question: `Is the ${tool.name} free to use?`,
          answer: `Yes, Tooolify offers a free tier for our ${tool.name} with generous daily limits for all users.`
        },
        {
          question: `How private is my data with ${tool.name}?`,
          answer: "We prioritize your privacy. All processing is handled securely, and we do not store your private input data or generated results on our servers."
        },
        {
          question: "Do I need to create an account?",
          answer: "No account is required to use our basic AI tools. You can start generating results instantly."
        }
      ]}
    >
      <div className="space-y-10">
        {/* Placeholder UI for the AI Tool */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[40px] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-white border border-slate-100 rounded-[32px] p-8 md:p-12 text-center space-y-6">
            <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 mx-auto group-hover:scale-110 transition-transform duration-500">
              <tool.icon size={40} />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Ready to Generate?</h2>
              <p className="text-slate-500 font-medium">Use our advanced AI engine to get started with {tool.name}.</p>
            </div>

            <div className="max-w-xl mx-auto pt-4">
              <div className="relative">
                <textarea 
                  placeholder={`Enter your prompt or data for ${tool.name}...`}
                  className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none min-h-[120px] transition-all text-slate-700 placeholder:text-slate-400 font-medium"
                />
              </div>
            </div>

            <div className="pt-4">
              <button className="inline-flex items-center gap-3 px-10 py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/30 group">
                <Sparkles size={20} />
                <span>Generate Content Now</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-6 pt-6 text-slate-400">
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-500">
                <Shield size={12} />
                <span>100% Secure</span>
              </div>
              <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest">
                <MousePointer2 size={12} />
                <span>One-Click Result</span>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
          {benefits.map((benefit, i) => (
            <div key={i} className="p-6 rounded-3xl bg-slate-50 border border-slate-50 hover:bg-white hover:border-indigo-100 transition-all group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm mb-4 group-hover:scale-110 transition-transform">
                <benefit.icon size={24} />
              </div>
              <h4 className="text-base font-black text-slate-900 mb-2 tracking-tight">{benefit.title}</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>

        {/* Promotion for Mobile App / Premium */}
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 p-8 md:p-12 rounded-[48px] text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px]"></div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-300 border border-white/5">
                <Zap size={12} fill="currentColor" />
                <span>Premium Access</span>
              </div>
              <h3 className="text-3xl font-black leading-tight">Unlock Unlimited AI Generation Capacity</h3>
              <p className="text-indigo-100/70 font-medium">Join 50,000+ creators and professionals using Tooolify Pro for high-volume workflows without daily limits.</p>
              <button className="px-8 py-4 bg-white text-slate-900 font-black rounded-2xl hover:bg-indigo-50 transition-all text-sm uppercase tracking-widest shadow-xl">
                Get Started Now
              </button>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="relative">
                <div className="w-48 h-64 bg-white/10 rounded-3xl border border-white/20 transform rotate-12 flex items-center justify-center grayscale opacity-50">
                   <tool.icon size={48} className="text-white/20" />
                </div>
                <div className="absolute inset-0 w-48 h-64 bg-white/20 rounded-3xl border border-white/30 transform -rotate-6 backdrop-blur-sm flex items-center justify-center">
                   <tool.icon size={64} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPage>
  );
};
