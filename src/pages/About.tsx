import React from 'react';
import { SEO } from '@/src/components/SEO';
import { motion } from 'motion/react';
import { Target, Heart, Shield, Zap, Users, Globe } from 'lucide-react';

export const About: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To provide the most comprehensive, fast, and accessible collection of digital utilities for everyone, everywhere."
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "We believe your data is yours. Most of our tools process data locally in your browser, ensuring maximum security."
    },
    {
      icon: Zap,
      title: "Blazing Fast",
      description: "Built with modern web technologies to ensure instant results without the bloat of traditional software."
    },
    {
      icon: Heart,
      title: "Free Forever",
      description: "Our core mission is to keep essential tools free and accessible to students, developers, and creators worldwide."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "We constantly update our platform based on user feedback and the evolving needs of the digital landscape."
    },
    {
      icon: Globe,
      title: "Open Access",
      description: "No signups, no subscriptions, no barriers. Just open the site and start getting work done."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-20">
      <SEO 
        title="About Us - Tooolify Mission & Values"
        description="Learn about Tooolify, our mission to provide free digital utilities, and our commitment to user privacy and performance."
        canonical="/about"
      />

      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight"
        >
          Empowering Your <span className="text-indigo-600">Digital Workflow</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-slate-600 leading-relaxed"
        >
          Tooolify was born out of a simple frustration: the internet is full of tools, 
          but many are slow, cluttered with ads, or require unnecessary signups. 
          We built a better way.
        </motion.p>
      </section>

      {/* Values Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {values.map((value, idx) => (
          <motion.div
            key={value.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 bg-white border border-slate-100 rounded-[32px] hover:shadow-xl hover:shadow-indigo-500/5 transition-all"
          >
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
              <value.icon size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
            <p className="text-slate-600 leading-relaxed">{value.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Story Section */}
      <section className="bg-slate-900 text-white rounded-[48px] p-12 md:p-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/10 to-transparent" />
        <div className="max-w-3xl relative z-10 space-y-8">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">Our Story</h2>
          <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
            <p>
              Started in 2024 as a small collection of text utilities, Tooolify has grown into a 
              comprehensive platform serving thousands of users daily. Our team is composed of 
              developers and designers who believe that the best tools should be invisible—they 
              should just work, instantly and securely.
            </p>
            <p>
              Today, we offer over 100 tools ranging from simple case converters to advanced 
              AI-powered generators. Every tool we add follows our strict philosophy: 
              <strong> Browser-based, Privacy-focused, and Free.</strong>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
