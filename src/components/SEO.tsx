import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  schema?: object;
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords,
  canonical, 
  ogType = 'website', 
  ogImage = 'https://picsum.photos/seed/tooolify/1200/630',
  schema 
}) => {
  const siteName = 'Tooolify';
  const fullTitle = `${title} | ${siteName}`;
  const siteUrl = 'https://tooolify.vercel.app';
  
  // Normalize URL for canonical tag
  const cleanPath = window.location.pathname.replace(/\/+$/, '') || '/';
  const currentUrl = canonical ? (canonical.startsWith('http') ? canonical : `${siteUrl}${canonical}`) : `${siteUrl}${cleanPath}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords.join(', ')} />}
      <link rel="canonical" href={currentUrl} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@tooolify" />

      {/* Mobile & Theme */}
      <meta name="theme-color" content="#4f46e5" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};
