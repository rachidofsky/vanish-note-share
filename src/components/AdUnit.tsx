
import React, { useEffect, useRef } from 'react';

interface AdUnitProps {
  adSlot: string;
  adFormat?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
}

export const AdUnit = ({ adSlot, adFormat = 'auto', className = '' }: AdUnitProps) => {
  // Use HTMLInsElement which is the correct type for <ins> elements
  const adRef = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    try {
      // Check if window.adsbygoogle exists
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        // Push the ad to AdSense
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);
  
  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-YOUR_ADSENSE_ID"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
        ref={adRef as React.RefObject<HTMLElement>}
      ></ins>
    </div>
  );
};
