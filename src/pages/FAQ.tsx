import React from 'react';
import { SEO } from '../components/SEO';
import { motion } from 'motion/react';
import { HelpCircle, ChevronDown, MessageCircle, Zap } from 'lucide-react';

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-indigo-600 transition-colors group"
      >
        <span className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight">
          {question}
        </span>
        <ChevronDown 
          size={20} 
          className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-600' : ''}`} 
        />
      </button>
      {isOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="pb-6 text-slate-500 font-medium leading-relaxed">
            {answer}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "Is Tooolify actually free?",
      answer: "Yes, 100%. All our tools are free to use. We monetize the site through non-intrusive advertisements to keep the lights on, so you don't have to pay a penny."
    },
    {
      question: "Do I need to create an account?",
      answer: "No account is required. You can jump straight into using any of our 100+ tools without filling out a single form or providing an email address."
    },
    {
      question: "Is my data secure?",
      answer: "Security is built into our core. Most of our tools process your data locally in your browser, meaning it never even touches our servers. For cloud-based tools, we use enterprise-grade encryption and delete files immediately after processing."
    },
    {
      question: "Can I use these tools for commercial work?",
      answer: "Absolutely. Whether you're a freelancer, a small business, or a developer at a big tech firm, you're free to use Tooolify for any project."
    },
    {
      question: "How often do you add new tools?",
      answer: "We aim to release at least 2-3 new tools every month based on user requests and trending digital needs. If you have a suggestion, feel free to contact us!"
    },
    {
      question: "Are there any usage limits?",
      answer: "We don't impose strict limits on individual tools. However, to ensure fair access for everyone, we use rate limiting to prevent automated abuse of our systems."
    },
    {
      question: "Does Tooolify offer an API?",
      answer: "Currently, we don't offer a public API. Our tools are designed for manual use via the web interface. We are exploring API options for developers in the future."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="pb-32">
      <SEO 
        title="Frequently Asked Questions | Tooolify" 
        description="Find answers to common questions about Tooolify, our free tools, data security, and how to get the most out of our utility suite."
        schema={faqSchema}
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
              <HelpCircle size={14} />
              <span>Support Center</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight font-display leading-[1.1]">
              Common <span className="text-indigo-600">Questions</span>
            </h1>
            <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
              Everything you need to know about Tooolify and our mission to provide the best free online tools.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-10 bg-indigo-600 rounded-[32px] text-white space-y-4 shadow-xl shadow-indigo-600/30">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                <Zap size={24} />
              </div>
              <h3 className="text-2xl font-black font-display">Need a Feature?</h3>
              <p className="text-indigo-100 font-medium leading-relaxed">
                We're always looking for new ideas. If there's a tool you need that we don't have yet, let us know!
              </p>
              <a href="/contact" className="inline-flex items-center gap-2 text-white font-black hover:underline pt-2">
                Request a Tool →
              </a>
            </div>
            <div className="p-10 bg-slate-900 rounded-[32px] text-white space-y-4 shadow-xl shadow-slate-900/30">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                <MessageCircle size={24} />
              </div>
              <h3 className="text-2xl font-black font-display">Bug Reports</h3>
              <p className="text-slate-400 font-medium leading-relaxed">
                Found something that isn't working? Report it to us so we can fix it for everyone.
              </p>
              <a href="/contact" className="inline-flex items-center gap-2 text-indigo-400 font-black hover:underline pt-2">
                Report an Issue →
              </a>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="bg-white border border-slate-100 rounded-[32px] p-8 md:p-12">
            <div className="divide-y divide-slate-100">
              {faqs.map((faq, index) => (
                <FaqItem key={index} {...faq} />
              ))}
            </div>
          </div>

          {/* Still Need Help */}
          <div className="text-center space-y-6 pt-10">
            <h2 className="text-3xl font-black text-slate-900 font-display">Still have questions?</h2>
            <p className="text-slate-500 font-medium">Can't find the answer you're looking for? Our team is here to help.</p>
            <a 
              href="/contact"
              className="inline-flex h-16 items-center px-10 bg-white border border-slate-200 text-slate-900 font-black rounded-2xl hover:bg-slate-50 transition-all shadow-sm"
            >
              Get in Touch with Support
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
