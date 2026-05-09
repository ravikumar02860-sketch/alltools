import React, { useEffect } from 'react';

interface AdPlacementProps {
  type: 'header' | 'footer' | 'side-left' | 'side-right';
}

export const AdPlacement: React.FC<AdPlacementProps> = ({ type }) => {
  useEffect(() => {
    const containerId = `ad-container-${type}`;
    const container = document.getElementById(containerId);
    
    if (!container) return;

    // Clear previous content if any
    container.innerHTML = '';

    if (type === 'header' || type === 'footer') {
      // Ad set 1: atOptions
      const script1 = document.createElement('script');
      script1.type = 'text/javascript';
      script1.innerHTML = `
        window.atOptions = {
          'key' : '6b6777c4248ba9b31f1a7f8087ca4b49',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      `;
      container.appendChild(script1);

      const script2 = document.createElement('script');
      script2.src = 'https://www.highperformanceformat.com/6b6777c4248ba9b31f1a7f8087ca4b49/invoke.js';
      script2.async = true;
      container.appendChild(script2);

      // Ad set 2: Direct script
      const script3 = document.createElement('script');
      script3.src = 'https://pl29067654.profitablecpmratenetwork.com/a5/dd/5b/a5dd5baa83400ec7c919bc06c50d21ab.js';
      script3.async = true;
      container.appendChild(script3);
    }

    if (type === 'side-left' || type === 'side-right') {
      const script4 = document.createElement('script');
      script4.src = 'https://pl29066198.profitablecpmratenetwork.com/f0/71/96/f07196f623babcc623ee6026e0254474.js';
      script4.async = true;
      container.appendChild(script4);
    }
  }, [type]);

  const getClasses = () => {
    switch (type) {
      case 'header': return 'w-full flex flex-col items-center justify-center py-4 bg-slate-50 border-b overflow-hidden min-h-[90px]';
      case 'footer': return 'w-full flex flex-col items-center justify-center py-8 bg-white border-t overflow-hidden min-h-[90px]';
      case 'side-left': return 'hidden xl:block fixed left-4 top-1/2 -translate-y-1/2 w-[160px] min-h-[600px] z-30';
      case 'side-right': return 'hidden xl:block fixed right-4 top-1/2 -translate-y-1/2 w-[160px] min-h-[600px] z-30';
      default: return '';
    }
  };

  return (
    <div id={`ad-container-${type}`} className={getClasses()} />
  );
};
