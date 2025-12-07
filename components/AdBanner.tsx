import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  slotId: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  layout?: string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const AdBanner: React.FC<AdBannerProps> = ({ 
  slotId, 
  format = 'auto', 
  layout,
  className = "" 
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const isDev = process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost';

  useEffect(() => {
    // In a real deployment with a valid Publisher ID, this pushes the ad
    if (!isDev && window.adsbygoogle && adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense Error:', err);
      }
    }
  }, [isDev]);

  if (isDev) {
    // Placeholder for development so you can see where ads will be
    return (
      <div className={`bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-500 font-medium p-4 rounded-lg ${className}`}>
        <div className="text-center">
          <p className="text-xs uppercase font-bold tracking-wider mb-1">Ad Space</p>
          <p className="text-xs">Slot: {slotId}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`ad-container overflow-hidden rounded-lg ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client="ca-pub-YOUR_PUBLISHER_ID_HERE" // Replace with your actual ID
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
        data-ad-layout={layout}
      />
    </div>
  );
};