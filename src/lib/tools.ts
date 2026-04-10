import { 
  Type, 
  Code, 
  Image as ImageIcon, 
  RefreshCw, 
  Zap, 
  Shield, 
  Calculator, 
  Search,
  FileText,
  Binary,
  Hash,
  Link as LinkIcon,
  ShieldAlert
} from 'lucide-react';

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: any;
  path: string;
  keywords: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: any;
}

export const categories: Category[] = [
  {
    id: 'text',
    name: 'Text Utilities',
    description: 'Tools for manipulating and formatting text content.',
    icon: Type,
  },
  {
    id: 'dev',
    name: 'Developer Tools',
    description: 'Essential utilities for web and software developers.',
    icon: Code,
  },
  {
    id: 'image',
    name: 'Image Tools',
    description: 'Edit, compress, and convert images directly in your browser.',
    icon: ImageIcon,
  },
  {
    id: 'converter',
    name: 'Converters',
    description: 'Convert between different units, bases, and formats.',
    icon: RefreshCw,
  },
  {
    id: 'generator',
    name: 'Generators',
    description: 'Generate secure passwords, UUIDs, and placeholder content.',
    icon: Zap,
  },
  {
    id: 'security',
    name: 'Security Tools',
    description: 'Hashing, encryption, and security-related utilities.',
    icon: Shield,
  },
  {
    id: 'math',
    name: 'Math & Finance',
    description: 'Calculators for math, percentage, and financial planning.',
    icon: Calculator,
  },
  {
    id: 'seo',
    name: 'SEO Tools',
    description: 'Optimize your website for search engines with these tools.',
    icon: Search,
  },
  {
    id: 'nsfw',
    name: 'NSFW AI Tools',
    description: 'Explore the best adult AI generators, chatbots, and more.',
    icon: ShieldAlert,
  },
];

export interface NsfwTool {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  rating: number;
  url: string;
  logo: string;
  isFree: boolean;
  popularity: number;
}

export const nsfwCategories = [
  { id: 'nsfw-ai-image-generator', name: 'NSFW AI Image Generator', path: '/nsfw-ai-image-generator' },
  { id: 'ai-girlfriend-chat', name: 'AI Girlfriend Chat', path: '/ai-girlfriend-chat' },
  { id: 'nsfw-ai-chatbot', name: 'NSFW AI Chatbot', path: '/nsfw-ai-chatbot' },
  { id: 'ai-face-swap', name: 'AI Face Swap', path: '/ai-face-swap' },
  { id: 'ai-deepfake-generator', name: 'AI Deepfake Generator', path: '/ai-deepfake-generator' },
  { id: 'ai-hentai-generator', name: 'AI Hentai Generator', path: '/ai-hentai-generator' },
  { id: 'ai-erotic-story-generator', name: 'AI Erotic Story Generator', path: '/ai-erotic-story-generator' },
];

export const nsfwTools: NsfwTool[] = [
  {
    id: 'anime-nsfw-gen',
    name: 'Anime NSFW Image Generator',
    description: 'Generate high-quality anime style adult images using advanced AI prompts.',
    category: 'ai-hentai-generator',
    tags: ['anime', 'ai art', 'generator'],
    rating: 4.8,
    url: '#',
    logo: 'https://picsum.photos/seed/hentai/100/100',
    isFree: true,
    popularity: 95,
  },
  {
    id: 'celeb-face-swap',
    name: 'Celebrity Face Swap',
    description: 'Swap faces with your favorite celebrities in high-quality images and videos.',
    category: 'ai-face-swap',
    tags: ['face swap', 'deepfake', 'celebrity'],
    rating: 4.6,
    url: '#',
    logo: 'https://picsum.photos/seed/faceswap/100/100',
    isFree: false,
    popularity: 88,
  },
  {
    id: 'ai-clothes-remover',
    name: 'AI Clothes Remover',
    description: 'Advanced AI tool for virtual undressing and clothing modification.',
    category: 'nsfw-ai-image-generator',
    tags: ['undress', 'ai image', 'editor'],
    rating: 4.5,
    url: '#',
    logo: 'https://picsum.photos/seed/undress/100/100',
    isFree: false,
    popularity: 92,
  },
  {
    id: 'erotic-story-gen',
    name: 'Erotic Story Generator',
    description: 'Create personalized adult stories and erotic narratives with AI.',
    category: 'ai-erotic-story-generator',
    tags: ['story', 'writing', 'erotica'],
    rating: 4.7,
    url: '#',
    logo: 'https://picsum.photos/seed/story/100/100',
    isFree: true,
    popularity: 85,
  },
  {
    id: 'ai-gf-companion',
    name: 'AI Girlfriend Companion',
    description: 'Your virtual AI girlfriend for immersive and personalized chat experiences.',
    category: 'ai-girlfriend-chat',
    tags: ['chat', 'companion', 'virtual'],
    rating: 4.9,
    url: '#',
    logo: 'https://picsum.photos/seed/gf/100/100',
    isFree: true,
    popularity: 98,
  },
  {
    id: 'deepfake-pro',
    name: 'Deepfake Pro Generator',
    description: 'Professional grade deepfake creation tool for realistic video swaps.',
    category: 'ai-deepfake-generator',
    tags: ['deepfake', 'video', 'pro'],
    rating: 4.4,
    url: '#',
    logo: 'https://picsum.photos/seed/deepfake/100/100',
    isFree: false,
    popularity: 82,
  },
  {
    id: 'hentai-master',
    name: 'Hentai Master AI',
    description: 'The ultimate AI for generating custom hentai and doujinshi art.',
    category: 'ai-hentai-generator',
    tags: ['hentai', 'anime', 'art'],
    rating: 4.7,
    url: '#',
    logo: 'https://picsum.photos/seed/hentaimaster/100/100',
    isFree: true,
    popularity: 90,
  },
  {
    id: 'nsfw-chat-bot',
    name: 'NSFW AI Chatbot',
    description: 'Unrestricted AI chatbot for adult roleplay and conversations.',
    category: 'nsfw-ai-chatbot',
    tags: ['roleplay', 'chat', 'unrestricted'],
    rating: 4.6,
    url: '#',
    logo: 'https://picsum.photos/seed/chatbot/100/100',
    isFree: true,
    popularity: 87,
  }
];

export const tools: Tool[] = [
  // Text Utilities
  {
    id: 'case-converter',
    name: 'Case Converter',
    description: 'Convert text to UPPERCASE, lowercase, Title Case, and more.',
    category: 'text',
    icon: Type,
    path: '/text/case-converter',
    keywords: ['text', 'case', 'uppercase', 'lowercase', 'title case'],
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, sentences, and paragraphs.',
    category: 'text',
    icon: FileText,
    path: '/text/word-counter',
    keywords: ['word count', 'character count', 'text analysis'],
  },
  // Developer Tools
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Prettify, minify, and validate JSON data.',
    category: 'dev',
    icon: Code,
    path: '/dev/json-formatter',
    keywords: ['json', 'format', 'prettify', 'minify', 'validate'],
  },
  {
    id: 'base64-encoder',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode and decode strings to and from Base64 format.',
    category: 'dev',
    icon: Binary,
    path: '/dev/base64',
    keywords: ['base64', 'encode', 'decode', 'binary'],
  },
  // Generators
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Create secure, random passwords with custom requirements.',
    category: 'generator',
    icon: Shield,
    path: '/generator/password',
    keywords: ['password', 'secure', 'random', 'generator'],
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate unique version 4 UUIDs instantly.',
    category: 'generator',
    icon: Zap,
    path: '/generator/uuid',
    keywords: ['uuid', 'guid', 'unique id', 'generator'],
  },
  // Security
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate MD5, SHA-1, and SHA-256 hashes for any text.',
    category: 'security',
    icon: Hash,
    path: '/security/hash',
    keywords: ['hash', 'md5', 'sha256', 'cryptography'],
  },
  // SEO
  {
    id: 'meta-tag-generator',
    name: 'Meta Tag Generator',
    description: 'Create SEO-optimized meta tags for your website.',
    category: 'seo',
    icon: Search,
    path: '/seo/meta-tags',
    keywords: ['seo', 'meta tags', 'header', 'optimization'],
  },
];
