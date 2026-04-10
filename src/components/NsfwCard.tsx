import React from 'react';
import { Star, ExternalLink, Bookmark } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { NsfwTool } from '@/src/lib/tools';

interface NsfwCardProps {
  tool: NsfwTool;
}

export const NsfwCard: React.FC<NsfwCardProps> = ({ tool }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-indigo-500/50 transition-all duration-500"
    >
      {/* Neon Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="p-6 relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10 bg-slate-800 flex items-center justify-center">
            <img 
              src={tool.logo} 
              alt={tool.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <button className="p-2 text-slate-400 hover:text-indigo-400 transition-colors">
            <Bookmark size={20} />
          </button>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
          {tool.name}
        </h3>
        
        <p className="text-slate-400 text-sm mb-4 line-clamp-2">
          {tool.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tool.tags.map((tag) => (
            <span 
              key={tag} 
              className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/5 text-slate-300 border border-white/5 rounded-lg"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-bold text-white">{tool.rating}</span>
          </div>
          
          <a 
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-indigo-900/20"
          >
            Visit Website
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Free/Paid Badge */}
      <div className={cn(
        "absolute top-4 right-4 px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter",
        tool.isFree ? "bg-emerald-500/20 text-emerald-400" : "bg-indigo-500/20 text-indigo-400"
      )}>
        {tool.isFree ? 'Free' : 'Premium'}
      </div>
    </motion.div>
  );
};
