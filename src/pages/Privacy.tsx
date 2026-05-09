import React from 'react';
import { SEO } from '../components/SEO';
import { motion } from 'motion/react';
import { Shield, Eye, Lock, Globe } from 'lucide-react';

export const Privacy: React.FC = () => {
  return (
    <div className="pb-32">
      <SEO 
        title="Privacy Policy | Tooolify" 
        description="Read our privacy policy to understand how we protect your data and privacy while using Tooolify's free online tools."
      />

      <div className="max-w-4xl mx-auto px-6 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-16"
        >
          {/* Header */}
          <div className="space-y-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-widest">
              <Shield size={14} />
              <span>Data Protection</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight font-display leading-[1.1]">
              Privacy <span className="text-indigo-600">Policy</span>
            </h1>
            <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
              Last updated: April 25, 2026. Your privacy is our top priority. Learn how we handle your data with transparency.
            </p>
          </div>

          {/* Key Principles */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Eye, title: "No Surveillance", desc: "We don't track your individual behavior or record your sessions." },
              { icon: Lock, title: "Local Processing", desc: "Most tools process data directly in your browser, never hitting our servers." },
              { icon: Globe, title: "GDPR Compliant", desc: "We adhere strictly to global data protection regulations." }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-white border border-slate-100 rounded-3xl space-y-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                  <item.icon size={24} />
                </div>
                <h3 className="font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="prose prose-slate max-w-none prose-headings:font-display prose-headings:font-black prose-headings:tracking-tight prose-p:text-slate-600 prose-p:font-medium prose-p:leading-relaxed">
            <section className="space-y-6">
              <h2 className="text-3xl text-slate-900 pt-8 border-t border-slate-100">1. Information We Collect</h2>
              <p>
                Tooolify provides free online tools. For the majority of our services, we do not require any personal information or account registration. We may collect minimal non-personal information such as:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 font-medium">
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Referring website</li>
                <li>Pages visited and time spent on the site</li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl text-slate-900 pt-8 border-t border-slate-100">2. How We Use Data</h2>
              <p>
                The data we collect is used exclusively to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 font-medium">
                <li>Maintain and improve our website functionality</li>
                <li>Analyze traffic patterns to optimize performance</li>
                <li>Prevent abuse of our systems</li>
                <li>Ensure a secure experience for all users</li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl text-slate-900 pt-8 border-t border-slate-100">3. Local File Processing</h2>
              <p>
                Many of our utilities (like Image Converters, Case Converters, and Hash Generators) process files <strong>locally within your browser</strong> using JavaScript. In these cases, your files never leave your computer and are never uploaded to our servers.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl text-slate-900 pt-8 border-t border-slate-100">4. Third-Party Services</h2>
              <p>
                We use Google Analytics to understand site traffic and Google AdSense to display advertisements. These third-party services may use cookies to serve ads based on your prior visits to our website or other websites.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl text-slate-900 pt-8 border-t border-slate-100">5. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at privacy@tooolify.com or via our <a href="/contact" className="text-indigo-600 hover:underline">Contact Page</a>.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
