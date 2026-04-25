/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { CategoryPage } from './pages/CategoryPage';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { CaseConverter } from './pages/tools/CaseConverter';
import { JsonFormatter } from './pages/tools/JsonFormatter';
import { PasswordGenerator } from './pages/tools/PasswordGenerator';
import { UuidGenerator } from './pages/tools/UuidGenerator';
import { HashGenerator } from './pages/tools/HashGenerator';
import { MetaTagGenerator } from './pages/tools/MetaTagGenerator';
import { KeywordDensityChecker } from './pages/tools/KeywordDensityChecker';
import { RobotsTxtGenerator } from './pages/tools/RobotsTxtGenerator';
import { SitemapGenerator } from './pages/tools/SitemapGenerator';
import { ImageOptimizer } from './pages/tools/ImageOptimizer';
import { WordCounter } from './pages/tools/WordCounter';
import { Base64 } from './pages/tools/Base64';
import { MergePdf } from './pages/tools/MergePdf';
import { SplitPdf } from './pages/tools/SplitPdf';
import { CompressPdf } from './pages/tools/CompressPdf';
import { PdfToWord } from './pages/tools/PdfToWord';
import { LoremIpsum } from './pages/tools/LoremIpsum';
import { UnitConverter } from './pages/tools/UnitConverter';
import { PercentageCalculator } from './pages/tools/PercentageCalculator';
import { EmiCalculator } from './pages/tools/EmiCalculator';
import { QrCodeGenerator } from './pages/tools/QrCodeGenerator';
import { NsfwDirectory } from './pages/nsfw/NsfwDirectory';
import { NsfwCategoryPage } from './pages/nsfw/NsfwCategoryPage';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Sitemap } from './pages/Sitemap';
import { NotFound } from './pages/NotFound';
import { GenericAITool } from './pages/tools/GenericAITool';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:postId" element={<BlogPost />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sitemap" element={<Sitemap />} />
            
            {/* AI Tools (Dynamic) */}
            <Route path="/ai/:toolId" element={<GenericAITool />} />
            
            <Route path="/image/optimizer" element={<ImageOptimizer />} />
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

            {/* We will add more routes as we implement tools */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  );
}
