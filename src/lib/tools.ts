import { 
  Type, 
  Code, 
  RefreshCw, 
  Zap, 
  Shield, 
  Calculator, 
  Search,
  FileText,
  FileCode,
  Binary,
  Hash,
  Link as LinkIcon,
  ShieldAlert,
  QrCode
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
    id: 'pdf',
    name: 'PDF Tools',
    description: 'Merge, split, compress, and convert PDF documents.',
    icon: FileText,
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
    description: 'Optimize your website for search engines with these professional utilities.',
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
    keywords: ['text case converter online', 'uppercase to lowercase conversion', 'title case generator pro', 'sentence case converter free', 'online text formatter tool', 'convert text case safely', 'capitalize text online', 'camel case converter', 'snake case to camel case'],
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, sentences, and paragraphs for SEO, essays, and social media posts.',
    category: 'text',
    icon: FileText,
    path: '/text/word-counter',
    keywords: ['word counter online free', 'character count tool with spaces', 'sentence counter for essays', 'paragraph counter for writers', 'text analysis tool for bloggers', 'free word count utility', 'writing statistics analyzer'],
  },
  // Developer Tools
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Prettify, minify, and validate JSON data.',
    category: 'dev',
    icon: Code,
    path: '/dev/json-formatter',
    keywords: ['json formatter online', 'json prettifier', 'json minifier', 'validate json', 'json viewer', 'beautify json', 'json editor'],
  },
  {
    id: 'base64-encoder',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode and decode strings to and from Base64 format.',
    category: 'dev',
    icon: Binary,
    path: '/dev/base64',
    keywords: ['base64 encoder', 'base64 decoder', 'online base64 tool', 'encode string to base64', 'decode base64 to text', 'base64 converter'],
  },
  // Generators
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Create secure, random passwords with custom requirements.',
    category: 'generator',
    icon: Shield,
    path: '/generator/password',
    keywords: ['secure password generator', 'random password creator', 'strong password tool', 'online password maker', 'generate safe password', 'custom password generator'],
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate unique version 4 UUIDs instantly.',
    category: 'generator',
    icon: Zap,
    path: '/generator/uuid',
    keywords: ['uuid generator', 'guid generator', 'generate v4 uuid', 'online uuid creator', 'unique identifier generator', 'bulk uuid generator'],
  },
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    description: 'Create custom QR codes for URLs and text instantly.',
    category: 'generator',
    icon: QrCode,
    path: '/generator/qr-code',
    keywords: ['qr code generator', 'create qr code online', 'custom qr code maker', 'qr code for url', 'free qr code generator', 'high resolution qr code'],
  },
  // Security
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate MD5, SHA-1, and SHA-256 hashes for any text.',
    category: 'security',
    icon: Hash,
    path: '/security/hash',
    keywords: ['hash generator online', 'md5 hash creator', 'sha256 generator', 'sha1 hash tool', 'online checksum generator', 'cryptographic hash maker'],
  },
  // SEO
  {
    id: 'meta-tag-generator',
    name: 'Meta Tag Generator',
    description: 'Create SEO-optimized meta tags for your website.',
    category: 'seo',
    icon: Search,
    path: '/seo/meta-tags',
    keywords: ['meta tag generator', 'seo meta tags tool', 'website meta tags creator', 'og tag generator', 'twitter card maker', 'seo optimization tool', 'json-ld schema generator'],
  },
  {
    id: 'keyword-density-checker',
    name: 'Keyword Density Checker',
    description: 'Analyze your content to find the most frequent keywords and their density.',
    category: 'seo',
    icon: Search,
    path: '/seo/keyword-density',
    keywords: ['keyword density checker', 'seo keyword analyzer', 'text analysis tool', 'keyword frequency tool', 'seo content optimizer'],
  },
  {
    id: 'robots-txt-generator',
    name: 'Robots.txt Generator',
    description: 'Create a custom robots.txt file to control how search engines crawl your site.',
    category: 'seo',
    icon: Shield,
    path: '/seo/robots-txt',
    keywords: ['robots.txt generator', 'create robots.txt online', 'seo robots tool', 'crawler control'],
  },
  {
    id: 'sitemap-generator',
    name: 'XML Sitemap Generator',
    description: 'Generate a professional XML sitemap to help search engines index your pages.',
    category: 'seo',
    icon: FileCode,
    path: '/seo/sitemap',
    keywords: ['xml sitemap generator', 'create sitemap online', 'seo sitemap tool', 'website indexing'],
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for your designs and layouts.',
    category: 'text',
    icon: Type,
    path: '/text/lorem-ipsum',
    keywords: ['lorem ipsum generator', 'placeholder text creator', 'dummy text generator', 'filler text maker', 'online lorem ipsum tool'],
  },
  // Converters
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert between length, weight, temperature, and more.',
    category: 'converter',
    icon: RefreshCw,
    path: '/converter/unit',
    keywords: ['unit converter online', 'length converter', 'weight converter', 'temperature converter', 'metric to imperial converter', 'measurement converter'],
  },
  // Math
  {
    id: 'emi-calculator',
    name: 'EMI Calculator',
    description: 'Calculate monthly loan installments for Home, Car, and Personal loans instantly.',
    category: 'math',
    icon: Calculator,
    path: '/math/emi-calculator',
    keywords: ['emi calculator india', 'home loan calculator', 'car loan emi online', 'personal loan calculator', 'monthly installment calculator', 'sbi emi calculator', 'hdfc emi calculator'],
  },
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    description: 'Calculate percentages, increases, and decreases easily.',
    category: 'math',
    icon: Calculator,
    path: '/math/percentage',
    keywords: ['percentage calculator', 'calculate percentage increase', 'percentage decrease tool', 'online math calculator', 'percent off calculator'],
  },
  // PDF Tools
  {
    id: 'merge-pdf',
    name: 'Merge PDF',
    description: 'Combine multiple PDF files into one document.',
    category: 'pdf',
    icon: FileText,
    path: '/pdf/merge',
    keywords: ['merge pdf online', 'combine pdf files', 'join pdf documents', 'free pdf merger', 'online pdf joiner', 'merge multiple pdfs'],
  },
  {
    id: 'split-pdf',
    name: 'Split PDF',
    description: 'Extract pages from your PDF or save each page as a separate PDF.',
    category: 'pdf',
    icon: FileText,
    path: '/pdf/split',
    keywords: ['split pdf online', 'extract pdf pages', 'separate pdf pages', 'pdf splitter tool', 'free pdf extractor'],
  },
  {
    id: 'pdf-to-word',
    name: 'PDF to Word',
    description: 'Convert PDF documents to editable Word files.',
    category: 'pdf',
    icon: FileText,
    path: '/pdf/to-word',
    keywords: ['pdf to word converter', 'convert pdf to docx', 'pdf to editable word', 'online pdf to word tool', 'free pdf to word'],
  },
  {
    id: 'compress-pdf',
    name: 'Compress PDF',
    description: 'Reduce the file size of your PDF while optimizing for maximal quality.',
    category: 'pdf',
    icon: FileText,
    path: '/pdf/compress',
    keywords: ['compress pdf online', 'reduce pdf file size', 'optimize pdf for web', 'free pdf compressor', 'shrink pdf document'],
  },
];
