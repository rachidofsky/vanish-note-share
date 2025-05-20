
import React, { useEffect, useRef, useState } from 'react';

interface AdUnitProps {
  adSlot: string;
  adFormat?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
}

export const AdUnit = ({ adSlot, adFormat = 'auto', className = '' }: AdUnitProps) => {
  const adRef = useRef<HTMLModElement | null>(null);
  const [publisherId, setPublisherId] = useState<string>('YOUR_ADSENSE_ID');
  const [actualAdSlot, setActualAdSlot] = useState<string>(adSlot);
  const [actualAdFormat, setActualAdFormat] = useState<'auto' | 'horizontal' | 'vertical' | 'rectangle'>(adFormat);
  
  // Load publisher ID and ad slot details from localStorage if available
  useEffect(() => {
    const storedPublisherId = localStorage.getItem('adsense_publisher_id');
    if (storedPublisherId) {
      setPublisherId(storedPublisherId);
    }
    
    const storedSlots = localStorage.getItem('adsense_slots');
    if (storedSlots) {
      try {
        const slots = JSON.parse(storedSlots);
        const matchingSlot = slots.find((slot: any) => slot.id === adSlot);
        if (matchingSlot) {
          setActualAdSlot(matchingSlot.id);
          setActualAdFormat(matchingSlot.format as 'auto' | 'horizontal' | 'vertical' | 'rectangle');
        }
      } catch (error) {
        console.error('Error parsing stored ad slots:', error);
      }
    }
  }, [adSlot]);
  
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
        data-ad-client={`ca-pub-${publisherId}`}
        data-ad-slot={actualAdSlot}
        data-ad-format={actualAdFormat}
        data-full-width-responsive="true"
        ref={adRef}
      ></ins>
    </div>
  );
};
