/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Layout } from './components/Layout';
import { ScrollToTop } from './components/ScrollToTop';
import { Loader2 } from 'lucide-react';

// Core Pages
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const CategoryPage = lazy(() => import('./pages/CategoryPage').then(m => ({ default: m.CategoryPage })));
const Blog = lazy(() => import('./pages/Blog').then(m => ({ default: m.Blog })));
const BlogPost = lazy(() => import('./pages/BlogPost').then(m => ({ default: m.BlogPost })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const Changelog = lazy(() => import('./pages/Changelog').then(m => ({ default: m.Changelog })));
const FAQ = lazy(() => import('./pages/FAQ').then(m => ({ default: m.FAQ })));
const Privacy = lazy(() => import('./pages/Privacy').then(m => ({ default: m.Privacy })));
const Terms = lazy(() => import('./pages/Terms').then(m => ({ default: m.Terms })));
const Pricing = lazy(() => import('./pages/Pricing').then(m => ({ default: m.Pricing })));
const SearchPage = lazy(() => import('./pages/Search').then(m => ({ default: m.Search })));
const Sitemap = lazy(() => import('./pages/Sitemap').then(m => ({ default: m.Sitemap })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

// Tool Pages
const CaseConverter = lazy(() => import('./pages/tools/CaseConverter').then(m => ({ default: m.CaseConverter })));
const JsonFormatter = lazy(() => import('./pages/tools/JsonFormatter').then(m => ({ default: m.JsonFormatter })));
const PasswordGenerator = lazy(() => import('./pages/tools/PasswordGenerator').then(m => ({ default: m.PasswordGenerator })));
const UuidGenerator = lazy(() => import('./pages/tools/UuidGenerator').then(m => ({ default: m.UuidGenerator })));
const HashGenerator = lazy(() => import('./pages/tools/HashGenerator').then(m => ({ default: m.HashGenerator })));
const MetaTagGenerator = lazy(() => import('./pages/tools/MetaTagGenerator').then(m => ({ default: m.MetaTagGenerator })));
const KeywordDensityChecker = lazy(() => import('./pages/tools/KeywordDensityChecker').then(m => ({ default: m.KeywordDensityChecker })));
const RobotsTxtGenerator = lazy(() => import('./pages/tools/RobotsTxtGenerator').then(m => ({ default: m.RobotsTxtGenerator })));
const SitemapGenerator = lazy(() => import('./pages/tools/SitemapGenerator').then(m => ({ default: m.SitemapGenerator })));
const ImageOptimizer = lazy(() => import('./pages/tools/ImageOptimizer').then(m => ({ default: m.ImageOptimizer })));
const ImageToText = lazy(() => import('./pages/tools/ImageToText').then(m => ({ default: m.ImageToText })));
const ImageConverter = lazy(() => import('./pages/tools/ImageConverter').then(m => ({ default: m.ImageConverter })));
const FaviconGenerator = lazy(() => import('./pages/tools/FaviconGenerator').then(m => ({ default: m.FaviconGenerator })));
const WordCounter = lazy(() => import('./pages/tools/WordCounter').then(m => ({ default: m.WordCounter })));
const Base64 = lazy(() => import('./pages/tools/Base64').then(m => ({ default: m.Base64 })));
const MergePdf = lazy(() => import('./pages/tools/MergePdf').then(m => ({ default: m.MergePdf })));
const SplitPdf = lazy(() => import('./pages/tools/SplitPdf').then(m => ({ default: m.SplitPdf })));
const CompressPdf = lazy(() => import('./pages/tools/CompressPdf').then(m => ({ default: m.CompressPdf })));
const PdfToWord = lazy(() => import('./pages/tools/PdfToWord').then(m => ({ default: m.PdfToWord })));
const VideoToBlogAI = lazy(() => import('./pages/tools/VideoToBlogAI').then(m => ({ default: m.VideoToBlogAI })));
const LoremIpsum = lazy(() => import('./pages/tools/LoremIpsum').then(m => ({ default: m.LoremIpsum })));
const UnitConverter = lazy(() => import('./pages/tools/UnitConverter').then(m => ({ default: m.UnitConverter })));
const PercentageCalculator = lazy(() => import('./pages/tools/PercentageCalculator').then(m => ({ default: m.PercentageCalculator })));
const EmiCalculator = lazy(() => import('./pages/tools/EmiCalculator').then(m => ({ default: m.EmiCalculator })));
const QrCodeGenerator = lazy(() => import('./pages/tools/QrCodeGenerator').then(m => ({ default: m.QrCodeGenerator })));
const GenericAITool = lazy(() => import('./pages/tools/GenericAITool').then(m => ({ default: m.GenericAITool })));

// NSFW Pages
const NsfwDirectory = lazy(() => import('./pages/nsfw/NsfwDirectory').then(m => ({ default: m.NsfwDirectory })));
const NsfwCategoryPage = lazy(() => import('./pages/nsfw/NsfwCategoryPage').then(m => ({ default: m.NsfwCategoryPage })));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-slate-100 rounded-full"></div>
        <div className="w-12 h-12 border-4 border-t-indigo-600 rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
      <span className="text-xs font-black text-slate-400 uppercase tracking-widest animate-pulse">Loading Magic...</span>
    </div>
  </div>
);

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:postId" element={<BlogPost />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/changelog" element={<Changelog />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/sitemap" element={<Sitemap />} />
              
              {/* AI Tools (Dynamic) */}
              <Route path="/ai/:toolId" element={<GenericAITool />} />
              
              <Route path="/image/optimizer" element={<ImageOptimizer />} />
              <Route path="/image/to-text" element={<ImageToText />} />
              <Route path="/image/converter" element={<ImageConverter />} />
              <Route path="/image/favicon-generator" element={<FaviconGenerator />} />
              <Route path="/text/case-converter" element={<CaseConverter />} />
              <Route path="/dev/json-formatter" element={<JsonFormatter />} />
              <Route path="/generator/password" element={<PasswordGenerator />} />
              <Route path="/generator/uuid" element={<UuidGenerator />} />
              <Route path="/security/hash" element={<HashGenerator />} />
              <Route path="/seo/meta-tags" element={<MetaTagGenerator />} />
              <Route path="/seo/keyword-density" element={<KeywordDensityChecker />} />
              <Route path="/seo/robots-txt" element={<RobotsTxtGenerator />} />
              <Route path="/seo/sitemap" element={<SitemapGenerator />} />
              <Route path="/text/word-counter" element={<WordCounter />} />
              <Route path="/dev/base64" element={<Base64 />} />
              <Route path="/pdf/merge" element={<MergePdf />} />
              <Route path="/pdf/split" element={<SplitPdf />} />
              <Route path="/pdf/compress" element={<CompressPdf />} />
              <Route path="/pdf/to-word" element={<PdfToWord />} />
              <Route path="/ai/video-to-blog" element={<VideoToBlogAI />} />
              <Route path="/text/lorem-ipsum" element={<LoremIpsum />} />
              <Route path="/converter/unit" element={<UnitConverter />} />
              <Route path="/math/percentage" element={<PercentageCalculator />} />
              <Route path="/math/emi-calculator" element={<EmiCalculator />} />
              <Route path="/generator/qr-code" element={<QrCodeGenerator />} />
              
              {/* NSFW AI Tools Section */}
              <Route path="/nsfw-ai-tools" element={<NsfwDirectory />} />
              <Route path="/nsfw/:categoryId" element={<NsfwCategoryPage />} />
              
              {/* Tool Category Pages (as requested) */}
              <Route path="/nsfw-ai-image-generator" element={<NsfwCategoryPage categoryId="nsfw-ai-image-generator" />} />
              <Route path="/ai-girlfriend-chat" element={<NsfwCategoryPage categoryId="ai-girlfriend-chat" />} />
              <Route path="/nsfw-ai-chatbot" element={<NsfwCategoryPage categoryId="nsfw-ai-chatbot" />} />
              <Route path="/ai-face-swap" element={<NsfwCategoryPage categoryId="ai-face-swap" />} />
              <Route path="/ai-deepfake-generator" element={<NsfwCategoryPage categoryId="ai-deepfake-generator" />} />
              <Route path="/ai-hentai-generator" element={<NsfwCategoryPage categoryId="ai-hentai-generator" />} />
              <Route path="/ai-erotic-story-generator" element={<NsfwCategoryPage categoryId="ai-erotic-story-generator" />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </HelmetProvider>
  );
}
