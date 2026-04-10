/**
 * Analytics utility for OmniTools
 * In a production environment, this would integrate with GA4 or a custom backend.
 */

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // Log to console for development
  console.log(`[Analytics] Event: ${eventName}`, properties);
  
  // Example GA4 integration:
  // if (typeof window.gtag === 'function') {
  //   window.gtag('event', eventName, properties);
  // }
};

export const trackToolUsage = (toolId: string) => {
  trackEvent('tool_usage', { tool_id: toolId });
  
  // Store in local storage for "Recently Used" feature
  const recentlyUsed = JSON.parse(localStorage.getItem('recently_used') || '[]');
  const updated = [toolId, ...recentlyUsed.filter((id: string) => id !== toolId)].slice(0, 5);
  localStorage.setItem('recently_used', JSON.stringify(updated));
};

export const getRecentlyUsedTools = () => {
  return JSON.parse(localStorage.getItem('recently_used') || '[]');
};
