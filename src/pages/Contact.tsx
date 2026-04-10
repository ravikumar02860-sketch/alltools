import React from 'react';
import { SEO } from '@/src/components/SEO';
import { motion } from 'motion/react';
import { Mail, Send, CheckCircle, AlertCircle, Info } from 'lucide-react';

export const Contact: React.FC = () => {
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate email sending
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-20">
      <SEO 
        title="Contact Us - Get in Touch with Tooolify"
        description="Have questions, feedback, or tool requests? Contact the Tooolify team. We're here to help you optimize your digital workflow."
        canonical="/contact"
      />

      {/* Header Section */}
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight"
        >
          Get in <span className="text-indigo-600">Touch</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-slate-600 leading-relaxed"
        >
          Have a question, feedback, or a tool request? We'd love to hear from you. 
          Our team usually responds within 24-48 hours.
        </motion.p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Contact Form */}
        <motion.section 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-2xl shadow-indigo-500/5"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Subject</label>
              <input 
                type="text" 
                required
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                placeholder="How can we help?"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Message</label>
              <textarea 
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
                placeholder="Tell us more about your request..."
              />
            </div>

            <button 
              type="submit" 
              disabled={status === 'sending'}
              className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
              <Send size={20} />
            </button>

            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center gap-3"
              >
                <CheckCircle size={20} />
                <span className="font-medium">Message sent successfully! We'll get back to you soon.</span>
              </motion.div>
            )}
          </form>
        </motion.section>

        {/* Info Section */}
        <motion.section 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-12"
        >
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Other Ways to Connect</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              We're always open to collaboration, sponsorships, and feature requests. 
              If you're a developer looking to contribute, check out our GitHub.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-6 p-8 bg-white border border-slate-100 rounded-[32px] hover:shadow-xl hover:shadow-indigo-500/5 transition-all">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                <Mail size={28} />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Email Us</div>
                <div className="text-xl font-bold text-slate-900">support@tooolify.vercel.app</div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-8 bg-indigo-50/50 border border-indigo-100 rounded-[32px] space-y-4">
            <div className="flex items-center gap-3 text-indigo-600">
              <Info size={20} />
              <h3 className="font-bold uppercase tracking-wider text-sm">Disclaimer</h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm">
              All messages sent through this form are transmitted via secure email. 
              We do not store your contact information in a database unless you explicitly 
              request to be added to our newsletter. Your privacy is our priority.
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
};
